import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule } from '@angular/forms';  //<<<< import it here
import { AppComponent } from './app.component';
import { PlayRequestComponent } from './play-request/play-request.component';
import { RequestApprovalComponent } from './request-approval/request-approval.component';
import { GameProcessComponent } from './game-process/game-process.component';
import { WebsocketService } from "./websocket.service";
import { ChatService} from "./chat.service";
import { Globals } from '../globals';

@NgModule({
  declarations: [
    AppComponent,
    PlayRequestComponent,
    RequestApprovalComponent,
    GameProcessComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [WebsocketService, ChatService, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
