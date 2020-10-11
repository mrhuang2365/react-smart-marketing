import Task from '../lib/Task'
import Node from '../lib/Node'
import Line from '../lib/Line'

declare global {
  interface Window { $$task: ITask; }
}
declare interface ITask extends Task {};
declare interface INode extends Node {};
declare interface ILine extends Line {};
