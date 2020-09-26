import React from 'react';
import './index.scss'
import {MenuOutlined} from '@ant-design/icons'
import WidgetList from '../WidgetList'

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
    const disX = e.clientX - this.state.x;
    const disY = e.clientY - this.state.y;
  
    document.onmousemove = (ov) => {
      const x = ov.clientX - disX;
      const y = ov.clientY - disY;
      this.setState({
        x: Math.max(x, 0),
        y: Math.max(y, 0),
      })

    }
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
  render(){
    return (
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
    );
  }
}

export default App;
