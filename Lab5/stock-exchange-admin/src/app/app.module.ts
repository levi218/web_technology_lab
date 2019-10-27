import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { BrokerListComponent } from './broker-list/broker-list.component';
import { StockListComponent } from './stock-list/stock-list.component';

import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    BrokerListComponent,
    StockListComponent,
    HeaderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
