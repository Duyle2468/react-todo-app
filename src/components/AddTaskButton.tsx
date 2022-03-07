import { PlusIcon } from '@heroicons/react/outline';

export type AddTaskButtonProps = {
  onClick?: () => void;
};

export default function AddTaskButton({ onClick }: AddTaskButtonProps) {
  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      onClick?.();
    }
  };

  return (
    <div
      className='inline-flex select-none justify-start items-center cursor-pointer text-gray-600 hover:text-indigo-600'
      role='button'
      tabIndex={0}
      onClick={() => onClick?.()}
      onKeyDown={keyDownHandler}
    >
      <div className='w-7'>
        <PlusIcon className='h-4 w-4' />
      </div>
      <span>Add task</span>
    </div>
  );
}
