import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from '../components/product/product.component';
import { SignInComponent } from '../components/auth/signin/signin.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { AuthGuard } from '../guards/auth.guard';
import { IsSignedInGuard } from '../guards/is-signed-in.guard';

const routes : Routes = [
  { path: '', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [IsSignedInGuard]},
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
