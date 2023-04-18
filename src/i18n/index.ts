import { createI18n } from "vue-i18n";

import jpMessages from "@/i18n/jp/message.json";
import enMessages from "@/i18n/en/message.json";
import twMessages from "@/i18n/tw/message.json";

const i18n = createI18n({
  locale: "jp",
  messages: {
    jp: jpMessages,
    en: enMessages,
    tw: twMessages,
  },
});

export default i18n;
