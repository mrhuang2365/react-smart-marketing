import React from 'react';
import './index.scss'
import {Layout} from 'antd'

const { Header, Footer, Sider, Content } = Layout;

interface IProps {
  // route: string,
  // match: any,
}
interface IState{
  offsetX: number,
  offsetY: number,
  x: number,
  y: number,
}
class App extends React.Component<IProps, IState>{
  constructor(props:IProps){
    super(props)
    this.state = {
      offsetX: 0,
      offsetY: 0,
      x: 100,
      y: 100,
    }
  }
  private get getStyle(){
    return {
      top: this.state.y + 'px',
      left: this.state.x + 'px',
    }
  }
  onDragStart(e:any){
    console.log('onDragStart, event:',  e.nativeEvent);
  }
  onDragEnd(e:any){
    console.log('onDragEnd, event:', e.nativeEvent, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    e.preventDefault();
    const x = e.nativeEvent.offsetX + this.state.x - this.state.offsetX;
    const y = e.nativeEvent.offsetY + this.state.y - this.state.offsetY;
    this.setState({
      x: Math.max(x, 0),
      y: Math.max(y, 0),
    })
  }
  onDrag(e: any) {
    // console.log('onDrag, event:', e.nativeEvent, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    e.preventDefault();
    // const x = e.nativeEvent.offsetX + this.state.x - this.state.x;
    // const y = e.nativeEvent.offsetY + this.state.y - this.state.y;
    // this.setState({
    //   x: Math.max(x, 0),
    //   y: Math.max(y, 0),
    // })
  }
  onMouseDown(e:any) {
    console.log('onMouseDown, event:', e.nativeEvent, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    // e.preventDefault();
    this.setState({
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    })
  }
  render(){
    return (
      <div className="Drag-menu" style={this.getStyle} 
      draggable="true"
      onDrag = {(e) => this.onDrag(e)}
      onMouseDown= {(e) => this.onMouseDown(e)}
      onDragStart = {(e) => this.onDragStart(e)}
      onDragEnd = {(e) => this.onDragEnd(e)}
      >
        菜单栏
      </div>
    );
  }
}

export default App;
