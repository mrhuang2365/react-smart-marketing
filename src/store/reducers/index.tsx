import {INode} from 'src/types/task'
import {GUIDE_LINE_CHANGE, SELECT_LINE_ID, SELECT_NODE_ID, UPDATE_NODE_LIST} from '../actions';

export interface IndexReducerState {
  selectNodeId: number,
  selectLineId: number,
  guideLinePath: {x1:number,x2:number,y1:number, y2: number},
  nodeList: INode[],
}

const initState: IndexReducerState = {
  selectNodeId: 0,
  selectLineId: 0,
  guideLinePath: {x1:0,x2:0,y1:0, y2: 0},
  nodeList: []
}

export const nodeList = (state:INode[] = [], action: any) => {
  switch (action.type) {
    case UPDATE_NODE_LIST:
      return [...action.list];
    default:
      return state;
  }
}
const indexReducer = (state= initState, action: any) => {
  switch (action.type) {
    case GUIDE_LINE_CHANGE:
      return {...state, guideLinePath: action.path};
    case SELECT_LINE_ID: 
      return {...state, selectLineId: action.id};
    case SELECT_NODE_ID: 
      return {...state, selectNodeId: action.id};
    // case UPDATE_NODE_LIST: 
    //   console.log('------------state', action)
    //   return {...state, nodeList: [...action.list]};
    default:
      return state;
  }
}

export default indexReducer