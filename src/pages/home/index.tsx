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
    console.log('onDrog, ', e.clientX, e.clientY, data);
    this.task.newNode(e.clientX,  e.clientY, data);
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
          <NodeList task={this.task} nodeList={this.state.nodeList}/>
      </div>
    );
  }

  
}

export default HomePage;
