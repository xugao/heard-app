export interface GetBudgetsResponse {
  response?: { _id: string; name: string; amount: number }[];
  error?: string;
}

export interface GetBudgetsResponse {
  response?: { _id: string; name: string; amount: number }[];
  error?: string;
}

export class ServiceClient {
  private _apiRoot: string;

  constructor(apiRoot: string) {
    this._apiRoot = apiRoot;
  }

  public async getBudgetData(): Promise<GetBudgetsResponse> {
    try {
      const url = `${this._apiRoot}/budget`;
      const res = await fetch(url);

      const json = await res.json();
      return { response: json };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }

  public async addBudgetData(budget: {
    name: string;
    amount: number;
  }): Promise<GetBudgetsResponse> {
    try {
      const url = `${this._apiRoot}/budget`;
      const res = await fetch(url, {
        body: JSON.stringify(budget),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      console.log('budget', budget);
      const json = await res.json();
      return { response: json };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }
}
