import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { responsePosts } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagePosts = 0;
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyZWM2MjdmYWVkMzRjYjJjMzJjZTcxOSIsIm5hbWUiOiJKdWFuIHAiLCJlbWFpbCI6InRlc3QxQGxpdmUuY29tIiwiYXZhdGFyIjoiYXZhdGFyMS5wbmcifSwiaWF0IjoxNjYyNjgzODI4LCJleHAiOjE2NjUyNzU4Mjh9.xTySeR1GvveKJQlFrkgnrm2GAMF99nKndIFBVr2z9u0';

  constructor( private http: HttpClient) { }

  getPosts( pull: boolean = false ) {

    if ( pull ){
      this.pagePosts = 0;
    }

    let headers = new HttpHeaders({
      'x-token': this.token });
    let headersOptions = { headers: headers };

    this.pagePosts ++;

    return this.http.get<responsePosts>( `${ URL }/posts/?page=${ this.pagePosts }`, headersOptions);
 
  }


}
