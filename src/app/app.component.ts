import { Component } from '@angular/core';
import { ChatService } from "./chat.service";
import {ConditionType} from './conditionEnum';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private condition: ConditionType = ConditionType.Idle;
  private clientId: number = -1;
  public numbers: Array<number> = [];
  public error: string = '';
  public isInitiator: boolean = false;
  public opponent: number = -1;
  public isWaiting: boolean;

  constructor(private chatService: ChatService) {

    chatService.messages.subscribe(msg => {
      this.error = '';
      this.clientId = msg.recipient;
      this.isInitiator = false;
      switch(msg.type) {
        case 'sendRequest': 
          this.condition = ConditionType.RequestSent;
          this.isWaiting = true;
          break;
        case 'sendNumber':
          this.numbers.push(parseInt(msg.message));
        case 'sendAnswer':
          this.isWaiting = false;
          this.condition = msg.message == 'true' ? ConditionType.Game : ConditionType.Idle;
          this.isInitiator = true;
          this.opponent = msg.author;
          break;
      }
    });
  }

  
}
