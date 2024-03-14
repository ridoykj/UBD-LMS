import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { TextArea } from "@hilla/react-components/TextArea.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { useForm } from "@hilla/react-form";
import { AutoGrid, AutoGridRef } from "Frontend/components/grid/autogrid";
import SideCrudRC from "Frontend/components/layout/splitlayout/SideCrudRC";
import SpeedDialRC from "Frontend/components/speeddial/SpeedDialRC";
import RoleDto from "Frontend/generated/com/itbd/application/dto/resources/RoleDto";
import RoleDtoModel from "Frontend/generated/com/itbd/application/dto/resources/RoleDtoModel";
import { AppPermissionDtoCrudService, AppResourceDtoCrudService, RolesDtoCrudService } from "Frontend/generated/endpoints";
import React, { useEffect, useMemo, useState } from "react";
import { FaUserPlus } from "react-icons/fa";

import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { CheckboxGroup } from '@hilla/react-components/CheckboxGroup.js';
import AppResourceDto from "Frontend/generated/com/itbd/application/dto/resources/AppResourceDto";
import AppPermissionDto from "Frontend/generated/com/itbd/application/dto/resources/permissions/AppPermissionDto";
import { set } from "date-fns";

const responsiveSteps = [
  { minWidth: '0', columns: 1 },
  { minWidth: '500px', columns: 4 },
];

const RoleView = () => {

  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const autoGridRef = React.useRef<AutoGridRef>(null);
  const [selectedRoleItems, setSelectedRoleItems] = useState<RoleDto[]>([]);
  const [resources, setResources] = useState<AppResourceDto[]>([]);
  const [permissionsE, setPermissionsE] = useState<AppPermissionDto[]>([] as AppPermissionDto[]);
  // let permissionsE: AppPermissionDto[] = [];

  const form = useForm(RoleDtoModel, {
    onSubmit: async (roles) => {
      await RolesDtoCrudService.save(roles).then((result) => {
        refreshGrid();
        setSelectedRoleItems(result ? [result] : []);
        // setPermissionsE(result?.permissions as AppPermissionDto[]); // Add type assertion here
        clear();
        setShowSidebar(false);
      });
    }
  });

  const updatePermission = async (permissionsE: AppPermissionDto) => {
    await AppPermissionDtoCrudService.save(permissionsE).then((result) => {
      console.log('result', result);
    });
  }

  const selectItem = async (id: number) => {
    return await RolesDtoCrudService.get(id);
  }

  useMemo(async () => {
    await AppResourceDtoCrudService.allResource().then((result) => {
      setResources(result);
    });
  }, []);

  const { model, field, value, read, clear, reset, dirty, invalid, visited, submit } = form;

  function refreshGrid() {
    autoGridRef.current?.refresh();
  }

  const primary = () => {
    return (
      <>
        <AutoGrid service={RolesDtoCrudService} model={RoleDtoModel} ref={autoGridRef}
          visibleColumns={['name', 'description',]}
          selectedItems={selectedRoleItems}
          theme="row-stripes"
          columnOptions={{
            'name': {
              header: 'Name',
              resizable: true,
            },
            'description': {
              header: 'Description',
              resizable: true,
            },
          }}
          onActiveItemChanged={(e) => {
            const item = e.detail.value;
            setSelectedRoleItems(item ? [item] : []);
            if (item?.id) {
              selectItem(item.id).then((result) => {
                read(result);
                // permissionsE = result?.permissions as AppPermissionDto[]; // Add type assertion here
                setPermissionsE(result?.permissions as AppPermissionDto[]); // Add type assertion here
                console.log('permissionsE', permissionsE);
                console.log('dirty= %s, invalid = %s, visited = %s', dirty, invalid, visited);
              });
              // setSelectedRoleItems([item]);
            }
            //  else {
            //   clear();
            //   read(undefined);
            //   setPermissionsE([]);
            // }
            setShowSidebar(item?.id !== undefined);
            console.log('selectedRoleItems', selectedRoleItems);
          }}
        />
        <SpeedDialRC children={[
          {
            name: 'Add',
            icon: <FaUserPlus />,
            onClick: () => {
              clear();
              setSelectedRoleItems([]);
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
          <TextArea label={'Description'}  {...{ colspan: 2 }} {...field(model.description)} />
          <button
            type="button"
            className="w-full bg-blue-400 hover:bg-blue-500 py-2 rounded-md hover:ring-2 hover:ring-blue-700"
            title="Assagin Resource Permissin"
            onClick={() => {
              console.log('value', value);
              // value.permissions = permissionsE;
              // submit();
            }}
          >Assagin</button>
          {
            resources && resources.map((resource, index) => {
              return (
                <CheckboxGroup
                  // {...{ colspan: 4 }}
                  key={index}
                  label={resource?.name}
                  value={value.permissions !== undefined && value.permissions?.length > 0 ? value.permissions.find((p) => p?.resourceId === resource?.resourceId)?.allowed?.filter((f) => f != undefined && f != null)?.map((f) => f as string) ?? [] : []}
                  className="border-slate-300 border-b-2"
                  onValueChanged={(event) => {
                    const item = event.detail.value;
                    // console.log(item);
                    if (resource && value?.id) {
                      const permission = permissionsE.find(p => p.resourceId === resource.resourceId);
                      // if (permission) {
                      //   permission.allowed = item;
                      //   permission.role = undefined;
                      // } else {
                      //   permissionsE.push({
                      //     resourceId: resource.resourceId,
                      //     roleId: value?.id,
                      //     allowed: item,
                      //     // role: value,
                      //     resource: resource,
                      //   });
                      // }
                      updatePermission({
                        version: permission?.version,
                        resourceId: resource.resourceId,
                        roleId: value?.id,
                        allowed: item,
                        role: value,
                        resource: resource,
                      });
                      // setPermissionsE((p) => permissionsE);
                      // console.log('permissionsE', permissionsE);
                      // console.log('updatedArr', updatedArr);
                    }
                  }
                  }
                >
                  {
                    resource?.actions?.filter((p) => p != '').map((p, i) => {
                      return (
                        <Checkbox
                          key={i}
                          label={p}
                          value={p}
                        />
                      )
                    })
                  }
                </CheckboxGroup>
              )
            })
          }
        </FormLayout >
      </>
    );
  }

  async function onConfirm() {
    return await RolesDtoCrudService.delete(selectedRoleItems[0]?.id).then((result) => {
      refreshGrid();
      setSelectedRoleItems([]);
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

export default RoleView;
