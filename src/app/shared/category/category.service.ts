import {Inject, Injectable} from '@angular/core';
import {Category} from '../category/category.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {APP_CONFIG, AppConfig} from '../../app-config.module';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  private categories: Category[] = [ ];
  private categoriesUpdated = new Subject<{ categories: Category[]; count: number }>();
  private categoryUpdated = new Subject<{ category: Category }>();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { }

  getCategoriesUpdateListener() {
    return this.categoriesUpdated.asObservable();
  }

  getCategoryUpdateListener() {
    return this.categoryUpdated.asObservable();
  }
  
  getCategories(currentPage: number, limit: number) {
    const queryParams = `?businessId=${this.getBusinessId()}&page=${currentPage}&limit=${limit}`;
    console.log(this.config.apiEndpoint + '/categories/getAdmin' + queryParams);

    this.http
      .get<{ message: string; categories: Category[]; count: number }>(
        this.config.apiEndpoint + '/categories/get' + queryParams
      )
      .subscribe(transformedCategoryData => {
        this.categories = transformedCategoryData.categories;
        this.categoriesUpdated.next({
          categories: [...this.categories],
          count: transformedCategoryData.count
        });
      });
  }


  getCategory(id: string) {
    return this.http
      .get<{ category: Category}>(
        this.config.apiEndpoint + '/categories/get/' + id
      );
  }


  private getBusinessId() {

    return '5f04557aafdb2c71c2de5159';

  }

}
