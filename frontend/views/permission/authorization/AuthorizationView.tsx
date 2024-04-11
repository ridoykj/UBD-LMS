import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Select } from "@hilla/react-components/Select.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { AutoGridRef } from "@hilla/react-crud";
import { useForm } from "@hilla/react-form";
import { AutoGrid } from "Frontend/components/grid/autogrid";
import SideCrudRC from "Frontend/components/layout/splitlayout/SideCrudRC";
import SpeedDialRC from "Frontend/components/speeddial/SpeedDialRC";
import BloodGroupsEnum from "Frontend/generated/com/itbd/application/constants/enums/BloodGroupsEnum";
import GenderEnum from "Frontend/generated/com/itbd/application/constants/enums/GenderEnum";
import UserDto from "Frontend/generated/com/itbd/application/dto/user/UserDto";
import UserDtoModel from "Frontend/generated/com/itbd/application/dto/user/UserDtoModel";
import PersonMargeDtoModel from "Frontend/generated/com/itbd/application/dto/user/person/PersonMargeDtoModel";
import { UsersDtoCrudService } from "Frontend/generated/endpoints";
import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

const responsiveSteps = [
  { minWidth: '0', columns: 1 },
  { minWidth: '500px', columns: 4 },
];

const genders = Object.values(GenderEnum).map(level => ({ label: level, value: level }));
const bloodGroups = Object.values(BloodGroupsEnum).map(level => ({ label: level, value: level }));
const AuthorizationView = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [selectedInstructorItems, setSelectedInstructorItems] = useState<UserDto[]>([]);
  const autoGridRef = React.useRef<AutoGridRef>(null);

  const form = useForm(UserDtoModel, {
    onSubmit: async (instructor) => {
      await UsersDtoCrudService.save(instructor).then((result) => {
        refreshGrid();
        setSelectedInstructorItems(result ? [result] : []);
        clear();
      });
    }
  });

  const { model, field, value, read, clear, reset } = form;

  function refreshGrid() {
    autoGridRef.current?.refresh();
  }

  async function onConfirm() {
    return await UsersDtoCrudService.delete(selectedInstructorItems[0]?.id).then((result) => {
      refreshGrid();
      setSelectedInstructorItems([]);
      reset();
    });
  }

  const primary = () => {
    return (
      <>
        <AutoGrid service={UsersDtoCrudService} model={UserDtoModel} ref={autoGridRef}
          // visibleColumns={['id', 'givenName', 'designation', 'medical.gender',]}
          selectedItems={selectedInstructorItems}
          theme="row-stripes"
          columnOptions={{
            'id': {
              header: 'ID',
              resizable: true,
            },
            'additionalName': {
              header: 'Middle Name',
              resizable: true,
            },
            'familyName': {
              header: 'Last Name',
              resizable: true,
            },
            'designation': {
              header: 'Designation',
              resizable: true,
            },
            'mobile': {
              header: 'Mobile',
              resizable: true,
            },
            'email': {
              header: 'Email',
              resizable: true,
            },
          }}
          onActiveItemChanged={(e) => {
            const item = e.detail.value;
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
         
        </FormLayout>
      </>
    );
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

export default AuthorizationView;
