let $vm = null;

// 获取当前调用的组件实例this
const getNodeVm = (that) =>
  new Promise((resolve, reject) => {
    try {
      $vm = that;
      resolve($vm);
    } catch (error) {
      reject(error);
    }
  });

export { getNodeVm, $vm };
