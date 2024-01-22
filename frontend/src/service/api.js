import { request } from '../utils/request';

export const getDepartment = () => {
	return request('get', '/user/department/get.do'); // 查询部门
};


export const getArticleList = () => {
	return request('get', '/api/getArticleList');
}; // 获取文章列表
