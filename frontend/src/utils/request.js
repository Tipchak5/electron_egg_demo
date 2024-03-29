import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';

const baseUrl = 'http://172.16.15.1:8280'; // 1.15

const apiToken = localStorage.getItem('token');

axios.defaults.timeout = 15000;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + apiToken;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// 添加请求拦截器
axios.interceptors.request.use(
	(config) => {
		const apiToken = localStorage.getItem('token');
		const allowedUrls = ['staff/get.do', 'department/get.do', 'engineer/get.do', 'register.do'];
		const isUrl = allowedUrls.some((url) => config.url.includes(url));
		if (apiToken) {
			config.headers.Authorization = apiToken;
		} else if (isUrl) {
		} else {
			console.log('没有token');
			window.location.href = '/#/login';
		}
		return config;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

// 响应拦截
axios.interceptors.response.use(
	(config) => {
		return config;
	},
	(error) => {
		const isPreviw = error.config.url.includes('file/previewFile/preview.do');
		if (isPreviw) {
			//message.error('该文件无法预览！');
		}

		const stutas = error.response && error.response.status;
		if (stutas === 400) {
		}
		if (stutas === 424) {
			// 清空数据
			localStorage.clear();
			sessionStorage.clear();
			history.push('/login');
		}
		if (stutas === 403) {
		}
		if (stutas === 404) {
		}
		if (stutas === 500) {
		}
		if (stutas === 503) {
		}
		if (stutas === 10001) {
		 message.error('该文件无法预览！');
		}
		return Promise.reject(error);
	}
);

// 定义统一的请求函数
export const request = (method, url, data = {}, type) => {
	const resData = type === 'formData' ? qs.stringify(data) : data;
	const config = {
		method: method,
		url: baseUrl + url,
		...(method === 'get' || method === 'delete' ? { params: data } : { data: resData }),
	};

	return axios
		.request(config)
		.then((response) => {
			// 在这里可以对响应进行拦截、转换和处理
			return response.data;
		})
		.catch((error) => {
			// 在这里可以处理请求发生的错误
			console.log(error);
			message.error(error.message);
			throw error;
		});
};
