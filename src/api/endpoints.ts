export const endpoints = {
    auth: {
        loginUser: 'api/login',
        socialLogin: "api/google-signin",
        signup: 'api/signup',
        forgotPassword: 'api/forgot-password',
        verifyOtp: 'api/verify-otp',
        resetPassword: 'api/reset-password',
        resendOtp: 'auth/regenerate-otp',
        logout: 'api/logout',
        deleteAccount: 'auth/delete-account',
        profile: 'auth/profile',
        uploadImage: 'auth/upload-image',
        editProfile: 'auth/update-profile',
        updatePassword: 'auth/update-password',
        getSubscription: 'subscription/get',
        subscribe: 'subscription/subscribe',
        cancelSubscription: 'subscription/cancel',
    },

}