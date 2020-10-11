import React from 'react';
import './index.scss'
import { AppstoreOutlined, RightSquareOutlined } from '@ant-design/icons';
import { INode, ITask } from 'src/types/task';
import {dragEventMode} from '../../lib/Task'

interface IProps {
  node: INode,
  task: ITask,
  className?: string,
  onSelect?:() => void;
  onLineMove?: Function;
}
interface IState{
  node: INode,
  draggable: boolean,
}
class NodeInfo extends React.Component<IProps, IState>{
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
    e.dataTransfer.setData('mode', dragEventMode.move);
  }
  onIconDragStart(e:any){
    console.log('Icon, onIconDragStart');
    e.dataTransfer.setData('cmpt-info', JSON.stringify({id: this.props.node.id}));
    e.dataTransfer.setData('mode', dragEventMode.line);
    this.props.task.setState(
      'guideLinePath', {
        x1: e.clientX, 
        y1: e.clientY,
        x2: 0,
        y2: 0,
      })
    e.stopPropagation();
  }
  onDrop(e:any){
    const data = JSON.parse(e.dataTransfer.getData('cmpt-info') || 'null');
    const mode = e.dataTransfer.getData('mode');
    console.log('Icon, onDrop:',data, mode, this.props.node.id);
    if (mode === dragEventMode.line) {
     
    }
    e.stopPropagation();
  }
  onIconDrag(e:any){
    console.log('Icon, onIconDrag:', e.clientX, e.clientY);
    const {x1, y1} = this.props.task.getState('guideLinePath');
    const value =  {
      x1, y1,
      x2: e.clientX,
      y2: e.clientY,
    };
    this.props.task.setState( 'guideLinePath', value );
    this.props.onLineMove && this.props.onLineMove(value);
  }
  stopPropagation(e:any){
    e.preventDefault();
    e.stopPropagation();
    if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
      e.nativeEvent.stopImmediatePropagation();
    }
  }
  render(){
    return (
      <div className={`node-content ${this.props.className}`} style={this.style}
      draggable={this.state.draggable} 
      onClick={() => this.props.onSelect && this.props.onSelect()}
      onDragStart= {(e) => this.onDragStart(e)}>
        <AppstoreOutlined className="icon" />
        <RightSquareOutlined className="line-icon"
            draggable={true} 
            onDragStart = {(e) => this.onIconDragStart(e)}
            onDrag = {(e) => this.onIconDrag(e)}
            onDrop = {(e) => this.onDrop(e)}
            />
        <div className="node-name">{this.props.node.name}</div>
      </div>
    );
  }
}

export default NodeInfo;
