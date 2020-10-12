import React from 'react';
import { connect } from 'react-redux';
import './index.scss'
import { ILine, ITask, GuideLinePath } from 'src/types/task';
import {selectLine} from 'src/store/actions'
import {ReduxState} from 'src/store/index'

interface IProps {
  task: ITask,
  lineList: ILine[],
  guideLinePath: GuideLinePath,
  currentLineId: number,
  selectLine: Function
}
interface IState{
  
}
class SvgMap extends React.Component<IProps, IState>{
  constructor(props:IProps){
    super(props);
    this.state = {
      
    }
  }
  onSelect(line: ILine){
    this.props.selectLine(line.id)
  }
  getGuideLinePath(_line: GuideLinePath){
    return `M ${_line.x1} ${_line.y1} L ${_line.x2} ${_line.y2}`
  }
  render(){
    return (
     <svg className="svg-content">
       {
          this.props.lineList.map((line: ILine, index) => {
           return (
            <g key={index}  onClick={() =>  this.onSelect(line)}>
              <path 
                  stroke="#868686"
                  fill="none" 
                  pointerEvents="visibleStroke" 
                  className={`line ${this.props.currentLineId === line.id ? 'selected' : ''}`}
                  d={line.pathList.d0}></path>
              <path 
                  stroke="#868686"
                  strokeOpacity="1" fill="#868686"
                  pointerEvents="visibleStroke" 
                  fillOpacity="1" 
                  className={`line ${this.props.currentLineId === line.id ? 'selected' : ''}`}
                  style={{strokeWidth:0.8}}
                  d={line.pathList.d1}></path>
            </g>
           )
          })
        }
        <path className="guideLine" 
        d={this.getGuideLinePath(this.props.guideLinePath)} 
        ></path>
     </svg>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  guideLinePath: state.indexReducer.guideLinePath,
  lineList: state.indexReducer.lineList,
  currentLineId: state.indexReducer.currentLineId
})
 
const mapDispatchToProps = ({
  selectLine,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SvgMap);
