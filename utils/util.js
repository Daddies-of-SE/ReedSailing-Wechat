
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')}T${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const debug = str => {
    if (false) {
        console.warn("DEBUG INFO: " + str)
    }
}

const err = str => {
    console.err("ERR INFO: " + str)
}

const getTimeMinute = rawTime => {
  return (rawTime.split(":")[0] + ":" + rawTime.split(":")[1]).replace("T", " ")
}

const getRelativeTime = time => {
    time = time.replace("T", " ").split(".")[0]
    // dateStr = 2018-09-06 18:47:00" 测试时间、
    var dateStr = new Date(time.replace(new RegExp('-','g'), '/')).getTime();
    var publishTime = dateStr / 1000,  //获取dataStr的秒数
        date = new Date(publishTime * 1000), //获取dateStr的标准格式 
        // 获取date 中的 年 月 日 时 分 秒
        Y = date.getFullYear(),
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
        // 对 月 日 时 分 秒 小于10时, 加0显示 例如: 09-09 09:01
        if (M < 10) {
            M = '0' + M;
        }
        if (D < 10) {
            D = '0' + D;
        }
        if (H < 10) {
            H = '0' + H;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
    var nowTimeDate = new Date()
    var nowYear = nowTimeDate.getFullYear()
    var nowTime = nowTimeDate.getTime() / 1000, //获取此时此刻日期的秒数
        diffValue = nowTime - publishTime,  // 获取此时 秒数 与 要处理的日期秒数 之间的差值
        diff_days = parseInt(diffValue / 86400),    // 一天86400秒 获取相差的天数 取整
        diff_hours = parseInt(diffValue / 3600),    // 一时3600秒
        diff_minutes = parseInt(diffValue / 60),
        diff_secodes = parseInt(diffValue);

        if (diff_days > 0 && diff_days < 3) {  //相差天数 0 < diff_days < 3 时, 直接返出
            return diff_days + "天前";
        } else if (diff_days <= 0 && diff_hours > 0) {
            return diff_hours + "小时前";
        } else if (diff_hours <= 0 && diff_minutes > 0) {
            return diff_minutes + "分钟前";
        } else if (diff_secodes < 60) {
            if (diff_secodes <= 0) {
                return "刚刚";
            } else {
                return diff_secodes + "秒前";
            }
        } else if (diff_days >= 3 && Y == nowYear) {
            return M + '-' + D + ' ' + H + ':' + m;
        } else if (Y != nowYear) {
            return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
        }
}

const replaceAll = (str, from, to) => {
    return str.replace(new RegExp(from,"gm"),to);
}

const compare = (property) => {
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}

const throttle = (fn, delay) => {
    var previous = 0;
    // 使用闭包返回一个函数并且用到闭包函数外面的变量previous
    return function() {
        var now = new Date();
        if(now - previous > delay) {
            fn.apply(this, arguments);
            previous = now;
        }
    }
}

module.exports = {
  err,
  debug,
  formatTime,
  getTimeMinute,
  getRelativeTime,
  replaceAll,
  compare,
  throttle
}