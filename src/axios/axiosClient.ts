import axios from 'axios';
import urlJoin from 'url-join';
import { jsonToFormData } from 'formdata2json';

const API_KEY = process.env.VITE_API_URL;

export const apiClient = axios.create({
    baseURL: API_KEY,
    headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
    },
});

const pendingRequests: any = {};

const makeCancellable = (requestId: any) => {
    if (!requestId) return null;
    if (pendingRequests[requestId]) {
        pendingRequests[requestId].abort();
        delete pendingRequests[requestId];
    }
    const controller = new AbortController();
    pendingRequests[requestId] = controller;
    return controller.signal;
};

/**
 * Request function
 * @param {string | URL} endpoint - Endpoint or URL
 * @param {object} [params={method: GET, type: 'application/json', params: null, data: null}] - Request data
 */
const request = async (url: any, params: any = null, auth = null) => {
    const req_id = params.req_id || null;
    const options: any = {
        method: params.method || 'GET',
        type: params.type || 'application/json',
        headers: params.headers || null,
        params: params.params || null,
        data: params.data || null,
    };

    url = options.params ? urlJoin(url, `?${new URLSearchParams(options.params).toString()}`) : url;

    if (options.data) {
        if (options.type === 'application/json') {
            options.data = JSON.stringify(options.data);
            // @ts-ignore
        } else if (options.data instanceof FormData) {
            jsonToFormData(options.data);
        }
    }

    const token: any = localStorage.getItem('token');

    try {
        let response = await apiClient.request({
            url: url,
            method: options.method,
            headers: {
                'Content-Type': options.type,
                ...(token && { Authorization: `Bearer ${token}` }),
                // @ts-ignore
                ...(!token && auth && { Authorization: `${auth}` }),
                ...(options.headers && options.headers),
            },
            ...(options.data && { data: options.data }),
            ...(req_id && { signal: makeCancellable(req_id) }),
        });
        return response;
    } catch (error: any) {
        if (error.response) {
            console.log('Data Error : ', error.response.data);
            console.log('Status Error : ', error.response.status);
            console.log('Header Error : ', error.response.headers);
        } else if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else if (error.request) {
            console.log('Request error : ', error.request);
        } else if (error.message) {
            console.log('Message error : ', error.message);
        } else {
            console.log('Config error : ', error.config);
        }

        if (axios.isAxiosError(error)) {
            // Handle Axios error
            return {
                error: true,
                message: error.response?.data?.message || error.message,
                status: error.response?.status,
                data: error.response?.data,
            };
        } else {
            // Handle generic errors
            return {
                error: true,
                message: error.message,
            };
        }
    }
};

export default request;

/**
 * Alias function for making get request
 * @param {string | URL} endpoint - Endpoint or URL
 * @param {object} [params={params: null, data: null}] - Request data
 */
export const get = async (url: any, params: any = null) => {
    return await request(url, { ...(params && params) });
};

/**
 * Alias function for making post request
 * @param {string | URL} endpoint - Endpoint or URL
 * @param {object} [params={type: "application/json", params: null, data: null}] - Request data
 */
export const post = async (url: any, params: any = null, auth = null) => {
    return await request(url, { method: 'POST', ...(params && params) }, auth);
};

/**
 * Alias function for making patch request
 * @param {string | URL} endpoint - Endpoint or URL
 * @param {object} [params={type: "application/json", params: null, data: null}] - Request data
 */
export const patch = async (url: any, params: any = null, auth = null) => {
    return await request(url, { method: 'PATCH', ...(params && params) }, auth);
};
