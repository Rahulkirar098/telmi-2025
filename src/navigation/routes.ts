import {
  Login,
  SplashVideoScreen,
  Signup,
  ForgotPassword,
  OtpVerification,
  ResetPassword,
} from '../components/screen/auth';

import {
  FriendList,
  InviteFriend,
} from '../components/screen/main';

import {GoLiveTwo} from "../components/screen/main/goLiveTwo"

export const auhtNavigation = [
  {
    name: 'splash',
    component: SplashVideoScreen,
  },
  {
    name: 'login',
    component: Login,
  },
  {
    name: 'signup',
    component: Signup,
  },
  {
    name: 'forgot_password',
    component: ForgotPassword,
  },
  {
    name: 'opt_verification',
    component: OtpVerification,
  },
  {
    name: 'reset_password',
    component: ResetPassword,
  },
];

export const mainNavigation = [
  {
    name: 'golive',
    component: GoLiveTwo,
  },
  {
    name: 'friendlist',
    component: FriendList,
  },
  {
    name: 'invitefriend',
    component: InviteFriend,
  },
];
