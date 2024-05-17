import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

 public downloadPdf(): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });
    return this.http.get('http://localhost:3000/api/students/', {
      headers: headers,
      responseType: 'blob'
    });
  }

}