/**
 * Takes the current state and an action and returns the new state
 * @param state the initial state
 * @param action the action to apply with a given payload
 * @returns a new `TaskManagerState`
 */

import { Task, TaskFilter, TaskManagerState, VisibleForm } from '../types';

export enum TaskManagerActionType {
  LoadTasks = 'LoadTasks',
  AddTask = 'AddTask',
  DeleteTask = 'DeleteTask',
  CompletedTask = 'CompletedTask',
  UpdateTask = 'UpdateTask',
  SetVisibleForm = 'SetVisibleForm',
  UpdateFilter = 'UpdateFilter',
}

type LoadTasksAction = { type: TaskManagerActionType.LoadTasks; payload: { tasks: Array<Task> } };
type AddTaskAction = { type: TaskManagerActionType.AddTask; payload: { task: Task } };
type DeleteTaskAction = { type: TaskManagerActionType.DeleteTask; payload: { taskId: string } };
type CompletedTaskAction = { type: TaskManagerActionType.CompletedTask; payload: { taskId: string } };
type UpdateTaskAction = { type: TaskManagerActionType.UpdateTask; payload: { task: Task } };
type SetVisibleFormAction = { type: TaskManagerActionType.SetVisibleForm; payload: { visibleForm: VisibleForm } };
type UpdateFilterAction = { type: TaskManagerActionType.UpdateFilter; payload: { filter: Partial<TaskFilter> } };

export type TaskManagerAction =
  | LoadTasksAction
  | AddTaskAction
  | DeleteTaskAction
  | CompletedTaskAction
  | UpdateTaskAction
  | SetVisibleFormAction
  | UpdateFilterAction;

export const taskManagerReducer = (state: TaskManagerState, action: TaskManagerAction): TaskManagerState => {
  switch (action.type) {
    case TaskManagerActionType.LoadTasks: {
      return {
        ...state,
        tasks: action.payload.tasks,
      };
    }

    case TaskManagerActionType.AddTask: {
      return {
        ...state,
        tasks: [action.payload.task, ...state.tasks],
      };
    }

    case TaskManagerActionType.UpdateTask: {
      const tasks = [...state.tasks];
      const index = tasks.findIndex(task => task.id === action.payload.task.id);
      tasks[index] = { ...action.payload.task };

      return {
        ...state,
        tasks,
      };
    }

    case TaskManagerActionType.CompletedTask: {
      const tasks = [...state.tasks];
      const index = tasks.findIndex(task => task.id === action.payload.taskId);
      tasks[index].isCompleted = true;

      return {
        ...state,
        tasks,
      };
    }

    case TaskManagerActionType.DeleteTask: {
      const { taskId } = action.payload;

      return { ...state, tasks: state.tasks.filter(item => item.id !== taskId) };
    }

    case TaskManagerActionType.SetVisibleForm: {
      return { ...state, visibleForm: action.payload.visibleForm };
    }

    case TaskManagerActionType.UpdateFilter: {
      return { ...state, filter: { ...state.filter, ...action.payload.filter } };
    }

    default:
      return { ...state };
  }
};
