import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { AutoCrud } from "@hilla/react-crud";
import SectionDtoModel from "Frontend/generated/com/itbd/application/dto/org/academic/SectionDtoModel";
import { SectionDtoCrudService } from "Frontend/generated/endpoints";

const SectionView = () => {

  return (
    <VerticalLayout style={{ alignItems: 'stretch', height: '100%', width: '100%' }}>
      <AutoCrud
        service={SectionDtoCrudService} model={SectionDtoModel}

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

export default SectionView;
