// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}




/**
 * 时间===>年月日的字符串格式,2017-03-08
 */
export const dateToString = (date) => {
    const year = date.getFullYear();
    let month = parseInt(date.getMonth()) + 1;
    let day = date.getDate();
    //将2017-3-27  ===> 2017-03-27
    if(month<10)month='0'+month;
    if(day<10)day='0'+day;
    return `${year}-${month}-${day}`;
};


/**
 * 时间戳===>年月日的字符串格式,2017-07-23 20:27:20
 */
export const timeStampToDateTimeString = (timestamp) => {
  const date = new Date(parseInt(timestamp) * 1);
  const year = date.getFullYear();
  let month = parseInt(date.getMonth()) + 1;
  let day = date.getDate();
  let hour =date.getHours();
  let minute=date.getMinutes();
  let second=date.getSeconds()
  if(month<10)month='0'+month;
  if(day<10)day='0'+day;
  if(hour<10)hour='0'+hour;
  if(minute<10)minute='0'+minute;
  if(second<10)second='0'+second;
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

/**
 * 时间戳===>年月日的字符串格式,2017-03-08
 */
export const timeStampToString = (timestamp) => {
    const date = new Date(parseInt(timestamp) * 1000);
    const year = date.getFullYear();
    let month = parseInt(date.getMonth()) + 1;
    let day = date.getDate();
    if(month<10)month='0'+month;
    if(day<10)day='0'+day;
    return `${year}-${month}-${day}`;
};

/**
 *  昨天的日期字符串,格式:2017-03-28
 */
export const getLastDayStr=()=>{
    var day1 = new Date();
    day1.setTime(day1.getTime()-24*60*60*1000);
    var year=day1.getFullYear();
    var month=parseInt(day1.getMonth())+1;
    var day=day1.getDate();
    if(month<10)month='0'+month;
    if(day<10)day='0'+day;
    return year+"-"+month+"-"+day;
}

/**
 * 获取30天以前的时间
 * @param date
 * @returns {Date}
 */
export const getLastMonth=(date)=>{
    let day=new Date();
    day.setTime(day.getTime()-24*60*60*1000*30);
    return day;
}



export const  showUserDate=(minute)=> {
    if(!minute) {
        return '/'
    }
    if(minute<60){
        return minute+'分钟'
    }else{
        let h=Math.round(minute/60);
        let m=minute%60;
        if(m==0)return h + '小时';
        return h + '小时' + m + '分钟';
    }

}
