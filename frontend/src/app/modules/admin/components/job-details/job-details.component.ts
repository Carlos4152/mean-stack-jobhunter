import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Application } from 'src/app/Interfaces/applications.interface';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent {

  activatedRoute = inject(ActivatedRoute);
  applicationService = inject(ApplicationService);

  application!: Application[];
  applicationId = "";

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router) { }

  // APPLICATION FORM -UPDATE
  applicationForm = this.fb.group({
    company: ["", Validators.required],
    website: ["", Validators.required],
    position: ["", Validators.required],
    city: ["", Validators.required],
    remote: ["", Validators.required],
    salary: ["", Validators.required],
    status: ["", Validators.required],
    platform: ["", Validators.required],
    note: ["", Validators.required]
  });

  ngOnInit() {
    this.reloadDataInfo();
  }

  // UPDATE ACTION - UPDATE REQUEST APPLICATION
   updateData() {
    if (this.applicationId && this.applicationForm.valid) {
      const updatedApplication: Application = {
        company: this.applicationForm.value.company || '', // Provide a default value or handle null appropriately
        website: this.applicationForm.value.website || '',
        position: this.applicationForm.value.position || '',
        city: this.applicationForm.value.city || '',
        remote: this.applicationForm.value.remote || '',
        salary: this.applicationForm.value.salary || '',
        status: this.applicationForm.value.status || '',
        platform: this.applicationForm.value.platform || '',
        note: this.applicationForm.value.note || '',
      };
  
      this.applicationService.update(this.applicationId, updatedApplication).subscribe({
        next: (response) => {
          this.toastr.success("","Application Updated");
        },
        error: (error) => {
          console.log(error)
        }
      });
    }
  }

  reloadDataInfo(){
    this.activatedRoute.params.subscribe(params => {
      const appId = params['appId']
      this.applicationId = appId;

      const app = this.applicationService.getById(appId).subscribe(
        response => {
          this.application = [response];
          // REMOVE PROPERTY - IN ORDER TO ASSIGN RESPONSE VALUE TO FORM
          delete response._id;
          delete response.userId;
          delete response.createdAt;
          delete response.updatedAt;
          delete response.__v;

          this.applicationForm.setValue(response);
        }
      );       
    });
  }

}
