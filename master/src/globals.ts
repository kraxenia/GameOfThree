import { Injectable } from '@angular/core';
import { ConditionType } from './app/conditionEnum';

@Injectable()
export class Globals {
  isWaiting: boolean = false;
  error: string = "";
}