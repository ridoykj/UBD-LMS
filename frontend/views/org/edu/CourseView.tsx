import { ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { TextArea } from "@hilla/react-components/TextArea.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { useForm } from "@hilla/react-form";
import { BranchCombobox } from "Frontend/components/branch/BranchRC";
import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
import SideCrudRC from "Frontend/components/layout/splitlayout/SideCrudRC";
import SpeedDialRC from "Frontend/components/speeddial/SpeedDialRC";
import CourseDto from "Frontend/generated/com/itbd/application/dto/org/edu/CourseDto";
import CourseDtoModel from "Frontend/generated/com/itbd/application/dto/org/edu/CourseDtoModel";
import ProgrammeDtoModel from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDtoModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { CourseDtoCrudService, ProgrammeDtoCrudService } from "Frontend/generated/endpoints";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import React, { useMemo, useState } from "react";
import { FaUserPlus } from "react-icons/fa";

const responsiveSteps = [
  { minWidth: '0', columns: 1 },
  { minWidth: '600px', columns: 2 },
];

const CourseView = () => {
  const [branchFilter, setBranchFilter] = useState<BranchCombobox>({
    organizationFilter: undefined,
    departmentFilter: undefined,
  });

  const autoGridRef = React.useRef<AutoGridRef>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [selectedCourseItems, setSelectedCourseItems] = useState<CourseDto[]>([]);

  const form = useForm(CourseDtoModel, {
    onSubmit: async (batch) => {
      await CourseDtoCrudService.save(batch).then((result) => {
        refreshGrid();
        setSelectedCourseItems(result ? [result] : []);
        clear();
      });
    }
  });

  const { model, field, value, read, clear, reset } = form;

  function refreshGrid() {
    autoGridRef.current?.refresh();
  }

  const programmeDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<ProgrammeDtoModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'department.id',
            filterValue: branchFilter.departmentFilter?.id?.toString() ?? '0',
            matcher: Matcher.EQUALS
          }, {
            '@type': 'propertyString',
            propertyId: 'name',
            filterValue: params.filter,
            matcher: Matcher.CONTAINS
          },];

        const { pagination, filters } = comboBoxLazyFilter(params, 'and', child);
        ProgrammeDtoCrudService.list(pagination, filters).then((result: any) => {
          callback(result, result.length);
        });

      },
    [branchFilter.departmentFilter]
  );

  const primary = () => {
    return (
      <>
        <AutoGrid service={CourseDtoCrudService} model={CourseDtoModel} ref={autoGridRef}
          visibleColumns={['code', 'name', 'language',]}
          selectedItems={selectedCourseItems}
          theme="row-stripes"
          columnOptions={{
            'organization.name': {
              header: 'Organization',
              externalValue: branchFilter.organizationFilter != null ? branchFilter.organizationFilter.name : '',
              // setExternalValue: setOrgFilter,
            },
            'code': {
              header: 'Course Code',
            },
          }}
          onActiveItemChanged={(e) => {
            const item = e.detail.value;
            setSelectedCourseItems(item ? [item] : []);
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
              setSelectedCourseItems([]);
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
        <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit mx-5">
          <label slot="label">Profile</label>
          {/* <ComboBox label={'Programme'}  {...field(model.programme)} dataProvider={programmeDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible /> */}
          <TextField label={'Name'}  {...field(model.name)} className="w-fit" />
          <TextField label={'Headline'}  {...field(model.headline)} className="w-fit" />
          <TextField label={'Course Code'}  {...field(model.code)} className="w-fit" />
          {/* <NumberField label={'Credit Points'}  {...field(model.numberOfCredits)} className="w-fit" step={0.5} defaultValue={0} stepButtonsVisible /> */}
          <TextField label={'Language'}  {...field(model.language)} className="w-fit" />
          <TextArea label={'About'}  {...field(model.about)} className="w-fit" />
        </FormLayout>
      </>
    );
  }

  async function onConfirm() {
    return await CourseDtoCrudService.delete(selectedCourseItems[0]?.id).then((result) => {
      refreshGrid();
      setSelectedCourseItems([]);
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

export default CourseView;
