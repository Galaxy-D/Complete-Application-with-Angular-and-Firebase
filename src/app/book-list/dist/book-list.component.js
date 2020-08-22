"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BookListComponent = void 0;
var core_1 = require("@angular/core");
var BookListComponent = /** @class */ (function () {
    function BookListComponent(booksService, router) {
        this.booksService = booksService;
        this.router = router;
    }
    // souscrit au Subject du service et déclenche sa première émission
    BookListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.booksSubscription = this.booksService.booksSubject.subscribe(function (books) {
            _this.books = books;
        });
        this.booksService.getBooks();
        this.booksService.emitBooks();
    };
    // permet de naviguer vers  BookFormComponent  pour la création d'un nouveau livre. 
    BookListComponent.prototype.onNewBook = function () {
        this.router.navigate(['/books', 'new']);
    };
    BookListComponent.prototype.onDeleteBook = function (book) {
        this.booksService.removeBook(book);
    };
    // permet de naviguer vers SingleBookComponent pour visualiser un livre donnée
    BookListComponent.prototype.onViewBook = function (id) {
        this.router.navigate(['/books', 'view', id]);
    };
    BookListComponent.prototype.ngOnDestroy = function () {
        this.booksSubscription.unsubscribe();
    };
    BookListComponent = __decorate([
        core_1.Component({
            selector: 'app-book-list',
            templateUrl: './book-list.component.html',
            styleUrls: ['./book-list.component.scss']
        })
    ], BookListComponent);
    return BookListComponent;
}());
exports.BookListComponent = BookListComponent;
