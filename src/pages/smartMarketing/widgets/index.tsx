import React from 'react';
import {CodeSandboxOutlined} from '@ant-design/icons'

import BaseComponent from './BaseComponent/index'
import * as Cmpt1 from './Cmpt-1'
import * as Cmpt2 from './Cmpt-2'
import * as Cmpt3 from './Cmpt-3'
import * as Cmpt4 from './Cmpt-4'
import * as Cmpt5 from './Cmpt-5'
import * as Cmpt6 from './Cmpt-6'
import * as Wechat from './Wechat'
import * as Weibo from './Weibo'
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
    name:'圈人节点',
    color: '#eaff8f',
    icon: <CodeSandboxOutlined className="icon" />,
    childrens:[
      __untilWidget(Cmpt1),
      __untilWidget(Cmpt2),
      __untilWidget(Cmpt3),
    ]
  },
  {
    name:'计算节点',
    color: '#69c0ff',
    icon: <CodeSandboxOutlined className="icon" />,
    childrens:[
      __untilWidget(Cmpt4),
      __untilWidget(Cmpt5),
      __untilWidget(Cmpt6),
    ]
  },
  {
    name:'触达节点',
    color: '#69c0ff',
    icon: <CodeSandboxOutlined className="icon" />,
    childrens:[
      __untilWidget(Wechat),
      __untilWidget(Weibo),
    ]
  },
]


console.log('allWidgets:', allWidgets, widgetList);
export default allWidgets