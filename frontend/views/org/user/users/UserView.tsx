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
import PersonMargeDto from "Frontend/generated/com/itbd/application/dto/user/person/PersonMargeDto";
import PersonMargeDtoModel from "Frontend/generated/com/itbd/application/dto/user/person/PersonMargeDtoModel";
import { PersonMargeDtoCrudService } from "Frontend/generated/endpoints";
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
  const [selectedInstructorItems, setSelectedInstructorItems] = useState<PersonMargeDto[]>([]);
  const autoGridRef = React.useRef<AutoGridRef>(null);

  const form = useForm(PersonMargeDtoModel, {
    onSubmit: async (instructor) => {
      await PersonMargeDtoCrudService.save(instructor).then((result) => {
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
    return await PersonMargeDtoCrudService.delete(selectedInstructorItems[0]?.id).then((result) => {
      refreshGrid();
      setSelectedInstructorItems([]);
      reset();
    });
  }

  const primary = () => {
    return (
      <>
        <AutoGrid service={PersonMargeDtoCrudService} model={PersonMargeDtoModel} ref={autoGridRef}
          visibleColumns={['id', 'givenName', 'designation', 'medical.gender', ]}
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
          <TextField label={'Full Name'}  {...{ colspan: 2 }} {...field(model.givenName)} />
          {/* <TextField label={'Middle Name'} {...{ colspan: 1 }}  {...field(model.person.additionalName)} /> */}
          {/* <TextField label={'Last Name'}   {...{ colspan: 1 }}{...field(model.person.familyName)} /> */}
          
          <Select label={'Gender'}  {...{ colspan: 1 }}  {...field(model.medical.gender)} items={genders} />

          <TextField label={'Honorific Prefix'} {...{ colspan: 1.5 }} {...field(model.honorificPrefix)} />
          <TextField label={'Honorific Suffix'} {...{ colspan: 1.5 }} {...field(model.honorificSuffix)} />
          <TextField label={'Nationality'}  {...{ colspan: 2 }} {...field(model.nationality)} />
          <TextField label={'Alias'}  {...{ colspan: 1 }} {...field(model.alternateName)} />

          <TextField label={'Mobile'}{...{ colspan: 1 }}   {...field(model.contact.mobile)} minlength={5} maxlength={18} allowedCharPattern="[0-9()+-]" />
          <TextField label={'Telephone'}{...{ colspan: 1 }}   {...field(model.contact.telephone)} minlength={5} maxlength={18} allowedCharPattern="[0-9()+-]" />
          <TextField label={'Fax Number'}  {...{ colspan: 1 }} {...field(model.contact.faxNumber)} />
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
