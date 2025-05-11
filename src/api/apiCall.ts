import {instance} from './index';
import {endpoints} from './endpoints';

export const auth = {
  login: (data: any) => {
    return instance.post(endpoints.auth.loginUser, data);
  },
};
