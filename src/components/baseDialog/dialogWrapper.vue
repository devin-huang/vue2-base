<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :title="title"
      :width="width"
      :top="top"
      :close-on-click-modal="closeOnClickModal"
      :show-close="showClose"
      :before-close="close"
      :modal="modal"
      :fullscreen="fullscreen"
      :center="center"
      :custom-class="customClass"
      :close-on-press-escape="closeOnPpressEscape"
      :lock-scroll="lockScroll"
    >
      <component :is="__component" />
    </el-dialog>
  </div>
</template>

<script>
import { Dialog } from "element-ui";
export default {
  name: "dialogWrapper",
  components: {
    [Dialog.name]: Dialog,
  },
  props: {
    title: {
      type: String,
    },
    width: {
      type: String,
      default: "50%",
    },

    fullscreen: {
      type: Boolean,
      default: false,
    },

    top: {
      type: String,
      default: "15vh",
    },

    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },

    customClass: {
      type: String,
    },
    modal: {
      type: Boolean,
      default: true,
    },

    beforeClose: {
      type: Function,
    },

    lockScroll: {
      type: Boolean,
      default: false,
    },

    closeOnPpressEscape: {
      type: Boolean,
      default: true,
    },
    // 提交后是否关闭dialog
    closeAfterSubmit: {
      type: Boolean,
      default: true,
    },

    center: {
      type: Boolean,
      default: false,
    },

    component: {
      required: true,
    },
  },
  data() {
    return {
      visible: !!this.title,
    };
  },
  computed: {
    __component() {
      const that = this;
      return {
        name: "dialog-slot-content",
        render() {
          const vNode = that.component;
          // 关闭弹框前回调处理
          if (that.closeAfterSubmit) {
            if (!vNode.componentOptions) return false;

            // 弹框内得常规组件或者异步组件触发submit或close自定义事件时关闭弹框
            let listeners = vNode.componentOptions.listeners || {};
            const submitEvent = listeners.submit;
            // 异步加载组件是否有提交事件
            if (submitEvent) {
              // 定义Dialog嵌套得组件submit事件
              listeners.submit = async function (...args) {
                // 提交后控制是否关闭弹框，在普通函数与Promise最后return false
                const handleSubmitEvent = submitEvent(...args);
                if (handleSubmitEvent.then) {
                  const response = await handleSubmitEvent;
                  // 阻止弹框在Promise隐藏
                  if (response === false) {
                    return false;
                  }
                } else {
                  // 阻止弹框在普通函数隐藏
                  if (handleSubmitEvent === false) {
                    return false;
                  }
                }

                that.handleComponentSubmit(...args);
              };
            } else {
              listeners.submit = function (...args) {
                that.handleComponentSubmit(...args);
              };
            }
            const cancelEvent = listeners.close;
            // 异步加载组件是否有取消事件
            if (cancelEvent) {
              // 定义Dialog嵌套得组件close事件
              listeners.close = function (...args) {
                cancelEvent(...args);
                that.close();
              };
            } else {
              listeners.close = function (...args) {
                console.log(args);
                that.close();
              };
            }
            vNode.componentOptions.listeners = listeners;
          }
          return vNode;
        },
      };
    },
  },
  methods: {
    // 自定义关闭之前或之后的钩子处理
    handleComponentSubmit() {
      if (this.closeAfterSubmit) this.close();
    },
    close(done) {
      if (this.beforeClose) this.beforeClose();
      if (done) {
        done();
      } else {
        this.visible = false;
      }
    },
    show() {
      this.visible = true;
    },
  },
};
</script>

<style></style>
