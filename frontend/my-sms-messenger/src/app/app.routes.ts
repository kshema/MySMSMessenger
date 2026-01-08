import { Routes } from '@angular/router';
import { MessageSend } from './message-send/message-send';
import { SignUp } from './sign-up/sign-up';
import { Login } from './login/login';

export const routes: Routes = [
    { path: 'sign-up', component: SignUp },
    { path: 'login', component: Login },
    { path: 'send-message', component: MessageSend },
    { path: '', component: Login },
];
