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

function query(available, tokens) {
  const type = available ? 'available' : 'disbanded';
  const tailing = tokens.map(encodeURIComponent).join('+');
  const uri = `${CONFIG.backend}/query/${type}/${tailing}`;
  fetch(uri).then(resp => {
    console.log(resp);
  });;
}

module.exports = {
  formatTime,
  fetch,
}
