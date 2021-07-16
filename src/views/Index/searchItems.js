import { getNodeVm, $vm } from "@/utils/vm.js";
import dayjs from "dayjs";

const searchItems = [
  {
    label: "活动名称1",
    name: "name",
    initValue: "12",
    type: "input",
    props: {
      placeholder: "输入内容",
    },
  },
  {
    label: "活动类型",
    name: "type",
    initValue: "",
    type: "select",
    options: [
      {
        label: "AA",
        value: 1,
      },
    ],
  },
  {
    label: "活动名称3",
    name: "name1",
    initValue: "",
    type: "datePicker",
    props: {
      placeholder: "选择日期",
    },
  },
  {
    label: "活动名222称",
    name: "name3",
    initValue: "",
    render: function (attrs) {
      const { initValue, name } = attrs;
      this.$slots.render = window.$h("elDatePicker", {
        attrs: {
          type: "year",
          value: initValue,
          placeholder: "请选择年份",
        },
        on: {
          input: (event) => {
            const curElement = $vm.searchItems.find(
              (item) => item.name === name
            );
            curElement.initValue = dayjs(event).format("YYYY");
          },
        },
      });
    },
    props: {
      placeholder: "选择日期",
    },
  },
];

export { searchItems, getNodeVm };
