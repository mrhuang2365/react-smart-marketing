import React, {useState} from 'react';
import './index.scss';
import DragMenu from '../../components/DragMenu';
import Task from '../../lib/Task';
import NodeList from '../../components/NodeList'
import { INode } from 'src/types/task';

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
      </div>
    );
  }

  
}

export default HomePage;
