export interface IResponseType<P = {}> {
    code?: number;
    status: number;
    msg: string;
    data: P;
}
export interface IRequst {
    id?: number;
    userId?: number;
    name?: string;
    married?: boolean;
    age?: number;
    link?: string;
    birth?: string;
    address?: string;
}
