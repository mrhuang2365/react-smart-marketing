import React from 'react';
import './index.scss'
import { AppstoreOutlined, RightSquareOutlined } from '@ant-design/icons';
import { INode, ITask } from 'src/types/task';

interface IProps {
  node: INode,
  task: ITask,
  className?: string,
  onSelect?:() => void;
}
interface IState{
  node: INode,
  draggable: boolean,
}
class WidgetList extends React.Component<IProps, IState>{
  constructor(props:IProps){
    super(props)
    this.state = {
      node: this.props.node,
      draggable: true
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
  iconDragStart(e:any){
    console.log('iconDragStart:', e.nativeEvent.layerX, e.nativeEvent.layerY, this.props.node, );
    e.preventDefault();
    this.setState({
      draggable: false,
    })
    // document.onmousemove = (ov) => {
    //   console.log('-------', ov.clientX, ov.clientY)
    // }
    // document.onmouseup = () => {
    //   document.onmousemove = null;
    //   document.onmouseup = null;
    // }
  }
  onDrop(e: any) {
    console.log('--------onDrog, ', e.clientX, e.clientY);
    const x = e.clientX;
    const y = e.clientY;
  }
  ondragover(e: any) {
    e.preventDefault();
  }
  
  render(){
    return (
      <div className={`node-content ${this.props.className}`} style={this.style}
      draggable={this.state.draggable} 
      onClick={() => this.props.onSelect && this.props.onSelect()}
      onDragStart= {(e) => this.onDragStart(e)}>
        <AppstoreOutlined className="icon" />
        <RightSquareOutlined className="line-icon" 
            // draggable="true" 
            // onDragStart={(e) => this.iconDragStart(e)} 
            // onDrop={(e) => this.onDrop(e)} 
            // onDragOver={this.ondragover}
            onMouseDown={(e) => this.iconDragStart(e)}
            />
        <div className="node-name">{this.props.node.name}</div>
      </div>
    );
  }
}

export default WidgetList;
