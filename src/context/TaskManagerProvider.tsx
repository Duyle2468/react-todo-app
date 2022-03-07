import { FC, ReactNode, useEffect, useReducer } from 'react';

import { OrderBy, SortBy, Task, TaskManagerState, VisibleForm } from '../types';
import { TaskManagerContext } from './TaskManagerContext';
import { TaskManagerActionType, taskManagerReducer } from './taskManagerReducer';

export function createEmptyTaskManagerState(): TaskManagerState {
  return {
    tasks: [],
    isEditFormVisibile: false,
    filter: {
      sortBy: SortBy.Default,
      orderBy: OrderBy.Ascending,
    },
    visibleForm: VisibleForm.None,
  };
}

function loadTasks(): Array<Task> {
  const plainText = localStorage.getItem('tasks');
  if (plainText) {
    const tasks = JSON.parse(plainText) as Array<Task>;
    return tasks;
  }
  return [];
}

function saveTasks(tasks: Array<Task>) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export const TaskManagerProvider: FC<ReactNode> = ({ children }) => {
  const [taskManagerState, taskManagerDispatch] = useReducer(taskManagerReducer, createEmptyTaskManagerState());

  useEffect(() => {
    const tasks = loadTasks();

    taskManagerDispatch({
      type: TaskManagerActionType.LoadTasks,
      payload: { tasks },
    });
  }, []);

  useEffect(() => {
    saveTasks(taskManagerState.tasks);
  }, [taskManagerState.tasks]);

  return (
    <TaskManagerContext.Provider value={{ taskManagerState, taskManagerDispatch }}>
      {children}
    </TaskManagerContext.Provider>
  );
};
