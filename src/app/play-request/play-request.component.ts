import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from "../chat.service";
import {Message} from '../common';
import { Globals } from '../../globals';

@Component({
  selector: 'play-request',
  templateUrl: './play-request.component.html',
  styleUrls: ['./play-request.component.css']
})
export class PlayRequestComponent implements OnInit {
  @Input() clientId: any;
  public opponent: any;

  constructor(private chatService: ChatService, public globals: Globals) {

  }

  ngOnInit() {
  }

  isValid(){
    return this.opponent  && this.opponent != this.clientId;
  }

  sendRequest(opponent){
    let msg = new Message(this.clientId, opponent,'','sendRequest');
    this.globals.isWaiting = true;
    this.chatService.messages.next(msg);
  }

}
