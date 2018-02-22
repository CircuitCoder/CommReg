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
  gotoTag(ev) {
    wx.navigateTo({
      url: `../index/index?str=${ev.currentTarget.dataset.tag}`,
    })
  },
  gotoCategory() {
    wx.navigateTo({
      url: `../index/index?str=${this.data.entry.category}`,
    })
  },
});
