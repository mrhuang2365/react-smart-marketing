import Task from '../lib/Task'
import Node from '../lib/Node'

declare global {
  interface Window { $$task: ITask; }
}
declare interface ITask extends Task {};
declare interface INode extends Node {};
