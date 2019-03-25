import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from "../chat.service";

@Component({
  selector: 'play-request',
  templateUrl: './play-request.component.html',
  styleUrls: ['./play-request.component.css']
})
export class PlayRequestComponent implements OnInit {
  @Input() clientId: number;
  @Input() isWaiting: boolean;
  public opponent: number;

  private message = {
    author: -1,
    message: "this is a test message",
    recipient: -1,
    type: 'sendRequest'
  };

  constructor(private chatService: ChatService) {

  }

  ngOnInit() {
  }

  sendRequest(opponent){
    this.message.author = this.clientId;
    this.message.recipient = opponent;
    this.chatService.messages.next(this.message);
  }

}
