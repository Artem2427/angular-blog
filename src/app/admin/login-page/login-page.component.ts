import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/shared/ineterfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean;
  public message: string;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Пожалуйста, авторизируйтесь';
      } else if (params['authFailed']) {
        this.message = 'Сессия истекла. Введите данные заного';
      }
    });
  }

  public initializeForm(): void {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [
        Validators.required,
        Validators.email,
      ]),
      password: this.formBuilder.control(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  public submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.authService.login(user).subscribe({
      next: () => {
        this.submitted = false;
        this.router.navigate(['/admin', 'dashboard']);
        this.form.reset();
      },
      error: () => {
        this.submitted = false;
      },
    });
  }
}
