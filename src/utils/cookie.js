/**
 * 设置cookie
 */
export const setCookie = (name, value) => {
  let exp = new Date();
  exp.setTime(exp.getTime() + 24*30*60*60*1000);
  document.cookie = name + '=' + value + ';expires=' + exp.toGMTString() +";path=/";
};

/**
 * 获取cookie
 */
export const getCookie = (name) => {
  let arr = document.cookie.split('; ');
  for(var i = 0; i < arr.length; i++){
    let item = arr[i].split('=');
    if(item[0] == name){
      return item[1];
    }
  }
};

/**
 * 删除cookie
 */
export const removeCookie = (name) => {
  setCookie(name, '', -1);
};


