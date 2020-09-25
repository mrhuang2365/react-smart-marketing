import React from 'react';
import './index.scss'
import {MenuOutlined} from '@ant-design/icons'
import WidgetList from '../WidgetList'
import {Rnd} from 'react-rnd'
console.log('---Rnd', Rnd)
interface IProps {
  // route: string,
  // match: any,
}
interface IState{
  offsetX: number,
  offsetY: number,
  x: number,
  y: number,
  drag: boolean,
}
const DRAG_MENU = 'drag-menu';
const DRAG_MENU_HANDLER = 'drag-menu-handler';

class App extends React.Component<IProps, IState>{
  constructor(props:IProps){
    super(props)
    this.state = {
      offsetX: 0,
      offsetY: 0,
      x: 100,
      y: 100,
      drag: false
    }
  }
  private get getStyle(){
    return {
      top: this.state.y + 'px',
      left: this.state.x + 'px',
    }
  }
  onMouseDown(e:any) {
    let style = window.getComputedStyle(e.target);
    console.log('-----onMouseDown:', e.nativeEvent, style);
    e.preventDefault();
    this.setState({
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
      drag: true,
    })
    document.addEventListener('mousemove', this.bindMouseMove)
    document.addEventListener('mouseup', this.bindMouseUp)
  }
  onMouseUp(e:any){
    e.preventDefault();
    document.removeEventListener('mousemove', this.bindMouseMove)
    document.removeEventListener('mouseup', this.bindMouseUp)
  }
  onMouseMove(e:any){
    e.preventDefault();
    console.log('----onMouseMove:', e)
    const isDragMenuEle = e.target.classList.contains(DRAG_MENU_HANDLER);
    let x = this.state.x;
    let y = this.state.y;
    if (isDragMenuEle) {
      x = e.offsetX + this.state.x - this.state.offsetX;
      y = e.offsetY + this.state.y - this.state.offsetY;
    } else {
      x = e.offsetX - this.state.offsetX;
      y = e.offsetY - this.state.offsetY;
    }
    
    this.setState({
      x: Math.max(x, 0),
      y: Math.max(y, 0),
    })
  }
  private bindMouseMove = this.onMouseMove.bind(this);
  private bindMouseUp = this.onMouseUp.bind(this);

  render(){
    return (
      // <Rnd>
        <div className={DRAG_MENU} style={this.getStyle}>
          <div className={DRAG_MENU_HANDLER} 
          onMouseDown= {(e) => this.onMouseDown(e)}
          >
            <MenuOutlined />
          </div>
          <div className="drag-menu-content">
            <WidgetList />
          </div>
        </div>
      // </Rnd>
    );
  }
}

export default App;
