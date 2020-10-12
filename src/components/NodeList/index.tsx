import React from 'react';
import { connect } from 'react-redux';

import './index.scss'
import { INode, ITask, } from 'src/types/task';
import NodeInfo from  '../NodeInfo';
import {ReduxState} from 'src/store/index'

interface IProps {
  task: ITask,
  nodeList: INode[],
  currentNodeId: number,
  onDoubleClick?: Function,
}
interface IState{
  
}
class NodeList extends React.Component<IProps, IState>{
  constructor(props:IProps){
    super(props)
    this.state = {}
  }
  getClassName(node: INode){
    return this.props.currentNodeId === node.id ? 'is-select' : '';
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
              task={this.props.task} node={node} {...node}
              onDoubleClick={this.props.onDoubleClick}
              key={node.id} />
           )
          })
        }
      </div>
    );
  }
}

// export default NodeList;

const mapStateToProps = (state: ReduxState) => ({
  nodeList: state.indexReducer.nodeList,
  currentNodeId: state.indexReducer.currentNodeId
})

const mapDispatchToProps = ({
  
})

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(NodeList);
