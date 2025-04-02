import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
  { 
    path: 'list', 
    component: UserListComponent,
    title: 'User List' 
  },
  { 
    path: 'adduser',  // Make sure this matches EXACTLY what you're using in routerLink
    component: UserFormComponent,
    title: 'Add User' 
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', redirectTo: '/list' }
];