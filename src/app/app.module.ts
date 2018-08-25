import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdEditComponent } from './car-ad/ad-edit/ad-edit.component';
import { AdListComponent } from './car-ad/ad-list/ad-list.component';
import { AdDetailsComponent } from './car-ad/ad-details/ad-details.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AdCreateComponent } from './car-ad/ad-create/ad-create.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AdminComponent } from './admin/admin.component';
import { UserAdsComponent } from './user-ads/user-ads.component';
import { SearchComponent } from './car-ad/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    AdEditComponent,
    AdListComponent,
    AdDetailsComponent,
    AdCreateComponent,
    HeaderComponent,
    AdminComponent,
    UserAdsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
