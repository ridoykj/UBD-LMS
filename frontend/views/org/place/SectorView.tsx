import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { TextArea } from "@hilla/react-components/TextArea.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { AutoGridRef } from "@hilla/react-crud";
import { useForm } from "@hilla/react-form";
import { AutoGrid } from "Frontend/components/grid/autogrid";
import SideCrudRC from "Frontend/components/layout/splitlayout/SideCrudRC";
import SpeedDialRC from "Frontend/components/speeddial/SpeedDialRC";
import SectorDTO from "Frontend/generated/com/itbd/application/dto/org/place/SectorDTO";
import SectorDTOModel from "Frontend/generated/com/itbd/application/dto/org/place/SectorDTOModel";
import { SectorDtoCrudService } from "Frontend/generated/endpoints";
import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

const responsiveSteps = [
  { minWidth: '0', columns: 1 },
  { minWidth: '500px', columns: 4 },
];

const SectorView = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const autoGridRef = React.useRef<AutoGridRef>(null);
  const [selectedInstructorItems, setSelectedInstructorItems] = useState<SectorDTO[]>([]);

  const form = useForm(SectorDTOModel, {
    onSubmit: async (instructor) => {
      console.log('instructor', instructor);
      await SectorDtoCrudService.save(instructor).then((result) => {
        refreshGrid();
        setSelectedInstructorItems(result ? [result] : []);
        // setSuccessNotification(true);
        clear();
      });
    }
  });

  const { model, field, value, read, clear, reset } = form;

  function refreshGrid() {
    autoGridRef.current?.refresh();
  }

  const primary = () => {
    return (
      <>
        <AutoGrid service={SectorDtoCrudService} model={SectorDTOModel} ref={autoGridRef}
          visibleColumns={['name', 'city', 'state', 'alternateName', 'contact',]}
          selectedItems={selectedInstructorItems}
          theme="row-stripes"
          columnOptions={{
            'name': {
              header: 'Name',
              resizable: true,
            },
            'additionalName': {
              header: 'Additional Name',
              resizable: true,
            },
            'type': {
              header: 'Building Type',
              resizable: true,
            },
            'block': {
              header: 'Block',
              resizable: true,
            },
            'openingTime': {
              header: 'Opening Time',
              resizable: true,
            },
            'closingTime': {
              header: 'Closing Time',
              resizable: true,
            },
            'contact': {
              header: 'Contact',
              resizable: true,
            },
          }}
          onActiveItemChanged={(e) => {
            const item = e.detail.value;
            console.log('item', item);
            setSelectedInstructorItems(item ? [item] : []);
            read(item);
            setShowSidebar(item?.id !== undefined);
          }}
        />
        <SpeedDialRC children={[
          {
            name: 'Add',
            icon: <FaUserPlus />,
            onClick: () => {
              clear();
              setSelectedInstructorItems([]);
              setShowSidebar(true);
            }
          },
        ]} />
      </>
    );
  }

  const secondary = () => {
    return (
      <>
        <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit p-2">
          <TextField label={'Name'}  {...{ colspan: 2 }} {...field(model.name)} />
          <TextField label={'City'}  {...{ colspan: 1 }} {...field(model.city)} />
          <TextField label={'Block'}  {...{ colspan: 2 }} {...field(model.state)} />
          <TextField label={'Alternate Name'}  {...{ colspan: 2 }} {...field(model.alternateName)} />
          <TextField label={'Country'}  {...{ colspan: 2 }} {...field(model.country)} />
          <TextField label={'Contact'}  {...{ colspan: 2 }} {...field(model.contact)} />
          <TextArea label={'Description'}  {...{ colspan: 2 }} {...field(model.description)} />
        </FormLayout>
      </>
    );
  }
  async function onConfirm() {
    return await SectorDtoCrudService.delete(selectedInstructorItems[0]?.id).then((result) => {
      refreshGrid();
      setSelectedInstructorItems([]);
      reset();
    });
  }

  return (
    <>
      <SideCrudRC
        primary={primary()}
        secondary={secondary()}
        form={form}
        onConfirm={onConfirm}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
    </>
  );
};

export default SectorView;
