import React from 'react';
import { connect } from 'react-redux';
import './index.scss'
import { ILine, ITask, GuideLinePath } from 'src/types/task';
import {ReduxState} from 'src/store/index'

interface IProps {
  task: ITask,
  lineList: ILine[],
  guideLinePath: GuideLinePath
}
interface IState{
  selectId: number,
}
class SvgMap extends React.Component<IProps, IState>{
  constructor(props:IProps){
    super(props);
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
  getGuideLinePath(_line: GuideLinePath){
    return `M ${_line.x1} ${_line.y1} L ${_line.x2} ${_line.y2}`
  }
  render(){
    return (
     <svg className="svg-content">
        <path className="guideLine" 
        d={this.getGuideLinePath(this.props.guideLinePath)} 
        ></path>
     </svg>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  guideLinePath: state.indexReducer.guideLinePath,
})
 
const mapDispatchToProps = ({
  // guideLineChange: guideLineChange,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SvgMap);
