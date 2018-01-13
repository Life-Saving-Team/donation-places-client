import { HttpClientModule } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SnackBarService } from './services/snackbar.service';
import { FooterComponent } from './footer/footer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FooterComponent,
    NavComponent,
    MatSnackBarModule,

  ],
  declarations: [
    NavComponent,
    FooterComponent

  ],
})
export class SharedModule { }
