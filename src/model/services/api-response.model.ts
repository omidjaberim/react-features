export interface ApiResponse<DataModel> {
  config: object;
  data: DataModel;
  headers: object;
  request: object;
  status: number;
  statusText: string;
}
