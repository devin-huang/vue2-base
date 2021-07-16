import bus from "@/utils/bus.js";

export default (page) => {
  // 初始化页面名称
  const baseMethods = {
    // 添加方法插入到methods内供以下生命周期使用，该方法为添加需要缓存的组件
    __changeAlivePage(mode) {
      if (!page.keepAlive) {
        return;
      }
      bus.$emit("AlivePage", { name: page.name, mode });
    },
  };

  const payload = {
    ...page,
    mounted() {
      this.__changeAlivePage(true);
      // 执行组件的生命周期mounted
      page.mounted && page.mounted.call(this);
    },
    activated() {
      this.__changeAlivePage(true);
      page.activated && page.activated.call(this);
    },
    beforeRouteEnter(to, from, next) {
      if (page.beforeRouteEnter) {
        page.beforeRouteEnter.call(this, to, from, next);
      } else {
        next((weakThis) => {
          weakThis.__changeAlivePage(true);
        });
      }
    },
    beforeRouteLeave(to, from, next) {
      if (page.beforeRouteLeave) {
        page.beforeRouteLeave.call(this, to, from, next);
      } else {
        next();
      }
    },
    methods: {
      ...page.methods,
      ...baseMethods,
    },
  };

  return payload;
};
