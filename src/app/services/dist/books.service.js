"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BooksService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var firebase = require("firebase");
// import DataSnapshot = firebase.database.DataSnapshot; : DataSnapshot
var BooksService = /** @class */ (function () {
    function BooksService() {
        this.books = [];
        this.booksSubject = new rxjs_1.Subject();
        this.getBooks();
    }
    BooksService.prototype.emitBooks = function () {
        this.booksSubject.next(this.books);
    };
    // this method allow us to save our book list on firebase server
    /*
      la méthode  set() : permet d'enregistrer la liste sur un node de la base de données,
      set()  fonctionne plus ou moins comme  put()  pour le HTTP : il écrit et remplace les données au node donné.
      La méthode  ref() :retourne une référence au node demandé de la base de données,
    */
    BooksService.prototype.saveBooks = function () {
        firebase.database().ref('/books').set(this.books);
    };
    // méthode pour récupérer la liste entière des livres 
    /*
      la méthode  on() .  Le premier argument  'value'  demande à Firebase d'exécuter le callback
      à chaque modification de valeur enregistrée au endpoint choisi : cela veut dire que si vous modifiez
      quelque chose depuis un appareil, la liste sera automatiquement mise à jour sur tous les appareils connectés.
  
      Le deuxième argument est la fonction callback, qui reçoit ici une  DataSnapshot  : un objet correspondant au node demandé
      comportant plusieurs membres et méthodes
  
      La méthode val()  retourne la valeur des données, tout simplement.
      Votre callback prend également en compte le cas où le serveur ne retourne rien pour éviter les bugs potentiels.
    */
    BooksService.prototype.getBooks = function () {
        var _this = this;
        firebase.database().ref('/books')
            .on('value', function (data) {
            _this.books = data.val() ? data.val() : [];
            _this.emitBooks();
        });
    };
    // méthode pour récupérer un seul livre
    /*
      La fonction  getSingleBook()  récupère un livre selon son id, qui est simplement ici son index dans l'array enregistré.
      Vous utilisez  once() , qui ne fait qu'une seule requête de données.
      Du coup, elle ne prend pas une fonction callback en argument mais retourne une Promise,
      permettant l'utilisation de  .then()  pour retourner les données reçues.
    */
    BooksService.prototype.getSingleBook = function (id) {
        return new Promise(function (resolve, reject) {
            firebase.database().ref('/books/' + id).once('value').then(function (data) {
                resolve(data.val());
            }, function (error) {
                reject(error);
            });
        });
    };
    //method to create a new book
    BooksService.prototype.createNewBook = function (newBook) {
        this.books.push(newBook);
        this.saveBooks();
        this.emitBooks();
    };
    //method to remove a book
    // Il faut également prendre en compte que si un livre est supprimé, il faut également en supprimer la photo. 
    BooksService.prototype.removeBook = function (book) {
        if (book.photo) {
            var storageRef = firebase.storage().refFromURL(book.photo);
            storageRef["delete"]().then(function () {
                console.log('Photo removed!');
            }, function (error) {
                console.log('Could not remove photo! : ' + error);
            });
        }
        var bookIndexToRemove = this.books.findIndex(function (bookEl) {
            if (bookEl === book) {
                return true;
            }
        });
        this.books.splice(bookIndexToRemove, 1);
        this.saveBooks();
        this.emitBooks();
    };
    //this method allow us to upload a picture for our book
    BooksService.prototype.uploadFile = function (file) {
        return new Promise(function (resolve, reject) {
            // on crée ici une sorte de fichier unique
            var almostUniqueFileName = Date.now().toString();
            var upload = firebase
                .storage()
                .ref()
                .child('images/' + '_' + almostUniqueFileName + '_' + file.name)
                .put(file);
            upload.on(firebase.storage.TaskEvent.STATE_CHANGED, function () {
                console.log('Chargement…');
            }, function (error) {
                console.log('Erreur de chargement ! : ' + error);
                reject();
            }, function () {
                resolve(upload.snapshot.ref.getDownloadURL());
            });
        });
    };
    BooksService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BooksService);
    return BooksService;
}());
exports.BooksService = BooksService;
