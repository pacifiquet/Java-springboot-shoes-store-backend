export interface BackendErrorInterface {
  message: string;
  timeStamp: Date;
  path: string;
  statusCode: number;
}
