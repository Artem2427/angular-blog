import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/ineterfaces';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.initializeFormValues();
  }

  ngOnDestroy(): void {
    this.form.reset();
  }

  private initializeFormValues(): void {
    this.form = this.formBuilder.group({
      title: this.formBuilder.control(null, Validators.required),
      text: this.formBuilder.control(null, Validators.required),
      author: this.formBuilder.control(null, Validators.required),
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date(),
    };

    this.postsService.create(post).subscribe(() => {
      this.form.reset();
    });
  }
}
