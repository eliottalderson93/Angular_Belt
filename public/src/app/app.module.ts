import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailsComponent,
    NewComponent,
    EditComponent
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
