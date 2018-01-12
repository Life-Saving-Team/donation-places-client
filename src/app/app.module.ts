import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SnackBarService } from './shared/services/snackbar.service';
import { DataService } from './shared/services/data.service';
import { UserService } from './shared/services/user.service';
import { GraphicsService } from './shared/services/graphics.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    
  ],
  providers: [UserService, GraphicsService, DataService, SnackBarService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
