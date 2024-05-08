import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStudentInfo } from '../interface/studentInfo';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  generateIDCards(photoFile: File, signatureFile: File) {
    const formData = new FormData();
    formData.append('photo', photoFile);
    formData.append('signature', signatureFile);

    return this.http.post<IStudentInfo[]>('http://localhost:3000/api/students', formData);
  }

}