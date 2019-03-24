import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayRequestComponent } from './play-request/play-request.component';
import { RequestApprovalComponent } from './request-approval/request-approval.component';
import { GameProcessComponent } from './game-process/game-process.component';
import { WebsocketService } from "./websocket.service";
import { ChatService} from "./chat.service";

@NgModule({
  declarations: [
    AppComponent,
    PlayRequestComponent,
    RequestApprovalComponent,
    GameProcessComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WebsocketService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
