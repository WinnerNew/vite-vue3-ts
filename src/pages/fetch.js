const baseUrl = 'http://10.203.237.157:3000';
import { ElMessage } from 'element-plus';

// 删除对象空值
const delEmptyQueryNodes = (obj = {}) => {
    Object.keys(obj).forEach((key) => {
        let value = obj[key];
        value && typeof value === 'object' && delEmptyQueryNodes(value);
        (value === '' ||
            value === null ||
            value === undefined ||
            value.length === 0) &&
            delete obj[key];
    });
    return obj;
};

// 对象转query
const toQueryStr = (param) => {
    const query = delEmptyQueryNodes(param);
    return query
        ? '?' +
              Object.keys(query)
                  .map((key) => `${key}=${query[key]}`)
                  .join('&')
        : '';
};

const http = ({ url, method, data }) => {
    const options = {
        method: method.toUpperCase(), //请求方法
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        }, //请求头
    };
    url = baseUrl + url;
    if (['POST', 'PUT'].includes(options.method)) {
        options.body = JSON.stringify(data) || {};
        options.headers = { 'Content-Type': 'application/json;charset=utf-8' };
    }
    if (['GET', 'DELETE'].includes(options.method)) {
        // options.body = data;
        options.headers = { 'Content-Type': 'application/json;charset=utf-8' };
    }
    if (options.method == 'GET') {
        url = url + toQueryStr(data);
    }
    console.log(options, 'options =>');
    return new Promise((resolve, reject) => {
        let total = 0;
        fetch(url, options)
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error(res.statusText);
                } else {
                    total = Number(res.headers.get('x-total-count'));
                    return res.json();
                }
            })
            .then((response) => {
                const res = total
                    ? { totalNum: total, data: response }
                    : { data: response };
                resolve(res);
            })
            .catch((error) => {
                ElMessage({
                    message: error,
                    type: 'error',
                });
                reject(error);
            });
    });
};

// 查询列表
export const searchUser = (data) => {
    return http({
        url: `/users`,
        method: 'get',
        data,
    });
};
// 查询单项
export const getUser = (data) => {
    return http({
        url: `/users/${data.id}`,
        method: 'get',
        data,
    });
};
// 更新
export const updateUser = (data) => {
    console.log(data);
    return http({
        url: `/users/${data.id}`,
        method: 'put',
        data,
    });
};
// 删除
export const delUser = (data) => {
    return http({
        url: `/users/${data.id}`,
        method: 'delete',
        data,
    });
};

// 新增
export const addUser = (data) => {
    return http({
        url: `/users`,
        method: 'post',
        data,
    });
};
