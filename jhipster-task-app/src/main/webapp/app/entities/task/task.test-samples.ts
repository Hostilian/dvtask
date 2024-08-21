import dayjs from 'dayjs/esm';

import { ITask, NewTask } from './task.model';

export const sampleWithRequiredData: ITask = {
  id: 25229,
};

export const sampleWithPartialData: ITask = {
  id: 4300,
  completed: true,
};

export const sampleWithFullData: ITask = {
  id: 9173,
  title: 'spawn suction',
  completed: true,
  dueDate: dayjs('2024-08-21'),
  description: 'ugh likewise',
};

export const sampleWithNewData: NewTask = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
