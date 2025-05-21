import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/model/Notification';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {
  searchEvent: string = '';
  searchLocation: string = '';
  notificationCount: number = 0;
  userId: string = 'JI771';
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService, private router: Router) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotificationById(this.userId).subscribe({
      next: (data: Notification[]) => {
        this.notifications = data;
        this.notificationCount = data.filter(n => !n.isRead).length;
      },
      error: (err) => console.error('Error fetching notifications:', err)
    });
  }

  openNotifications(): void {
    this.router.navigate(['/notification']);
  }

  logout(): void {
    console.log('Logging out...');
  }
}
