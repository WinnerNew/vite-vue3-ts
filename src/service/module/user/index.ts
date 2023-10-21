import request from '@/service/axios';
import * as T from './type';

// 查询
export const getUsers = (data: T.IRequst) => {
    return request<T.IResponseType<T.IRequst>>({
        url: '/users',
        method: 'post',
        data,
    });
};
