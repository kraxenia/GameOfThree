import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChatService } from "../chat.service";
import { Message } from '../common'

@Component({
  selector: 'game-process',
  templateUrl: './game-process.component.html',
  styleUrls: ['./game-process.component.css']
})
export class GameProcessComponent implements OnInit, OnChanges {

  @Input() clientId: number;
  @Input() numbers: Array<number>;
  @Input() isInitiator: boolean;
  @Input() opponent: number;
  private isAutoplay: boolean;
  private lastNumber: number;
  private isWinner: boolean;
  private isCreateNumberEnabled: boolean;
  private error:  string;

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  constructor(private chatService: ChatService) {

  }

  sendNumber(number) {
    let msg = new Message(this.clientId, this.opponent, number, 'sendNumber');
    this.chatService.messages.next(msg);
  }

  ngOnInit() {
    if (!this.isInitiator) {
      return;
    }
    this.createNumber(true);
  }

  createLegitNumber(lastNum) {
    for (let i=-1; i<2; i++){
        if ((lastNum+i) % 3 == 0){
          return (lastNum + i) /3;
        }
    }
  }

  createNumber(isFirstTime){
    let arrLength = this.numbers.length;
    let number = isFirstTime ? this.getRandomInt(100) : this.createLegitNumber(this.numbers[arrLength-1]);
    this.setNumber(number);
  }

  isLegitNumber(num){
    return num % 3 == 0;
  }

  makeTurn(num) {
    if (!this.isLegitNumber(num)){
      this.error = 'The number is not legit. Please, choose a number which is divisible by 3';
      return;
    }
    this.setNumber(num);
  }

  setNumber(num){
    this.lastNumber = num;
    if (this.lastNumber == 1){
      this.isWinner = true;
    }
    this.numbers.push(this.lastNumber);
    this.sendNumber(this.lastNumber);
  }

  ngOnChanges(changes) {
      let length = this.numbers.length;
      if (!changes.numbers || this.numbers[length-1] == this.lastNumber) {
        return;
      }

      if (this.numbers[length-1] == 1) {
        this.isWinner = false;
      }

      if (this.isAutoplay) {
          this.createNumber(false);
      }   
      else {
        this.isCreateNumberEnabled = true;
      }
  }

}
