import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  name = localStorage.getItem('name');
  fullName = '';
  toggle = false;


  constructor(private router: Router, private toastr: ToastrService, private service: AuthserviceService) { }

  ngOnInit(): void {
    if (this.name) {
      const firstName = this.name.split(" ")[0];
      const lastName = this.name.split(" ")[1][0];
      
      const lastNameInitial = lastName ? lastName[0] : '';
      this.fullName = firstName + ' ' + lastNameInitial;
    }
  }

  logOut() {
    const token = localStorage.getItem('token');
    
    if(token) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      this.router.navigate(['/login']);
      this.service.setAuthenticatedUser(false);
    }
  }

  toggleMenu() {
    if(this.toggle){
      this.toggle = false;
    } else {
      this.toggle = true;
    }
  }

}
