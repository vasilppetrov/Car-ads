import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdCreateComponent } from './car-ad/ad-create/ad-create.component';
import { AdEditComponent } from './car-ad/ad-edit/ad-edit.component';
import { AdDetailsComponent } from './car-ad/ad-details/ad-details.component';
import { AdListComponent } from './car-ad/ad-list/ad-list.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { UserAdsComponent } from './user-ads/user-ads.component';
import { AdminGuard } from './auth/admin.guard';
import { EditGuard } from './auth/edit.guard';
import { SearchComponent } from './car-ad/search/search.component';



const routes: Route[] = [
    {
        path: 'auth', children: [
            { path: 'signin', component: SigninComponent },
            { path: 'signup', component: SignupComponent }
        ]
    },
    {
        path: 'car-ad', children: [
            { path: '', pathMatch: 'full', component: AdListComponent },
            { path: 'create', component: AdCreateComponent },
            { path: 'edit/:id', component: AdEditComponent, canActivate: [EditGuard] },
            { path: 'details/:id', component: AdDetailsComponent },
            { path: 'list', component: AdListComponent },
        ], canActivate: [AuthGuard]
    },
    {
        path: 'search', component: SearchComponent, canActivate: [AuthGuard]
    },
    {
        path: 'user-ads', component: UserAdsComponent, canActivate: [AuthGuard]
    },
    {
        path: 'admin', component: AdminComponent, canActivate: [AdminGuard]
    },
    { path: '', redirectTo: '/car-ad', pathMatch: 'full' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}

