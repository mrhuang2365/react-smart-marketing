import React from 'react';
import './index.scss'
import { INode, ITask } from 'src/types/task';
import NodeInfo from  '../NodeInfo';

interface IProps {
  task: ITask,
  nodeList: INode[]
}
interface IState{

}
class WidgetList extends React.Component<IProps, IState>{
  constructor(props:IProps){
    super(props)
    this.state = {

    }
  }

  render(){
    return (
      <div className='nodes-content'>
        { 
          this.props.nodeList.map((node: INode, index) => {
           return (
            <NodeInfo node={node} key={index} />
           )
          })
        }
      </div>
    );
  }
}

export default WidgetList;
