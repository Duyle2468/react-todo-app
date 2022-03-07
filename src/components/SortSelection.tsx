import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import { SortBy } from '../types';

export const sortItems = [
  {
    label: 'Name',
    value: SortBy.Name,
  },
  {
    label: 'Priority',
    value: SortBy.Priority,
  },
  {
    label: 'Default (Datetime added)',
    value: SortBy.Default,
  },
];

export type SortProps = {
  value: SortBy;
  onChange?: (value: SortBy) => void;
};

export default function SortSelection({ value, onChange }: SortProps) {
  const [sort, setSort] = useState<{ label: string; value: SortBy }>(() => {
    return {
      label: 'Default (Datetime added)',
      value: SortBy.Default,
    };
  });

  return (
    <div className={`inline-flex`}>
      <Menu as='div' className='relative inline-block text-left'>
        <div className='flex items-center'>
          <Menu.Button
            data-cy='sort-by-button'
            className='h-7 inline-flex justify-center text-sm font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 py-1 px-2 bg-gray-100 hover:bg-gray-200'
          >
            {sort.value !== null ? (
              <span className='text-gray-800'>Sorted by {sort.label}</span>
            ) : (
              <span className='text-gray-600'>Sort by</span>
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
          <Menu.Items className='absolute z-10 right-0 w-60 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            {sortItems.map(item => {
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
                          setSort(item);
                          onChange?.(item.value);
                        }}
                      >
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
