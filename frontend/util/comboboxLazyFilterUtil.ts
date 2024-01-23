import { ComboBoxDataProviderParams } from '@hilla/react-components/ComboBox';
import Filter from 'Frontend/generated/dev/hilla/crud/filter/Filter';
import PropertyStringFilter from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter';
import Pageable from 'Frontend/generated/dev/hilla/mappedtypes/Pageable';

export function comboBoxLazyFilter(comboBoxDataProviderParams: ComboBoxDataProviderParams, type: string, property: PropertyStringFilter[]) {
  const { page, pageSize, filter } = comboBoxDataProviderParams;
  const pagination: Pageable = {
    pageNumber: page,
    pageSize: pageSize,
    sort: {
      orders: []
    },
  };

  const filters: Filter = {
    '@type': type,
    children: property
  };

  return { pagination, filters };
}

export function filterById(type: string, property: PropertyStringFilter[]) {
  const pagination: Pageable = {
    pageNumber: 0,
    pageSize: 1,
    sort: {
      orders: []
    },
  };

  const filters: Filter = {
    '@type': type,
    children: property
  };

  return { pagination, filters };
}
