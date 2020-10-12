import {GuideLinePath, INode} from 'src/types/task'

export const SELECT_NODE_ID = 'SELECT_NODE_ID';
export const UPDATE_NODE_LIST = 'UPDATE_NODE_LIST';
export const UPDATE_LINE_LIST = 'UPDATE_LINE_LIST';

export const ADD_LINE = 'ADD_LINE';
export const REMOVE_LINE = 'REMOVE_LINE';
export const SELECT_LINE_ID = 'SELECT_LINE_ID';
export const UPDATE_LINE = 'UPDATE_LINE';
export const LINES_CHANGE = 'LINES_CHANGE';

// guideLine
export const GUIDE_LINE_CHANGE = 'GUIDE_LINE_CHANGE';


export function guideLineChange(path: GuideLinePath) {
  return {
    type: GUIDE_LINE_CHANGE,
    path
  };
}
export function selectLine(id: number) {
  return {
    type: SELECT_LINE_ID,
    id
  };
}
export function selectNode(id: number) {
  return {
    type: SELECT_NODE_ID,
    id
  };
}
export function updateNodeList(list: INode[]) {
  return {
    type: UPDATE_NODE_LIST,
    list,
  };
}
export function updateLineList(list: INode[]) {
  return {
    type: UPDATE_LINE_LIST,
    list,
  };
}