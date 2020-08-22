import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book: Book;

  constructor(
    private route: ActivatedRoute, 
    private booksService: BooksService,
    private router: Router) {}

  ngOnInit() {
    /* 
      on crée un book vide car, puisque la méthode de service pour récupérer un livre est asynch et peut prendre de temps
      si la page essaie de s'affiche alors que le book n'est pas encore arrivé, on va avoir des erreurs, des bugs, donc 
      c'est pour ça on crée un book vide temporaire 

      Le component récupère le livre demandé par son id grâce à  getSingleBook() , et l'affiche dans le template
    */
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
  }
  
  onBack() {
    this.router.navigate(['/books']);
  }

}
