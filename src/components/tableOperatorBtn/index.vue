<template>
  <section class="operator-btns--container">
    <el-button-group>
      <fragment v-for="(item, key) in itemsBtn.defaultItems" :key="key">
        <fragment v-if="item.popover">
          <!-- 是否需要气泡确认框 -->
          <el-popconfirm
            v-bind="{ ...item.popover }"
            :confirm-button-text="
              item.popover.confirmText || popoverDefault.confirmText
            "
            :cancel-button-text="
              item.popover.cancelText || popoverDefault.cancelText
            "
            :title="item.popover.title || popoverDefault.title"
            icon="el-icon-info"
            icon-color="red"
            @confirm="handleBtn($event, item.operator)"
          >
            <el-button slot="reference" class="popover-btn">
              {{ item.label }}
            </el-button>
          </el-popconfirm>
        </fragment>
        <!-- 常规按钮 -->
        <fragment v-else>
          <el-button @click="handleBtn($event, item.operator)">
            {{ item.label }}
          </el-button>
        </fragment>
      </fragment>
      <el-dropdown
        v-if="itemsBtn.expandItems && itemsBtn.expandItems.length > 0"
        class="dropdown--container"
        @command="handleBtn"
      >
        <el-button>
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <!-- 下拉框 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(element, index) in itemsBtn.expandItems"
            :key="index"
            :command="element.operator"
          >
            <fragment v-if="element.popover">
              <!-- 是否需要气泡确认框 -->
              <el-popconfirm
                :confirm-button-text="
                  element.popover.confirmText || popoverDefault.confirmText
                "
                :cancel-button-text="
                  element.popover.cancelText || popoverDefault.cancelText
                "
                :title="element.popover.title || popoverDefault.title"
                icon="el-icon-info"
                icon-color="red"
                @confirm="handleBtn($event, item.operator)"
              >
                <span slot="reference">
                  {{ element.label }}
                </span>
              </el-popconfirm>
            </fragment>
            <!-- 常规下拉选项 -->
            <fragment v-else>
              {{ element.label }}
            </fragment>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-button-group>
  </section>
</template>

<script>
/**
 * Table 操作按钮组件， 通过 './constants.js 配置按钮变量'
 * 支持气泡确认框
 * 支持超出3个按钮后显示下拉框组件
 */
import { OPERATOR } from "./constants";
export default {
  name: "TableOperatorBtn",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      OPERATOR,
      popoverDefault: {
        title: "内容确定删除吗？",
        confirmText: "好的",
        cancelText: "不用了",
      },
    };
  },
  methods: {
    handleBtn(event, typeName) {
      if (Object.prototype.toString.call(event) === "[object String]")
        typeName = event;
      this.$emit("handleOperationBtn", typeName);
    },
  },
  computed: {
    itemsBtn() {
      if (this.items.length > 3) {
        return this.items.reduce(
          (prev, cur) => {
            if (prev.defaultItems.length < 3) {
              return { ...prev, defaultItems: [...prev.defaultItems, cur] };
            } else {
              return { ...prev, expandItems: [...prev.expandItems, cur] };
            }
          },
          {
            defaultItems: [],
            expandItems: [],
          }
        );
      }
      return { defaultItems: this.items };
    },
  },
};
</script>

<style lang="scss" scope>
.operator-btns--container {
  .popover-btn {
    float: left;
    // border-top-right-radius: 0;
    // border-bottom-right-radius: 0;
    margin-right: -1px;
    &:active {
      z-index: 1;
      position: relative;
    }
  }
  .dropdown--container {
    margin-left: 1px;
  }
  .btn-right {
    border-right: 1px solid #dcdfe6;
  }
  .el-button--mini {
    padding: 6px 10px;
  }
}
</style>
