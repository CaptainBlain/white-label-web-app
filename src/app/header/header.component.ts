import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PageService} from '../shared/page/page.service';
import {Page} from '../shared/page/page.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  shouldShow = false;
  imageAssetUrl = '../../../assets/our-work.png';
  name = 'Our Work';
  linearGradient = 'rgba(20, 20, 20, 0.20)';

  private pageSub: Subscription;

  constructor(private pageService: PageService) { }

  ngOnInit(): void {

    this.pageSub = this.pageService
      .getPageUpdatedListener()
      .subscribe((pageData: {page: Page}) => {
        this.shouldShow = pageData.page.shouldShow;
        this.imageAssetUrl = pageData.page.imageAssetUrl;
        this.name = pageData.page.name;

      });
  }

  ngOnDestroy() {
    this.pageSub.unsubscribe();
  }

}
