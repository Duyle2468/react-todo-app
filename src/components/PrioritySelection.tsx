import { Menu, Transition } from '@headlessui/react';
import { FlagIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';

import { priorities } from '../constant';
import { Priority } from '../types';

export const priorityLevelColorMap: { [key: string]: string } = {
  '1': 'text-gray-400',
  '2': 'text-purple-500',
  '3': 'text-orange-500',
  '4': 'text-red-500',
};

export type PrioritySelectionProps = {
  initialValue?: number;
  className?: string;
  onChange?: (priority: Priority) => void;
};

export default function PrioritySelection({ initialValue, className, onChange }: PrioritySelectionProps) {
  const [selectedPriority, setSelectedPriority] = useState(() => {
    return priorities.find(p => p.level === initialValue);
  });

  return (
    <div className={`inline-flex ${className}`}>
      <Menu as='div' className='relative inline-block text-left'>
        <div className='flex items-center'>
          <Menu.Button
            data-cy='priority-selection-button'
            className='inline-flex justify-center text-sm font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 py-1 px-2 hover:bg-gray-100'
          >
            {selectedPriority ? (
              <FlagIcon className={`${priorityLevelColorMap[selectedPriority.level]} h-4 w-4`} />
            ) : (
              <FlagIcon className='h-4 w-4 text-gray-400' />
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute z-10 right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            {priorities.map(item => {
              return (
                <div key={item.label}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type='button'
                        className={`${
                          active ? 'bg-gray-50 text-indigo-500' : 'text-gray-900'
                        } group flex items-center w-full px-2 py-2 text-sm`}
                        onClick={() => {
                          setSelectedPriority(item);
                          onChange?.(item);
                        }}
                      >
                        <FlagIcon className={`${priorityLevelColorMap[item.level]} h-4 w-4`} />
                        <span className='ml-2'>{item.label}</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
