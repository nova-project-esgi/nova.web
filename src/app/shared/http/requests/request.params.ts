import {HttpHeaders} from '@angular/common/http';

export interface RequestParams {
  url?: string;
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
}
