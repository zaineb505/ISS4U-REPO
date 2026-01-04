import { Component , OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {
  faDashboard,
  faUser,
  faCalendar,
  faList,
  faContactBook,
  faRightLeft,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  faDashboard= faDashboard;
  faUser= faUser;
  faCalendar= faCalendar;
  faPatient= faList;
  faContactBook= faContactBook;
  faRightLeft= faRightLeft;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Recharge la même URL pour mettre à jour la liste des patients
        this.router.navigateByUrl(event.url);
      }
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToUserProfile() {
    this.router.navigate(['/user-profile']);
  }

  goToCalendar() {
    this.router.navigate(['/calendar']);
  }

  goToPatients() {
    this.router.navigate(['/patient']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  logout() {
    // Perform logout logic here
  }
}
