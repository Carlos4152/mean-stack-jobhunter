import { Component, inject } from '@angular/core';
import { Application } from 'src/app/Interfaces/applications.interface';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  totalApp: Application[] = [];
  service = inject(ApplicationService);

  userName = localStorage.getItem('name');
  userEmail = localStorage.getItem('email');
  firstName = '';
  userInitial = "";
  

  activeCount: number = 0;
  closedCount: number = 0;
  pendingCount: number = 0;

  ngOnInit() {
    this.getData();

    if(this.userName){
      this.firstName = this.userName.split(" ")[0];
      this.userInitial = this.userName.split(" ")[0][0].toLocaleUpperCase() + this.userName.split(" ")[1][0].toLocaleUpperCase()
    }
  }

  getData() {
    this.service.getAll().subscribe({
      next: (response) => {
        this.totalApp = response;
        this.totalApp.forEach(item => {
          if (item.status === 'active') {
            this.activeCount++;
          } else if (item.status === 'closed') {
            this.closedCount++;
          } else if (item.status === 'pending') {
            this.pendingCount++;
          }
        });
      },
      error: (error) => {
        console.log(error)
      }
    })
  }



}
