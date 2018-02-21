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
    updating: false,
    backend: CONFIG.backend,
    list: [],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
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
    if(debouncer !== null) clearTimeout(debouncer);
    debouncer = setTimeout(() => {
      this.updateList();
    }, DEBOUNCE_TIMEOUT);
  },
  updateList() {
    // TODO: cancel previous request
    if(this.data.updating) return;
    this.setData({
      updating: true,
    });
    // TODO: unavailable ones
    util.query(true, this.data.searchStr.split(' '), result => {
      this.setData({
        updating: false,
        list: result,
      });
    });
  },
  onLoad() {
    this.updateList();
  },
})
