class BaseResponse<T> {
  public success: boolean;
  public message: string;
  public data: T;
  public error: any;

  constructor(success: boolean, message: string, data: any, error: any) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  static success<T>(message: string, data: T) {
    return new BaseResponse<T>(true, message, data, null);
  }

  static error<T>(message: string, error: any) {
    return new BaseResponse<T>(false, message, null as T, error);
  }
}

export default BaseResponse;
