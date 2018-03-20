import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { PhotoModel } from './photo.model';
import { PhotoValidationModel } from './photo-validation.model';

@Component({
  selector: 'app-photo',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.css']
})
export class PhotoModalComponent implements OnInit {

  @Input() photoUrlFromParent: string;
  @Input() photoModalType: string;
  @Input() index: number;
  @Output() FileSelected = new EventEmitter<PhotoModel>();
  @Output() PhotoRemoved = new EventEmitter<boolean>();

  photo: File;
  modalPhoto: File;

  photoUrl: string;
  modalPhotoUrl: string;
  modalPhotoFileName: string;

  // tslint:disable-next-line:no-inferrable-types
  uploadedToModal: boolean = false;
  photoValidation: PhotoValidationModel;

  modalRef: NgbModalRef;

  uploader: FileUploader = new FileUploader({ url: 'localhost' });

  constructor(private modalService: NgbModal, private reader: FileReader) { }

  open(content) {
    this.modalRef = this.modalService.open(content);
  }

  setPhotoPreview(e: any): void {
    if (!e) { return; }

    // tslint:disable-next-line:no-shadowed-variable
    this.reader.onload = (e: any) => {
      this.modalPhotoUrl = e.target.result;
    },

    this.reader.readAsDataURL(e);
  }

  preparePhotoForUpload(photoToUpload: string) {
    if (!photoToUpload) { return; }
    let model;
    if (this.index || this.index === 0) {
      model = new PhotoModel(photoToUpload, this.index);
    } else {
      model = new PhotoModel(photoToUpload);
    }

    this.FileSelected.emit(model);
    this.modalRef.close();
  }

  removePhoto() {
    this.photo = null;
    this.photoUrl = null;
    this.uploadedToModal = false;
    this.PhotoRemoved.emit(true);
  }

  clearModalPhoto() {
    this.modalPhoto = null;
    this.modalPhotoUrl = null;
    this.modalPhotoFileName = null;
    this.photoValidation.reset();
    this.uploadedToModal = false;
  }

  fileSelect(e) {
    const file = e.target.files[0];
    if(!this.photoValidation.validate(file)) {
      return;
    }

    this.modalPhoto = file;
    this.modalPhotoFileName = this.modalPhoto.name;
    this.uploadedToModal = true;

    this.setPhotoPreview(this.modalPhoto);
  }

  fileDrop(e) {
    const file = e[0];
    if (!this.photoValidation.validate(file)) {
      return;
    }

    this.modalPhoto = file;
    this.modalPhotoFileName = this.modalPhoto.name;
    this.uploadedToModal = true;

    this.setPhotoPreview(this.modalPhoto);
  }

  cancel() {
    this.clearModalPhoto();
    this.photoValidation.reset();
    this.modalRef.close();
  }

  confirmUpload() {
    this.photo = this.modalPhoto;
    this.photoUrl = this.modalPhotoUrl;
    this.clearModalPhoto();

    this.preparePhotoForUpload(this.photoUrl);
  }

  ngOnInit() {
    if (this.photoUrlFromParent) { this.photoUrl = this.photoUrlFromParent; }
    this.photoValidation = new PhotoValidationModel();
  }
}
