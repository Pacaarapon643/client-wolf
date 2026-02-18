export interface BaseResponse<T> {
    status: number;
    result: string;
    data: T;
    message: string;
}

export type BaseResponseNodata = BaseResponse<void>;

export type BaseResponseString = BaseResponse<string>;
