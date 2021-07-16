import Vue from "vue";
import { getNodeVm, $vm } from "@/utils/vm.js";
import Test from "@/components/baseForm/test";
import dayjs from "dayjs";

Vue.component(Test.name, Test);

// 自定义校验
var validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("名称不能为空"));
  } else {
    console.log(
      $vm.$refs.baseForm,
      value,
      "this根据form的$refs所在DOM结构而改变"
    );
    callback();
  }
};

const forms = [
  {
    label: "名称",
    name: "name",
    initValue: "Devin",
    type: "input",
    rules: [
      {
        required: true,
        validator: validatePass,
      },
    ],
  },
  {
    label: "密码",
    name: "password",
    initValue: "Devin",
    type: "password",
    rules: [
      {
        required: true,
        trigger: "blur",
        message: "密码不能为空",
      },
    ],
  },
  {
    label: "区域",
    name: "area",
    initValue: "",
    type: "select",
    options: [
      {
        label: "A区",
        value: 1,
      },
      {
        label: "B区",
        value: 2,
      },
    ],
    rules: [{ required: true, message: "区域不能为空" }],
  },
  {
    label: "资源",
    name: "source",
    initValue: "",
    type: "radio",
    options: [
      {
        label: "乐园",
        value: 1,
      },
      {
        label: "公园",
        value: 2,
      },
    ],
    rules: [{ required: true, message: "资源不能为空" }],
  },
  {
    label: "活动",
    name: "type",
    initValue: [],
    type: "checkbox",
    options: [
      {
        label: "篮球",
        value: 1,
      },
      {
        label: "足球",
        value: 2,
      },
      {
        label: "游泳",
        value: 3,
      },
    ],
    rules: [{ required: true, message: "活动不能为空" }],
  },
  {
    label: "自定义",
    name: "ts",
    initValue: "",
    render: function (h, attrs) {
      const { initValue, name } = attrs;
      this.$slots.render = h("elDatePicker", {
        attrs: {
          type: "year",
          value: initValue,
          placeholder: "请选择年份",
        },
        on: {
          input: (event) => {
            const curElement = $vm.forms.find((item) => item.name === name);
            curElement.initValue = dayjs(event).format("YYYY");
            console.log($vm.forms, "curElement");
          },
        },
      });
    },
    rules: [{ required: true, message: "自定义不能为空" }],
  },
  {
    label: "自定义组件",
    name: "tssss",
    initValue: "",
    render: function (h) {
      this.$slots.render = h("Test", {
        // attrs: {
        //   type: "year",
        //   value: initValue,
        //   placeholder: "请选择年份",
        // },
        on: {
          pick: (value) => {
            console.log("pickk", value);
          },
        },
      });
    },
    // rules: [{ required: true, message: "自定义不能为空" }],
  },
  {
    label: "时间段",
    name: "time",
    initValue: "",
    type: "range",
    props: {
      unlinkPanels: true,
      rangeSeparator: "至",
      startPlaceholder: "开始月份",
      endPlaceholder: "结束月份",
      format: "DD/MM",
      valueFormat: "DD/MM",
      on: {
        change(event) {
          console.log("change", event);
        },
      },
    },
    rules: [
      { required: true, message: "5年龄不能为空" },
      // { type: "date", message: "年龄必须为日期" }, // type: "date"会报错，因为new Date会变为string
    ],
  },
  {
    label: "内容",
    name: "name",
    initValue: "",
    type: "textarea",
    rules: [
      {
        required: true,
        message: "2年龄不能为空",
      },
    ],
  },
];

export { forms, getNodeVm };
