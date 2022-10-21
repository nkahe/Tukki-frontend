import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TestingHenriComponent } from './testing-henri/testing-henri.component';
import { SubmitTicketComponent } from '../submit-ticket/submit-ticket.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'testing-henri', component: TestingHenriComponent },
  { path: 'submit-ticket', component: SubmitTicketComponent }
];

// { path: '', component: AppComponent }

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
