import React from 'react';
import {PlayCircleOutlined} from '@ant-design/icons'
import { Input } from 'antd';
import {WidgetOptions} from 'src/types/task'

export const options: WidgetOptions = {
  id: 'cmpt-start',
  name: '开始',
  icon: <PlayCircleOutlined className="icon"/>,
  isSystem: true,   // 是否系统节点
  max: 1,   // 能存在的个数
  defaultParams:{}
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
