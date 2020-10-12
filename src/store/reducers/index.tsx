import {INode, ILine} from 'src/types/task'
import * as actionTypes from '../actions';

export interface IndexReducerState {
  currentNodeId: number,
  currentLineId: number,
  guideLinePath: {x1:number,x2:number,y1:number, y2: number},
  nodeList: INode[],
  lineList: ILine[],
}

const initState: IndexReducerState = {
  currentNodeId: 0,
  currentLineId: 0,
  guideLinePath: {x1:0,x2:0,y1:0, y2: 0},
  nodeList: [],
  lineList: [],
}

const indexReducer = (state= initState, action: any) => {
  switch (action.type) {
    case actionTypes.GUIDE_LINE_CHANGE:
      return {...state, guideLinePath: action.path};
    case actionTypes.SELECT_LINE_ID: 
      return {...state, currentLineId: action.id, currentNodeId: 0};
    case actionTypes.SELECT_NODE_ID: 
      return {...state, currentNodeId: action.id, currentLineId: 0};
    case actionTypes.UPDATE_NODE_LIST: 
      return {...state, nodeList: [...action.list]};
    case actionTypes.UPDATE_LINE_LIST: 
      return {...state, lineList: [...action.list]};
    default:
      return state;
  }
}

export default indexReducer