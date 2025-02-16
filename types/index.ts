export interface RequestBody {
  name: any;
  email: any;
}

export interface Request {
  method: string;
  body: RequestBody;
}

export interface Response {
  json: (arg0: { id: number; name: string; email: string; }[]) => any;
  status: (arg0: number) => {
    (): any;
    new(): any;
    json: { (arg0: { id: number; name: string; email: string; }): any; new(): any; };
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
}
