<template>
  <div id="ProductList">
    <br />
    <div style="font-size: 0.2rem">
      clickedDateInfo: {{ clickedDateInfo.value }}
    </div>

    <div id="calendar">
      <div class="current-month">
        <slot name="current-month">
          <span class="left-arrow" @click="toggleMonth('prev')">{{ "<" }}</span>
          {{ displayFirstDayToTemp }}
          <span class="right-arrow" @click="toggleMonth('next')">{{
            ">"
          }}</span>
        </slot>
      </div>
      <div class="head-row">
        <div class="col" v-for="h in hData">{{ h }}</div>
      </div>
      <div class="content-row" v-for="c in cData">
        <div
          :class="[
            'col',
            { able: day !== null, 'is-holiday': i == 0 || i == 6 },
          ]"
          v-for="(day, i) in c"
          @click="clickDate(day)"
        >
          <span v-if="day">
            <div class="date">{{ day.DD }}</div>
            <div class="price">${{ utils.addCommas(day.price) }}</div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import utils from "@/utils";
// import { storeToRefs } from "pinia";
// import { useProduct } from "@/store";

// const productStore = useProduct();
// const { categories, products } = storeToRefs(productStore);
type dateType = { date: string; DD: string; price: number };

class Calendar {
  // [key: string]: any;
  DOM: Element | null;
  firstDay: string;
  data: dateType[]; // 尚未拆成一個個 row
  weekdays: string[];
  calendarData: dateType[][]; // 已經拆成一個個 row
  constructor(
    // domName: string,
    initData: dateType[],
    firstDay: string,
    options: {
      [key: string]: any;
    }
  ) {
    const { weekdays } = options;
    this.DOM = null;
    this.firstDay = firstDay;
    this.data = initData;
    this.weekdays = this.isValidWeekdays(weekdays)
      ? weekdays
      : [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
    this.calendarData = [];
    this.init();
  }

  isValidDom(domName: string) {
    if (!domName) throw new Error("select dom first");
    const dom = document.querySelector(domName);
    const result =
      typeof HTMLElement === "object"
        ? dom instanceof HTMLElement
        : dom &&
          typeof dom === "object" &&
          dom.nodeType === 1 &&
          typeof dom.nodeName === "string";
    if (!result) throw new Error("need select one dom");
    else this.DOM = dom;
  }

  isValidWeekdays(weakdays: string[]) {
    return (
      Array.isArray(weakdays) &&
      weakdays.length === 7 &&
      weakdays.every((w) => typeof w === "string")
    );
  }

  // example getter and method
  // Getter, 呼叫方法為 Calendar.getDom, 為一個屬性
  get getDom() {
    return this.getDomFun();
  }

  // Method // 呼叫方法為 Calendar.getDom()
  getDomFun() {
    if (!this.DOM) return;
    return this.DOM;
  }

  updateFirstDay(newFirstDay: string) {
    this.firstDay = newFirstDay;
    this.updateNewDays();
    this.init();
  }

  getProperty<K extends keyof Calendar>(key: K): Calendar[K] | undefined {
    // keyof 可用於獲取類型中所有鍵的聯合類型, 然後將其用於限制 key 參數的型別
    if (this.hasOwnProperty(key)) return this[key]; // K 的型別被限制為類別中已經定義過的型別 如 DOM, firstDay
    return undefined as unknown as Calendar[K];
    // 先將 undefined 轉換為 unknown，可以避免 TypeScript 報錯，因為 unknown 類型允許任何類型的值被賦值給它，但是它本身不能被賦值給其他類型。
    // 在將 unknown 類型轉換為 Calendar[K] 類型時，TypeScript 會認為已經確保了類型的正確性，因此不會報錯。
    // 但是需要注意的是，這種類型轉換可能會導致運行時錯誤，因為我們不能保證轉換後的值的類型是正確的。
  }

  getFirstDay(format: string): string {
    if (!format) return this.firstDay; // '20230406'
    if (format == "YYYY") return this.firstDay.slice(0, 4); // '2023' 0406
    if (format == "MM") return this.firstDay.slice(4, 6); // 2023 '04' 06
    return "";
  }

  // static => 不需要實體化即可呼叫 e.g. Calendar.getInfo ( 如果是方法一樣要 Calendar.getInfo() )
  // 需要注意 靜態方法不能訪問 constructor 的各個屬性 因為靜態方法不會被實例化 故 this 也是指向類本身 即 Calendar
  // static getInfo(firstDay) {
  //   const inputYear = firstDay.slice(0, 4);
  //   const inputMonth = firstDay.slice(4, 6);
  //   const date = new Date(`${inputYear}-${inputMonth}-01`);
  //   const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  //   const daysInMonth =
  //     Math.floor((nextMonth - date) / (1000 * 60 * 60 * 24)) + 1;
  //   return {
  //     year: inputYear,
  //     month: inputMonth,
  //     daysInMonth,
  //   };
  // }

  generateFirstWeekPart(firstDay: string) {
    const year: number = parseInt(firstDay.slice(0, 4));
    const month: number = parseInt(firstDay.slice(4, 6)) - 1;
    const day: number = parseInt(firstDay.slice(6, 8)); // '04' - 1 = 3(number), '04' + 1 = '041'(string)
    const date = new Date(year, month, day);
    // calculate with firstDay to know how many grid we need to show in first row
    const firstPartHash: {
      [key: string]: number;
    } = {
      "0": 7, // Sunday, means if firstDay is begin at Sunday, the first row should have 7 grid, so we don't need to padding empty grid
      "1": 6, // Monday
      "2": 5, // Tuesday,
      "3": 4, // Wednesday
      "4": 3, // Thursday
      "5": 2, // Friday
      "6": 1, // Saturday
    };
    const weekdayIndex = date.getDay();
    return firstPartHash[weekdayIndex];
  }

  generateParts(firstWeekPart: number) {
    // firstWeekPart => 第一列要顯示幾天
    const parts = [];
    let dataLen: number = this.data.length;
    parts.push(firstWeekPart);
    dataLen -= firstWeekPart;
    while (dataLen > 0) {
      if (dataLen >= 7) {
        parts.push(7);
        dataLen -= 7;
      } else {
        parts.push(dataLen);
        dataLen = 0;
      }
    }
    return parts;
  }

  generateCalendar(parts: number[]) {
    // ex: part = [1, 7, 7, 7, 7, 1], data: dateType[]
    const firstFillNullDay = 7 - parts[0];
    const firstPrefixDayArr = new Array(firstFillNullDay).fill(null); // 第一列補空白天數
    const endFillNullDay = 7 - parts[parts.length - 1];
    const endPrefixDayArr = new Array(endFillNullDay).fill(null); // 最後一列補空白天數
    let index = 0;
    const result = parts.map((part, i) => {
      const sliceDay = this.data.slice(index, index + part);
      const slicePart = () => {
        if (i === 0) return [...firstPrefixDayArr, ...sliceDay];
        if (i === parts.length - 1) return [...sliceDay, ...endPrefixDayArr];
        return sliceDay;
      };
      index += part;
      return slicePart();
    });
    return result;
  }

  updateNewDays() {
    const { year, month, daysInMonth } = getInfo(reactiveIns.getFirstDay(""));
    this.data = new Array(daysInMonth).fill({}).map((_, i) => ({
      date: `${year}${month}${i + 1 > 9 ? String(i + 1) : `0${i + 1}`}`, // ex: 20220101
      DD: `${i + 1 > 9 ? String(i + 1) : `0${i + 1}`}`,
      price: (i + 1) * 100,
    }));
  }

  init() {
    // this.isValidDom(domName);
    // firstWeekPart => 找到第一天是星期幾 用以判斷第一列該顯示幾天
    const firstWeekPart = this.generateFirstWeekPart(this.firstDay);
    // const firstWeekPart = firstPartHash[weekdays[weekdayIndex]]; // 1
    // parts => 將第二行根據每七天拆成一列
    const parts = this.generateParts(firstWeekPart); // parts = [1, 7, 7, 7, 7, 1];
    const result = this.generateCalendar(parts);
    this.calendarData = result;
  }
}

function getInfo(input: string) {
  const inputYear = input.slice(0, 4);
  const inputMonth = input.slice(4, 6);
  const date = new Date(`${inputYear}-${inputMonth}-01`);
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1); // 超過 12 會自動進位
  const daysInMonth =
    Math.floor((nextMonth.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)) +
    1; // 這個月有幾天
  return {
    year: inputYear,
    month: inputMonth,
    daysInMonth,
  };
}

function leadingZero(num: number | string): string {
  return num <= 9 ? `0${num}` : String(num);
}

// initData setting start
const firstDay = ref<string>("20230401"); // initFirstDay
const initMonthInfo = computed(() => getInfo(firstDay.value));
// const initMonthInfo = Calendar.getInfo(firstDay.value);
const initData = new Array(initMonthInfo.value.daysInMonth)
  .fill({})
  .map((_, i) => ({
    date: `${initMonthInfo.value.year}${initMonthInfo.value.month}${
      i + 1 > 9 ? String(i + 1) : `0${i + 1}`
    }`, // ex: 20220101
    DD: `${i + 1 > 9 ? String(i + 1) : `0${i + 1}`}`,
    price: (i + 1) * 100,
  }));

// initData setting end

const ins = new Calendar("#calendar", initData, firstDay.value, {
  width: 100,
  height: 100,
  // weekdays: [
  //   "星期天",
  //   "星期一",
  //   "星期二",
  //   "星期三",
  //   "星期四",
  //   "星期五",
  //   "星期六",
  // ],
});

/***
 * const reactiveIns = reactive(ins);
 * 注意不要直接修改 reactiveIns 屬性跟方法, 以免破壞 Vue 的「依賴收集」和「派發更新」機制。
 */
const reactiveIns = reactive(ins); //

const displayFirstDayToTemp = computed(() => {
  // 這邊跟上面不同 拿的不是初始 firstDay, 是拿最新響應的 firstDay 去生成 MM/YYYY 字串
  const currentMonthInfo = getInfo(reactiveIns.getFirstDay(""));
  return `${currentMonthInfo.month} / ${currentMonthInfo.year}`;
});
// hData 如果有需要再改成 computed 就好 目前沒有初始渲染後更換 hData 需求所以不用 computed
const hData = reactiveIns.getProperty("weekdays"); // ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
// const cData = ins.getProperty("calendarData"); // [Array(7), Array(7), Array(7), Array(7), Array(7), Array(7)]
const cData = computed(() => reactiveIns.getProperty("calendarData"));

function to_prev_or_next_Month(
  year: string,
  month: string,
  direction: string
): string {
  const date = new Date(`${year}-${month}-01`);
  const newFirstDay = new Date(
    date.getFullYear(),
    date.getMonth() + (direction == "next" ? 1 : -1),
    1
  ); // 月份超過 12 年份會自動進位
  return `${newFirstDay.getFullYear()}${leadingZero(
    newFirstDay.getMonth() + 1
  )}${leadingZero(newFirstDay.getDate())}`;
}
// 切換月份
const toggleMonth = (direction: string) => {
  const year = reactiveIns.getFirstDay("YYYY");
  const month = reactiveIns.getFirstDay("MM");
  let newMonthYYYYMMDD: string = "";
  if (direction == "prev") {
    newMonthYYYYMMDD = to_prev_or_next_Month(year, month, "prev");
    reactiveIns.updateFirstDay(newMonthYYYYMMDD);
  }
  if (direction == "next") {
    newMonthYYYYMMDD = to_prev_or_next_Month(year, month, "next");
    reactiveIns.updateFirstDay(newMonthYYYYMMDD);
  }
};

// 點擊日期
const clickedDateInfo = reactive<any>({});
const clickDate = (day: any) => {
  clickedDateInfo.value = { ...day };
  // Object.assign(user, newUser);
  // user.value = { ...day.value, ...newUser };
};
</script>

<style lang="scss" scoped>
#ProductList {
  //   @include position(relative);
  //   margin-top: 1.25rem;
  // height: calc(100vh - 1.25rem);
  // height: 100%;
  //   border-bottom: 0.03rem solid #f0f0f0;
  //   background: #eef0ec;
  //   ::-webkit-scrollbar {
  //     display: none;
  //   }
  position: relative;
  height: 100%;
}
#calendar {
  width: 7rem;
  height: fit-content;
  font-size: 0.1rem;
  // @include position(absolute, 0, 0, 0, 0);
  margin: 0.5rem auto 0;
  .current-month {
    border: 1px solid black;
    font-weight: 800;
    font-size: 0.22rem;
    position: relative;
    .left-arrow {
      @include position(absolute, $left: 0.1rem);
      cursor: pointer;
    }
    .right-arrow {
      @include position(absolute, $right: 0.1rem);
      cursor: pointer;
    }
  }
  .head-row,
  .content-row {
    @include flexAlignCenter();
    justify-content: space-around;

    .col {
      flex: 1;
      padding: 0.1rem;
      @include flexAlignCenter();
      justify-content: center;
      border: 1px solid black;
      position: relative;
      .date {
        @include position(absolute, $top: 0.02rem, $left: 0.04rem);
        font-weight: 800;
        font-size: 0.18rem;
      }
      .price {
        @include position(absolute, $bottom: 0.02rem, $right: 0.04rem);
      }
    }
  }
  .head-row {
    .col {
      min-width: 0.5rem;
      height: 0.4rem;
    }
  }
  .content-row {
    .col {
      height: 0.7rem;
      pointer-events: none;
      &.able {
        pointer-events: visible;
        cursor: pointer;
        &:hover {
          background: #afafad;
          transition: 0.3s all;
          .date {
            color: green;
          }
        }
      }
      &.is-holiday {
        background: #eff8ff;
      }
    }
  }
}
</style>
