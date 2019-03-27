import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Message } from '../common';
import { ChatService } from "../chat.service";


@Component({
  selector: 'request-approval',
  templateUrl: './request-approval.component.html',
  styleUrls: ['./request-approval.component.css']
})

export class RequestApprovalComponent implements OnInit {
  @Input() clientId: any;
  @Input() applicant: any;
  @Output() answer: EventEmitter<any> = new EventEmitter();


  constructor(private chatService: ChatService) {

  }

  sendResponse(response) {
    this.answer.emit(response);

    let msg = new Message(this.clientId, this.applicant, response, 'sendResponse');
    this.chatService.messages.next(msg);
  }

  ngOnInit() {

  }

}
