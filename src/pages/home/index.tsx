import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import Task,{dragEventMode} from '../../lib/Task';
import { INode, ILine } from 'src/types/task';
import {ReduxState} from 'src/store/index'
import {updateNodeList} from 'src/store/actions'

import NodeList from '../../components/NodeList'
import DragMenu from '../../components/DragMenu';
import SvgMap from '../../components/SvgMap';

interface IProps {
  updateNodeList: Function
}
interface IState{
  nodeList: INode[],
  lineList: ILine[],
}
class HomePage extends React.Component<IProps, IState> {
  task: Task;

  constructor(props:IProps) {
    super(props);
    this.task = new Task();
    this.state = {
      nodeList: this.task.getNodeList(),
      lineList: this.task.getLineList(),
    }
  }
  onDrop(e: any) {
    const data = JSON.parse(e.dataTransfer.getData('cmpt-info') || 'null');
    const offset = JSON.parse(e.dataTransfer.getData('offset') || 'null');
    const mode = e.dataTransfer.getData('mode');
    console.log('onDrog, ', e.clientX, e.clientY, mode, data, e.nativeEvent);
    const x = e.clientX;
    const y = e.clientY;
    switch (mode){
      case dragEventMode.add:
        this.task.newNode(x - 30, y - 30, data);
        break;
      case dragEventMode.move:
        this.task.setNodePostion(data.id, x - offset.x, y - offset.y);
        break
      case dragEventMode.line:
        console.log('line')
        break
        default:
          break;
    }
    // this.setState({
    //   nodeList: [...this.task.getNodeList()]
    // })
    this.props.updateNodeList(this.task.getNodeList())
  }
  ondragover(e: any) {
    e.preventDefault();
  }
  render(){
    return (
      <div className="home-page drag-page-root" onDrop={(e) => this.onDrop(e)} onDragOver={this.ondragover}>
          <DragMenu />
          <NodeList 
              task={this.task} 
              // nodeList={this.state.nodeList}
               />
          <SvgMap task={this.task} lineList={this.state.lineList} />
      </div>
    );
  }

  
}

const mapStateToProps = (state: ReduxState) => ({
  
})

const mapDispatchToProps = ({
  updateNodeList: updateNodeList,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
