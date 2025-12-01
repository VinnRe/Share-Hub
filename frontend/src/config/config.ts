interface Endpoints {
    login: string,
    signup: string,
    logout: string,
    updateProfile: string,
    fetchProfileData: string,
    fileUpload: string,
    createItem: string,
    approveItem: string,
    deleteItem: string,
    fetchUnapproved: string,
    listSearchFetch: string,
    listTagsFetch: string,
    listRequest: string,
}

export const endpoints: Endpoints = {
    login: `/api/user/login`,
    signup: `/api/user/signup`,
    logout: `/api/user/logout`,
    updateProfile: `/api/user/update/profile`,
    fetchProfileData: `/api/user/fetch`,
    fileUpload: `/api/image/upload`,

    createItem: `/api/list/create`,
    approveItem: `/api/list/approve`,
    deleteItem: `/api/list/delete`,
    fetchUnapproved: `/api/list/fetch/unapproved`,

    listSearchFetch: `/api/list/fetch/search`,
    listTagsFetch: `/api/list/fetch/tags`,
    listRequest: `/api/list/request`,
}