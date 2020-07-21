export class ContactForm {
  public name: string;
  public email: string;
  public subject: string;
  public phone: string;
  public content: string;


  constructor(name: string,
              email: string,
              subject: string,
              phone: string,
              content: string) {

    this.name = name;
    this.email = email;
    this.subject = subject;
    this.phone = phone;
    this.content = content;
  }
}
