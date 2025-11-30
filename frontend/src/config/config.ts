interface Endpoints {
    login: string,
    signup: string,
    logout: string,
    updateProfile: string,
    fetchProfileData: string,
}

export const endpoints: Endpoints = {
    login: `/api/user/login`,
    signup: `/api/user/signup`,
    logout: `/api/user/logout`,
    updateProfile: `/api/update/profile`,
    fetchProfileData: `/api/fetch`,
}