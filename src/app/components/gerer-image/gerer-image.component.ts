import { Component, OnInit } from '@angular/core';
import { ConvertService } from '../../services/convert.service';

@Component({
  selector: 'app-gerer-image',
  templateUrl: './gerer-image.component.html',
  styleUrl: './gerer-image.component.css'
})
export class GererImageComponent implements OnInit {

  fileName = '';
  
  uploading = false;
  error = '';
  imageList: string[] = [];
  listeImages: string[] = [];
  imageList1: string[] = Array(100).fill('../assets/images/images.jpg');
  imagesToShow = this.imageList1.length;
  imagesPerRow = 3;
  imageWidth = 150;
  imageHeight = 150;
  selectedImages: boolean[] = new Array(this.imageList1.length).fill(false);
  selectedImageList: string[] = [];
  defaultNumber = 1;
  displayPercentage = 50;
  downloaded = false;
  images: string[] = [];
  img: any[] = [];
  constructor(private convertService: ConvertService) {}

  ngOnInit() {
    this.loadImages();
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
  

  onResetimage(): void {
    this.selectedImages.fill(false);
    this.selectedImageList = [];
  }

  updateSelectedImages(): void {
    this.selectedImageList = this.imageList1.filter((_, index) => this.selectedImages[index]);
  }

  toggleSelection(index: number): void {
    this.selectedImages[index] = !this.selectedImages[index];
    this.updateSelectedImages();
  }

  updateFileName(): void {
    console.log('Nom du fichier mis à jour :', this.fileName);
  }

  selectAllImages(): void {
    const allSelected = this.selectedImages.every(Boolean);
    this.selectedImages.fill(!allSelected);
    this.selectedImageList = allSelected ? [] : [...this.imageList1];
  }

  
  onRangeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);

    // Conversion linéaire 0-100 ➔ 5-2 images par ligne
    const imagesPerRow = 6-value ;
    
    // Taille d'image proportionnelle au nombre de colonnes
    const imageWidth = 300 - (imagesPerRow * 30); // 300px à 2 images, 60px de réduction par colonne
    const imageHeight = imageWidth;

    // Calcul du pourcentage de largeur par image
    const displayPercentage = Math.abs(( imagesPerRow+4)*10 -100);
    
    // Mise à jour des propriétés
    this.imagesPerRow = imagesPerRow;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.displayPercentage = Math.round(displayPercentage);
}


  downloadSelectedImages(): void {
    if (!this.selectedImageList.length) {
      alert('Veuillez sélectionner au moins une image à télécharger.');
      return;
    }

    this.selectedImageList.forEach((img, index) => {
      const link = document.createElement('a');
      link.href = img;
      link.download = `${this.fileName}_${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    this.downloaded = true;
    setTimeout(() => {
      this.downloaded = false;
      this.onResetimage();
    }, 5000);
  }
 






 
  isLoading = false;
  errorMessage: string = '';

 


  



}
