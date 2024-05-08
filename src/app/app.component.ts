import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentService } from './services/student.service';
import { IStudentInfo } from './interface/studentInfo';
import { CommonModule } from '@angular/common';
import { IResponseInfo } from './interface/responseInfo';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  public photoFile: File | null = null;
  public signatureFile: File | null = null;
  public students: IStudentInfo[] = [];
  public loading: boolean;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {}

  public onPhotoUpload(event: any): void {
    this.photoFile = event.target.files[0];
  }

  public onSignatureUpload(event: any): void {
    this.signatureFile = event.target.files[0];
  }

  public generateIDCards(): void {
    this.loading = true;
    if (!this.photoFile || !this.signatureFile) {
      console.error('Photo and signature files are required.');
      return;
    }

    this.studentService.generateIDCards(this.photoFile, this.signatureFile)
      .subscribe((res: IResponseInfo | any)=>{
        if(res.status === 'success'){
          this.students = res['data'];
        }else{
          this.students = res['data'];
        }
        this.loading = false;
      }
    ),(err: string)=>{
        console.log('ERR', err)
    }}
}