import React from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import allWidgets, {widgetList} from '../../widgets'

import './index.scss'

interface IProps {
  // route: string,
  // match: any,
}
interface IState{

}
class WidgetList extends React.Component<IProps, IState>{
  public constructor(props:IProps){
    super(props)
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
              <div key={index} className="widget-list-panel">
                <div className="item-name">
                  <span>
                    {item.icon || <AppstoreOutlined className="icon" />}
                  </span>
                  {item.name}
                </div>
                <div className="item-content">
                  {
                    item.childrens.map((child, _index) => {
                      const IconCmpt = allWidgets[child.id].options.icon;
                      return (
                        <div className="cmpt-item" key={_index} draggable="true" 
                          onDragStart= {(e) => this.onDragStart(e, child)}
                          >
                          {
                            IconCmpt ? IconCmpt : <AppstoreOutlined className="icon"/>
                          }
                          
                          <span className="name">{child.name}</span>
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
