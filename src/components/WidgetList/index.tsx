import React from 'react';
import './index.scss'
import { AppstoreOutlined } from '@ant-design/icons';
import {widgetList} from '../../widgets'

interface IProps {
  // route: string,
  // match: any,
}
interface IState{

}
class WidgetList extends React.Component<IProps, IState>{
  constructor(props:IProps){
    super(props)
    this.state = {

    }
  }
  onDragStart(e: any, cmpt: object){
    console.log('onDragStart:', cmpt, e);
    e.dataTransfer.setData('cmpt-info', JSON.stringify(cmpt));
    e.dataTransfer.setData('mode', 'add');
  }
  render(){
    return (
      <div className='Widget-list'>
        {
          widgetList.map((item, index) => {
            return (
              <div key={index} title={item.name}>
                <div className="item-name">
                  <AppstoreOutlined className="icon"/>
                  {item.name}
                </div>
                <div className="item-content">
                  {
                    item.childrens.map((child, _index) => {
                      return (
                        <div className="cmpt-item" key={child.id} draggable="true" 
                          onDragStart= {(e) => this.onDragStart(e, child)}
                          >
                          <AppstoreOutlined className="icon"/>
                          <span>{child.name}</span>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default WidgetList;
