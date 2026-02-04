export interface BaseResponse<T> {
    status: number;
    result: string;
    data: T;
    message: string;
}