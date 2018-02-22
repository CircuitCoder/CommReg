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
    avail: true,
    filterShown: false,
  },
  //事件处理函数
  gotoDetail(id) {
    wx.navigateTo({
      url: `../detail/detail?id=${id}`,
    })
  },
  entryTap(ev) {
    this.gotoDetail(ev.currentTarget.dataset.id);
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
    this.setData({
      updating: true,
    });
    util.query(this.data.avail, this.data.searchStr.split(' ')).then(result => {
      this.setData({
        updating: false,
        list: result,
      });
    });
  },
  onLoad(query) {
    if(query.str)
      this.setSearch(query.str);
    else
      this.updateList();
  },
  setSearch(str) {
    this.setData({ searchStr: str });
    this.updateList();
  },

  toggleFilter() {
    this.setData({
      filterShown: !this.data.filterShown,
    });
  },

  filterAvail() {
    this.setData({
      avail: true,
      filterShown: false,
    });
    this.updateList();
  },

  filterDisbd() {
    console.log("HA");
    this.setData({
      avail: false,
      filterShown: false,
    });
    this.updateList();
  },
})
