<template>
  <div id="ProductList">
    chosen date: <br />
    dayInfo: {{ dayInfo.value }}
    <!-- <div v-if="dayInfo">
      date: {{ dayInfo.date }} , price: {{ dayInfo.price }}
    </div> -->
    <div id="calendar">
      <div class="head-row">
        <div class="col" v-for="h in hData">{{ h }}</div>
      </div>
      <div class="content-row" v-for="c in cData">
        <div
          :class="['col', { able: day !== null }]"
          v-for="day in c"
          @click="clickDate(day)"
        >
          <span v-if="day">
            <div class="date">{{ day.date }}</div>
            <div class="price">${{ utils.addCommas(day.price) }}</div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import utils from "@/utils";
// import { storeToRefs } from "pinia";
// import { useProduct } from "@/store";

// const productStore = useProduct();
// const { categories, products } = storeToRefs(productStore);

class Calendar {
  constructor(domName, data, firstDay, state) {
    const { weekdays } = state;
    this.dom = null;
    this.firstDay = firstDay;
    this.data = data;
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
    this.calendarData = null || [];
    this.init(domName, weekdays);
  }

  isValidDom(domName) {
    if (!domName) throw new Error("select dom first");
    var dom = document.querySelector(domName);
    var result =
      typeof HTMLElement === "object"
        ? dom instanceof HTMLElement
        : dom &&
          typeof dom === "object" &&
          dom.nodeType === 1 &&
          typeof dom.nodeName === "string";
    if (!result) throw new Error("need select one dom");
    else this.dom = dom;
  }

  isValidWeekdays(weakdays) {
    return (
      Array.isArray(weakdays) &&
      weakdays.length === 7 &&
      weakdays.every((w) => typeof w === "string")
    );
  }

  // Getter, 呼叫方法為 Calendar.getDom, 為一個屬性
  get getDom() {
    return this.getDomFun();
  }

  // Method // 呼叫方法為 Calendar.getDom()
  getDomFun() {
    if (!this.dom) return;
    return this.dom;
  }

  showWeekdays() {
    return this.weekdays;
  }

  showFinalData() {
    return this.calendarData;
  }

  // 靜態方法 不需要實體化即可呼叫 e.g. Calendar.getTotalDays
  static getTotalDays(firstDay) {
    var inputYear = firstDay.slice(0, 4);
    var inputMonth = firstDay.slice(4, 6);
    var date = new Date(`${inputYear}-${inputMonth}-01`);
    var nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    var daysInMonth =
      Math.floor((nextMonth - date) / (1000 * 60 * 60 * 24)) + 1;
    return {
      year: inputYear,
      month: inputMonth,
      daysInMonth,
    };
  }

  generateFirstWeekPart(date) {
    var year = date.slice(0, 4);
    var month = date.slice(4, 6) - 1;
    var day = date.slice(6, 8);
    var date = new Date(year, month, day);
    // how many grid we need to show in first row
    var firstPartHash = {
      0: 7, // Sunday
      1: 6, // Monday
      2: 5, // Tuesday,
      3: 4, // Wednesday
      4: 3, // Thursday
      5: 2, // Friday
      6: 1, // Saturday
    };
    var weekdayIndex = date.getDay();
    return firstPartHash[weekdayIndex];
  }

  generateParts(firstWeekPart, dataLen) {
    var parts = [];
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

  generateCalendar(parts, data) {
    var firstFillNullDay = 7 - parts[0];
    var firstPrefixDayArr = new Array(firstFillNullDay).fill(null);
    var endFillNullDay = 7 - parts[parts.length - 1];
    var endPrefixDayArr = new Array(endFillNullDay).fill(null);
    let index = 0;
    var result = parts.map((part, i) => {
      const sliceDay = data.slice(index, index + part);
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

  init(domName, weekdays) {
    // this.isValidDom(domName);
    // 找到第一天是星期幾 用以判斷第一列該顯示幾天
    var firstWeekPart = this.generateFirstWeekPart(this.firstDay);
    // var firstWeekPart = firstPartHash[weekdays[weekdayIndex]]; // 1
    // 將第二行根據每七天拆成一列
    var parts = this.generateParts(firstWeekPart, this.data.length); // parts = [1, 7, 7, 7, 7, 1];
    var result = this.generateCalendar(parts, this.data);
    this.calendarData = result;
  }
}

function getTotalDays(input: string) {
  var inputYear = input.slice(0, 4);
  var inputMonth = input.slice(4, 6);
  var date = new Date(`${inputYear}-${inputMonth}-01`);
  var nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  var daysInMonth = Math.floor((nextMonth - date) / (1000 * 60 * 60 * 24)) + 1;
  return {
    year: inputYear,
    month: inputMonth,
    daysInMonth,
  };
}

var firstDay = "20230401";
var currentMonthInfo = Calendar.getTotalDays(firstDay);

var data = new Array(currentMonthInfo.daysInMonth).fill().map((_, i) => ({
  date: `${
    // currentMonthInfo.year +
    // currentMonthInfo.month +
    i + 1 > 9 ? i + 1 : `0${i + 1}`
  }`, // ex: 20220101
  price: (i + 1) * 100,
}));

var ins = new Calendar("#calendar", data, firstDay, {
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

var hData = ins.showWeekdays();
var cData = ins.showFinalData();
var dayInfo = reactive<any>({});
// var dayInfo = reactive<any>([1, 2, 3]);
// console.log(day);

const clickDate = (day: any) => {
  dayInfo.value = { ...day };
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
  @include position(absolute, 0, 0, 0, 0);
  margin: auto;
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
        }
      }
    }
  }
}
</style>
