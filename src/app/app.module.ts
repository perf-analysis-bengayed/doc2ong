import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GererImageComponent } from './components/gerer-image/gerer-image.component';
import { ConvertPptxComponent } from './components/convert-pptx/convert-pptx.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    AppComponent,
    ConvertPptxComponent,
    GererImageComponent,
    NavBarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
