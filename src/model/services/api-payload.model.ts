export interface BaseApiPayloadFilterTest {
    pagination: {
      limit: number;
      page: number;
    };
    sort?: Array<{
      field: string;
      order: string;
    }>;
    filter?: Record<string, any>;
}

export interface ApiPayload {
  page : number;
  size : number ;
}

