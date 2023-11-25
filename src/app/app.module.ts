import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BalancedBbstComponent } from './balanced-bbst/balanced-bbst.component';

@NgModule({
  declarations: [AppComponent, BalancedBbstComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
