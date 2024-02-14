import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

activeMenu = false;

responsiveMenu(){
  this.activeMenu = !this.activeMenu
}

}
