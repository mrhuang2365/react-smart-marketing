import Task from '../pages/smartMarketing/lib/Task'
import Node from '../pages/smartMarketing/lib/Node'
import Line from '../pages/smartMarketing/lib/Line'

declare global {
  interface Window { $$task: ITask; }
}
declare interface ITask extends Task {};
declare interface INode extends Node {};
declare interface ILine extends Line {};

declare interface GuideLinePath {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

// 组件配置
declare interface WidgetOptions {
  id: string,         // 组件id
  name: string,        // 组件名称
  icon?: any,           // 图标
  isSystem?: boolean,   // 是否系统节点
  max?: number,         // 能存在的个数
  parentsMax?: number   // 父级最大连接数
  defaultParams: any
}