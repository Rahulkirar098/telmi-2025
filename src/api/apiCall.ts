import {instance} from './index';
import {endpoints} from './endpoints';

export const auth = {
  login: (body: any) => {
    return instance.post(endpoints.auth.loginUser, body);
  },
  signup: (body: any) => {
    return instance.post(endpoints.auth.signupUser, body);
  },
  verifyOtp: (body: any) => {
    return instance.post(endpoints.auth.verifyOtp, body);
  },
  resendOtp: (body: any) => {
    return instance.post(endpoints.auth.resendOtp, body);
  },
  forgotPassword: (body: any) => {
    return instance.post(endpoints.auth.forgotPassword, body);
  },
};

export const main = {
  getSingleProfile: (body: any) => {
    return instance.post(endpoints.main.getSingleProfile, body);
  },
  createRoom: (body: any) => {
    return instance.post(endpoints.main.createRoom, body);
  },
  getRoomList: (category: string) => {
    return instance.get(
      `${endpoints.main.getRoomList}?category=${category}&limit=10&offset=0`,
    );
  },
};
