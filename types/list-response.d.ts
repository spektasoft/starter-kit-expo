import { ListMeta } from './list-meta';

export type ListResponse<T> = {
  data: T[];
  meta: ListMeta;
};