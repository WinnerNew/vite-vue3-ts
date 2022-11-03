/**
 * 登录
 */

export interface IResponseType<P = {}> {
    code?: number;
    status: number;
    msg: string;
    data: P;
}
export interface ILogin {
    token: string;
    expires: number;
}
