import { Injectable } from '@angular/core';
import { Tabs } from './tools';
import { Subject } from 'rxjs';

@Injectable(/* {
  providedIn: 'root'
} */)
export class RichTabServeService {
  tabs: Array<Tabs> = [];
  $toggleTab: Subject<any> = new Subject();
  constructor() { }
  setTabs(obj: Tabs): void {
    let isExit = this.tabs.some(tab => tab.title === obj.title);
    !isExit && this.tabs.push({ title: obj.title, index: this.tabs.length, isActive: false });
    !isExit && this.setActiveTab();
  }
  setActiveTab(tab?: Tabs): void {
    if (tab) {
      this.tabs.map(t => t.isActive = tab.title == t.title && tab.index == t.index);
    } else {
      this.tabs[0]!.isActive = true;
    }
    this.$toggleTab.next(tab);
  }
}
