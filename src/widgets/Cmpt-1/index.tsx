import React from 'react';
import {MenuOutlined} from '@ant-design/icons'
import { Input } from 'antd';

export const options = {
  id: 'cmpt-1',
  name: '组件一',
  icon: <MenuOutlined />,
}

interface IProps {
  name: string
}
interface IState{
  name: string
}

class Cmpt1  extends React.Component<IProps, IState>{
  constructor(props:IProps){
    super(props)
    this.state = {
      name: this.props.name
    }
  }
  render(){
    return (
       <div>
         <Input placeholder="请输入节点名称">

         </Input>

       </div>
    );
  }
}

export default Cmpt1;
