import type FilterUnion from 'Frontend/generated/dev/hilla/crud/filter/FilterUnion';
// import type Pageable from './types/com/vaadin/hilla/mappedtypes/Pageable';

export interface FormService<T> {
  save(value: T): Promise<T | undefined>;
  delete(id: any): Promise<void>;
}

export interface ListService<T> {
  list(request: Pageable, filter: FilterUnion | undefined): Promise<T[]>;
}

export interface CountService<T> {
  count(filter: FilterUnion | undefined): Promise<number>;
}

export interface CrudService<T> extends FormService<T>, ListService<T> { }
