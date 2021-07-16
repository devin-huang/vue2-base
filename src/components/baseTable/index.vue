<template>
  <!-- 使用方式参考readme.md -->
  <!-- 仿react方式将组建每列设为对象，当劣种需要特别属性可以通过对象键值对方式传人 -->
  <!-- 功能：多选、自定义头部、自定义列渲染、分页、空格页显示 -->
  <div class="lm--section">
    <el-table
      ref="table"
      size="medium"
      style="width: 100%"
      min-height="580px"
      v-loading="loading"
      :data="tableData"
      :header-cell-style="{ background: '#fafafa', color: 'black' }"
      @selection-change="handleSelectionChange"
    >
      <!-- 判断是否有数据 -->
      <template v-if="columns.length > 0">
        <el-table-column v-if="selection" type="selection" width="55" />
        <template v-for="({ header, slot, ...item }, index) in columns">
          <!-- v-bind 参考react {...props}  传递多属性(仅能传递属性),注意：slot是函数，如果用v-bind后无法获取值，所以要单独抽离出来-->
          <el-table-column
            v-if="!item.hidden"
            v-bind="{ ...item }"
            :key="index"
            :prop="item.prop"
            :label="item.label"
          >
            <!-- 头部添加DOM -->
            <template slot="header" slot-scope="scope">
              {{ renderInSelf(header, scope) }}
              <slot v-if="header" name="header"></slot>
              <div class="lm-table__header--item" v-else>
                {{ scope.column.label }}
              </div>
            </template>

            <template slot-scope="scope">
              <div v-if="slot">
                <!-- 必先执行renderInSelf后生产slot， 才能插入slot中 -->
                {{ renderInSelf(slot, scope) }}
                <slot name="dom"></slot>
              </div>
              <div v-else>
                <!-- columns设置是否启用省略号展示与提示框 -->
                <el-popover
                  placement="right"
                  trigger="hover"
                  width="200"
                  :content="String(scope.row[item.prop])"
                  :disabled="
                    !(
                      Object.prototype.toString.call(item.showPop) ===
                        '[object Boolean]' && item.showPop
                    )
                  "
                >
                  <!-- 仅展示文本 -->
                  <span slot="reference">{{ scope.row[item.prop] }} </span>
                </el-popover>
              </div>
            </template>
          </el-table-column>
        </template>
        <slot slot="empty" name="empty">
          <div class="empty">
            <img :src="require('@/assets/no-data.png')" class="no-data-img" />
            <span class="no-data-text">暂无数据</span>
          </div>
        </slot>
      </template>
    </el-table>
    <div v-if="setPage.total > setPage.pageSizes[0]" class="lm--pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="setPage.currentPage"
        :page-sizes="setPage.pageSizes"
        :page-size="setPage.pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="setPage.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseTable",
  props: {
    // 数据源
    data: {
      type: Array,
      default: () => [],
    },
    // 是否展示多选框
    selection: {
      type: Boolean,
      defalut: false,
    },
    // 列属性的配置
    columns: {
      type: Array,
      default: () => [],
    },
    // 分页配置
    page: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      defaultPage: {
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        currentPage: 1,
        total: 0,
      },
    };
  },
  computed: {
    tableData() {
      return this.data;
    },
    setPage() {
      return Object.assign(this.defaultPage, this.page);
    },
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page = Object.assign(this.page, { pageSize: val });
      this.$emit("pageChange", this.page);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = Object.assign(this.page, { currentPage: val });
      this.$emit("pageChange", this.page);
    },
    handleSelectionChange(selection) {
      console.log(selection);
      this.$emit("update:multipleSelection", selection);
    },
    // 渲染Vnode
    renderInSelf(cb, scope) {
      if (cb && cb instanceof Function) cb.call(this, scope);
    },
  },
};
</script>
<style lang="scss" scoped>
.lm {
  &--section {
    /deep/ .el-table {
      &__body-wrapper {
        .cell {
          white-space: normal;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          /* autoprefixer: off */
          -webkit-line-clamp: 1; //只显示两行
          /*autoprefixer: on */
          overflow: hidden;
        }
      }
    }
  }
  &--pagination {
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  /deep/ &--table__header--item {
    padding: 0;
  }
}
</style>
