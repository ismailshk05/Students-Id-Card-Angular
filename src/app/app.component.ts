import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentService } from './services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  public loading: boolean;
  public pdfPath: string;
  public isGenerating: boolean;


  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.isGenerating = false;
    this.loading = false;
  }

 public generateIDCards(): void {
  this.loading = true;
    this.studentService.downloadPdf().subscribe(
      (blob: Blob) => {
        if(blob){
        // Creating a URL for the blob
        this.pdfPath = URL.createObjectURL(blob);
        this.isGenerating = true;
      }else{
        alert('File not found')
      }
      this.loading = false;
      },
      error => {
        console.error('Error downloading PDF:', error);
        this.loading = false;
      }
    );
  }

  public downloadPdf(): void {
    if (this.pdfPath) {
     // Creating an anchor element
        const downloadLink = document.createElement('a');
        downloadLink.href = this.pdfPath;
        downloadLink.download = 'random_users_id_cards.pdf';
        downloadLink.click();

        // Cleaning the temporary URL
        URL.revokeObjectURL(this.pdfPath);
        this.isGenerating = false;
        this.pdfPath = '';
    }
  }

  
}