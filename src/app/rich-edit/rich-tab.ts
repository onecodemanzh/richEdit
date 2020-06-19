import { Component, Directive, ViewContainerRef, OnInit, Input, Inject, ElementRef, Renderer2 } from '@angular/core';
import { RichTabServeService } from './rich-tab.service';
import { Tabs } from './tools';

@Component({
  selector: '[RichTab], [richTab], [rich-tab], rich-tab',
  styles: [`
    :host(.rich-tabs-tabpane) {
      flex-shrink: 0;
      width: 100%;
      opacity: 1;
      transition: opacity 0.45s;
    }
    :host(.rich-tabs-tabpane-inactive) {
      height: 0;
      padding: 0 !important;
      opacity: 0;
      pointer-events: none;
    }
  `],
  template: `
    <ng-content></ng-content>
  `,
  host: {
    "class": 'rich-tabs-tabpane rich-tabs-tabpane-inactive',
  }
})
export class RichTabComponent implements OnInit {
  @Input('title') title: string;
  tabs: Array<Tabs> = [];
  constructor(
    private s: RichTabServeService,
    private el: ElementRef,
    public renderer: Renderer2
  ) { }
  // constructor(public viewContainerRef: ViewContainerRef) { }
  ngOnInit(): void {
    this.s.setTabs({ title: this.title });
    this.tabs = this.s.tabs;
    this.s.$toggleTab.subscribe(tab => {
      this.toggleTab(tab);
    });
  } 
  toggleTab(tab?: Tabs) {
    if (!tab) {
      tab = this.tabs[0];
    }
    let className = 'rich-tabs-tabpane-inactive';
    let tabs = this.el.nativeElement.parentNode.querySelectorAll('.rich-tabs-tabpane');
    tabs = [...tabs];
    tabs.map((x: any) => {
      if (x.title === tab.title) {
        this.renderer.removeClass(x, className);
      } else {
        this.renderer.addClass(x, className);
      }
    })
  }
}
