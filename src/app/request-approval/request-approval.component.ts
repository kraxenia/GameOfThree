import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../common';
import { ChatService } from "../chat.service";


@Component({
  selector: 'app-request-approval',
  templateUrl: './request-approval.component.html',
  styleUrls: ['./request-approval.component.css']
})
export class RequestApprovalComponent implements OnInit {
  @Input() clientId: any;
  @Input() applicant: any;

  constructor(private chatService: ChatService) {

  }

  sendAnswer(answer) {
    let msg = new Message(this.clientId, this.applicant, answer, 'sendAnswer');
    this.chatService.messages.next(msg);
  }

  ngOnInit() {

  }

}
