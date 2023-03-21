import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/ineterfaces';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  private pSub: Subscription;
  private dSub: Subscription;
  public searchStr: string = '';

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.pSub = this.postsService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  public remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }
}
