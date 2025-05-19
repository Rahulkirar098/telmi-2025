import { instance } from './index';
import { endpoints } from './endpoints';

export const auth = {
  login: (body: any) => {
    return instance.post(endpoints.auth.loginUser, body);
  },
};

export const main = {
  getSingleProfile: (body: any) => {
    return instance.post(endpoints.main.getSingleProfile, body)
  }
}