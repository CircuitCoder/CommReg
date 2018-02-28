const CONFIG = require('../config.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function query(available, tokens, cb) {
  return new Promise((resolve, reject) => {
    const type = available ? 'available' : 'disbanded';
    const tailing = tokens.map(encodeURIComponent).join('+');
    const uri = `${CONFIG.backend}/query/${type}/${tailing}`;
    wx.request({
      url: uri,
      success: res => {
        resolve(res.data);
      },
    });
  });
}

function detail(id) {
  return new Promise((resolve, reject) => {
    const uri = `${CONFIG.backend}/query/fetch/${id}`;
    wx.request({
      url: uri,
      success: res => {
        resolve(res.data);
      },
    });
  });
}

function renderPara(p, images) {
  if(p.indexOf('\n') === -1) {
    if(p.indexOf("# ") === 0)
      return {
        type: 'node',
        name: 'h1',
        attrs: { class: 'desc-title' },
        children: [{ type: 'text', text: p.substr(2) }],
      };
    if (p.match(/^<\d+>$/)) {
      const idStr = p.match(/^<(\d+)>$/)[1];
      const id = parseInt(idStr, 10);
      if (id > images.length || id === 0)
        return { type: 'text', text: '[Deleted Image]' };
      else
        return {
          type: 'node', name: 'img', attrs: {
            src: `${CONFIG.backend}/store/${images[id-1]}`,
            class: 'desc-img'
          }
        };
    }
  }
  const children = p.split('\n')
    .map(e => [{ type: 'text', text: e }, { type: 'node', name: 'br' }])
    .reduce((attr, a) => attr.concat(a), []);
  return {
    type: 'node',
    name: 'div',
    attrs: { class: 'desc-para' },
    children,
  };
}

function render(_d, images) {
  let d = _d;
  while (d.length > 0 && d[0] === '\n') d = d.substr(1);
  while (d.length > 0 && d[d.length - 1] === '\n') d = d.substr(0, d.length - 1);

  return d
    .replace('\n\n\n', '\n\n')
    .split('\n\n')
    .map(e => renderPara(e, images));
}

module.exports = {
  formatTime,
  query,
  detail,
  render,
}
