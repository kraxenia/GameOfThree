import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from "../chat.service";
import {Message} from '../common'

@Component({
  selector: 'play-request',
  templateUrl: './play-request.component.html',
  styleUrls: ['./play-request.component.css']
})
export class PlayRequestComponent implements OnInit {
  @Input() clientId: number;
  @Input() isWaiting: boolean;
  public opponent: number;

  constructor(private chatService: ChatService) {

  }

  ngOnInit() {
  }

  isValid(){
    return !(this.opponent !== undefined && this.clientId !== undefined && this.opponent == this.clientId);
  }

  sendRequest(opponent){
    let msg = new Message(this.clientId, opponent,'','sendRequest')
    this.isWaiting = true;
    this.chatService.messages.next(msg);
  }

}
