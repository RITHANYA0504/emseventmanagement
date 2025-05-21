import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/model/Notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  notificationCount: number = 0;
  constructor(private serv: NotificationService) {}
  userId: string = 'JI771';
  ngOnInit(): void {
    this.loadNotifications();
  }

  
  loadNotifications(): void {
    this.serv.getNotificationById(this.userId).subscribe({
      next: (data: Notification[]) => {
        this.notifications = data;
        this.notificationCount = data.filter(n => !n.isRead).length;
      },
      error: (err) => console.error('Error fetching notifications:', err)
    });
  }

  markAsRead(notification: Notification): void {
    if (!notification.isRead) {
      this.serv.markAsRead(notification.notificationId).subscribe({
        next: () => {
          notification.isRead = true;
        },
        error: (err) => console.error('Error marking notification as read:', err)
      });
    }
  }
}
