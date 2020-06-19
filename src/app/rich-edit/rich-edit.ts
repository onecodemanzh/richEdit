import './iconfont.js';
import {
  Component, OnInit, ElementRef, Input,
  HostListener, Renderer2, forwardRef
} from '@angular/core';
import { efficientAttribute } from './tools';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RichTextTools } from './minxin';
export const EXE_RICH_TEXT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => RichEditComponent),
  multi: true
};

/**
 * @description 可当普通表单元素一样使用，支持ngModel,formControlName,value
 * @description 如果不传customRequest，默认从剪贴板中粘贴时，直接插入base64的img, 且只能插入网络图片
 * @selector app-rich-edit, [rick-edit], [rickEdit]
 * @attr placeholder 占位符, default 请输入文本;
 * @attr disabled 是否禁用，default false;
 * @arrt customRequest 自定义上传函数，function(formData, cb);
 * @args customRequest => formData 选择文件后的图片文件数据，或从剪贴板中要粘贴的图片文件数据
 * @args customRequest => cb 自定义上传后，得到的数据转换成只包含图片url字符串的数组，执行cb回调函数，把数组传回；cb(string[])
 * @example `<div rickEdit [(ngModel)]="richText" placeholder="请输入HTML"  [customRequest]="customReq"></div>`
 *  customReq = (formData: any, cb: any) => {
 *    this.http.post(this.action, formData).subscribe((data: {Data: FileList[]}) => {
 *      const imgs = [];
 *      data.Data.map((img: any) => {
 *        imgs.push(img.NetworkUrl);
 *      });
 *      cb(imgs);
 *    }, (err: any) => { });
 *  }
 */
@Component({
  selector: `
    app-rich-edit, [rick-edit], [rickEdit]
  `,
  exportAs: 'rickEdit',
  // tslint:disable-next-line: use-host-property-decorator
  host: {
    '[class.rick-edit]': 'true',
    '[attr.disabled]': 'disabled == null ? null : disabled',
    '[attr.canContenteditable]': 'canContenteditable',
  },
  // tslint:disable-next-line:use-input-property-decorator
  inputs: ['disabled', 'color'],
  // encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rich-edit.html',
  styleUrls: ['./rich-edit.scss'],
  providers: [EXE_RICH_TEXT_VALUE_ACCESSOR]
})
export class RichEditComponent extends RichTextTools implements OnInit, ControlValueAccessor {
  @Input() tabIndex: number;
  @Input() disabled: any | boolean;
  // tslint:disable-next-line:variable-name
  @Input() _value = '';
  @Input() placeholder = '请输入文本';
  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    const items = event.clipboardData.items || [];
    // tslint:disable-next-line: deprecation
    if (!this._isContain(event, this.editer)) { return; }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < items.length; i++) {
      const fr = new FileReader();
      const dataItem: DataTransferItem = items[i];
      if (dataItem.kind === 'file' && dataItem.type.indexOf('image') === 0) {
        const blob = dataItem.getAsFile();
        if (blob.size === 0) {
          return;
        }
        if (this.customRequest) { // 如果设置了自定义上传 把剪贴板里要粘贴的图片数据上传
          this._upLoadImg(blob);
          return;
        } else { fr.readAsDataURL(blob); } // 否则，直接读取剪贴板里要粘贴的图片数据，插入到编辑器
        fr.onload = (e: any) => {
          document.execCommand('insertImage', false, e.target.result);
        };
      }
    }
  }
  @HostListener('input', ['$event']) onInput(event: any) {
    this.triggerInput();
  }
  @HostListener('mouseup', ['$event']) onclick(event: any) {
    this.recordSelect(event);
  }
  @HostListener('keyup', ['$event']) onkeyup(event: any) {
    this.recordSelect(event);
  }
  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer2) 
  {
    super(renderer);
  }
  /**
   * 触发input事件，把富文本的value设置成this.editer.innerHTML
   */
  triggerInput() {
    this.value = this.editer.innerHTML;
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.editer.innerHTML);
  }
  /**
   * 是否包含
   * @param target 目标el
   * @param source 源el
   */
  _isContain(source: any, target: any) {
    return source.path.some((x: any) => x === target);
  }
  /**
   * 能否编辑
   */
  get canContenteditable(): boolean {
    // 存在disabled，且disabled不是false 或 'false'
    return !efficientAttribute(this.elementRef, 'disabled');
  }
  ngOnInit() {
    this.editer = this.elementRef.nativeElement.querySelector('[rich-text-container]');
    this.editer.innerHTML = this.value;
    // https://at.alicdn.com/t/font_1140935_r0futbija5l.js
  }
  /**
   * 把剪贴板里要粘贴的图片数据上传
   * @param imgUrlData imgUrlData
   * @description 从剪贴板里粘贴图片时，如果设置了自定义上传
   * @description new一个FormData，把图片数据append到FormData
   * @description 触发自定义上传事件（customRequest），把FormData传送出去
   * @description 执行回调，insertImage(imgs)，拿到imgs，把imgs插入编辑器
   */
  _upLoadImg(imgUrlData: any) {
    const formData = new FormData();
    formData.append('files[]', imgUrlData);
    this.customRequest(formData, (imgs) => {
      this.insertImage(imgs);
    });
  }
  _haltDisabledEvents(event: Event) {
    // 禁用后不应用任何操作
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
  get value() {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this._onChange(this._value);
  }

  // tslint:disable-next-line:variable-name
  _onChange = (_: any) => { };

  writeValue(value: any) {
    if (value) {
      this.value = value;
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
      this.editer.innerHTML = value;
    }
  }

  registerOnChange(fn: any) {
    this._onChange = fn;
  }

  registerOnTouched(fn: any) { }

}
