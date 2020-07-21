import {Inject, Injectable} from '@angular/core';
import {Page} from './page.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {APP_CONFIG, AppConfig} from '../../app-config.module';

@Injectable({ providedIn: 'root' })
export class PageService {

    page = new Page(false, '', '');

    private pageUpdated = new Subject<{ page: Page }>();

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject(APP_CONFIG) private config: AppConfig
    ) { }

    getPageUpdatedListener() {
        return this.pageUpdated.asObservable();
    }

    updatePage(shouldShow: boolean, imageAssetUrl: string, name: string) {
        this.page.shouldShow = shouldShow;
        this.page.imageAssetUrl = imageAssetUrl;
        this.page.name = name;
        this.pageUpdated.next( {
            page: this.page
        });
    }
}
