import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
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
    console.log(this.form, 'this.form');
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
        this.form.reset();
        this.submitted = false;
        this.router.navigate(['/admin', 'dashboard']);
      },
      error: () => {
        this.submitted = false;
      },
    });
  }
}
