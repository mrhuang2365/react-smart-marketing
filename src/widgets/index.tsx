import React from 'react';
import {CodeSandboxOutlined} from '@ant-design/icons'

import BaseComponent from './BaseComponent/index'
import * as Cmpt1 from './Cmpt-1'
import * as Start from './Start'

// 记录节点对应组件
let allWidgets: {
  [index: string]: any
} = {};

function __untilWidget(widget: any){
  const {options} = widget;
  const {id} = options;

  allWidgets[id] = {
    options: options,
    component: widget.default || BaseComponent,
  }

  return { 
    id, 
    name: options.name, 
    isSystem: options.isSystem, 
    params: options.defaultParams || {}
  }
}

// 记录节点菜单
export const widgetList = [
  {
    name:'系统节点',
    color: '#ffd8bf',
    icon: <CodeSandboxOutlined className="icon" />,
    childrens:[
      __untilWidget(Start),
    ]
  },
  {
    name:'组件一类',
    color: '#eaff8f',
    icon: <CodeSandboxOutlined className="icon" />,
    childrens:[
      __untilWidget(Cmpt1),
      __untilWidget(Cmpt1),
      __untilWidget(Cmpt1),
      __untilWidget(Cmpt1),
      __untilWidget(Cmpt1),
    ]
  },
  {
    name:'计算节点',
    color: '#69c0ff',
    icon: <CodeSandboxOutlined className="icon" />,
    childrens:[
      __untilWidget(Cmpt1),
      __untilWidget(Cmpt1),
      __untilWidget(Cmpt1),
      __untilWidget(Cmpt1),
      __untilWidget(Cmpt1),
      __untilWidget(Cmpt1),
    ]
  },
]


console.log('allWidgets:', allWidgets, widgetList);
export default allWidgets