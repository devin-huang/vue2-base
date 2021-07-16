/**
 * 异步加载组件，可对dialog属性进行修改，也可对子组件属性/方法进行增加/绑定
 */
import { showAsyncDialog } from "./index";

// 定义异步组件 ( import返回一个promise对象 )
const AsyncDemo = () => import("./asyncDemo");

export function asyncDemoCom(item, closeCallback) {
  // 组件必须大驼峰写法，否则引入失败
  showAsyncDialog(
    AsyncDemo,
    { title: "Component Async", width: "450px", top: "50px" },
    { item: item },
    { close: closeCallback }
  );
}
