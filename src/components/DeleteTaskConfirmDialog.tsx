import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export type DeleteTaskConfirmDialogProps = {
  isOpen: boolean;
  taskName: string;
  closeModal: () => void;
  onConfirm: () => void;
};
export default function DeleteTaskConfirmDialog({
  isOpen = false,
  taskName = '',
  closeModal,
  onConfirm,
}: DeleteTaskConfirmDialogProps) {
  if (taskName.length > 20) {
    taskName = taskName.substring(0, 20);
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='fixed inset-0 z-10 overflow-y-auto' onClose={closeModal}>
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className='inline-block h-screen align-middle' aria-hidden='true'>
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border border-gray-100 shadow-md rounded-2xl'>
                <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-red-500'>
                  Delete task
                </Dialog.Title>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    Are you sure you want to delete task <span className='font-semibold'>{`"${taskName}"`}</span>?
                  </p>
                </div>

                <div className='mt-8 flex flex-row-reverse'>
                  <button
                    type='button'
                    className='ml-3 inline-flex justify-center px-6 py-1 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                    onClick={onConfirm}
                  >
                    Delete
                  </button>
                  <button
                    type='button'
                    className='bg-white px-4 py-1 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
