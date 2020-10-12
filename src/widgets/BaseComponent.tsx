import React from 'react';
import { Input } from 'antd';

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
