import {Inject, Injectable} from '@angular/core';

import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {APP_CONFIG, AppConfig} from '../../app-config.module';

import {Job} from './job.model';
import {File as BSFFile} from '../file/file.model';

@Injectable({ providedIn: 'root' })
export class JobService {

  private jobs: Job[] = [ ];
  private jobsUpdated = new Subject<{ jobs: Job[]; count: number }>();
  private jobUpdated = new Subject<{ job: Job }>();
  private jobDeleted = new Subject<{ message: string}>();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { }

  getJobsUpdateListener() {
    return this.jobsUpdated.asObservable();
  }

  getJobUpdateListener() {
    return this.jobUpdated.asObservable();
  }

  getJobDeletedListener() {
    return this.jobDeleted.asObservable();
  }

  getJobs(currentPage: number, limit: number) {
    const queryParams = `?businessId=${this.getBusinessId()}&page=${currentPage}&limit=${limit}`;
    console.log(this.config.apiEndpoint + '/jobs/getAdmin' + queryParams);

    this.http
      .get<{ message: string; jobs: Job[]; count: number }>(
        this.config.apiEndpoint + '/jobs/get' + queryParams
      )
      .subscribe(transformedJobData => {
        this.jobs = transformedJobData.jobs;
        this.jobsUpdated.next({
          jobs: [...this.jobs],
          count: transformedJobData.count
        });
      });
  }


  getJob(id: string) {
    return this.http
      .get<{ job: Job}>(
        this.config.apiEndpoint + '/jobs/get/' + id
      );
  }


  private getBusinessId() {

    return '5f04557aafdb2c71c2de5159';

  }

}
