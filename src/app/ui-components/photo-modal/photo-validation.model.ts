export class PhotoValidationModel{

  allowedFileTypes: string[] = ['image/png', 'image/jpeg'];
  maxFileSize: number = 1048576;

  public largerThanAllowed: boolean;
  public unsupportedFormat: boolean;

  constructor() {
      this.reset();
  }

  reset(): void {
      this.largerThanAllowed = false;
      this.unsupportedFormat = false;
  }

  validate(file: File): boolean {
      this.reset();
      if (!this.allowedFileTypes.includes(file.type)) {
          this.unsupportedFormat = true;
          return false;
      }
      else if(file.size > this.maxFileSize){
          this.largerThanAllowed = true;
          return false;
      }

      return true;
  }
}
