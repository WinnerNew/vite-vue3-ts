import request from '@/service/axios';
import * as T from './type';
/**
 * 登录
 */
export const login = (username: string, password: string) => {
    return request<T.IResponseType<T.ILogin>>({
        url: '/api/auth/login',
        method: 'post',
        data: {
            username,
            password,
        },
    });
};
