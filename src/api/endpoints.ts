export const endpoints = {
  auth: {
    loginUser: 'api/login',
    signupUser: 'api/signup',
    verifyOtp: 'api/verify-otp',
    resendOtp: '/api/resend-otp',
    forgotPassword: '/api/forgot-password',
  },
  main: {
    createRoom:"api/rooms/create",
    getRoomList:"api/rooms/list",
    getSingleProfile: '/api/getSingleProfile',
  },
};
