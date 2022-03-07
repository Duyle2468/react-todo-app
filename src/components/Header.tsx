import { ArrowNarrowDownIcon, ArrowNarrowUpIcon } from '@heroicons/react/outline';
import { AdjustmentsIcon } from '@heroicons/react/solid';
import { useContext } from 'react';

import { TaskManagerContext, TaskManagerContextType } from '../context/TaskManagerContext';
import { TaskManagerActionType } from '../context/taskManagerReducer';
import { useCompletedTasks, useTasks } from '../context/useTaskManagerContext';
import { OrderBy, SortBy } from '../types';
import SortSelection from './SortSelection';

export default function Header() {
  const { taskManagerState, taskManagerDispatch } = useContext(TaskManagerContext) as TaskManagerContextType;
  const total = useTasks().length;
  const totalComplete = useCompletedTasks().length;
  const { orderBy, sortBy } = taskManagerState.filter;

  const handleSortSelectionChange = (sortBy: SortBy) => {
    taskManagerDispatch({
      type: TaskManagerActionType.UpdateFilter,
      payload: {
        filter: {
          sortBy,
        },
      },
    });
  };

  const handleOrderChange = () => {
    taskManagerDispatch({
      type: TaskManagerActionType.UpdateFilter,
      payload: {
        filter: {
          orderBy: orderBy === OrderBy.Ascending ? OrderBy.Descending : OrderBy.Ascending,
        },
      },
    });
  };

  return (
    <div className='mb-14'>
      <h3 className='text-lg leading-6 font-medium text-gray-900'>TODO LIST</h3>
      <div className='flex justify-between mt-4'>
        <div className='flex'>
          <div className='flex gap-4'>
            <span className='inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 '>
              <span className='text-gray-700'>Total: {total}</span>
            </span>

            <span className='inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-300 '>
              <span className='text-green-700'>Completed: {totalComplete}</span>
            </span>
          </div>
        </div>

        <div className='flex items-center'>
          <SortSelection value={sortBy} onChange={handleSortSelectionChange} />
          {sortBy !== SortBy.Default && (
            <button
              className='ml-4 h-7 py-1 px-2 inline-flex justify-center items-center text-sm font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 bg-gray-100 hover:bg-gray-200 text-gray-800'
              onClick={handleOrderChange}
            >
              {orderBy === OrderBy.Ascending ? (
                <>
                  <ArrowNarrowUpIcon className='w-4 h-4' />
                  <span className='ml-1'>Ascending</span>
                </>
              ) : (
                <>
                  <ArrowNarrowDownIcon className='w-4 h-4' />
                  <span className='ml-1'>Descending</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
