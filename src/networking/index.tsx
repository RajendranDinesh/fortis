import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/api/';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10 * 1000,
  withCredentials: true
});

instance.interceptors.request.use(
    async (response) => {
        return response;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

const SetHeader = (key: string, value: string) => {
    instance.defaults.headers.common[key] = value;
};

const RemoveHeader = (key: string) => {
    delete instance.defaults.headers.common[key];
};

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const Request = async (method: RequestMethod, url: string, body?: any, params?: any) => {
    const requestOptions = {
        method: method,
        url: url,
        data: body,
        params: params,
    };

    try {
        const response = await instance.request(requestOptions);
        return response;
    } catch (error) {
        throw error;
    }
}

export { SetHeader, RemoveHeader, Request };