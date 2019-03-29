import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { ChatService } from "../chat.service";
import { Message } from '../common';
import { Globals } from '../../globals';

@Component({
  selector: 'game-process',
  templateUrl: './game-process.component.html',
  styleUrls: ['./game-process.component.css']
})
export class GameProcessComponent implements OnInit, OnChanges {

  @Input() clientId: any;
  @Input() numbers: Array<number>;
  @Input() isInitiator: boolean;
  @Input() opponent: any;
  @Output() replay: EventEmitter<any> =  new EventEmitter();

  public isAutoplay: boolean;
  public isTimeout: boolean = false;
  private lastNumber: number;
  private wasResponse: boolean;
  public isWinner: boolean;

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (+max - +min)) + +min; 
  }

  constructor(private chatService: ChatService, public globals: Globals) {

  }

  sendNumber(number) {
    let msg = new Message(this.clientId, this.opponent, number, 'sendNumber');
    this.chatService.messages.next(msg);
    this.wasResponse = false;
    setTimeout(()=>{
      if (!this.wasResponse && this.isWinner === undefined) {
        this.isTimeout = true;
      }
    }, 120000)
  }

  createTurnStr(num, i){
    let str = i!=0 ? num*3 +"/3=" : "";
    str+=num;
    return str;
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
    if (this.isWinner !== undefined){
      return;
    }
    let arrLength = this.numbers.length;
    let number = isFirstTime ? this.getRandomInt(1, 1000) : this.createLegitNumber(this.numbers[arrLength-1]);
    if (number == 0){
      debugger
    }
    this.setNumber(number);
  }

  isLegitNumber(num){
    return num % 3 == 0;
  }

  makeTurn(addition) {
    if (this.isAutoplay) {
      this.createNumber(false);
      return;
    }

    let num = this.numbers[this.numbers.length-1] + addition;
    if (!this.isLegitNumber(num)){
      this.globals.error = 'The number is not legit. Please, choose a number which is divisible by 3';
      return;
    }
    this.globals.error = '';
    this.setNumber(num/3);
  }

  setNumber(num){
    this.lastNumber = num;
    if (this.lastNumber == 1){
      this.isWinner = true;
    }
    else {
      this.globals.isWaiting = true;
    }
    this.numbers.push(this.lastNumber);
    this.sendNumber(this.lastNumber);
  }

  replayTheGame(){
    this.replay.emit(null);
  }

  ngOnChanges(changes) {
      let length = this.numbers.length;
      if (!changes.numbers || this.numbers[length-1] == this.lastNumber) {
        return;
      }

      this.wasResponse = true;

      if (changes.numbers.currentValue[length-1] == 1) {
        this.isWinner = false;
      }

      if (this.isAutoplay) {
          this.createNumber(false);
      }
  }

}
