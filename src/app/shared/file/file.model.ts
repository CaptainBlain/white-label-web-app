export class File {
  public id: string;
  public type: string;
  public title: string;
  public url: string;
  public createdDate: Date;

  constructor(id: string,
              type: string,
              title: string,
              url: string,
              createdDate: Date) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.url = url;
    this.createdDate = createdDate;
  }
}
