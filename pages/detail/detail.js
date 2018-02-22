
const util = require('../../utils/util.js');
const CONFIG= require('../../config.js');

Page({
  data: {
    entry: null,
    relevent: null,
    loading: true,
    backend: CONFIG.backend,
  },

  onLoad(params) {
    util.detail(params.id, resolve)
      .then(data => {
        this.setData({
          entry: data
        });

        const segs = [...data.tags];
        segs.push(data.category);
        return util.query(segs);
      })
      .then(data => {
        this.setData({
          relevent: data,
          loading: false,
        });
      });
  },
});
