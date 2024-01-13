import { Button } from "@hilla/react-components/Button.js";
import { ComboBox, ComboBoxDataProviderCallback, ComboBoxDataProviderParams } from "@hilla/react-components/ComboBox.js";
import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog.js";
import { DatePicker, DatePickerDate, DatePickerElement } from '@hilla/react-components/DatePicker.js';
import { DateTimePicker } from '@hilla/react-components/DateTimePicker.js';
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { Grid, GridDataProviderCallback, GridDataProviderParams } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import { GridFilterColumn } from "@hilla/react-components/GridFilterColumn.js";
import { Icon } from "@hilla/react-components/Icon.js";
import { Item } from '@hilla/react-components/Item.js';
import { ListBox } from '@hilla/react-components/ListBox.js';
import { Scroller } from "@hilla/react-components/Scroller.js";
import { Select, SelectElement } from "@hilla/react-components/Select.js";
import { SplitLayout } from "@hilla/react-components/SplitLayout.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import { useForm } from "@hilla/react-form";
import BranchRC from "Frontend/components/branch/BranchRC";
import BatchDTO from "Frontend/generated/com/itbd/application/dto/org/edu/BatchDTO";
import BatchDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/BatchDTOModel";
import ProgrammeDTOModel from "Frontend/generated/com/itbd/application/dto/org/edu/ProgrammeDTOModel";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Matcher from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter/Matcher";
import { BatchDtoCrudService, ProgrammeDtoCrudService } from "Frontend/generated/endpoints";
import NotificationUtil from "Frontend/util/NotificationUtil";
import { comboBoxLazyFilter } from "Frontend/util/comboboxLazyFilterUtil";
import { gridLazyFilter } from "Frontend/util/gridLazyFilterUtil";
import { format, parse } from 'date-fns';
import { ReactElement, useContext, useEffect, useMemo, useRef, useState } from "react";


function formatDateIso8601(dateParts: DatePickerDate) {
  const { year, month, day } = dateParts;
  const date = new Date(year, month, day);
  return format(date, 'yyyy-MM-dd');
}
function parseDateIso8601(inputValue: string) {
  const date = parse(inputValue.trim(), 'yyyy-MM-dd', new Date());
  return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
}


const BatchView = () => {
  const [orgNameFilter, setOrgNameFilter] = useState('');
  const [departmentNameFilter, setDepartmentNameFilter] = useState('');
  const [programmeNameFilter, setProgrammeNameFilter] = useState('');

  const [refreshGrid, setRefreshGrid] = useState<boolean>(false);

  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] = useState<boolean>(false);

  const [selectedBatchItems, setSelectedBatchItems] = useState<BatchDTO[]>([]);
  const { model, field, value, read, submit, clear, reset, visited, dirty, invalid, submitting } = useForm(BatchDTOModel, {
    onSubmit: async (batch) => {
      await BatchDtoCrudService.save(batch).then((result) => {
        setRefreshGrid(!refreshGrid);
        setSuccessNotification(true);
      });
    }
  });

  const programmeDataProvider = useMemo(
    () =>
      async (
        params: ComboBoxDataProviderParams,
        callback: ComboBoxDataProviderCallback<ProgrammeDTOModel>
      ) => {
        const child: PropertyStringFilter[] = [
          {
            '@type': 'propertyString',
            propertyId: 'department.name',
            filterValue: departmentNameFilter || '',
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
    [departmentNameFilter]
  );

  const batchDataProvider = useMemo(
    () =>
      async (
        params: GridDataProviderParams<BatchDTO>,
        callback: GridDataProviderCallback<BatchDTO>
      ) => {
        const child: PropertyStringFilter[] = [{
          '@type': 'propertyString',
          propertyId: 'programme.name',
          filterValue: programmeNameFilter,
          matcher: Matcher.CONTAINS
        },];

        params.filters?.forEach((filter) => {
          if (filter.path !== 'programme.name') {
            child.push({
              '@type': 'propertyString',
              propertyId: filter.path,
              filterValue: filter.value,
              matcher: Matcher.CONTAINS
            });
          }
        });

        console.log('params', params);

        const { pagination, filter } = gridLazyFilter(params, 'and', child);
        BatchDtoCrudService.list(pagination, filter).then((result: any) => {
          callback(result, result.length);
        });
      },
    [programmeNameFilter, refreshGrid]
  );

  const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '600px', columns: 2 },
  ];

  const discardButtonColors: { [key: string]: string } = {
    true: 'text-white bg-indigo-400 hover:bg-indigo-500',
    false: 'text-white bg-gray-300',
  };

  const saveButtonColors: { [key: string]: string } = {
    true: 'text-white bg-emerald-400 hover:bg-emerald-500',
    false: 'text-white bg-gray-300',
  };


  const datePickerRef = useRef<DatePickerElement>(null);

  useEffect(() => {
    const datePicker = datePickerRef.current;
    if (datePicker) {
      datePicker.i18n = {
        ...datePicker.i18n,
        formatDate: formatDateIso8601,
        parseDate: parseDateIso8601,
      };
    }
  }, [datePickerRef]);


  // extracted component (and type) to avoid code duplication
  type ComparationSelectionProps = Readonly<{
    value: Matcher;
    onMatcherChanged(matcher: Matcher): void;
    isDateTimeType?: boolean;
  }>;

  // function ComparationSelection({ onMatcherChanged, value, isDateTimeType }: ComparationSelectionProps): ReactElement {
  //   const select = useRef<SelectElement>(null);

  //   return (
  //     <Select
  //       theme="small"
  //       className="auto-grid-comparation-selection"
  //       ref={select}
  //       value={value}
  //       onValueChanged={({ detail }) => {
  //         onMatcherChanged(detail.value as Matcher);
  //       }}
  //       renderer={() => (
  //         <ListBox>
  //           <Item value={Matcher.GREATER_THAN} {...{ label: '>' }}>
  //             {isDateTimeType ? '> After' : '> Greater than'}
  //           </Item>
  //           <Item value={Matcher.LESS_THAN} {...{ label: '<' }}>
  //             {isDateTimeType ? '< Before' : '< Less than'}
  //           </Item>
  //           <Item value={Matcher.EQUALS} {...{ label: '=' }}>
  //             = Equals
  //           </Item>
  //         </ListBox>
  //       )}
  //     ></Select>
  //   );
  // }

  // function DateHeaderFilter(): ReactElement {
  //   const context = useContext(ColumnContext)!;
  //   const i18n = useDatePickerI18n();
  //   const { matcher, filterValue, updateFilter } = useFilterState(Matcher.GREATER_THAN);
  //   const [invalid, setInvalid] = useState(false);

  //   return (
  //     <div className="auto-grid-date-filter">
  //       <ComparationSelection
  //         value={matcher}
  //         onMatcherChanged={(m) => updateFilter(m, filterValue)}
  //         isDateTimeType={true}
  //       />
  //       <DatePicker
  //         theme="small"
  //         value={filterValue}
  //         // placeholder={context.customColumnOptions?.filterPlaceholder ?? 'Filter...'}
  //         i18n={i18n}
  //         onInvalidChanged={({ detail: { value } }) => {
  //           setInvalid(value);
  //         }}
  //         onValueChanged={({ detail: { value } }) => {
  //           if (!(invalid || value === filterValue)) {
  //             updateFilter(matcher, value);
  //           }
  //         }}
  //       />
  //     </div>
  //   );
  // }


  function ComparationSelection({ onMatcherChanged, value, isDateTimeType }: ComparationSelectionProps): ReactElement {
    const select = useRef<SelectElement>(null);

    return (
      <Select
        theme="small"
        className="auto-grid-comparation-selection"
        ref={select}
        value={value}
        onValueChanged={({ detail }) => {
          onMatcherChanged(detail.value as Matcher);
        }}
        renderer={() => (
          <ListBox>
            <Item value={Matcher.GREATER_THAN} {...{ label: '>' }}>
              {isDateTimeType ? '> After' : '> Greater than'}
            </Item>
            <Item value={Matcher.LESS_THAN} {...{ label: '<' }}>
              {isDateTimeType ? '< Before' : '< Less than'}
            </Item>
            <Item value={Matcher.EQUALS} {...{ label: '=' }}>
              = Equals
            </Item>
          </ListBox>
        )}
      ></Select>
    );
  }

  function useFilterState(initialMatcher: Matcher) {
    const context = useContext(ColumnContext)!;
    const [matcher, setMatcher] = useState(initialMatcher);
    const [filterValue, setFilterValue] = useState('');

    function updateFilter(newMatcher: Matcher, newFilterValue: string) {
      setFilterValue(newFilterValue);
      setMatcher(newMatcher);

      const filter: PropertyStringFilter = {
        propertyId: context.propertyInfo.name,
        filterValue: newFilterValue,
        matcher: newMatcher,
        '@type': 'propertyString',
      };
      context.setColumnFilter(filter, context.filterKey);
    }

    return { matcher, filterValue, updateFilter };
  }

  function dateFilterHeader(header?: string, value?: GridColumn<any>) {

    const { matcher, filterValue, updateFilter } = useFilterState(Matcher.GREATER_THAN);
    const [invalid, setInvalid] = useState(false);
    return (
      <>
        <p className="text-sm pl-1 text-gray-400">{header}</p>
        <div className="auto-grid-date-filter">
          <ComparationSelection
            value={Matcher.EQUALS}
            onMatcherChanged={(m) => { }}
            isDateTimeType={true}
          />
          <DatePicker
            theme="small"
            // value={filterValue}
            // placeholder={context.customColumnOptions?.filterPlaceholder ?? 'Filter...'}
            // i18n={i18n}
            onInvalidChanged={({ detail: { value } }) => {
              // setInvalid(value);
            }}
            onValueChanged={({ detail: { value } }) => {
              if (!(invalid)) {
                // updateFilter(matcher, value);
              }
            }}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <SplitLayout className="h-full w-full">
        <VerticalLayout className="h-full w-full items-stretch">
          <BranchRC
            visibleFields={
              { organization: true, department: true, programme: true }
            }
            organization={{
              organizationName: orgNameFilter,
              setOrganizationName: setOrgNameFilter
            }}
            department={{
              departmentName: departmentNameFilter,
              setDepartmentName: setDepartmentNameFilter
            }}
            programme={{
              programmeName: programmeNameFilter,
              setProgrammeName: setProgrammeNameFilter
            }}
          />
          <Grid dataProvider={batchDataProvider} selectedItems={selectedBatchItems}
            className="h-full w-full m-0"
            theme="row-stripes"
            onActiveItemChanged={(e) => {
              const item = e.detail.value;
              setSelectedBatchItems(item ? [item] : []);
              read(item);
              console.log('item', item);
            }}
          >
            <GridFilterColumn path="name" header="Name" autoWidth flexGrow={2} />
            <GridColumn path="graduationDate" header="Graduation Date" autoWidth flexGrow={2} headerRenderer={(e) => {
              return dateFilterHeader(e.original.header ?? '', e.original.value);
            }} />
            <GridFilterColumn path="admissionStartDate" header="Admission Start" autoWidth flexGrow={2} />
            <GridFilterColumn path="admissionEndDate" header="Admission End" autoWidth flexGrow={2} inputMode="decimal" />
            <GridFilterColumn path="status" header="Status" autoWidth flexGrow={1} />
            <GridColumn path="programme.name" header="Programme" autoWidth flexGrow={2} />
          </Grid>
        </VerticalLayout>
        <VerticalLayout className="w-1/4 min-w-96">
          <header className="bg-gray-100 w-full">
            <div className="flex flex-row space-x-4">
              <p className="text-blue-600 text-xl font-bold truncate p-1 m-1 w-full"># {value.name ?? 'Unkown Title'}</p>
              <Button className="text-white content-end bg-blue-500 hover:bg-blue-600" onClick={clear}>
                <Icon icon="vaadin:plus" />New
              </Button>
            </div>
          </header>
          <Scroller scrollDirection="vertical" className="w-full h-full">
            <FormLayout responsiveSteps={responsiveSteps} className="w-fit h-fit mx-5">
              <label slot="label">Profile</label>
              <ComboBox label={'Programme'}  {...field(model.programme)} dataProvider={programmeDataProvider} itemLabelPath='name' itemValuePath='name' clearButtonVisible />
              <TextField label={'Name'}  {...field(model.name)} />
              <TextField label={'Description'}  {...field(model.description)} />
              {/* <DatePicker label={'Graduation Date'}  {...field(model.graduationDate)} className="max-w-60" /> */}
              <DatePicker label={'Graduation Date'}  {...field(model.graduationDate)} ref={datePickerRef} className="max-w-60" />
              <DateTimePicker label={'Admission Start'}  {...field(model.admissionStartDate)} className="max-w-60" />
              <DateTimePicker label={'Admission End'}  {...field(model.admissionEndDate)} className="max-w-60" />
              <TextField label={'Status'}  {...field(model.status)} />
            </FormLayout>
          </Scroller>
          <footer className="flex flex-row bg-gray-100 w-full">
            <div className="w-full">
              {
                selectedBatchItems[0]?.id === undefined ? null :
                  <Button
                    className="text-white bg-red-400 hover:bg-red-500"
                    onClick={() => {
                      setDialogOpened(true);
                      console.log('delete', selectedBatchItems[0]?.id);
                    }}
                  >Delete</Button>
              }
            </div>
            {
              value.name === undefined ? null :
                <div className="flex flex-row content-end space-x-4">
                  <Button
                    className={discardButtonColors[dirty.toString()]}
                    disabled={!dirty}
                    onClick={reset}
                  >
                    Discard
                  </Button>
                  <Button
                    className={saveButtonColors[dirty.toString()]}
                    disabled={invalid || submitting || !dirty}
                    onClick={submit}
                  >
                    {selectedBatchItems[0]?.id !== undefined ? 'Update' : 'Save'}
                  </Button>
                </div>
            }
          </footer>
        </VerticalLayout>
      </SplitLayout>
      <NotificationUtil opened={successNotification} type="update"
        message={{
          title: 'Successfully Updated',
          description: value.name,
        }}
        onOpenedChanged={(event) => {
          if (!event.detail.value) {
            setSuccessNotification(event.detail.value);
          }
        }}
        onClick={() => { setSuccessNotification(false) }}
      />
      <ConfirmDialog
        header="Delete Item"
        cancelButtonVisible
        rejectButtonVisible
        rejectText="Discard"
        confirmText="Confirm"
        confirmTheme="error primary"
        opened={dialogOpened}
        onOpenedChanged={(event) => {
          setDialogOpened(event.detail.value);
          if (event.detail.value) {
            // setStatus('');
          }
        }}
        onConfirm={() => {
          BatchDtoCrudService.delete(selectedBatchItems[0]?.id).then((result) => {
            setRefreshGrid(!refreshGrid);
            setSelectedBatchItems([]);
            reset();
          });
        }}>
        Do you want to delete?
        {value.name}
      </ConfirmDialog >
    </>
  );
};

export default BatchView;
