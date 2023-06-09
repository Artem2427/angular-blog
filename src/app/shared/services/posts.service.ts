import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FbCreateResponse, Post } from 'src/app/shared/ineterfaces';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  public getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`).pipe(
      map((post: Post) => {
        return { ...post, id, date: new Date(post.date) };
      })
    );
  }

  public getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date),
        }));
      })
    );
  }

  public create(post: Post): Observable<Post> {
    return this.http
      .post<FbCreateResponse>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((response: FbCreateResponse) => {
          return { ...post, id: response.name, date: new Date(post.date) };
        })
      );
  }

  public update(post: Post): Observable<Post> {
    return this.http.patch<Post>(
      `${environment.fbDbUrl}/posts/${post.id}.json`,
      post
    );
  }

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }
}
