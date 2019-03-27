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
  public clientId: number;
  public numbers: Array<number> = new Array<number>();
  public error: string = '';
  public isInitiator: boolean = false;
  public opponent: number;
  public isWaiting: boolean;

  constructor(private chatService: ChatService) {

    chatService.messages.subscribe(msg => {
      this.error = '';
      this.clientId = msg.recipient;
      this.isInitiator = false;
      this.opponent = msg.author;
      this.isWaiting = false;

      switch(msg.type) {
        case 'sendRequest': 
          this.condition = ConditionType.RequestSent;
          break;
        case 'sendNumber':
          this.condition = ConditionType.Game
          this.numbers.push(parseInt(msg.message));
          break;
        case 'sendResponse':
          this.error = msg.message === false ? 'Your request has been declined. Try Again.' : '';
          this.isInitiator = true;
          this.condition = msg.message === true ? ConditionType.Game : ConditionType.Idle;
          break;
      }
    });
  }

  onAnswer(response){
    this.condition = response == 'true' ? ConditionType.Game : ConditionType.Idle;      
  }
  
}
