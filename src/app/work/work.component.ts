import {Component, OnDestroy, OnInit} from '@angular/core';
import {Service} from '../shared/service/service.model';
import {Job} from '../shared/job/job.model';
import {Subscription} from 'rxjs';
import {PageService} from '../shared/page/page.service';
import {JobService} from '../shared/job/job.service';
import {ServiceService} from '../shared/service/service.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit, OnDestroy {

  serviceId: string;
  service: Service;

  jobs: Job[];

  isLoading = false;
  totalJobs = 0;
  jobsPerPage = 10;
  currentPage = 0;
  pageSizeOptions = [10, 20, 50, 100];

  private jobsSub: Subscription;

  constructor(private pageService: PageService,
              private jobService: JobService,
              private serviceService: ServiceService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.pageService.updatePage(true, '../../../assets/our-work.png', '');
    this.jobs = [];
    // Get the service
    this.route.params.subscribe((params: Params) => {
      this.serviceId = params.id;
      this.initForm();
    });

    this.jobsSub = this.jobService
      .getJobsUpdateListener()
      .subscribe((jobData: {service: Service; jobs: Job[]; count: number}) => {
        this.isLoading = false;
        this.totalJobs = jobData.count;
        this.service =  jobData.service;
        this.pageService.updatePage(true, '../../../assets/our-work.png', this.service.title);
        if (jobData.jobs.length > 0) {
          this.jobs = jobData.jobs;
        }
      });
  }

  onClickJob(job: Job) {
    // this.router.navigate(['./', 'work', job.id, 'details']);
    this.router.navigate(['./', job.id, 'details'], {relativeTo: this.route});
  }

  onChangedPage(pageData: PageEvent) {
    this.jobsPerPage = pageData.pageSize;
    this.currentPage = pageData.pageIndex;
    this.jobService.getJobs(this.currentPage, this.jobsPerPage);
  }

  ngOnDestroy() {
    this.jobsSub.unsubscribe();
  }

  private initForm() {

    this.jobService.getJobsForService(this.currentPage, this.jobsPerPage, this.serviceId);
  }

}
