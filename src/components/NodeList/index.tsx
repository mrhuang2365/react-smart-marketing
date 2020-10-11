import React from 'react';
import './index.scss'
import { INode, ITask, } from 'src/types/task';
import NodeInfo from  '../NodeInfo';

interface IProps {
  task: ITask,
  nodeList: INode[],
  onLineMove?: Function;
}
interface IState{
  selectId: number,
}
class NodeList extends React.Component<IProps, IState>{
  constructor(props:IProps){
    super(props)
    this.state = {
      selectId: this.props.task.state.selectId,
    }
  }
  getClassName(node: INode){
    return this.state.selectId === node.id ? 'is-select' : '';
  }
  onSelect(node: INode){
    this.props.task.selectNode(node.id);
    this.setState({
      selectId: node.id,
    })
  }
  render(){
    return (
      <div className='nodes-content'>
        { 
          this.props.nodeList.map((node: INode, index) => {
           return (
            <NodeInfo className={this.getClassName(node)} 
              task={this.props.task} node={node} 
              key={index} 
              onLineMove={this.props.onLineMove}
              onSelect={() => this.onSelect(node)}/>
           )
          })
        }
      </div>
    );
  }
}

export default NodeList;
