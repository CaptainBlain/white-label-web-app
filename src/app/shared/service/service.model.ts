import {File} from '../file/file.model';

export class Service {
  public id: string;
  public title: string;
  public desc: string;
  public sortOrder: number;
  public image: File;
  public createdDate: Date;

  constructor(id: string,
              title: string,
              desc: string,
              sortOrder: number,
              image: File,
              createdDate: Date
  ) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.sortOrder = sortOrder;
    this.image = image;
    this.createdDate = createdDate;
  }
}
