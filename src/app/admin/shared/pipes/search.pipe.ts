import { Pipe, PipeTransform } from '@angular/core';
import { Post } from 'src/app/shared/ineterfaces';

@Pipe({
  name: 'searchPosts',
})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], search = '') {
    if (!search.trim()) {
      return posts;
    }

    return posts.filter((post) => {
      return post.title
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());
    });
  }
}
