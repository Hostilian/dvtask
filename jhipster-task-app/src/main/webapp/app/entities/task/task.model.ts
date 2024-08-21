import dayjs from 'dayjs/esm';

export interface ITask {
  id: number;
  title?: string | null;
  completed?: boolean | null;
  dueDate?: dayjs.Dayjs | null;
  description?: string | null;
}

export type NewTask = Omit<ITask, 'id'> & { id: null };
