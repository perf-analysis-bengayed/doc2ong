import { Component } from '@angular/core';
import { ConvertService } from '../../services/convert.service';

@Component({
  selector: 'app-convert-pptx',
  templateUrl: './convert-pptx.component.html',
  styleUrls: ['./convert-pptx.component.css']
})
export class ConvertPptxComponent {
  fileName: string = '';
  fileContent: File | null = null;
  public uploading = false;
  public error = '';
  public imageList: string[] = [];
  isDraggingOver = false;
  downloaded: boolean = false;
  images: string[] = [];
  constructor(private convertService: ConvertService) { }

  ngOnInit() {
    this.loadImages();
  }

  updateFileName(): void {
    console.log("Nom du fichier mis à jour :", this.fileName);
  }
  onReset(): void {
    this.fileName = '';
    this.fileContent = null;
    this.imageList = []; 

  }

  resetFile(): void {
    this.fileName = '';
    this.fileContent = null;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.name.endsWith('.pptx')) {
      this.fileName = file.name;
      this.fileContent = file;
    } else {
      alert('Veuillez sélectionner un fichier PPTX.');
      this.resetFile();
    }
  }

  onUpload(): void {
    if (!this.fileContent) {
      alert('Veuillez sélectionner un fichier avant de l\'ajouter.');
      return;
    }

    this.uploading = true;
    this.convertService.uploadPptx(this.fileContent).subscribe(
      (response: { message?: string }) => {
        console.log('Réponse:', response);
        alert(response.message || 'Fichier ajouté avec succès!');
        this.loadImages();
      },
      (error) => {
        console.error('Erreur:', error);
        alert('Échec de l\'ajout du fichier.');
      },
      () => {
        this.uploading = false;
      }
    );
  }

 
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDraggingOver = true;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDraggingOver = false;

    const file = event.dataTransfer?.files[0];
    if (file && file.name.endsWith('.pptx')) {
      this.fileName = file.name;
      this.fileContent = file;
    } else {
      alert('Veuillez sélectionner un fichier PPTX.');
      this.resetFile();
    }
  }



 
  loadImages(): void {
    try {
      this.convertService.getImagestest().subscribe(
        (response) => {
          this.images = response.images; 
        },
        (error) => {
          this.error = 'Erreur lors du chargement des images.';
          console.error(error);
        }
      );
    } catch (e: any) {
      this.error = e.message;
    }
  }
  

 
}


