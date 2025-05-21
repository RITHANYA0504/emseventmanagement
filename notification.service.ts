import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../model/Notification'; // Adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private url: string = "http://localhost:9091/notifications";

  constructor(private http: HttpClient) {}

  // Fetch all notifications (if needed)
  public showAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.url}/getAllNotifications`);
  }

  // Fetch notifications by attendee ID
  public getNotificationById(userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.url}/getNotificationByAttendeeId/${userId}`);
  }

  public markAsRead(notificationId: string): Observable<any> {
    return this.http.post(`${this.url}/${notificationId}/read`, {});
  }
 
}
