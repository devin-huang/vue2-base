import bus from "@/utils/bus.js";

export default (page) => {
  return {
    ...page,
    created() {
      bus.$on("AlivePage", (args) => {
        // name: 表示组件名称 mode: 表示是否缓存
        const { name, mode } = args;
        // true时添加
        if (mode) {
          !this.keepAliveList.includes(name) && this.keepAliveList.push(name);
        }
        // false时移除
        else {
          this.keepAliveList = this.keepAliveList.filter((v) => v !== name);
        }
      });
      page.created && page.created.call(this);
    },
  };
};
