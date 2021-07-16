const createElement = window.$h;
// import { getRoles } from "@/utils/auth";
// import { delDeclare } from "@/api/declare";
// const thisRole = JSON.parse(getRoles()).roles[0];

export const columns = [
  {
    align: "left",
    label: "申报单号",
    showPop: true,
    prop: "application_no",
  },
  {
    align: "left",
    label: "申报类型",
    isSelf: true,
    prop: "application_type",
    slot: function () {
      this.$slots.dom = createElement("elButton", {}, "121212");
    },
  },
  // {
  //   align: "left",
  //   label: "申报人",
  //   prop: "name",
  // },
  // {
  //   align: "left",
  //   label: "所属分区",
  //   prop: "province_name",
  // },
  // {
  //   align: 'left',
  //   label: '申报时间',
  //   prop: 'create_on',
  // },
  // {
  //   align: "left",
  //   label: "活动时间",
  //   prop: "activity_time",
  // },
  // {
  //   align: "left",
  //   label: "电话号码",
  //   prop: "phone",
  // },
  // {
  //   align: "left",
  //   label: "申报状态",
  //   width: 200,
  //   isSatus: true,
  //   prop: "state_en",
  //   slot: function (scope) {
  //     console.log(scope);
  //     console.log(this.$slots, "this.$slots");
  //   },
  // },
  // {
  //   // 添加积分列
  //   align: "center",
  //   label: "积分",
  //   prop: "point",
  //   width: 100,
  // },
  // {
  //   align: "left",
  //   label: "操作",
  //   width: 170,
  // hidden: thisRole === "teacher" ? true : false,
  // slot: function (scope) {
  //   console.log(this);
  //   this.$slots.dom = createElement("div", [
  //     createElement(
  //       "el-button",
  //       {
  //         attrs: {
  //           size: "mini",
  //           disabled: this.$parent.status ? true : false,
  //         },
  //         on: {
  //           click: viewDetail.bind(this, scope),
  //         },
  //       },
  //       "查看详情"
  //     ),
  //     createElement(
  //       "el-button",
  //       {
  //         attrs: {
  //           type: "danger",
  //           size: "mini",
  //           disabled: this.$parent.status ? true : false,
  //         },
  //         on: {
  //           click: deleteItem.bind(this, scope),
  //         },
  //       },
  //       "删除"
  //     ),
  //   ]);
  // },
  // },
];

// 更新操作
// const viewDetail = function ({ row, $index, column }, ref) {
//   console.log(row, $index, column, ref);
//   //   if (row.application_type === "小品会") {
//   //     this.$router.push({
//   //       name: "essayDeclareDetails",
//   //       query: {
//   //         id: row.id,
//   //         canStep: row.do_step,
//   //         transfer: row.transfer,
//   //         type: row.application_type,
//   //       },
//   //     });
//   //   } else if (row.application_type === "培训会") {
//   //     this.$router.push({
//   //       name: "trainingDeclareDetails",
//   //       query: {
//   //         id: row.id,
//   //         canStep: row.do_step,
//   //         transfer: row.transfer,
//   //         type: row.application_type,
//   //       },
//   //     });
//   //   } else if (row.application_type === "互动群活动") {
//   //     this.$router.push({
//   //       name: "groupDetail",
//   //       query: {
//   //         id: row.id,
//   //         canStep: row.do_step,
//   //         transfer: row.transfer,
//   //         type: row.application_type,
//   //       },
//   //     });
//   //   }
// };

// 删除操作
// const deleteItem = async function ({ row, $index }) {
//   console.log(row, $index);
//   //   const result = await this.$confirm("确认要删除这条数据吗?", "", {
//   //     confirmButtonText: "确定",
//   //     cancelButtonText: "取消",
//   //     type: "warning",
//   //   }).catch(() => {
//   //     this.$message({
//   //       type: "info",
//   //       message: "已取消删除",
//   //     });
//   //   });
//   //   try {
//   //     if (result === "confirm") {
//   //       delDeclare({
//   //         id: row.id,
//   //       }).then((res) => {
//   //         console.log(res);
//   //         // 更新table
//   //         const { pageSize, total } = this.page;
//   //         const index = this.tableData.findIndex((item) => item.id === row.id);
//   //         this.tableData.splice(index, 1);
//   //         // 更新页码
//   //         if (!this.tableData.length) {
//   //           // 当前页没数据时跳回前一页
//   //           --this.page.currentPage;
//   //           this.$parent.getListByDeclare();
//   //         } else if (--this.page.total > this.tableData.length) {
//   //           // 当前页被删后，如果总条数大于目前展示时，需要再次加载数据
//   //           this.$parent.getListByDeclare();
//   //         } else {
//   //           const ceil = Math.ceil(total / pageSize);
//   //           this.page.currentPage = ceil;
//   //         }
//   //         this.$message({
//   //           type: "success",
//   //           message: "删除成功!",
//   //         });
//   //       });
//   //     }
//   //   } catch (error) {
//   //     this.$message({
//   //       type: "info",
//   //       message: "已取消删除",
//   //     });
//   //   }
// };
