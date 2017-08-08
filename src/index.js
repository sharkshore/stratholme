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
