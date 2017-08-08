import fetch from 'dva/fetch';
import FileSaver from 'file-saver'

/**
 * 检测状态
 * @param response
 * @returns {*}
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  error.neterror='NET_ERROR';
  throw error;
}

/**
 * 获取ResponseBody的json
 * @param response
 * @returns {Promise<any>}
 */
function parseJSON(response) {
  return response.json();
}

/**
 * 获取ResponseBody的字节流
 * @param response
 * @returns {Promise<Blob>|*}
 */
function parseBlob(response) {
  return response.blob();
}

/**
 * 从sessionStorage中获取基本信息
 */
function getBasicInfo(){
  let target={}
  let token = sessionStorage.getItem('token')
  if(token && token !=''){
    Object.assign(target,{token})
  }
  let userInfoStorage = sessionStorage.getItem('userInfo');
  if(userInfoStorage && userInfoStorage !=''){
    let userInfo = JSON.parse(userInfoStorage)
    Object.assign(target,{...userInfo})
  }
  return target
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({data}))
    .catch(err => ({err}));
}

/**
 * 基本GET请求
 *
 * [已成功测试]
 */
export function get(url, params) {
  let totalPrams={}
  Object.assign(totalPrams,getBasicInfo(),params)

  let u = new URLSearchParams();
  Object.keys(totalPrams).forEach(p => {
    u.append(p, totalPrams[p]);
  })

  return fetch(url+'?'+u, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({data}))
    .catch(err => ({err}));
}

/**
 * 基本POST请求
 * 请求的body为json
 * 响应为json
 *
 * [已成功测试]
 */
export function post(url, params) {
  let totalPrams={}
  Object.assign(totalPrams,getBasicInfo(),params)

  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(totalPrams),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({data}))
    .catch(err => ({err}));
}

/**
 * POST请求,模拟提交表单,适用于上传表单或者上传文件
 * 请求的body为FormData, 不设置Content-Type ,fetch会自动补充 ,
 * 响应为json
 *
 * [已成功测试]
 */
export function postForm(url, data) {
  let totalPrams={}
  Object.assign(totalPrams,getBasicInfo())
  Object.keys(totalPrams).forEach(p => {
    data.append(p, totalPrams[p]);
  })

  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
    body: data
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({data}))
    .catch(err => ({err}));
}

/**
 * POST请求
 * 请求的body为json
 * 响应为文件
 *
 */
export function post_DownLoad(url, params, accept, fileName) {
  let perfectParams = {...params, ...getBasicInfo()}
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': accept, //application/pdf
    },
    body: JSON.stringify(perfectParams),
  })
    .then(checkStatus)
    .then((res) => res.blob())
    .then(blob => {
      FileSaver.saveAs(blob, fileName);
    })
    .catch(err => ({err}));
}

/**
 * POST请求,模拟提交表单,适用于上传表单或者上传文件
 * 请求的body为FormData, 不设置Content-Type ,fetch会自动补充 ,
 * 响应为文件
 */
export function postForm_DownLoad(url, data, accept, fileName) {
  let totalPrams={}
  Object.assign(totalPrams,getBasicInfo(),data)

  let u = new URLSearchParams();
  Object.keys(totalPrams).forEach(p => {
    u.append(p, totalPrams[p]);
  })



  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': accept,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: u
  })
    .then(checkStatus)
    .then((res) => res.blob())
    .then(blob => {
      FileSaver.saveAs(blob, fileName);
    })
    .catch(err => ({err}));

}



