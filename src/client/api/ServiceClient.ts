export interface DummyData {
  response?: any;
  error?: string;
}

export class ServiceClient {
  private _apiRoot: string;

  constructor(apiRoot: string) {
    this._apiRoot = apiRoot;
  }

  public async getDummyData(): Promise<DummyData> {
    try {
      const url = `${this._apiRoot}/test`;
      const res = await fetch(url);

      const json = await res.json();
      return { response: json };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }
}
