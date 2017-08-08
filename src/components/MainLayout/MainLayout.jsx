//简单react组件
import React from 'react';
import {Layout} from 'antd';
const {Header, Footer, Sider, Content} = Layout;

import HeaderBar from './HeaderBar.jsx'
import SideBar from './SideBar.jsx'


/**
 * 简单react组件
 */
export default class MainLayout extends React.Component {

  render() {
    return (
      <div>
        <Layout>
          <Header>
            <HeaderBar/>
          </Header>
          <Layout>
            <Sider>
              <SideBar/>
            </Sider>
            <Content>{this.props.children}</Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    );
  }
}
