import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JSONPlaceholderService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {

    const url = "https://jsonplaceholder.typicode.com/users";

    return this.http.get<any>(url)

  }
  getPosts() {
    const url = "http://jsonplaceholder.typicode.com/posts";
    return this.http.get(url);
  }

  getComments(){
    const url = "http://jsonplaceholder.typicode.com/comments";
    return this.http.get(url);
  }


}
