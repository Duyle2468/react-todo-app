import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { useContext, useState } from 'react';

import { TaskManagerContext, TaskManagerContextType } from '../context/TaskManagerContext';
import { TaskManagerActionType } from '../context/taskManagerReducer';
import { Task, VisibleForm } from '../types';
import DeleteTaskConfirmDialog from './DeleteTaskConfirmDialog';
import PrioritySelection from './PrioritySelection';
import TaskForm from './TaskForm';

export type TaskItemProps = {
  data: Task;
};

export default function TaskItem({ data }: TaskItemProps) {
  const { taskManagerState, taskManagerDispatch } = useContext(TaskManagerContext) as TaskManagerContextType;
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);

  const toggleCompletedTask = () => {
    taskManagerDispatch({
      type: TaskManagerActionType.UpdateTask,
      payload: {
        task: {
          ...data,
          isCompleted: !data.isCompleted,
        },
      },
    });
  };

  const updateTaskPriority = (level: number) => {
    taskManagerDispatch({
      type: TaskManagerActionType.UpdateTask,
      payload: {
        task: {
          ...data,
          priorityLevel: level,
        },
      },
    });
  };

  return (
    <>
      {isEditing && taskManagerState.visibleForm === VisibleForm.EditingForm ? (
        <TaskForm value={data} onSubmited={() => setIsEditing(false)} onCancel={() => setIsEditing(false)} />
      ) : (
        <div data-cy='task-item' className='pt-3 pb-4 border-b grow border-gray-200 group'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <div className='flex w-7 select-none'>
                <input
                  type='checkbox'
                  checked={data.isCompleted}
                  className='cursor-pointer focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                  onChange={toggleCompletedTask}
                />
              </div>
              <div data-cy='task-name' className={`text-lg ${data.isCompleted && 'line-through text-gray-400'}`}>
                {data.title}
              </div>
            </div>
            <div className='flex items-center'>
              <button
                className='cursor-pointer transition-opacity duration-500 opacity-0 group-hover:opacity-100'
                onClick={() => {
                  setIsEditing(true);
                  taskManagerDispatch({
                    type: TaskManagerActionType.SetVisibleForm,
                    payload: { visibleForm: VisibleForm.EditingForm },
                  });
                }}
              >
                <PencilIcon className='h-4 w-4 text-gray-400' />
              </button>
              <button
                data-cy='delete-task-button'
                className='cursor-pointer transition-opacity duration-500 opacity-0 group-hover:opacity-100 ml-3'
                onClick={() => setIsOpenConfirmDialog(true)}
              >
                <TrashIcon className='h-4 w-4 text-gray-400' />
              </button>
              <PrioritySelection
                initialValue={data.priorityLevel}
                className='ml-2'
                onChange={event => updateTaskPriority(event.level)}
              />
            </div>
          </div>
          {data.description && <div className='ml-7 text-sm text-gray-500'>{data.description}</div>}
        </div>
      )}

      <DeleteTaskConfirmDialog
        taskName={data.title}
        isOpen={isOpenConfirmDialog}
        closeModal={() => {
          setIsOpenConfirmDialog(false);
        }}
        onConfirm={() => {
          setIsOpenConfirmDialog(false);
          taskManagerDispatch({
            type: TaskManagerActionType.DeleteTask,
            payload: { taskId: data.id },
          });
        }}
      />
    </>
  );
}
