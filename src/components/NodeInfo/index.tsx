import React from 'react';
import './index.scss'
import { INode, ITask } from 'src/types/task';

interface IProps {
  node: INode
}
interface IState{
  node: INode
}
class WidgetList extends React.Component<IProps, IState>{
  constructor(props:IProps){
    super(props)
    this.state = {
      node: this.props.node
    }
  }
  get style(){
    const {node}  = this.props;
    return {
      top: node.y + 'px',
      left: node.x + 'px',
    }
  }

  render(){
    return (
      <div className='node-content' style={this.style}>
        <span>{this.props.node.name}</span>
      </div>
    );
  }
}

export default WidgetList;
