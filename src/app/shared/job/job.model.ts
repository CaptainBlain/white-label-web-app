import {File} from '../file/file.model';
import {State} from '../enum/state';
import {Category} from '../category/category.model';


export class Job {
  public id: string;
  public style: string;
  public state: State;
  public category: Category;
  public images: File[]
  public beforeImage: File;
  public afterImage: File;
  public mainImage: File;
  public title: string;
  public body: string;
  public createdDate: Date;

  constructor(id: string,
              style: string,
              state: State,
              category: Category,
              images: File[],
              beforeImage: File,
              afterImage: File,
              mainImage: File,
              title: string,
              body: string,
              createdDate: Date
  ) {
    this.id = id;
    this.style = style;
    this.state = state;
    this.category = category;
    this.images = images;
    this.beforeImage = beforeImage;
    this.afterImage = afterImage;
    this.mainImage = mainImage;
    this.title = title;
    this.body = body;
    this.createdDate = createdDate;
  }
}
