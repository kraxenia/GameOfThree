import { Component } from '@angular/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import { ChatService } from "./chat.service";


export class Message {
  constructor(
      public sender: string,
      public content: string,
      public isBroadcast = false,
  ) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My First Angular App!';
  private socket$: $WebSocket;
  private socket2$:  any;//WebSocketSubject<Message>;

  private serverMessages: Array<any>;
  private message = {
    author: "tutorialedge",
    message: "this is a test message"
  };

  sendMsg() {
    console.log("new message from client to websocket: ", this.message);
    this.chatService.messages.next(this.message);
    this.message.message = "";
  }

  constructor(private chatService: ChatService) {

    chatService.messages.subscribe(msg => {
      console.log("Response from websocket: " + msg);
    });
  }

  
}
