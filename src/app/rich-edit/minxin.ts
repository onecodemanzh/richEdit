import { Dialog, Emoji, ToolbarConfig, fontSizes, HElements } from './tools';
import { Renderer2, Input } from '@angular/core';
import { isArray } from 'util';


export class RichTextTools {
    constructor(
        public renderer: Renderer2
    ) {}
    editer = null;
    cacheSelect = null;
    range = null;
    Toolbar = ToolbarConfig;
    fontColor: any = null;
    fontSizes: any = fontSizes;
    /**
     * H1~H6
     */
    HElements: any = HElements;
    emojiDilog: Dialog = {
        isVisible: false,
        title: '选择表情',
        okBtnText: '选择',
        cancelBtnText: '关闭',
        row: null
    };
    insertImageDilog: Dialog = {
        isVisible: false,
        title: '插入图片',
        okBtnText: '插入',
        cancelBtnText: '关闭',
        row: null
    };
    insertLinkDilog: Dialog = {
        isVisible: false,
        title: '插入链接',
        okBtnText: '插入',
        cancelBtnText: '关闭',
        row: null
    };
    @Input() height = '200px';
    /**
     * 自定义上传图片
     */
    @Input() customRequest: (_: any, cb: (imgs: any) => void) => { } ;
    nodeRange: { start: HTMLElement, startIndex: number, end: HTMLElement, endIndex: number, }
                = { start: null, startIndex: null, end: null, endIndex: null };
    /**
     * 处理命令
     */
    handFormat(aCommandName: string, el: HTMLElement, needArgs = false, colorSelector = null) {
        if (!needArgs) {
            this.restoreSelect();
            document.execCommand(aCommandName, false, null);
        } else {
            this.screeningCommand(aCommandName, colorSelector);
        }
    }
    /**
     * 记录选区
     */
    recordSelect(event: any) {
        if (event.target === this.editer) {
            this.cacheSelect = window.getSelection();
            this.range = this.cacheSelect.getRangeAt(0);
        }
    }
    /**
     * 还原选区
     * @description 选区不存在，选择富文本框做为选区
     */
    restoreSelect() {
        const s = this.cacheSelect || window.getSelection();
        if (s.rangeCount > 0) { s.removeAllRanges(); }
        if (!this.range) {
            const range = document.createRange();
            range.selectNodeContents(this.editer);
            s.addRange(range);
            return;
        }
        s.addRange(this.range);
    }
    handelEmoji(el: HTMLElement) {
        this.emojiDilog.isVisible = true;
    }
    /**
     * 分析并执行命令
     * @param aCommandName 命令名称
     * @param colorSelector 颜色选择器
     * @description 分析并执行命令相应的命令
     */
    screeningCommand(aCommandName: string, colorSelector: any,) {
        switch (aCommandName) {
            case 'foreColor': this.execForeColor(colorSelector); break;
            case 'createLink': this.execCreateLink(); break;
            case 'insertImage': this.execInsertImage(); break;
            case 'emojo': this.execEmojo(); break;
            case 'fullscreen': this.execFullscreen(); break;
            case 'fullscreen-exit': this.execExitFullscreen(); break;
        }
    }
    /**
     * 设置字体颜色
     * @param colorSelector 颜色选择器
     */
    execForeColor(colorSelector: any) {
        colorSelector.click();
    }
    /**
     * 创建链接
     */
    execCreateLink() {
        this.insertLinkDilog.isVisible = true;
        this.insertLinkDilog.row = [ { type: 'input', value: null, title: '链接地址' } ]
    }
    /**
     * 打开图片对话框
     */
    execInsertImage() {
        this.insertImageDilog.row = {
            customRequest: !!this.customRequest
        };
        this.insertImageDilog.isVisible = true;
    }
    /**
     * 图片选择完成事件
     * @description 图片选择完成后
     * @description new一个FormData，把图片数据append到FormData
     * @description 触发自定义上传事件（customRequest），把FormData传送出去
     * @description 执行回调，insertImage(imgs)，拿到imgs，把imgs插入编辑器
     */
    selectedImgs(event: any) {
        if (event.type && this.customRequest) {
            this.customRequest(event.data, (imgs) => {
                this.insertImage(imgs);
            });
        } else {
            console.log(event);
            this.insertImage(event.data);
        }
    }
    /**
     * 插入图片
     */
    insertImage(imgUrls: any) {
        if (!isArray(imgUrls)) {
            imgUrls = [imgUrls];
        }
        this.restoreSelect();
        imgUrls.forEach(img => {
            img = img.replace(/\\/g, '/');
            document.execCommand('insertImage', false, img);
        });
    }
    execEmojo() {
        this.emojiDilog.isVisible = true;
    }
    /**
     * 获取并插入表情
     * @param emojis 表情数组
     */
    insertEmojis(emojis: Emoji[] = []) {
        this.restoreSelect();
        emojis.map((img: any) => {
            document.execCommand('insertImage', false, img.OriginalFile);
        });
    }

    setFontSize(fontSize: string) {
        this.restoreSelect();
        document.execCommand('fontSize', false, fontSize);
    }
    setFontColor() {
        this.restoreSelect();
        document.execCommand('foreColor', false, this.fontColor);
    }
    setHElement(H: string) {
        this.restoreSelect();
        document.execCommand('formatBlock', false, H);
    }
    /**
     * 设置链接
     * @param link 链接url
     * @description 如果光标处已选中文字，则设置选中文字；否则在光标处插入一个文字和链接地址一样的链接
     */
    setLink(link: any) {
        this.restoreSelect();
        document.execCommand('createLink', false, link[0].value);
    }
    /**
     * 全屏
     */
    execFullscreen() {
        const el = this.editer.parentElement;
        if (el.hasOwnProperty('requestFullScreen')) {
            el.requestFullScreen();
        } else {
            el.webkitRequestFullscreen();
        }
        this.renderer.removeStyle(this.editer, 'height');
    }
    /**
     * 退出全屏
     */
    execExitFullscreen() {
        if (document.hasOwnProperty('exitFullscreen')) {
            document.exitFullscreen();
        } else {
            // tslint:disable-next-line:no-string-literal
            document['webkitExitFullscreen']();
        }
        this.renderer.setStyle(this.editer, 'height', this.height);
    }
}

