import vue from "vue";
import DialogWrapper from "./dialogWrapper";

// vue.extend扩展实例构造器 (用于创建一个具有初始化选项的Vue子类，实例化时进行扩展选项，最后使用$mount方法绑定在元素上)
// 通俗理解：组件注册底层就是用vue.extend 构造
const CreateDialog = vue.extend({
  data() {
    return {
      options: null,
    };
  },
  render(create) {
    const { options } = this;
    return create(DialogWrapper, {
      props: options,
    });
  },
});

// 初始化弹框
export const initDialog = (options) => {
  // 因为vue export都是已对象形式，所以options通过对象方式传值进入dialog
  const __dialog = new CreateDialog({ data: { options } });
  __dialog.$mount();
  document.body.appendChild(__dialog.$el);

  // 限制最多只能有三个弹框
  if (dialogs.length < 2) {
    dialogs.push(__dialog);
  }
};

/**
 * 常规弹框内组件
 * @param {*} options Dialog的属性
 */
export const showDialog = (options) => {
  const index = dialogs.findIndex((dialog) => !dialog.$children[0].visible);
  // 复用已经关闭的dialog
  if (index !== -1) {
    const dialog = dialogs[index];
    dialog.options = options;
    dialog.$children[0].visible = true;
  }
  // 新增一个dialog
  else {
    initDialog(options);
  }
};

/**
 * 异步加载弹框内组件
 * @param {*} component 组件名称
 * @param {*} dialogOptions Dialog的属性
 * @param {*} attrs 弹框内组件属性
 * @param {*} events 弹框内组件方法
 */
export const showAsyncDialog = (component, dialogOptions, attrs, events) => {
  component().then((node) => {
    dialogOptions.component = create(node.default, { attrs, on: events });
    showDialog(dialogOptions);
  });
};

// 初始化（即创建一个空的Dialog, 定义好vue渲染函数$createElement和全局dialogs变量）
const dialogs = [];
initDialog({ component: {} }, false);
export const create = dialogs[0].$createElement;
window.h = create;
