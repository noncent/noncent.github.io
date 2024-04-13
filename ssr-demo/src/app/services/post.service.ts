import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'https://5madgy2pye.execute-api.ap-south-1.amazonaws.com/catalog/onlinetests/mastercategories?lang=en';

  constructor(private httpClient: HttpClient) { }

  getPosts() {
    return this.httpClient.get(this.url);
  }

}