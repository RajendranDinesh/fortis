import axios from 'axios';

interface urlCollection {
    [key: string]: string | undefined
}

const IgressURLs: urlCollection = {
    "dev": "http://127.0.0.1:5000/api/",
    "prod": "https://igress.vercel.app/api/",
}

const BASE_URL = process.env.REACT_APP_ENV ? IgressURLs[process.env.REACT_APP_ENV] : IgressURLs["dev"];

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
    console.log(process.env.REACT_APP_ENV)
    const requestOptions = {
        method: method,
        url: url,
        data: body,
        params: params,
    };


    const token = localStorage.getItem('authToken');
    if (token) {
        SetHeader('Authorization', `Bearer ${token}`);
    }

    try {
        const response = await instance.request(requestOptions);
        return response;
    } catch (error) {

        if ((error as any).response && (error as any).response.status === 498) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            window.location.href = '/login';
        }

        throw error;
    }
}

export { SetHeader, RemoveHeader, Request };