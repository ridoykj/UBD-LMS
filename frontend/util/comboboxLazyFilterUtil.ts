import { ComboBoxDataProviderParams } from '@hilla/react-components/ComboBox';
import AndFilter from 'Frontend/generated/dev/hilla/crud/filter/AndFilter';
import Filter from 'Frontend/generated/dev/hilla/crud/filter/Filter';
import OrFilter from 'Frontend/generated/dev/hilla/crud/filter/OrFilter';
import PropertyStringFilter from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter';
import Matcher from 'Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher';
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
