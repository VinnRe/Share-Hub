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
    fetchApproved: string,
    listSearchFetch: string,
    listTagsFetch: string,
    listRequest: string,
    listAccept: string,
    listReject: string,
    fetchRequests: string,
    fetchReceipts: string,
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
    fetchApproved: `/api/list/fetch/approved`,

    listSearchFetch: `/api/list/fetch/search`,
    listTagsFetch: `/api/list/fetch/tags`,
    listRequest: `/api/list/request`,
    listAccept: `/api/list/accept`,
    listReject: `/api/list/reject`,

    fetchRequests: `/api/list/fetch/request`,
    fetchReceipts: `/api/list/fetch/receipt`,
}