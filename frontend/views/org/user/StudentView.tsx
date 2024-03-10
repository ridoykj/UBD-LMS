import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { AutoCrud } from "@hilla/react-crud";
import { AutoGrid } from "Frontend/components/grid/autogrid";
import StudentDtoModel from "Frontend/generated/com/itbd/application/dto/user/student/StudentDtoModel";
import { StudentDtoCrudService } from "Frontend/generated/endpoints";

const StudentView = () => {

  return (
    <VerticalLayout style={{ alignItems: 'stretch', height: '100%', width: '100%' }}>
      <AutoGrid
        service={StudentDtoCrudService} model={StudentDtoModel}

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

export default StudentView;
