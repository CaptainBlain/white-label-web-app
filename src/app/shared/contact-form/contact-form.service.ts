import {Inject, Injectable} from '@angular/core';
import {ContactForm} from './contact-form.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {APP_CONFIG, AppConfig} from '../../app-config.module';

@Injectable({ providedIn: 'root' })
export class ContactFormService {

  private contacts: ContactForm[] = [ ];
  private contactsUpdated = new Subject<{ contacts: ContactForm[]; count: number }>();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { }

  sendContactForm(contact: ContactForm) {

    return this.http
      .post<{ message: string; contact: ContactForm; }>(
        this.config.apiEndpoint + '/contacts/create',
        {'businessId': this.config.businessId, 'name': contact.name, 'email': contact.email, 'content': contact.content},
        {  }
      );
  }


  getContactUpdateListener() {
    return this.contactsUpdated.asObservable();
  }


}
