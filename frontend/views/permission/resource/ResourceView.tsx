import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { TextArea } from "@hilla/react-components/TextArea.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { useForm } from "@hilla/react-form";
import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
import SideCrudRC from "Frontend/components/layout/splitlayout/SideCrudRC";
import SpeedDialRC from "Frontend/components/speeddial/SpeedDialRC";
import AppResourceDto from "Frontend/generated/com/itbd/application/dto/resources/AppResourceDto";
import AppResourceDtoModel from "Frontend/generated/com/itbd/application/dto/resources/AppResourceDtoModel";
import { AppResourceDtoCrudService } from "Frontend/generated/endpoints";
import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

const responsiveSteps = [
  { minWidth: '0', columns: 1 },
  { minWidth: '500px', columns: 4 },
];

const ResourcesView = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const autoGridRef = React.useRef<AutoGridRef>(null);
  const [selectedResourceItems, setSelectedResourceItems] = useState<AppResourceDto[]>([]);

  const form = useForm(AppResourceDtoModel, {
    onSubmit: async (resources) => {
      await AppResourceDtoCrudService.save(resources).then((result) => {
        refreshGrid();
        setSelectedResourceItems(result ? [result] : []);
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
        <AutoGrid service={AppResourceDtoCrudService} model={AppResourceDtoModel} ref={autoGridRef}
          visibleColumns={['resourceId', 'name', 'actions', 'description',]}
          selectedItems={selectedResourceItems}
          theme="row-stripes"
          columnOptions={{
            'resourceId': {
              header: 'Resource',
              resizable: true,
            }, 'name': {
              header: 'Name',
              resizable: true,
            }, 'actions': {
              header: 'Actions',
              resizable: true,
            }, 'description': {
              header: 'Description',
              resizable: true,
            },
          }}
          onActiveItemChanged={(e) => {
            const item = e.detail.value;
            setSelectedResourceItems(item ? [item] : []);
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
              setSelectedResourceItems([]);
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
          <TextArea label={'Building Type'}  {...{ colspan: 1 }} {...field(model.description)} />
        </FormLayout>
      </>
    );
  }

  async function onConfirm() {
    return await AppResourceDtoCrudService.delete(selectedResourceItems[0]?.name).then((result) => {
      refreshGrid();
      setSelectedResourceItems([]);
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

export default ResourcesView;
