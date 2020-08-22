import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';
import * as firebase from 'firebase';
// import DataSnapshot = firebase.database.DataSnapshot; : DataSnapshot

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  constructor() { this.getBooks(); }

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  // this method allow us to save our book list on firebase server
  /* 
    la méthode  set() : permet d'enregistrer la liste sur un node de la base de données, 
    set()  fonctionne plus ou moins comme  put()  pour le HTTP : il écrit et remplace les données au node donné.
    La méthode  ref() :retourne une référence au node demandé de la base de données,
  */
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

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

  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data) => {
          this.books = data.val() ? data.val() : [];
          this.emitBooks();
        }
      );
  }

  // méthode pour récupérer un seul livre

  /* 
    La fonction  getSingleBook()  récupère un livre selon son id, qui est simplement ici son index dans l'array enregistré.  
    Vous utilisez  once() , qui ne fait qu'une seule requête de données.  
    Du coup, elle ne prend pas une fonction callback en argument mais retourne une Promise, 
    permettant l'utilisation de  .then()  pour retourner les données reçues.
  */
  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  //method to create a new book

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  //method to remove a book
  
  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
}
