import {Inject, Injectable} from '@angular/core';
import {Service} from '../service/service.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {APP_CONFIG, AppConfig} from '../../app-config.module';

@Injectable({ providedIn: 'root' })
export class ServiceService {

  private services: Service[] = [ ];
  private servicesUpdated = new Subject<{ services: Service[]; count: number }>();
  private serviceUpdated = new Subject<{ service: Service }>();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { }

  getServicesUpdateListener() {
    return this.servicesUpdated.asObservable();
  }

  getServiceUpdateListener() {
    return this.serviceUpdated.asObservable();
  }

  getServices(currentPage: number, limit: number) {
    const queryParams = `?businessId=${this.config.businessId}&page=${currentPage}&limit=${limit}`;

    this.http
      .get<{ message: string; services: Service[]; count: number }>(
        this.config.apiEndpoint + '/service/get' + queryParams
      )
      .subscribe(responseData => {
        console.log('responseData: ' + responseData.services)
        this.services = responseData.services;
        this.servicesUpdated.next({
          services: [...this.services],
          count: responseData.count
        });
      });
  }

  getServicesDirect(currentPage: number, limit: number) {
    const queryParams = `?businessId=${this.config.businessId}&page=${currentPage}&limit=${limit}`;

    return this.http
      .get<{ message: string; services: Service[]; count: number }>(
        this.config.apiEndpoint + '/service/get' + queryParams
      );
  }
}
