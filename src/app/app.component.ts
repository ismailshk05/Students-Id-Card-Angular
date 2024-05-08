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
    if (!this.photoFile || !this.signatureFile) {
      window.alert('Photo and signature files are required.');
      console.error('Photo and signature files are required.');
      this.loading = false;
      return;
    }
    this.loading = true;
    this.studentService.generateIDCards(this.photoFile, this.signatureFile)
      .subscribe((res: IResponseInfo | any)=>{
        if(res.status === 'success'){
          this.students = res['data'];
        }else{
          window.alert('Internal Server Error');
        }
        this.loading = false;
      }
    ),(err: string)=>{
      this.loading = false;
        console.log('ERR', err);
        window.alert(err)

    }}
}