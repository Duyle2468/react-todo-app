import { createContext } from 'react';

import { TaskManagerState } from '../types';
import { TaskManagerAction } from './taskManagerReducer';

export type TaskManagerContextType = {
  taskManagerState: TaskManagerState;
  taskManagerDispatch: React.Dispatch<TaskManagerAction>;
};

export const TaskManagerContext = createContext<TaskManagerContextType | null>(null);
