<template>
  <el-form
    :model="modelForm"
    ref="baseForm"
    label-width="100px"
    class="baseForm-container"
    size="mini"
  >
    <template v-for="(item, key) in form">
      <el-form-item
        :label="item.label"
        :prop="item.name"
        :rules="item.rules"
        :key="key"
      >
        <!-- 渲染输入框 -->
        <fragment v-if="item.type === TYPE.input">
          <el-input
            v-model="item.initValue"
            v-bind="{ ...item.props }"
          ></el-input>
        </fragment>
        <!-- 渲染密码框 -->
        <fragment v-else-if="item.type === TYPE.password">
          <el-input type="password" v-model="item.initValue"></el-input>
        </fragment>
        <!-- 渲染输入区域 -->
        <fragment v-else-if="item.type === TYPE.textarea">
          <el-input
            type="textarea"
            v-model="item.initValue"
            v-bind="{ ...item.props }"
          ></el-input>
        </fragment>
        <!-- 渲染下拉框 -->
        <fragment v-else-if="item.type === TYPE.select">
          <el-select
            v-model="item.initValue"
            :placeholder="item.placeholder || '请选择内容'"
            v-bind="{ ...item.props }"
          >
            <el-option
              v-for="(element, index) in item.options"
              :key="index"
              :label="element.label"
              :value="element.value"
            />
          </el-select>
        </fragment>
        <!-- 渲染单选 -->
        <fragment v-else-if="item.type === TYPE.radio">
          <el-radio-group v-model="item.initValue">
            <el-radio
              v-for="(element, index) in item.options"
              :key="index"
              :label="element.label"
              v-bind="{ ...item.props }"
            />
          </el-radio-group>
        </fragment>
        <!-- 渲染多选 -->
        <fragment v-else-if="item.type === TYPE.checkbox">
          <el-checkbox-group v-model="item.initValue">
            <el-checkbox
              v-for="(element, index) in item.options"
              :key="index"
              :label="element.label"
              :name="element.name"
              v-bind="{ ...item.props }"
            />
          </el-checkbox-group>
        </fragment>
        <!-- 渲染时间段 -->
        <fragment v-else-if="item.type === TYPE.range">
          <el-date-picker
            v-model="item.initValue"
            type="monthrange"
            align="right"
            :picker-options="pickerOptions"
            v-bind="{ ...item.props }"
            v-on="{ ...item.props.on }"
          />
        </fragment>
        <!-- 自定义渲染 -->
        <template v-else-if="item.render">
          <div>
            {{ renderInSelf(item.render, item) }}
            <slot name="render" :item="item"></slot>
          </div>
        </template>
        <!-- 渲染失败 -->
        <fragment v-else>
          <div>渲染失败</div>
        </fragment>
      </el-form-item>
    </template>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
/**
 * [Element Warn]please pass correct props! 是因为使用了自定义校验，可忽略
 */
const createElement = window.$h;

const TYPE = {
  input: "input",
  textarea: "textarea",
  password: "password",
  select: "select",
  range: "range",
  checkbox: "checkbox",
  radio: "radio",
};

const TYPE_DOM = {
  [TYPE.input]: "elInput",
  [TYPE.textarea]: "elInput",
  [TYPE.select]: "elInput",
  [TYPE.password]: "elInput",
  [TYPE.range]: "elDatePicker",
  [TYPE.checkbox]: "elCheckbox",
  [TYPE.radio]: "elRadio",
};
export default {
  name: "baseForm",
  props: {
    form: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // 初始化时值
      initValues: {},
      TYPE: TYPE,
      input: "input",
      TYPE_DOM: TYPE_DOM,
      pickerOptions: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", [new Date(), new Date()]);
            },
          },
          {
            text: "今年至今",
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近六个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  watch: {
    modelForm: {
      deep: true,
      immediate: true,
      handler(value) {
        // 初始化时保留初始值
        if (JSON.stringify(this.initValues) === "{}") {
          this.initValues = value;
        }
      },
    },
  },
  computed: {
    modelForm() {
      return this.form.reduce(
        (prev, cur) => ({ ...prev, ...{ [cur.name]: cur.initValue } }),
        {}
      );
    },
  },
  methods: {
    renderInSelf(cb, attrs) {
      if (cb && cb instanceof Function) cb.call(this, createElement, attrs);
    },
    submitForm() {
      this.$refs["baseForm"].validate((valid) => {
        if (valid) {
          alert("submit!");
          this.$emit("onSubmit", this.modelForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["baseForm"].resetFields();
      this.form.forEach((item) => {
        item.initValue = this.initValues[item.name];
      });
      this.$emit("onReset", this.initValues);
    },
  },
};
</script>
<style lang="scss" scoped></style>
