import React from 'react';
import './index.scss'
import { ILine, ITask, } from 'src/types/task';

interface IProps {
  task: ITask,
  lineList: ILine[],
  guidePath?: string
}
interface IState{
  selectId: number,
}
class SvgMap extends React.Component<IProps, IState>{
  constructor(props:IProps){
    super(props)
    this.state = {
      selectId: this.props.task.state.selectId,
    }
  }
  getClassName(line: ILine){
    return this.state.selectId === line.id ? 'is-select' : '';
  }
  onSelect(line: ILine){
    // this.props.task.selectNode(node.id);
    this.setState({
      selectId: line.id,
    })
  }
  render(){
    return (
     <svg className="svg-content">
        <path className="guideLine" 
        d={this.props.guidePath} ></path>
     </svg>
    );
  }
}

export default SvgMap;
