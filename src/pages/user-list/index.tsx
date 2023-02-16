import React from 'react';
import { useQuery } from '@pages/user-list/utils';
import { UserItem } from './components/user-item';
import { Services } from './services';
import { TUser } from './type';

export default (): JSX.Element => {
  const query = useQuery(Services.getUsers);
  if (query.isWorking || query.isIdle) {
    return <div id="loading">loading</div>;
  }
  if (query.isError) {
    return (
      <div id="error">
        <h1>Error while loading</h1>
        <button
          id="refresh-button"
          className="text-xl font-bold outline outline-offset-2 outline-1"
          onClick={query.refresh}
        >
          Refresh
        </button>
      </div>
    );
  }
  if (!query.data?.length && !query.isWorking && !query.isIdle) {
    return <div>Empty, there are no users.</div>;
  }

  return (
    <div className="container mx-auto w-4/5 my-10" id="container">
      <h1 className="text-xl font-bold">The list of users:</h1>
      <button
        id="refresh-button"
        className="text-xl font-bold outline outline-offset-2 outline-1"
        onClick={query.refresh}
      >
        Refresh
      </button>
      {query.data?.map((user: TUser) => {
        return <UserItem key={user.id} user={user} />;
      })}
    </div>
  );
};
