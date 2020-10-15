import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Select, Input, message} from 'antd';

import './index.scss';
import Task,{dragEventMode} from './lib/Task';
import { INode } from 'src/types/task';
import {ReduxState} from 'src/store/index'
import {updateNodeList, guideLineChange, updateLineList} from 'src/store/actions'
import allWidgets from './widgets'

import NodeList from './components/NodeList'
import DragMenu from './components/DragMenu';
import SvgMap from './components/SvgMap';

import {templateList, saveLocalJson} from './template/index'

const { Option } = Select;

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
  _currentNode: null | INode,
  templateName: string,
  defaultTaskName: string,
}
class HomePage extends React.Component<IProps, IState> {
  task: Task = new Task();

  constructor(props:IProps) {
    super(props);
    const name = templateList[0].name;
    this.state = {
      show: false,
      currentComponentId: '',
      _currentNode: null,
      templateName: name ,
      defaultTaskName: name
    };

    this.initTask(templateList[0].json);
    this.initKeyEvent()
  }
  initTask(templateJson?:any){
    this.task = new Task(templateJson);
    this.props.updateLineList(this.task.getLineList());
    this.props.updateNodeList(this.task.getNodeList());
  }

  newNode(x:number, y: number, widget:any) {
    this.task.newNode({ x, y , widget, id: 0});
  } 
  
  moveNode(id:number, x: number, y: number) {
    this.task.setNodePostion(id, x, y);
    this.props.updateLineList(this.task.getLineList());
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
        this.newNode(x - 30, y - 30, data);
        break;
      case dragEventMode.move:
        this.moveNode(data.id, x - offset.x, y - offset.y);
        break
      case dragEventMode.line:
        this.props.guideLineChange({x1:0, x2:0, y1:0, y2:0});
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
    const id = this.props.currentNodeId;
    const node = this.task.nodes[id];
    if (node.isSystem) {
      message.warning('系统节点不可删除');
      return;
    }
    this.task.removeNode(id);
    this.props.updateNodeList(this.task.getNodeList());
    this.props.updateLineList(this.task.getLineList());
  }
  removeLine() {
    this.task.removeLine(this.props.currentLineId);
    this.props.updateLineList(this.task.getLineList());
  }
  initKeyEvent(){
    document.addEventListener('keydown', this.onKeyDownHanlderBind);
  }
  removeKeyEvent(){
    document.removeEventListener('keydown', this.onKeyDownHanlderBind);
  }
  showComponent(node: INode){
    if (node.isSystem) {
      return
    }
    this.setState({
      _currentNode: node,
      currentComponentId: node.getType(),
      show: true
    })
  }
  onEditComponentCancel(){
    this.setState({
      show: false,
      _currentNode: null,
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
  onEditOk(){
    this.onEditComponentCancel();
  }
  getEditComponentRender(){
    const { currentComponentId} = this.state;
    let EditComponent = allWidgets[currentComponentId] && allWidgets[currentComponentId].component;
    return <EditComponent node={this.state._currentNode} onOk={this.onEditOk.bind(this)} onCancel={this.onEditComponentCancel.bind(this)}/>
  }
  onSave(){
    saveLocalJson(this.task.save())
  }
  onTaskChange(value:any, options:any){
    const templateInfo:any = templateList.find((item) => item.name === value );
    this.initTask(templateInfo.json);
    this.setState({
      defaultTaskName: this.task.name
    })
  }
  onNameChange(e:any){
    const name = e.target.value;
    this.task.setName(name)
    this.setState({
      defaultTaskName: name
    })
  }
  render(){
    return (
      <div className="home-page drag-page-root" onDrop={(e) => this.onDrop(e)} onDragOver={this.ondragover}>
        <div className="opreator">
          <Input value={this.state.defaultTaskName} onChange={this.onNameChange.bind(this)}  style={{ width: 160 }}></Input>
          <Select className="select"
            onChange={(value, options) => this.onTaskChange(value, options)}
            style={{ width: 200 }}
            defaultValue={this.state.templateName}
            placeholder="选择模板">
              {
                templateList.map((item, index) => {
                  return (
                    <Option value={item.name} key={index}>{item.name}</Option>
                  )
                })
              }
          </Select>
          <Button type="primary" onClick={() => this.onSave()}>保存当前任务流</Button>
        </div>
        <DragMenu />
        <NodeList task={this.task} onDoubleClick={this.showComponent.bind(this)}/>
        <SvgMap task={this.task} />
        <Modal visible={this.state.show}
            footer={null}
            title={`组件编辑 (${this.state._currentNode?.id})`}
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
