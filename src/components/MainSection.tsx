import { useContext, useState } from 'react';

import { TaskManagerContext, TaskManagerContextType } from '../context/TaskManagerContext';
import { TaskManagerActionType } from '../context/taskManagerReducer';
import { VisibleForm } from '../types';
import AddTaskButton from './AddTaskButton';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

export default function MainSection() {
  const { taskManagerState, taskManagerDispatch } = useContext(TaskManagerContext) as TaskManagerContextType;
  const [isFormVisibile, setIsFormVisibile] = useState(false);

  return (
    <div className='mt-4'>
      {isFormVisibile && taskManagerState.visibleForm === VisibleForm.AddingForm ? (
        <TaskForm
          onCancel={() => {
            setIsFormVisibile(false);
          }}
        />
      ) : (
        <div className='mt-2'>
          <AddTaskButton
            onClick={() => {
              setIsFormVisibile(true);
              taskManagerDispatch({
                type: TaskManagerActionType.SetVisibleForm,
                payload: { visibleForm: VisibleForm.AddingForm },
              });
            }}
          />
        </div>
      )}

      {taskManagerState.tasks.length <= 0 && !isFormVisibile ? (
        <div className='max-w-xs mx-auto mt-16 flex flex-col justify-center text-center'>
          <p className='mt-4 text-xl'>No tasks in the list.</p>
          <p className='mt-4'>Please add a new one.</p>
        </div>
      ) : (
        <TaskList />
      )}
    </div>
  );
}
