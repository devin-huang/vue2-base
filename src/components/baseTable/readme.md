### 使用说明

```
import vm from '../../main'

let $vm = null;

// 获取当前调用的组件实例this
const __getNodeVm = (that) =>
  new Promise((resolve, reject) => {
    try {
      $vm = that;
      resolve($vm);
    } catch (error) {
      reject(error);
    }
  });

// 设置权限
import { getRoles } from '@/utils/auth'
// 酒类API
import { delWine } from '@/api/wine'
// 获取Vue实例化DOM方法
const createElement = vm.$createElement
// 获取当前权限角色
const thisRoles = JSON.parse(getRoles()).roles[0]

const columns = [
  {
    align: 'left',
    label: '名称',
    prop: 'name',
    width: '220px',
  },
  {
    align: 'left',
    label: '操作',
    width: '150px',
    hidden: thisRoles !== 'superadmin' ? true : false,
    slot: function (scope) {
      console.log('渲染TABLE dom', this.$parent.status)
      this.$slots.dom = createElement('div', [
        createElement(
          'el-button',
          {
            attrs: {
              size: 'mini',
            },
            on: {
              click: editItem.bind(this, scope),
            },
          },
          '编辑'
        ),
        createElement(
          'el-button',
          {
            attrs: {
              type: 'danger',
              size: 'mini',
            },
            on: {
              click: deleteItem.bind(this, scope),
            },
          },
          '删除'
        ),
      ])
    },
  },
]

// 更新操作
const editItem = function ({ row, $index, column }, ref) {
  // console.log(`当前索引`, $index, `当前行`, row, `所有列`, column, `vue对象`, this)
  // this.$parent是通过this(vue对象树级查看得到)
  this.$parent.dialogTitle = '修改酒类'
  this.$parent.operationType = 'edit'
  this.$parent.$refs.dialog.visible = true
  // 深拷贝防止数据间联动
  this.$parent.form = JSON.parse(JSON.stringify(row))
}

// 删除操作
const deleteItem = async function ({ row, $index }) {
  const result = await this.$confirm('确认要删除这条数据吗?', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '已取消删除',
    })
  })

  try {
    if (result === 'confirm') {
      delWine({
        pk: row.id,
      }).then(res => {
        // 更新table
        const index = this.tableData.findIndex(item => item.id === row.id)
        this.tableData.splice(index, 1)
        // 更新页码

        if (!this.tableData.length) {
          // 当前页没数据时跳回前一页
          --this.page.currentPage
          this.$parent.onPageChange(this.page)
        } else if (--this.page.total > this.tableData.length) {
          // 当前页被删后，如果总条数大于目前展示时，需要再次加载数据
          this.$parent.onPageChange(this.page)
        } else {
          const ceil = Math.ceil(this.page.total / this.page.pageSize)
          this.page.currentPage = ceil
        }
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
      })
    }
  } catch (error) {
    this.$message({
      type: 'info',
      message: error,
    })
  }
}
```

export { $vm, columns, \_\_getNodeVm };
