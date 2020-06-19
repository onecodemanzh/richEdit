import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Dialog, getFilesFormDataFromFileList } from './tools';
import './iconfont.js';
@Component({
  selector: 'app-select-image',
  template: `
    <rich-modal [dialog]="dialog" (onOk)="handleOk()" (onCancel)="handleCancel()">
      <rich-tab-set>
        <rich-tab title="本地图片">
          <p *ngFor="let item of fileList">{{item.name}}</p>
          <button (click)="selectFile()" class="rich-btn rich-btn-primary rich-btn-round rich-btn-sm">
            <i>
              <svg class="icon" aria-hidden="true">
                  <use [attr.xlink:href]="'#icon-plus'"></use>
              </svg>
            </i>
            <span>选择文件 </span>
          </button>
        </rich-tab>
        <rich-tab title="网络图片">
          <p *ngFor="let url of urls;index as i;" style="margin-bottom: 10px;">
            <input autofocus class="rich-input"
            placeholder="请输入图片URL" 
            (keyup.enter)="nextInput(i)"
            [(ngModel)]="url.url" />
          </p>
          <p style="text-align: right;">
            <button (click)="addUrl()" class="rich-btn rich-btn-default">
                <span>增加图片</span>
            </button>
          </p>
        </rich-tab>
      </rich-tab-set>
      <input type="file" name="file[]" multiple [(ngModel)]="files" (change)="selectedImgs($event)" hidden #fileHandle>
    </rich-modal>
  `,
  styleUrls: ['./rich.scss']
})
export class SelectImageComponent implements OnInit {
  @Input() dialog: Dialog;
  @ViewChild('fileHandle', {read: ElementRef, static: true}) fileHandle: any;
  @Output() select: EventEmitter<any> = new EventEmitter();
  loadding = false;
  /**
   * 当前选中的文件，每次选择时清空input原有文件
   */
  files = null;
  /**
   * 上传本地图片时，=> 自定义上传图片时传表单数据，
   */
  formData: FormData = null;
  /**
   * 上传本地图片时，=> 不是自定义上传图片时传表单数据，
   */
  dataUrl = [];
  /**
   * 要插入的网络图片地址
   */
  urls = [{url: ''}];
  /**
   * 要展示的文件列表
   */
  fileList = [];
  /**
   * 当前激活的tab索引
   */
  currTabIndex = 0;
  get customRequest(): boolean {
    return !!this.dialog.row.customRequest;
  }
  constructor() { }

  ngOnInit() {}
  /**
   * 添加网络图片url地址
   */
  addUrl() {
    this.urls.push({url: ''});
  }
  handleOk(): void {
    const type = this.currTabIndex === 0;
    if (type) {
      this.select.emit({
        type,
        data: this.customRequest ? this.formData : this.dataUrl
      });
    } else {
      const arr = this.urls.map(x => x.url);
      this.select.emit({
        type,
        data: arr
      });
    }
    this.dialog.isVisible = false;
  }
  /**
   * 打开图片选择框
   * @param fileSelector 文件选择器
   */
  selectFile() {
    this.files = null; //  每次选择文件前，把files变量值清空
    this.fileHandle.nativeElement.click();
  }
  /**
   * 图片选择完成事件
   * @param event event
   * @description 图片选择完成后
   * @description new一个FormData，把图片数据append到FormData
   * @description 触发自定义上传事件（customRequest），把FormData传送出去
   */
  selectedImgs(event: any) {
    const files = event.target.files;
    const dataUrl = [];
    Object.keys(files).forEach((x: any) => {
      const fr = new FileReader();
      this.fileList.push(files[x]);
      fr.readAsDataURL(files[x]);
      fr.onload = (e: any) => {
        dataUrl.push(e.target.result);
      };
    });
    this.dataUrl =  dataUrl;
    this.formData = getFilesFormDataFromFileList(event.target.files);
  }
  handleCancel(): void {
    this.dialog.isVisible = false;
  }
  /**
   * input输入 回车时，判断当前索引，如果是最后一个input 就执行提交
   * @param i 当前input的索引
   */
  nextInput(i: number) {
    if (i === this.urls.length - 1) {
      this.handleOk();
    }
  }
}
