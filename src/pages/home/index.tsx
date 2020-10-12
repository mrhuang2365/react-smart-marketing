import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import './index.scss';
import Task,{dragEventMode} from '../../lib/Task';
import { INode, ILine } from 'src/types/task';
import {ReduxState} from 'src/store/index'
import {updateNodeList, guideLineChange, updateLineList} from 'src/store/actions'
import allWidgets from '../../widgets'

import NodeList from '../../components/NodeList'
import DragMenu from '../../components/DragMenu';
import SvgMap from '../../components/SvgMap';

interface IProps {
  updateNodeList: Function,
  guideLineChange: Function
  updateLineList: Function
  currentNodeId: number
  currentLineId: number
}
interface IState{
  show: boolean,
  currentComponentId: string,
  _currentNode: null | INode
}
class HomePage extends React.Component<IProps, IState> {
  task: Task;

  constructor(props:IProps) {
    super(props);
    this.task = new Task();
    this.state = {
      show: false,
      currentComponentId: '',
      _currentNode: null,
    };

    this.initKeyEvent()
  }
  onDrop(e: any) {
    const data = JSON.parse(e.dataTransfer.getData('cmpt-info') || 'null');
    const offset = JSON.parse(e.dataTransfer.getData('offset') || 'null');
    const mode = e.dataTransfer.getData('mode');
    console.log('onDrog, ', e.clientX, e.clientY, mode, data, e.nativeEvent);
    const x = e.clientX;
    const y = e.clientY;
    switch (mode){
      case dragEventMode.add:
        this.task.newNode(x - 30, y - 30, data);
        break;
      case dragEventMode.move:
        this.task.setNodePostion(data.id, x - offset.x, y - offset.y);
        this.props.updateLineList(this.task.getLineList())
        break
      case dragEventMode.line:
        this.props.guideLineChange({x1:0, x2:0, y1:0, y2:0});
        console.log('line')
        break
        default:
          break;
    }
    this.props.updateNodeList([...this.task.getNodeList()])
  }
  ondragover(e: any) {
    e.preventDefault();
  }
  removeNode() {
    this.task.removeNode(this.props.currentNodeId);
    this.props.updateNodeList(this.task.getNodeList());
  }
  removeLine() {
    this.task.removeLineByLineId(this.props.currentLineId);
    this.props.updateLineList(this.task.getLineList());
  }
  initKeyEvent(){
    document.addEventListener('keydown', this.onKeyDownHanlderBind);
  }
  removeKeyEvent(){
    document.removeEventListener('keydown', this.onKeyDownHanlderBind);
  }
  showComponent(node: INode){
    this.setState({
      _currentNode: node,
      currentComponentId: node.getType(),
      show: true
    })
  }
  onKeyDownHanlderBind = this.initKeydownEvent.bind(this)
  // 初始化键盘事件
  initKeydownEvent(ev: any){
    const that = this;
    // 判断事件是否为body
    if (ev.target.nodeName.toLocaleUpperCase() !== 'BODY') {
      return
    }
    // 46:delete 键 8：backspace键
    if ((ev.keyCode === 46) || (ev.keyCode === 8)) {
      if (that.props.currentNodeId) {
        that.removeNode();
      } else if (that.props.currentLineId) {
        that.removeLine();
      } else {

      }
    }
  }
  componentWillUnmount(){
    this.removeKeyEvent();
  }
  getEditComponentRender(){
    const { currentComponentId} = this.state;
    let EditComponent = allWidgets[currentComponentId] && allWidgets[currentComponentId].component;
    return <EditComponent node={this.state._currentNode}/>
  }
  onEditComponentCancel(){
    this.setState({
      show: false,
      _currentNode: null,
    })
  }
  render(){
    return (
      <div className="home-page drag-page-root" onDrop={(e) => this.onDrop(e)} onDragOver={this.ondragover}>
          <DragMenu />
          <NodeList task={this.task} onDoubleClick={this.showComponent.bind(this)}/>
          <SvgMap task={this.task} />
          <Modal visible={this.state.show}
             title={`组件编辑 (${this.state._currentNode?.id})`}
             onOk={() => this.onEditComponentCancel()}
             onCancel={() => this.onEditComponentCancel()}>
            {
              this.state.show && this.state._currentNode ?
              this.getEditComponentRender() : ''
            }
          </Modal>
      </div>
    );
  }

  
}

const mapStateToProps = (state: ReduxState) => ({
  currentNodeId: state.indexReducer.currentNodeId,
  currentLineId: state.indexReducer.currentLineId,
})

const mapDispatchToProps = ({
  updateNodeList,
  guideLineChange,
  updateLineList
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
