import Task from '../lib/Task'
import Node from '../lib/Node'
import Line from '../lib/Line'

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