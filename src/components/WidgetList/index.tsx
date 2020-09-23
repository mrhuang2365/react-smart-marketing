import React from 'react';
import './index.scss'
import {Layout} from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {widgetList} from '../../widgets'

const { Header, Footer, Sider, Content } = Layout;


interface IProps {
  // route: string,
  // match: any,
}
interface IState{

}
class WidgetList extends React.Component<IProps, IState>{
  constructor(props:IProps){
    super(props)
    this.state = {

    }
  }
  render(){
    return (
      <div className='Widget-list'>
        {
          widgetList.map((item, index) => {
            return (
              <div key={index}>
                <AppstoreOutlined></AppstoreOutlined>
                <span>{item.name}</span>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default WidgetList;
