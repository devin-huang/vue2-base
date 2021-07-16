<template>
  <section class="searchBar-container">
    <div class="row">
      <div class="col" v-for="(item, key) in items" :key="key">
        <div class="grid-content bg-purple">
          <!-- 输入框类型 -->
          <fragment v-if="item.type === TYPE.input">
            <div class="formItem-cell">
              <span class="label wd120">{{ item.label }}</span>
              <div class="content">
                <el-input
                  v-model="item.initValue"
                  v-bind="item.hasOwnProperty('props') ? { ...item.props } : {}"
                />
              </div>
            </div>
          </fragment>
          <!-- 下拉框类型 -->
          <fragment v-if="item.type === TYPE.select">
            <div class="formItem-cell">
              <span class="label wd120">{{ item.label }}</span>
              <div class="content">
                <el-select
                  class="base-select"
                  v-model="item.initValue"
                  v-bind="item.hasOwnProperty('props') ? { ...item.props } : {}"
                >
                  <el-option
                    v-for="(element, index) in item.options"
                    :key="index"
                    :label="element.label"
                    :value="element.value"
                  />
                </el-select>
              </div>
            </div>
          </fragment>
          <!-- 时间区间类型 -->
          <fragment v-if="item.type === TYPE.datePicker">
            <div class="formItem-cell">
              <span class="label wd120">{{ item.label }}</span>
              <div class="content">
                <el-date-picker
                  v-model="item.initValue"
                  v-bind="item.hasOwnProperty('props') ? { ...item.props } : {}"
                >
                </el-date-picker>
              </div>
            </div>
          </fragment>
          <!-- 自定义类型 -->
          <fragment v-else-if="item.render">
            <div class="formItem-cell">
              <span class="label wd120">{{ item.label }}</span>
              <div class="content">
                {{ renderInSelf(item.render, item) }}
                <slot name="render" :item="item"></slot>
              </div>
            </div>
          </fragment>
          <!-- <fragment v-else>
            <div class="formItem-cell">渲染失败</div>
          </fragment> -->
        </div>
      </div>
      <div class="col">
        <div class="searchBar-container--btn-group span-2">
          <el-button type="primary" @click="handlerSearch">搜索</el-button>
          <el-button @click="handlerReset">重置</el-button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "baseSearchBar",
  props: {
    // 搜索对象集合
    items: {
      type: Array,
      default: () => [],
    },
    // 动态设置每行显示几个搜索条件
    col: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      initValues: {},
      TYPE: {
        input: "input",
        select: "select",
        datePicker: "datePicker",
      },
    };
  },
  watch: {
    items: {
      deep: true,
      immediate: true,
      handler(element) {
        // 初始化时保留初始值
        if (JSON.stringify(this.initValues) === "{}") {
          element.forEach((item) => {
            this.initValues = {
              ...this.initValues,
              ...{ [item.name]: item.initValue },
            };
          });
        }
      },
    },
  },
  computed: {
    // 用于根据全部搜索条件计算出需要分几行,   TODO 还没处理
    len() {
      if (this.items.length > this.col.length) {
        this.items.length / this.col.length;
      }
      return this.items.length;
    },
    searchBarValue() {
      return this.items.reduce((prev, cur) => {
        if (cur.initValue) return { ...prev, ...{ [cur.name]: cur.initValue } };
        return prev;
      }, {});
    },
  },
  methods: {
    renderInSelf(cb, attrs) {
      if (cb && cb instanceof Function) cb.call(this, attrs);
    },
    handlerSearch() {
      console.log("handlerSearch", this.searchBarValue);
      this.$emit("onSearch", this.searchBarValue);
    },
    handlerReset() {
      console.log("handlerReset", this.initValues);
      this.items.forEach((item) => {
        item.initValue = this.initValues[item.name];
      });
      this.$emit("onReset", this.initValues);
    },
  },
};
</script>
<style lang="scss" scoped>
.searchBar-container {
  width: 1050px;
  .row {
    display: flex;
    flex-wrap: wrap;
    .col {
      width: 350px;
      .formItem-cell {
        display: flex;
        .label {
          flex: 0.4;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 15px;
          // margin-top: -4px;
          font-size: 14px;
          color: #606266;
          box-sizing: border-box;
          &.wd120 {
            width: 120px;
            flex: none;
          }
        }
        .content {
          flex: 1;
          /deep/ .el-input {
            width: 100% !important;
          }
        }
      }
      .searchBar-container--btn-group {
        display: flex;
        justify-content: flex-end;
        &.span-2 {
          width: 350px;
        }
        &.span-2 {
          width: 700px;
        }
        &.span-3 {
          width: 1050px;
        }
      }
    }
  }

  .flex-just-end {
    display: flex;
    justify-content: flex-end;
  }

  .base-select {
    width: 100%;
  }

  // .bg-purple {
  //   background: #d3dce6;
  // }
  .grid-content {
    border-radius: 4px;
    min-height: 40px;
  }
}
</style>
