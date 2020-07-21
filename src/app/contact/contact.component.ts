import {Component, OnInit, ViewChild} from '@angular/core';
import {ContactForm} from '../shared/contact-form/contact-form.model';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ContactFormService} from '../shared/contact-form/contact-form.service';
import {PageService} from '../shared/page/page.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  isLoading: Observable<boolean>;

  @ViewChild('f', { static: false }) signUpForm: NgForm;

  contact: ContactForm  = {
    name: '',
    email: '',
    subject: '',
    phone: '',
    content: ''
  };


  constructor(private pageService: PageService, private snackBar: MatSnackBar, public contactService: ContactFormService) {
  }

  ngOnInit(): void {
    this.pageService.updatePage(true, '../assets/contact-min.jpg', 'Contact Us');
  }

  onSubmit() {

    this.contact.name = this.signUpForm.value.userData.name;
    this.contact.email = this.signUpForm.value.userData.email;
    this.contact.subject = this.signUpForm.value.userData.subject;
    this.contact.phone = this.signUpForm.value.userData.phone;
    this.contact.content = this.signUpForm.value.userData.content;

    this.contactService.sendContactForm(this.contact)
      .subscribe(response => {
        console.log(response.message)
        this.snackBar.open('Successfully sent contact form', 'close', {
          duration: 2000,
        });

        this.signUpForm.reset();
      });
  }
}
