import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MovieService {
  data: Observable<any>;
  constructor(private http:HttpClient) {
  }
  searchapiItems(apiItemsName) {
    var url = 'http://api.walmartlabs.com/v1/search?apiKey=vwtzj6yrpv53yrp62squshbm&lsPublisherId={Your%20LinkShare%20Publisher%20Id}&query='+encodeURI(apiItemsName);
    this.data = this.http.get(url).map(ite => (<any>ite));
    var response = this.data;
    return response;
  }
}
