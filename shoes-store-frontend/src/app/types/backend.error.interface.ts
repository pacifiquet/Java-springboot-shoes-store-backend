export interface BackendErrorInterface {
  message: string;
  error?: string;
  timeStamp: Date;
  path: string;
  statusCode: number;
}
