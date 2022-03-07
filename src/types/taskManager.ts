import { Task } from './task';

export enum OrderBy {
  Ascending,
  Descending,
}

export enum SortBy {
  Default,
  Name,
  Priority,
}

export type TaskFilter = {
  sortBy: SortBy;
  orderBy: OrderBy;
};

export enum VisibleForm {
  None,
  AddingForm,
  EditingForm,
}

export type TaskManagerState = {
  tasks: Array<Task>;
  isEditFormVisibile: boolean;
  filter: TaskFilter;
  visibleForm: VisibleForm;
};
