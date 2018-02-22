const util = require('../../utils/util.js');
const CONFIG= require('../../config.js');

Page({
  data: {
    entry: null,
    relevant: null,
    loading: true,
    backend: CONFIG.backend,
  },

  onLoad(params) {
    wx.setNavigationBarTitle({ title: '跟服务器打电话中...' })
    util.detail(params.id)
      .then(data => {
        this.setData({
          entry: data
        });
        wx.setNavigationBarTitle({ title: `${data.name} - 信息` })

        const segs = [...data.tags];
        segs.push(data.category);
        return util.query(true, segs);
      })
      .then(data => {
        this.setData({
          relevant: data.filter(e => e.id !== this.data.entry.id),
          loading: false,
        });
      });
  },
  gotoId(ev) {
    wx.redirectTo({
      url: `detail?id=${ev.currentTarget.dataset.id}`,
    })
  },
  gotoTag(ev) {
    const pages = getCurrentPages();
    const parent = pages[pages.length-2];
    parent.setSearch(ev.currentTarget.dataset.tag);
    wx.navigateBack({ delta: 1 });
  },
  gotoCategory(ev) {
    var pages = getCurrentPages();
    const parent = pages[pages.length-2];
    parent.setSearch(ev.currentTarget.dataset.category);
    wx.navigateBack({ delta: 1 });
  },
});
