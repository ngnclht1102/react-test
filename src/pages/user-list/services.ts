import { BASE_URL } from './constants';
import { TUser } from './type';

export const Services = {
  getUsers: (): Promise<Array<TUser>> => {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}/users`)
        .then((response) => response.json())
        .then((json) => resolve(json))
        .catch((error) => reject(error));
    });
  },
};
