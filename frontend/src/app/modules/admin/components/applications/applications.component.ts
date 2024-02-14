import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Application } from 'src/app/Interfaces/applications.interface';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent {

  jobApps: Application[] = [];
  searchValue: string = '';

  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService,
    private toastr: ToastrService
  ) { }

  // RELOAD INFORMATION COMING FROM THE BACKEND
  ngOnInit() {
    this.getData();
  }

  // APPLICATION FORM
  applicationForm = this.fb.group({
    company: ["", Validators.required],
    website: ["", Validators.required],
    position: ["", Validators.required],
    city: ["", Validators.required],
    remote: ["remote", Validators.required],
    salary: ["", Validators.required],
    status: ["active", Validators.required],
    platform: ["", Validators.required],
    note: ["", Validators.required]
  });

  // RECEIVE BACKEND DATA
  getData() {
    const responseData = this.applicationService.getAll()
      .subscribe(data => {
        this.jobApps = data;
        this.applicationService.boardDetails = data;
        console.log(data)
      })
  }

  // CREATE ACTION - POST REQUEST APPLICATION DATA TO BACKEND
  onSubmit() {
    const validData = this.applicationForm.valid;
    if (validData) {
      const formValues = this.applicationForm.value;
      const nonNullableFormValues: Application = {
        company: formValues.company!,
        website: formValues.website!,
        position: formValues.position!,
        city: formValues.city!,
        remote: formValues.remote!,
        salary: formValues.salary!,
        status: formValues.status!,
        platform: formValues.platform!,
        note: formValues.note!,
      };
      this.applicationForm.reset()

      this.applicationService.create(nonNullableFormValues).subscribe({
        next: (response) => {
          console.log(response);
          this.jobApps.push(nonNullableFormValues);
          this.getData();
          this.toastr.success('','Application Saved');
        },
        error: (error) => {
          const message = error.error.message;
          this.toastr.error(`${message}`);
        }
      });
    }
  }

  // REMOVE ACTION - DELETE REQUEST APPLICATION
  removeData(appId: string) {
    this.applicationService.remove(appId).subscribe({
      next: (response) => {
        this.getData();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  //SEARCH APPLICATION METHOD
  searchApplication(searchValue: string) {
  }

}


