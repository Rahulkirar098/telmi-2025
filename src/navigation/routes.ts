import {
  Login,
  SplashVideoScreen,
  Signup,
  ForgotPassword,
  OtpVerification,
  ResetPassword,
} from '../components/screen/auth';

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
