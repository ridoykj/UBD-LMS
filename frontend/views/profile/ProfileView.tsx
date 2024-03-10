import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { AutoCrud } from "@hilla/react-crud";
import PersonMargeDtoModel from "Frontend/generated/com/itbd/application/dto/user/person/PersonMargeDtoModel";
import { PersonMargeDtoCrudService } from "Frontend/generated/endpoints";

const PrifileView = () => {

  return (
    <VerticalLayout style={{ alignItems: 'stretch', height: '100%', width: '100%' }}>
      <AutoCrud
        // service={PersonDtoCrudService} model={PersonDtoModel}
        // service={ProductDtoCrudService} model={ProductDtoModel}
        // service={EmployeeService} model={EmployeeModel}
        // service={ContactDtoCrudService} model={ContactDtoModel}
        service={PersonMargeDtoCrudService} model={PersonMargeDtoModel}

        style={{ height: '100%', width: '100%' }}
      // formProps={{
      //   visibleFields: ['givenName', 'alternateName', 'familyName', 'description'],
      //   fieldOptions: {
      //     givenName: { label: 'Name' },
      //     description: {
      //       renderer: ({ field }) => <TextArea {...field} label="Full Description" />,
      //     },
      //   },
      // }}
      />
    </VerticalLayout>
  );
};

export default PrifileView;
