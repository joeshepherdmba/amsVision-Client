export class PhotoModel {
  photoUrl: string;
  index: number;

  constructor(photoUrl: string = null, index: number = null) {
      this.photoUrl = photoUrl;
      this.index = index;
  }
}
