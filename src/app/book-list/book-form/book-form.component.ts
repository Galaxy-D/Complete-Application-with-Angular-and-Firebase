import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})

export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  //allow us to know if there is such file wich is uploading
  fileIsUploading = false;
  //l'url de l'image a récupérer
  fileUrl: string;
  //allow to notice that file is uploaded
  fileUploaded = false;

  constructor(
    private formBuilder: FormBuilder, 
    private booksService: BooksService,
    private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }
  
  onSaveBook() {
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const synopsis = this.bookForm.get('synopsis').value;
    const newBook = new Book(title, author);
    newBook.synopsis = synopsis;
    if(this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }

  //this method will fire uploadFile service method and update the DOM content

  /* 
    You will use fileIsUploading to disable the template's submit button while the file is uploading 
    to avoid any errors - once the upload is complete, the component saves the returned URL in fileUrl 
    and changes the state of the component to say uploading is finished.
  */

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }
  
  // this method allow to link  <input type="file"> to  onUploadFile() method
 
  detectFiles(event) { this.onUploadFile(event.target.files[0]);}

}
