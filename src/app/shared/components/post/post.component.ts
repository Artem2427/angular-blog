import { Component, Input } from '@angular/core';
import { Post } from '../../ineterfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: Post;
}
