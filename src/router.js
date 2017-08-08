import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';


//示例
import Example from './routes/Example'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} >
        <Route path="example" component={Example} />
      </Route>
      <Route path="login" component={Example} />

    </Router>
  );
}

export default RouterConfig;
