import { Component, OnInit, ViewChildren, QueryList, ViewChild, ComponentFactoryResolver, Input, ViewContainerRef, ContentChild, AfterViewInit, ElementRef, inject, Inject, ChangeDetectionStrategy } from '@angular/core';
import { RichTabServeService } from './rich-tab.service';
import { Tabs, tabStyle } from './tools';
import { DOCUMENT } from '@angular/common';
import { of, empty } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'rich-tab-set',
  template: `
    <div rich-tabset class="rich-tabs rich-tabs-top rich-tabs-line rich-tabs-small">
      <div class="rich-tabs-bar rich-tabs-top-bar rich-tabs-small-bar " role="tablist" tabindex="0">
          <div class="rich-tabs-nav-container">
              <div class="rich-tabs-nav-wrap">
                  <div class="rich-tabs-nav-scroll">
                      <div class="rich-tabs-nav rich-tabs-nav-animated" style="transform: translate3d(0px, 0px, 0px);">
                          <div>
                              <ng-container *ngFor="let tab of tabs; index as i">
                                  <div role="tab" class="rich-tabs-tab" (click)="toggleTab(tab)"
                                      [ngClass]="{'rich-tabs-tab-active': tab.isActive}">{{tab.title}}</div>
                              </ng-container>
                          </div>
                          <div style="display: block;"
                              class="rich-tabs-ink-bar rich-tabs-ink-bar-animated" 
                              [ngStyle]="{'transform': 'translate3d(' + style.x + 'px, 0px, 0px)', 'width': style.width + 'px'}"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="rich-tabs-content rich-tabs-top-content rich-tabs-content-animated " [ngStyle]="{'margin-left': percent}">
          <ng-content select="rich-tab"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./rich.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabSetComponent implements OnInit, AfterViewInit {
  tabs: Array<Tabs> = [];
  // @ViewChildren('a', { static: true }) tabHead!: HTMLElement;
  @ViewChild('a', { read: HTMLElement, static: true }) tabHead: HTMLElement;
  style: tabStyle = new tabStyle;
  currentIndex: number = 0;
  constructor(
    private s: RichTabServeService,
    private el: ElementRef
  ) { }

  
  ngOnInit() {
    
    this.tabs = this.s.tabs;
  }
  
  ngAfterViewInit(): void {
    this.toggleTab();
  }
  ngOnDestroy() {
  }
  toggleTab(tab?: Tabs): void {
    tab && (this.currentIndex = tab.index);
    this.s.setActiveTab(tab);
    of(null).pipe(delay(10)).subscribe(() => {
      this.style = this.calcStyle();
    })
  }
  get percent() {
    if (this.currentIndex == 0) return 0;
    else return '-' + (100 * this.currentIndex) + '%';
  }
  calcStyle() {
    let obj: tabStyle = new tabStyle;
    let els: any = this.el.nativeElement.querySelectorAll('.rich-tabs-tab');
    let el = null;
    els = [...els];
    els.forEach((x: any) => {
      if (x.className.includes('rich-tabs-tab-active')) {
        el = x;
      }
    });
    if (el) {
      obj.x = el.offsetLeft
      obj.width = el.offsetWidth;
    }
    return obj;
  }
}
