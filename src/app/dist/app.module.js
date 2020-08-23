"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
//import required modules
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
//import required components
var app_component_1 = require("./app.component");
var signup_component_1 = require("./auth/signup/signup.component");
var signin_component_1 = require("./auth/signin/signin.component");
var book_list_component_1 = require("./book-list/book-list.component");
var single_book_component_1 = require("./book-list/single-book/single-book.component");
var book_form_component_1 = require("./book-list/book-form/book-form.component");
var header_component_1 = require("./header/header.component");
//import required services
var auth_guard_service_1 = require("./services/auth-guard.service");
var auth_service_1 = require("./services/auth.service");
var books_service_1 = require("./services/books.service");
//making route to navigate into main app
var appRoutes = [
    { path: 'auth/signup', component: signup_component_1.SignupComponent },
    { path: 'auth/signin', component: signin_component_1.SigninComponent },
    { path: 'books', component: book_list_component_1.BookListComponent },
    { path: 'books/new', component: book_form_component_1.BookFormComponent },
    { path: 'books/view/:id', component: single_book_component_1.SingleBookComponent },
    { path: 'books', canActivate: [auth_guard_service_1.AuthGuardService], component: book_list_component_1.BookListComponent },
    { path: 'books/new', canActivate: [auth_guard_service_1.AuthGuardService], component: book_form_component_1.BookFormComponent },
    { path: 'books/view/:id', canActivate: [auth_guard_service_1.AuthGuardService], component: single_book_component_1.SingleBookComponent },
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: '**', redirectTo: 'books' }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                signup_component_1.SignupComponent,
                signin_component_1.SigninComponent,
                book_list_component_1.BookListComponent,
                single_book_component_1.SingleBookComponent,
                book_form_component_1.BookFormComponent,
                header_component_1.HeaderComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                router_1.RouterModule.forRoot(appRoutes)
            ],
            providers: [auth_service_1.AuthService, books_service_1.BooksService, auth_guard_service_1.AuthGuardService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
