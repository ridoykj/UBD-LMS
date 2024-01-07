import { TextArea } from '@hilla/react-components/TextArea';
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { AutoCrud } from "@hilla/react-crud";
import OrganizationDTOModel from "Frontend/generated/com/itbd/application/dto/org/academic/OrganizationDTOModel";
import { OrganizationDtoCrudService } from "Frontend/generated/endpoints";

const OrganizationView = () => {

  return (
    <VerticalLayout style={{ alignItems: 'stretch', height: '100%', width: '100%' }}>
      <AutoCrud
        service={OrganizationDtoCrudService} model={OrganizationDTOModel}
        style={{ height: '100%', width: '100%' }}
        gridProps={{
          visibleColumns: ['name', 'alternateName', 'foundingDate', 'email', 'phone', 'taxId', 'vatId', 'address', 'website',],
        }}
        formProps={{
          visibleFields: ['name', 'alternateName', 'foundingDate', 'email', 'phone', 'taxId', 'vatId', 'address', 'description', 'website',],
          fieldOptions: {
            name: { label: 'Name' },
            description: {
              renderer: ({ field }) => <TextArea {...field} label="Description" />,
            },
          },
        }}
      />
    </VerticalLayout>
  );
};

export default OrganizationView;
