//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js');
const CONFIG= require('../../config.js');

let debouncer = null;
const DEBOUNCE_TIMEOUT = 500; // ms

Page({
  data: {
    searchStr: '',
    searchHasFocus: false,
    updating: true,
    backend: CONFIG.backend,
    list: [],
  },
  //事件处理函数
  gotoDetail: function(id) {
    wx.navigateTo({
      url: `../detail/detail?id=${id}`,
    })
  },
  updateSearch(ev) {
    this.setData({
      searchStr: ev.detail.value,
    });
    this.debounceUpdate();
  },
  searchFocus(ev) {
    this.setData({
      searchHasFocus: true,
    });
  },
  searchBlur(ev) {
    this.setData({
      searchHasFocus: false,
    });
  },
  debounceUpdate() {
    this.setData({
      updating: true,
    });
    if(debouncer !== null) clearTimeout(debouncer);
    debouncer = setTimeout(() => {
      this.updateList();
    }, DEBOUNCE_TIMEOUT);
  },
  updateList() {
    // TODO: cancel previous request
    util.query(true, this.data.searchStr.split(' '), result => {
      this.setData({
        updating: false,
        list: result,
      });
      console.log(this.data.updating);
    });
  },
  onLoad() {
    this.updateList();
  },
})
