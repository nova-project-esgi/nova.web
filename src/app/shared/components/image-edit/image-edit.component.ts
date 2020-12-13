import {Component, EventEmitter, OnInit} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html'
})
export class ImageEditComponent implements OnInit {

  constructor(public bsModalRef: MatDialogRef<ImageEditComponent>) {
  }

  onEditionEnded = new EventEmitter<boolean>();
  file: File;
  croppedImage = '';

  ngOnInit(): void {
    // console.log(this.file);
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
    console.log(this.croppedImage);
  }

  imageLoaded(): void {
    console.log('loaded');
  }

  closeModal(isValidated: boolean): void {
    this.bsModalRef.close();
    this.onEditionEnded.emit(isValidated);
  }


}
