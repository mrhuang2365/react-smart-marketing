
import React from 'react';
import { AppstoreAddOutlined } from '@ant-design/icons'
import { Input, Button } from 'antd';
import { INode } from 'src/types/task';
import './index.scss'

interface IProps {
  name: string,
  params: any,
  node: INode,
  onCancel: () => void;
  onOk: () => void;
}
interface IState{
  name: string
}

class Cmpt1  extends React.Component<IProps, IState>{
  constructor(props:IProps){
    super(props)
    this.state = {
      name: this.props.node.name
    }
  }
  onChange(e: any){
    this.setState({
      name: e.target.value
    })
  }
  onOk(){
    this.props.node.setName(this.state.name);
    this.props.onOk();
  }
  render(){
    return (
       <div>
         <Input placeholder="请输入节点名称" defaultValue={this.state.name} onChange={this.onChange.bind(this)}></Input>

         <div className="footer-buttons">
            <Button type="dashed" className="footer-btn" onClick={this.props.onCancel}>取消</Button>
            <Button type="primary" className="footer-btn" onClick={this.onOk.bind(this)}>确认</Button>
         </div>
       </div>
    );
  }
}

export default Cmpt1;
