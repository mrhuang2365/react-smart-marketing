import React from 'react';
import { connect } from 'react-redux';
import './index.scss'
import { AppstoreOutlined, RightSquareOutlined } from '@ant-design/icons';
import { INode } from 'src/types/task';
import {dragEventMode, gloablTaskConfig} from '../../lib/Task'
import {guideLineChange, updateLineList, selectNode} from 'src/store/actions'
import {ReduxState} from 'src/store/index'

import allWidgets from '../../widgets'

interface IProps {
  node: INode,
  x: number
  y: number
  className?: string,
  style?: object,
  guideLineChange: Function,
  updateLineList: Function,
  selectNode: Function,
  onDoubleClick?: Function
}
interface IState{
  draggable: boolean,
}
class NodeInfo extends React.Component<IProps, IState>{
  constructor(props:IProps){
    super(props)
    this.state = {
      draggable: true
    }
  }
  get style(){
    return {
      width: gloablTaskConfig.node.width + 'px',
      height: gloablTaskConfig.node.height + 'px',
      top: this.props.y + 'px',
      left: this.props.x + 'px',
      ...this.props.style
    }
  }
  onSelect(){
    this.props.selectNode(this.props.node.id)
  }
  onDoubleClick(){
    this.props.onDoubleClick && this.props.onDoubleClick(this.props.node)
  }
  onDragStart(e: any){
    // console.log('onDragStart:', this.props.node, );
    e.dataTransfer.setData('cmpt-info', JSON.stringify({id: this.props.node.id}));
    e.dataTransfer.setData('offset', JSON.stringify({x: e.nativeEvent.layerX, y:  e.nativeEvent.layerY}));
    e.dataTransfer.setData('mode', dragEventMode.move);
  }
  onIconDragStart(e:any){
    e.dataTransfer.setData('cmpt-info', JSON.stringify({id: this.props.node.id}));
    e.dataTransfer.setData('mode', dragEventMode.line);
    window.$$task.setState(
      'guideLinePath', {
        x1: e.clientX, 
        y1: e.clientY,
        x2: 0,
        y2: 0,
      })
    e.stopPropagation();
  }
  onDrop(e:any){
    const data = JSON.parse(e.dataTransfer.getData('cmpt-info') || 'null');
    const mode = e.dataTransfer.getData('mode');
    console.log('Icon, onDrop:', data, mode, this.props.node.id);
    if (mode === dragEventMode.line) {
      this.props.guideLineChange({x1:0, x2:0, y1:0, y2:0});

      const pNode = window.$$task.nodes[data.id];
      const cNode = this.props.node;
      if (window.$$task.lineIsExist(pNode, cNode)) {
        return 
      }
      window.$$task.newLine(pNode, cNode);
      this.props.updateLineList(window.$$task.getLineList())
      e.stopPropagation();
    }
  }
  onIconDrag(e:any){
    // console.log('Icon, onIconDrag:', e.clientX, e.clientY);
    const {x1, y1} = window.$$task.getState('guideLinePath');
    const value =  {
      x1, y1,
      x2: e.clientX,
      y2: e.clientY,
    };
    window.$$task.setState('guideLinePath', value );
    this.props.guideLineChange(value)
  }
  stopPropagation(e:any){
    e.preventDefault();
    e.stopPropagation();
    if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
      e.nativeEvent.stopImmediatePropagation();
    }
  }
  getIconRender(){
    const widgetId = this.props.node.getType();
    const IconCmpt = allWidgets[widgetId].options.icon;
    return IconCmpt? IconCmpt: <AppstoreOutlined className="icon" />
  }
  render(){
    return (
      <div className={`node-content ${this.props.className}`} 
        style={this.style}
        onClick={() => this.onSelect()}
        onDoubleClick={() => this.onDoubleClick()}
        draggable={this.state.draggable} 
        onDragStart= {(e) => this.onDragStart(e)}
        onDrop = {(e) => this.onDrop(e)}
        >
          {
            this.getIconRender()
          }
          <RightSquareOutlined className="line-icon"
              draggable={true} 
              onDragStart = {(e) => this.onIconDragStart(e)}
              onDrag = {(e) => this.onIconDrag(e)}
              />
          <div className="node-name">{this.props.node.name}({this.props.node.id})</div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  
})

const mapDispatchToProps = ({
  guideLineChange,
  updateLineList,
  selectNode
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodeInfo);

// export default NodeInfo