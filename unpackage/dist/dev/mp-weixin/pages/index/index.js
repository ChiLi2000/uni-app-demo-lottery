"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  emits: ["update"],
  setup(__props, { emit }) {
    const count = common_vendor.ref(0);
    const handleClick = () => {
      emit("update", ++count.value);
    };
    return (_ctx, _cache) => {
      return {
        a: count.value,
        b: common_vendor.o(($event) => count.value = $event.detail.value),
        c: common_vendor.o(handleClick)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/chilisweet/Documents/HBuilderProjects/app-1/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
