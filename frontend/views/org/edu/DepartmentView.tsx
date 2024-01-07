import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from '@hilla/react-components/ComboBox';
import { TextArea } from "@hilla/react-components/TextArea";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { AutoCrud } from "@hilla/react-crud";
import OrganizationDTOModel from 'Frontend/generated/com/itbd/application/dto/org/academic/OrganizationDTOModel';
import DepartmentDTOModel from 'Frontend/generated/com/itbd/application/dto/org/edu/DepartmentDTOModel';
import { DepartmentDtoCrudService, OrganizationDtoCrudService } from "Frontend/generated/endpoints";
import { comboBoxLazyFilter } from 'Frontend/util/comboboxLazyFilterUtil';
import { useMemo, useState } from 'react';

const DepartmentView = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const dataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<OrganizationDTOModel>
      ) => {
        const { pagination, filters } = comboBoxLazyFilter(params, 'name');
        OrganizationDtoCrudService.list(pagination, filters).then((result: any) => {
          console.log('result', result);
          callback(result);
        });
      },
    [searchTerm]
  );

  return (
    <VerticalLayout style={{ alignItems: 'stretch', height: '100%', width: '100%' }}>
      <AutoCrud
        service={DepartmentDtoCrudService} model={DepartmentDTOModel}
        style={{ height: '100%', width: '100%' }}
        
        gridProps={{
          visibleColumns: ['name', 'code', 'status', 'description',],
          contextMenu: 'name',
        }
      }      
        formProps={{
          visibleFields: ['organization', 'name', 'code', 'status',],
          fieldOptions: {
            organization: {
              renderer: ({ field }) => <ComboBox {...field} label="Profile" dataProvider={dataProvider} itemLabelPath='name' itemValuePath='id' />,
            },
            description: {
              renderer: ({ field }) => <TextArea {...field} label="Full Description" />,
            },
          },
        }}
      />
    </VerticalLayout>
  );
};

export default DepartmentView;
