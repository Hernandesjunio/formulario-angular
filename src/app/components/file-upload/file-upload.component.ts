import { ResponseContentType } from '@angular/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Subject, Observable, forkJoin } from 'rxjs';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent extends BaseComponent {
  @ViewChild("file") file;

  progress: { [key: string]: { progress: Observable<number> } };
  canBeClosed: boolean = true;
  primaryButtonText: string = 'Upload';
  showCancelButton: boolean = true;
  uploading: boolean = false;
  uploadSuccessful: boolean = false;
  files: Set<File> = new Set();

  /**
   *
   */
  constructor(private http: HttpClient) {
    super();

  }

  addFiles() {
    this.file.nativeElement.click();
  }

  uploadFiles() {
    if (this.uploadSuccessful)
      return;

    this.uploading = true;

    this.progress = this.upload(this.files);

    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress)
    }

    this.primaryButtonText = "Finalizar";

    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      //this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }

  // downloadFile(id: number) {
  //   return this.http
  //     .get('https://jslim.net/path/to/file/download', {
  //       responseType: ResponseContentType.Blob,
  //       search: 'id=' + id// query string if have
  //     })
  //     .map(res => {
  //       return {
  //         filename: 'filename.pdf',
  //         data: res.blob()
  //       };
  //     })
  //     .subscribe(res => {
  //       console.log('start download:', res);
  //       var url = window.URL.createObjectURL(res.data);
  //       var a = document.createElement('a');
  //       document.body.appendChild(a);
  //       a.setAttribute('style', 'display: none');
  //       a.href = url;
  //       a.download = res.filename;
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //       a.remove(); // remove the element
  //     }, error => {
  //       console.log('download error:', JSON.stringify(error));
  //     }, () => {
  //       console.log('Completed file download.')
  //     });
  // }

  upload(files: Set<File>): { [key: string]: { progress: Observable<number> } } {
    // this will be the our resulting map
    const status = {};

    const url = "http://localhost:61005/api/upload";

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      const headers = new HttpHeaders({
        //'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        //'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
      });

      const httpOptions = {
        headers: headers,
        reportProgress: true
      }

      const reqGet = new HttpRequest('GET', 'http://localhost:61005/api/upload', {
        responseType: 'json'
      })

      this.http.get('http://localhost:61005/api/upload').subscribe(x=>{
          console.log(x);
      });

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', url, formData, httpOptions);

      // this.http.post("http://localhost:61005/api/upload",formData, httpOptions)
      // .subscribe(c=> {
      //   console.log(c);
      // });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      let count = 0;

      // const interval = setInterval(x => {
      //   count++;
      //   progress.next(count);

      //   if (count == 100) {
      //     clearInterval(interval);
      //     progress.complete();
      //   }
      // }, 100);

      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total > 0) {
            // calculate the progress percentage
            const percentDone = Math.round(100 * event.loaded / event.total);

            // pass the percentage into the progress-stream
            progress.next(percentDone);
          } 
        } else if (event instanceof HttpResponse) {

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }

    this.uploadFiles();
  }
}
