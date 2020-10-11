import React from 'react';
import { connect } from 'react-redux';

import './index.scss'
import { INode, ITask, } from 'src/types/task';
import NodeInfo from  '../NodeInfo';
import {ReduxState} from 'src/store/index'

interface IProps {
  task: ITask,
  nodeList: INode[],
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
              key={index} />
           )
          })
        }
      </div>
    );
  }
}

// export default NodeList;

const mapStateToProps = (state: ReduxState) => ({
  nodeList: state.nodeList
})

const mapDispatchToProps = ({
  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodeList);
