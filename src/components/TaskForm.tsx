import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { TaskManagerContext, TaskManagerContextType } from '../context/TaskManagerContext';
import { TaskManagerActionType } from '../context/taskManagerReducer';
import { Task } from '../types';
import PrioritySelection from './PrioritySelection';

export type TaskFormProps = {
  onCancel?: () => void;
  onSubmited?: () => void;
  value?: Task;
};

const createInitialValue = (): Task => ({
  id: uuid(),
  title: '',
  description: '',
  isCompleted: false,
  priorityLevel: 0,
});

export default function TaskForm({ onCancel, onSubmited, value }: TaskFormProps) {
  const isEditing = !!value;

  const { taskManagerDispatch } = useContext(TaskManagerContext) as TaskManagerContextType;
  const [formValue, setFormValue] = useState(value ?? createInitialValue);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      taskManagerDispatch({
        type: TaskManagerActionType.UpdateTask,
        payload: { task: { ...value, ...formValue } },
      });
    } else {
      taskManagerDispatch({
        type: TaskManagerActionType.AddTask,
        payload: { task: formValue },
      });
    }

    onSubmited?.();
    setFormValue(createInitialValue());
  };

  return (
    <div className='mt-2'>
      <form onSubmit={formSubmitHandler}>
        <div className='border-2 border-gray-200 focus:ring-2 focus:ring-indigo-500  rounded-md p-3'>
          <div className='flex justify-between items-center'>
            <input
              ref={titleRef}
              type='text'
              tabIndex={0}
              placeholder='Task name'
              className='w-full focus:outline-none'
              value={formValue.title}
              onChange={event => setFormValue({ ...formValue, title: event.target.value })}
            />
            <div className='ml-3 flex justify-between items-center'>
              <PrioritySelection onChange={event => setFormValue({ ...formValue, priorityLevel: event.level })} />
            </div>
          </div>
          <div className='mt-3'>
            <textarea
              placeholder='Description'
              className='w-full focus:outline-none'
              value={formValue.description}
              onChange={event => setFormValue({ ...formValue, description: event.target.value })}
            />
          </div>
        </div>

        <div className='mt-4'>
          <button
            type='submit'
            disabled={Boolean(!formValue.title.trim())}
            className='inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white disabled:opacity-75 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Save
          </button>
          <button
            type='button'
            className='ml-3 bg-white py-1 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            onClick={() => onCancel?.()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
