import React from 'react';
import './index.scss'
import { AppstoreOutlined, } from '@ant-design/icons';
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
      node: this.props.node,
    }
  }
  get style(){
    const {node}  = this.props;
    return {
      top: node.y + 'px',
      left: node.x + 'px',
    }
  }
  onDragStart(e: any){
    console.log('onDragStart:', this.props.node, );
    e.dataTransfer.setData('cmpt-info', JSON.stringify({id: this.props.node.id}));
    e.dataTransfer.setData('offset', JSON.stringify({x: e.nativeEvent.layerX, y:  e.nativeEvent.layerY}));
    e.dataTransfer.setData('mode', 'move');
  }
  onSelect(){
    window.$$task.selectNode(this.props.node.id);
  }
  render(){
    return (
      <div className='node-content' style={this.style}
      onClick={(e) => this.onSelect()}
      draggable="true" 
      onDragStart= {(e) => this.onDragStart(e)}>
        <AppstoreOutlined className="icon" />
        <span>{this.props.node.name}</span>
      </div>
    );
  }
}

export default WidgetList;
