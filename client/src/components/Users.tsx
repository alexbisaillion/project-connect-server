import React from 'react';
import { getUsers } from '../api';

export const Users = () => {
  const [users, setUsers] = React.useState<IUser[]>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers.data);
    }
    fetchUsers();
  }, []);

  return (
    <h1>Hello</h1>
  );
}

{/* <div>
{users.map((user: IUser) => {
  return <div key={user.name}>{user.name}</div>
})}
</div> */}