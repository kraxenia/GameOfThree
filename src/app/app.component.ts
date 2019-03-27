import { Component } from '@angular/core';
import { ChatService } from "./chat.service";
import {ConditionType} from './conditionEnum';
import { Globals } from '../globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public condition: ConditionType = ConditionType.Idle;
  public clientId: number;
  public numbers: Array<number> = new Array<number>();
  public isInitiator: boolean = false;
  public opponent: number;

  constructor(private chatService: ChatService, public globals: Globals ) {

    chatService.messages.subscribe(msg => {
      globals.error = '';
      this.clientId = msg.recipient;
      this.isInitiator = false;
      this.opponent = msg.author;
      globals.isWaiting = false;

      switch(msg.type) {
        case 'sendRequest': 
          if (!(this.condition == ConditionType.Idle && !globals.isWaiting)){
            return;
          }
          this.condition = ConditionType.NeedsToApprove;
          setTimeout(() => {
            this.condition = ConditionType.Idle;
          }, 20000);       
        break;
        case 'sendNumber':
          if (this.condition != ConditionType.Game){
            return;
          }
          this.condition = ConditionType.Game;
          this.numbers.push(parseInt(msg.message));
          this.numbers = this.numbers.slice();
          break;
        case 'sendResponse':
          if (this.condition != ConditionType.Idle) {
            return;
          }
          this.globals.error = msg.message === false ? 'Your request has been declined. Try Again.' : '';
          this.isInitiator = true;
          this.condition = msg.message === true ? ConditionType.Game : ConditionType.Idle;
          break;
      }
    });
  }

  onAnswer(response){
    this.condition = response == 'true' ? ConditionType.Game : ConditionType.Idle;      
  }

  onReplay(){
    this.condition = ConditionType.Idle;
  }
  
}
