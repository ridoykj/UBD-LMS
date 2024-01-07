import { ComboBoxDataProviderParams } from '@hilla/react-components/ComboBox';
import Pageable from 'Frontend/generated/dev/hilla/mappedtypes/Pageable';

type Child = {
  "@type": string;
  propertyId: string;
  filterValue: string;
  matcher: string;
};

type Filters = {
  '@type': string;
  children: Child[];
}

export function comboBoxLazyFilter(comboBoxDataProviderParams: ComboBoxDataProviderParams, propertyId: string) {
  const { page, pageSize, filter } = comboBoxDataProviderParams;

  const pagination: Pageable = {
    pageNumber: page,
    pageSize: pageSize,
    sort: {
      orders: []
    },
  };

  const filters: Filters = {
    '@type': 'or',
    children: [
      {
        '@type': 'propertyString',
        propertyId: propertyId,
        filterValue: filter,
        matcher: 'CONTAINS'
      }
    ]
  };

  return { pagination, filters };
}
