import { UserCircleIcon } from '@heroicons/react/outline';

export default function Topbar() {
  return (
    <div className='bg-indigo-500 text-gray-50 fixed left-0 top-0 right-0'>
      <div className='container mx-auto flex justify-between px-4 py-2'>
        <div className='flex h-10 items-center'>
          <img src='/images/logo.png' className='h-4/5' alt='Todo App Logo' />
          <span className='ml-3 text-2xl'>Todo App</span>
        </div>

        <div className='ml-auto flex items-center select-none'>
          <span>Duy Lee</span>

          <UserCircleIcon className='ml-3 w-8 h-8' />
        </div>
      </div>
    </div>
  );
}
