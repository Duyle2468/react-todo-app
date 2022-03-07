import { useContext } from 'react';

import { OrderBy, SortBy, Task } from '../types';
import { TaskManagerContext, TaskManagerContextType } from './TaskManagerContext';

const sortTaskByName = (task1: Task, task2: Task) => {
  return task1.title.localeCompare(task2.title);
};

const sortTaskByPriority = (task1: Task, task2: Task) => {
  return task1.priorityLevel - task2.priorityLevel;
};

export const useTaskManagerContext = () => {
  return useContext(TaskManagerContext) as TaskManagerContextType;
};

export const useTaskManagerState = () => {
  const { taskManagerState } = useTaskManagerContext();

  return taskManagerState;
};

export const useTaskFilter = () => {
  const { filter } = useTaskManagerState();

  return filter;
};

export const useTasks = () => {
  const { tasks } = useTaskManagerState();

  return tasks;
};

export const useTasksByFilter = () => {
  const { tasks } = useTaskManagerState();
  const { orderBy, sortBy } = useTaskFilter();

  let filteredTasks = tasks.filter(task => {
    return task;
  });

  if (sortBy === SortBy.Name) {
    filteredTasks = filteredTasks.sort(sortTaskByName);
  }

  if (sortBy === SortBy.Priority) {
    filteredTasks = filteredTasks.sort(sortTaskByPriority);
  }

  if (orderBy === OrderBy.Descending) {
    return filteredTasks.reverse();
  }

  return filteredTasks;
};

export const useCompletedTasks = () => {
  const tasks = useTasks();

  return tasks.filter(task => task.isCompleted);
};
