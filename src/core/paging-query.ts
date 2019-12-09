
export interface IQueryResponse {
  data: any[];
  count: number;
}

export class PagingQuery {

  handleSuccess(query: any): IQueryResponse {
    const data: any[] = query[0];
    const count: number = query[1];

    return { data, count };
  }
}
