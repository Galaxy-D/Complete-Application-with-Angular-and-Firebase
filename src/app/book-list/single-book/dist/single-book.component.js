"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SingleBookComponent = void 0;
var core_1 = require("@angular/core");
var book_model_1 = require("src/app/models/book.model");
var SingleBookComponent = /** @class */ (function () {
    function SingleBookComponent(route, booksService, router) {
        this.route = route;
        this.booksService = booksService;
        this.router = router;
    }
    SingleBookComponent.prototype.ngOnInit = function () {
        var _this = this;
        /*
          on crée un book vide car, puisque la méthode de service pour récupérer un livre est asynch et peut prendre de temps
          si la page essaie de s'affiche alors que le book n'est pas encore arrivé, on va avoir des erreurs, des bugs, donc
          c'est pour ça on crée un book vide temporaire
    
          Le component récupère le livre demandé par son id grâce à  getSingleBook() , et l'affiche dans le template
        */
        this.book = new book_model_1.Book('', '');
        var id = this.route.snapshot.params['id'];
        this.booksService.getSingleBook(+id).then(function (book) {
            _this.book = book;
        });
    };
    SingleBookComponent.prototype.onBack = function () {
        this.router.navigate(['/books']);
    };
    SingleBookComponent = __decorate([
        core_1.Component({
            selector: 'app-single-book',
            templateUrl: './single-book.component.html',
            styleUrls: ['./single-book.component.scss']
        })
    ], SingleBookComponent);
    return SingleBookComponent;
}());
exports.SingleBookComponent = SingleBookComponent;
