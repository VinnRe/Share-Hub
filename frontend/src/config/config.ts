interface Endpoints {
    login: string,
    signup: string,
    logout: string,
    updateProfile: string,
    fetchProfileData: string,
    fileUpload: string,
    createItem: string,
}

export const endpoints: Endpoints = {
    login: `/api/user/login`,
    signup: `/api/user/signup`,
    logout: `/api/user/logout`,
    updateProfile: `/api/user/update/profile`,
    fetchProfileData: `/api/user/fetch`,
    fileUpload: `/api/image/upload`,

    createItem: `/api/list/create`,
}