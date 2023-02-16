import { TUser } from '@pages/user-list/type';
import { getGoogleMapUrlByLatLng } from '../../../user-list/utils';
import React from 'react';

type TUserItemProps = {
  user: TUser;
};

export const UserItem = ({ user }: TUserItemProps) => {
  const googleMapUrl = getGoogleMapUrlByLatLng(user.address.geo.lat, user.address.geo.lng);

  return (
    <div className="hover:shadow-lg hover:bg-pink-500 rounded-lg bg-pink-400 mt-5 p-5 flex items-center justify-between">
      <div>
        <p data-testid="user-name" className="font-bold text-lg text-white">Name: {user?.name}</p>
        <p data-testid="company-name" className="text-md text-gray-100">Company: {user?.company?.name}</p>
        <p data-testid="address" className="text-md text-gray-100">
          {`Adress: 
          ${user?.address?.suite ?? ''},
          ${user?.address?.street ?? ''}, 
          ${user?.address?.zipcode ?? ''},
          ${user?.address?.city ?? ''}`}
        </p>
      </div>
      <a
        className="text-md text-gray-100 underline italic"
        href={`${googleMapUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on map
      </a>
    </div>
  );
};
