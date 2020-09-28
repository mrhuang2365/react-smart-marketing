import React, {useState} from 'react';
import './index.scss';
import Task from '../../lib/Task';
import { INode } from 'src/types/task';

import NodeList from '../../components/NodeList'
import DragMenu from '../../components/DragMenu';
import SvgMap from '../../components/SvgMap';


interface IProps {
  
}
interface IState{
  nodeList: INode[]
}
class HomePage extends React.Component<IProps, IState> {
  task: Task;

  constructor(props:IProps) {
    super(props);
    this.task = new Task();
    this.state = {
      nodeList: this.task.getNodeList()
    }
  }
  onDrop(e: any) {
    const data = JSON.parse(e.dataTransfer.getData('cmpt-info') || 'null');
    const offset = JSON.parse(e.dataTransfer.getData('offset') || 'null');
    const mode = e.dataTransfer.getData('mode') || 'add';
    console.log('onDrog, ', e.clientX, e.clientY, mode, data, e.nativeEvent);
    const x = e.clientX;
    const y = e.clientY;
    if (mode === 'add') {
      this.task.newNode(x - 30, y - 30, data);
    } else if (mode === 'move') {
      this.task.setNodePostion(data.id, x - offset.x, y - offset.y)
    }
    this.setState({
      nodeList: this.task.getNodeList()
    })
  }
  ondragover(e: any) {
    e.preventDefault();
  }
  render(){
    return (
      <div className="home-page drag-page-root" onDrop={(e) => this.onDrop(e)} onDragOver={this.ondragover}>
          <DragMenu></DragMenu>
          <NodeList task={this.task} nodeList={this.state.nodeList} />
          <SvgMap task={this.task} nodeList={this.state.nodeList}/>
      </div>
    );
  }

  
}

export default HomePage;
