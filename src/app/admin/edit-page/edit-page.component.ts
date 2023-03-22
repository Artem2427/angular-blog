import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Post } from 'src/app/shared/ineterfaces';
import { PostsService } from 'src/app/shared/services/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private post: Post;
  public submitted: boolean;

  private uSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.initializeFormValues();
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

  private initializeFormValues(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getById(params['id']);
        })
      )
      .subscribe({
        next: (post: Post) => {
          this.post = post;
          this.form = this.formBuilder.group({
            title: this.formBuilder.control(post.title, Validators.required),
            text: this.formBuilder.control(post.text, Validators.required),
          });
        },
      });
  }

  public submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.uSub = this.postsService
      .update({
        ...this.post,
        text: this.form.value.text,
        title: this.form.value.title,
      })
      .subscribe({
        next: () => {
          this.submitted = false;
          this.alertService.warning('Пост бил обновлен!');
        },
      });
  }
}
