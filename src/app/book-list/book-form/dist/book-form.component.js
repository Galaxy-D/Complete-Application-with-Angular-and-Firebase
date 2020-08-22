"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BookFormComponent = void 0;
var core_1 = require("@angular/core");
var book_model_1 = require("src/app/models/book.model");
var forms_1 = require("@angular/forms");
var BookFormComponent = /** @class */ (function () {
    function BookFormComponent(formBuilder, booksService, router) {
        this.formBuilder = formBuilder;
        this.booksService = booksService;
        this.router = router;
    }
    BookFormComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    BookFormComponent.prototype.initForm = function () {
        this.bookForm = this.formBuilder.group({
            title: ['', forms_1.Validators.required],
            author: ['', forms_1.Validators.required],
            synopsis: ''
        });
    };
    BookFormComponent.prototype.onSaveBook = function () {
        var title = this.bookForm.get('title').value;
        var author = this.bookForm.get('author').value;
        var synopsis = this.bookForm.get('synopsis').value;
        var newBook = new book_model_1.Book(title, author);
        newBook.synopsis = synopsis;
        this.booksService.createNewBook(newBook);
        this.router.navigate(['/books']);
    };
    BookFormComponent = __decorate([
        core_1.Component({
            selector: 'app-book-form',
            templateUrl: './book-form.component.html',
            styleUrls: ['./book-form.component.scss']
        })
    ], BookFormComponent);
    return BookFormComponent;
}());
exports.BookFormComponent = BookFormComponent;
