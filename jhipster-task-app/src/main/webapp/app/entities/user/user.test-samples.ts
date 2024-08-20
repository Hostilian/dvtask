import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 14530,
  login: 'tEXbKU',
};

export const sampleWithPartialData: IUser = {
  id: 9961,
  login: 'N@scJVKA\\=gUL8\\w-Gtt3',
};

export const sampleWithFullData: IUser = {
  id: 6860,
  login: 'ST@AYqy\\T9\\MZ0W9EU',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
