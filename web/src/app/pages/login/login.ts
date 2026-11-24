import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../service/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private auth = inject(Auth);
  private router = inject(Router);

  erro = signal('');

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  entrar() {
    const { email, senha} = this.form.value;
    this.auth.login(email!, senha!).subscribe({
      next: () => {
        console.log('Login bem-sucedido');
      },
      error: () => {
        this.erro.set('Email ou senha inválidos');
      }
    });
  }

}
