import React from 'react';
import { connect } from 'dva';
import styles from './css/IndexPage.css';

import MainLayout from '../components/MainLayout/MainLayout.jsx'
class IndexPage extends React.Component {

  render() {
    return (
      <div>
        <MainLayout {...this.props}/>
      </div>
    );
  }
}


export default connect()(IndexPage);
