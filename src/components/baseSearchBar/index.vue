<template>
  <section class="searchBar-container" :style="containerWidth">
    <div class="row" v-for="(_row, index) in itemsRow" :key="index">
      <div
        v-for="(item, key) in itemsRow[index]"
        :class="`col col--span--${rowSize / colSize}`"
        :key="key"
      >
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
      <!-- 判断是否为最后一行而显示搜索按钮组 -->
      <div
        v-if="isShowSearchBtn(index)"
        :class="`col col--span--${(rowSize / colSize) * btnCol}`"
      >
        <div class="searchBar-container--btn-group">
          <el-button type="primary" @click="handlerSearch">搜索</el-button>
          <el-button @click="handlerReset">重置</el-button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
/**
 * 基础搜索栏组件
 * 支持搜索按钮、重置按钮位置调整：colSize=1/ colSize=2/ colSize=3
 * 支持渲染内置组件select、input，也支持自定义组件
 * 内容全部通过外部传入items对象进行渲染
 */
export default {
  name: "baseSearchBar",
  props: {
    // 搜索组件整体宽度
    width: {
      type: [Number, String],
      default: 1050,
    },
    // 搜索对象集合
    items: {
      type: Array,
      default: () => [],
    },
    // 搜索按钮显示位置
    btnCol: {
      type: [Number, String],
      default: 1,
    },
    // 动态设置每行显示几个搜索条件
    colSize: {
      type: [Number, String],
      default: 3,
    },
  },
  data() {
    return {
      // 每行占24格
      rowSize: 24,
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
    containerWidth() {
      const minWidth = "800px";
      const width =
        Object.prototype.toString.call(this.width) === "[object Number]"
          ? { width: `${this.width}px` }
          : { width: this.width };
      return { ...width, minWidth };
    },
    // 用于根据全部搜索条件计算出需要分几行
    itemsRow() {
      const items = this.items;
      const colSize = this.colSize;
      if (items.length > colSize) {
        const lineNum =
          items.length % colSize === 0
            ? items.length / colSize
            : Math.ceil(items.length / colSize);

        return items.reduce((prev, _, index) => {
          if (index < lineNum) {
            return [
              ...prev,
              this.items.slice(index * colSize, index * colSize + colSize),
            ];
          }
          return prev;
        }, []);
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
    isShowSearchBtn(index) {
      return this.itemsRow.length - 1 === index;
    },
    renderInSelf(cb, attrs) {
      if (cb && cb instanceof Function) cb.call(this, attrs);
    },
    handlerSearch() {
      console.log("handlerSearch", this.searchBarValue);
      this.$emit("search", this.searchBarValue);
    },
    handlerReset() {
      console.log("handlerReset", this.initValues);
      this.items.forEach((item) => {
        item.initValue = this.initValues[item.name];
      });
      this.$emit("reset", this.initValues);
    },
  },
};
</script>
<style lang="scss" scoped>
// 遍历计算一行24格每个百分比
$rowSize: 24;
$colSize: 100% / $rowSize;
@for $i from 1 to $rowSize {
  .searchBar-container .col--span--#{$i} {
    width: $i * $colSize !important;
  }
}

.searchBar-container {
  margin-bottom: 15px;
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
