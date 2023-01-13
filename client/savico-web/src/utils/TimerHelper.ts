/**
 *
 * @param {*} timeStamp
 * DD/MM/YYYY
 */
import moment from 'moment'
import R from './R'

export function convertTimeStampToString(
  timeStamp: string | number | Date | undefined
): string {
  if (!timeStamp) {
    return ''
  }

  var MyDate = new Date(timeStamp)
  return (
    ('0' + MyDate.getDate()).slice(-2) +
    '/' +
    ('0' + (MyDate.getMonth() + 1)).slice(-2) +
    '/' +
    MyDate.getFullYear()
  )
}

export function convertTimeStampSecondToString(timeStamp: number): string {
  var MyDate = new Date(timeStamp * 1000)
  return (
    ('0' + MyDate.getDate()).slice(-2) +
    '/' +
    ('0' + (MyDate.getMonth() + 1)).slice(-2) +
    '/' +
    MyDate.getFullYear()
  )
}

export function convertTimeStampToString2(timeStamp: string | number | Date) {
  var MyDate = new Date(timeStamp)
  return (
    MyDate.getFullYear() +
    '/' +
    ('0' + (MyDate.getMonth() + 1)).slice(-2) +
    '/' +
    ('0' + MyDate.getDate()).slice(-2)
  )
}

export function convertDateTimeToString(timeStamp: string | number | Date) {
  const d = new Date(timeStamp)
  const date =
    ('0' + d.getDate()).slice(-2) +
    '/' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '/' +
    d.getFullYear()
  const time = d.getHours() + ':' + ('0' + d.getMinutes()).slice(-2)
  const year = d.getFullYear()
  return {
    date: date,
    time: time,
    year: year,
    dateTimeStr: `${time} ${date}`,
  }
}

export function convertStringToTimeStamp(date: string) {
  if (!date) return ''
  const arr = date.split('/')
  const newDate = arr[2] + '/' + arr[1] + '/' + arr[0]
  return new Date(newDate).getTime() / 1000
}

export function get_ss_hh_dd_mm(date: string | Date | number) {
  const momentTime = moment(date)
  if (momentTime.format('DD') === moment().format('DD'))
    return momentTime.format('HH:mm') + ' Hôm nay'
  else if (momentTime.format('DD') === moment().subtract(1, 'd').format('DD'))
    return momentTime.format('HH:mm') + ' Hôm qua'
  else if (momentTime.format('YYYY') !== moment().format('YYYY'))
    return momentTime.format('HH:mm DD/MM/YYYY')
  return moment(date).format('HH:mm DD/MM/YYYY')
}
export function getFromDateToNow(date: string | Date | number) {
  return moment(date).fromNow()
}

export function getMinusTime(date: string | number | Date) {
  date = `${date}`
  var date1 = new Date(date).getTime()
  var currentDate = new Date().getTime()
  var difference = Math.abs(date1 - currentDate)
  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24)
  difference -= daysDifference * 1000 * 60 * 60 * 24

  var hoursDifference = Math.floor(difference / 1000 / 60 / 60)
  difference -= hoursDifference * 1000 * 60 * 60

  var minutesDifference = Math.floor(difference / 1000 / 60)
  difference -= minutesDifference * 1000 * 60

  var secondsDifference = Math.floor(difference / 1000)
  // if (daysDifference > 0 && daysDifference < 32)
  //   return `${daysDifference} ${R.strings().time_minus_day_ago}`
  // else if (daysDifference > 31) {
  //   var newDate = new Date(date1)
  //   var year = newDate.getFullYear()
  //   var month = newDate.getMonth() + 1
  //   var day = newDate.getDate()
  //   return `${day}/${month}/${year}`
  // } else if (hoursDifference > 0)
  //   return `${hoursDifference} ${R.strings().time_minus_hour_ago}`
  // else if (minutesDifference)
  //   return `${minutesDifference} ${R.strings().time_minus_minute_ago}`
  // return R.strings().time_minus_just_now
}
