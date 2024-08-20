import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '8760de94-6a13-4076-a40f-c3fb311f1bf3',
};

export const sampleWithPartialData: IAuthority = {
  name: '715e6672-cd97-444d-9df2-cca168920694',
};

export const sampleWithFullData: IAuthority = {
  name: 'ddd98bd6-88bf-40cf-ba5b-ea4a8e69243f',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
