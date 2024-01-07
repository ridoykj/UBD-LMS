
import { Avatar } from "@hilla/react-components/Avatar.js";
import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import { getUsers } from "Frontend/generated/Users";
import User from "Frontend/generated/com/itbd/application/services/Users/User";
import { Users } from "Frontend/generated/endpoints";
import React, { useEffect, useState } from "react";

// const employeeRenderer = (person: Person) => (
//   <HorizontalLayout style={{ alignItems: 'center' }} theme="spacing">
//     <Avatar
//       img={person.pictureUrl}
//       name={`${person.firstName} ${person.lastName}`}
//       // alt="User avatar"
//     />

//     <VerticalLayout style={{ lineHeight: 'var(--lumo-line-height-m)' }}>
//       <span>
//         {person.firstName} {person.lastName}
//       </span>
//       <span
//         style={{ fontSize: 'var(--lumo-font-size-s)', color: 'var(--lumo-secondary-text-color)' }}
//       >
//         {person.email}
//       </span>
//     </VerticalLayout>
//   </HorizontalLayout>
// );

// const statusRenderer = (person: Person) => (
//   <span
//     {...({
//       theme: `badge ${person.status === 'Available' ? 'success' : 'error'}`,
//     } satisfies object)}
//   >
//     {person.status}
//   </span>
// );

const UserView = () => {
  const [items, setItems] = useState<User[]>([]);
  useEffect(() => {
    getUsers().then((response) => setItems(response));
  }, []);

  return (
    <Grid items={items}>
      <GridColumn path="firstName" />
      <GridColumn path="lastName" />
      <GridColumn path="email" />
      <GridColumn path="profession" />
    </Grid>
  );
};

export default UserView;
