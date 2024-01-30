import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { applicationInitializer } from "./helpers/application-initializer";
import { TcmWebHubConnectionService } from "./service/tcm-web-hub-connection.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: applicationInitializer,
      deps: [TcmWebHubConnectionService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
