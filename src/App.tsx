import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Route, Switch, Redirect, Router} from 'react-router-dom'
import { createHashHistory } from 'history';
import {Layout} from 'antd'
import Home from './pages/smartMarketing';

const { Content } = Layout;


export const hashHistory = createHashHistory({ basename: '/' });

interface IProps {
  // route: string,
  // match: any,
}
interface IState{
  route: string,
}
class App extends React.Component<IProps, IState>{
  constructor(props:IProps){
    super(props)
    this.state = {
      route: window.location.hash.substr(1)
    }
  }
  render(){
    return (
      <Layout className="App">
        {/* <Header className="App-header">
          基于react实现的任务导向流
        </Header> */}
        {/* <Sider className="App-sider">Sider</Sider> */}
        <Content className="App-content">
          <Router history={hashHistory}>
            <Switch>
              <Route path="/home" component={Home}/>
              <Redirect from="/" to="/home" />
              <Route
              render={() => {
                return <div className="container">not found</div>;
              }}
            />
            </Switch>
          </Router>
        </Content>
      </Layout>
    );
  }
}

export default App;
