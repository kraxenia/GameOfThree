import { Component } from '@angular/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import { ChatService } from "./chat.service";
import {ConditionType} from './conditionEnum';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private condition = ConditionType.Idle;
  private clientId = -1;
  public numbers = [];
  public error = '';

  constructor(private chatService: ChatService) {

    chatService.messages.subscribe(msg => {
      this.error = '';
      this.clientId = msg.recipient;
      switch(msg.type) {

        case 'sendRequest': 
          this.condition = ConditionType.RequestSent;
          break;
        case 'sendNumber':
          this.numbers.push(msg.message);
        case 'sendAnswer':
          this.condition = msg.message == 'true' ? ConditionType.Game : ConditionType.Idle;
          break;
      }
    });
  }

  
}
