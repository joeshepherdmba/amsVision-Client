import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ImageComponent } from './vision/image/image.component';
import { OcrComponent } from './vision/ocr/ocr.component';
import { TextComponent } from './vision/text/text.component';
import { ThumbnailComponent } from './vision/thumbnail/thumbnail.component';


@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    OcrComponent,
    TextComponent,
    ThumbnailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
