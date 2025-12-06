const API_URL = import.meta.env.VITE_API_URL || '';

interface Endpoints {
    login: string;
    signup: string;
    logout: string;
    updateProfile: string;
    fetchProfileData: string;
    fileUpload: string;
    createItem: string;
    approveItem: string;
    deleteItem: string;
    fetchUnapproved: string;
    fetchApproved: string;
    listSearchFetch: string;
    listTagsFetch: string;
    listRequest: string;
    listAccept: string;
    listReject: string;
    fetchRequests: string;
    fetchReceipts: string;
}

export const endpoints: Endpoints = {
    login: `${API_URL}/api/user/login`,
    signup: `${API_URL}/api/user/signup`,
    logout: `${API_URL}/api/user/logout`,
    updateProfile: `${API_URL}/api/user/update/profile`,
    fetchProfileData: `${API_URL}/api/user/fetch`,
    fileUpload: `${API_URL}/api/image/upload`,

    createItem: `${API_URL}/api/list/create`,
    approveItem: `${API_URL}/api/list/approve`,
    deleteItem: `${API_URL}/api/list/delete`,
    fetchUnapproved: `${API_URL}/api/list/fetch/unapproved`,
    fetchApproved: `${API_URL}/api/list/fetch/approved`,

    listSearchFetch: `${API_URL}/api/list/fetch/search`,
    listTagsFetch: `${API_URL}/api/list/fetch/tags`,
    listRequest: `${API_URL}/api/list/request`,
    listAccept: `${API_URL}/api/list/accept`,
    listReject: `${API_URL}/api/list/reject`,

    fetchRequests: `${API_URL}/api/list/fetch/request`,
    fetchReceipts: `${API_URL}/api/list/fetch/receipt`,
};
