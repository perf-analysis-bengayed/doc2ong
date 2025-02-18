import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConvertService {

  private apiUrl = 'http://192.168.100.110:5001/images';
  private apiUrlListImagest = 'http://127.0.0.1:5001/liste-images'; // URL de ton API Flask
  private apiUrlUpload = 'http://127.0.0.1:5001/upload';
  private uploadedFileName: string | null = null; // Stocke le nom du fichier uploadé

  constructor(private http: HttpClient) { }


  getImages1(): Observable<any> {
    return this.http.get<any>(this.apiUrlListImagest);
  }
  
  postData(apiUrl: string, formData: FormData): any {
    return this.http.post(apiUrl, formData);
  }
 
 

  // Méthode pour envoyer le fichier à l'API
  uploadFile1(apiUrl: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders();

    // Envoi du fichier via POST
    return this.http.post<any>(apiUrl, formData, { headers });
  }

  uploadPptx1(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.apiUrlUpload, formData);
  }

  uploadPptx(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return new Observable(observer => {
      this.http.post<any>(this.apiUrlUpload, formData).subscribe(
        response => {
          if (response && file.name) {
            this.uploadedFileName = file.name.replace('.pptx', ''); // Stocke le nom sans extension
          }
          observer.next(response);
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  getImages2(): Observable<any> {
    if (!this.uploadedFileName) {
      throw new Error('Aucun fichier n\'a été uploadé.');
    }

    const url = `${this.apiUrlUpload}${this.uploadedFileName}`;
    return this.http.get<any>(url);
  }

  getImagestest(): Observable<any> {
    if (!this.uploadedFileName) {
      throw new Error('Aucun fichier n\'a été uploadé.');
    }
  
    // Assuming the folder path depends on the uploaded file's name
    const folderPath = `/output/${this.uploadedFileName}`;
    const url = `${this.apiUrlListImagest}?folder=${folderPath}`;
  
    return this.http.get<any>(url);
  }

  
}
