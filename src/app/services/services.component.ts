import {Component, OnDestroy, OnInit} from '@angular/core';
import {Service} from '../shared/service/service.model';
import {Subscription} from 'rxjs';
import {PageService} from '../shared/page/page.service';
import {ServiceService} from '../shared/service/service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, OnDestroy {

  services: Service[];

  isLoading = false;

  private serviceSub: Subscription;

  constructor(private pageService: PageService,
              private serviceService: ServiceService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    // this.pageService.updatePage(true, '../../../assets/our-work-min.jpg', 'Our Work');
    this.services = [];
    this.serviceService.getServices(0, 100);
    this.serviceSub = this.serviceService
      .getServicesUpdateListener()
      .subscribe((catData: {services: Service[]; count: number}) => {
        this.isLoading = false;
        if (catData.services.length > 0) {
          this.services = catData.services;
        }
      });
  }

  onClickService(service: Service) {
    this.router.navigate(['./', service.id, 'details'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.serviceSub.unsubscribe();
  }

}
