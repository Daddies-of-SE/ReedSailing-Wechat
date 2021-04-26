const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const debug = str => {
  console.warn("DEBUG INFO: " + str)
}

const err = str => {
  console.err("ERR INFO: " + str)
}

const getTimeMinute = rawTime => {
  return (rawTime.split(":")[0] + ":" + rawTime.split(":")[1]).replace("T", " ")
}

module.exports = {
  err,
  debug,
  formatTime,
  getTimeMinute
}