import 'babel-polyfill'
import dva from 'dva';
import {browserHistory , routerRedux} from 'dva/router'
import './index.css';
import createLoading from 'dva-loading'
import { message ,Modal} from 'antd';


// 1. Initialize
const app = dva({
  history:browserHistory,
  onError(e,dispatch) {
    if(location.href.indexOf('/login') > 0){
      message.warning(e.errorMsg);
      return;
    }

    if(e.errorCode == 'MERCHANT_NO_LOGIN'){
      let end = new Date().getTime();
      let start = JSON.parse(sessionStorage.userInfo).tokenStartTime;
      let overTime = (end-start)/1000/60 - 30;
      let content;
      if(overTime>0){
        content = '您在页面上停留时间过长，请重新登陆';
      }else{
        content = '当前账号已在异地登录，您将被强制退出';
      }
      const modal=Modal.warning({
        title: '警告',
        wrapClassName:"vertical-center-modal",
        content: content,
        okText:'3 秒后自动返回登录页',
        onOk:(e)=> {
          modal.destroy();
          dispatch({'type': 'auth/logout'});
        },
        onCancel:(e)=> {
          modal.destroy();
          dispatch({'type': 'auth/logout'})
        }
      });
      setTimeout(() => {modal.destroy();dispatch({'type': 'auth/logout'});}, 3000);
      return;
    }else if(e.neterror == 'NET_ERROR') {
      Modal.warning({
        title: '警告',
        wrapClassName:"vertical-center-modal",
        content: '系统繁忙，请联系技术支持，值班电话：18321124941',
      });
      return;
    }else if(e.errorMsg) {
      message.warning(e.errorMsg);
      return;
    }else{
      const modal = Modal.warning({
        title: '警告',
        wrapClassName:"vertical-center-modal",
        content: '系统繁忙，请重新登陆',
        okText:'3 秒后自动返回登录页',
        onOk:(e)=> {
          modal.destroy();
          dispatch({'type': 'auth/logout'});
        },
        onCancel:(e)=> {
          modal.destroy();
          dispatch({'type': 'auth/logout'})
        }
      });
      setTimeout(() => {modal.destroy();dispatch({'type': 'auth/logout'});}, 3000);
    }
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/example'));


// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
