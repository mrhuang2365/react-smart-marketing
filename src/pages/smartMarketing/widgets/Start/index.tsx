import React from 'react';
import {PlayCircleOutlined} from '@ant-design/icons'
import {WidgetOptions} from 'src/types/task'

export const options: WidgetOptions = {
  id: 'cmpt-start',
  name: '开始',
  icon: <PlayCircleOutlined className="icon"/>,
  isSystem: true,   // 是否系统节点
  max: 1,   // 能存在的个数
  defaultParams:{}
}
