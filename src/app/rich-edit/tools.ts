import { ElementRef } from '@angular/core';

/**
 * 检查属性是否有效
 * @param elementRef 当前要检查的HTML元素
 * @param attr HTML元素属性 Attribute
 * @description 检查HTML标签上指定属性是否存在且有效; 不是false 或 'false'
 */
export function efficientAttribute(elementRef: ElementRef, attr: string): boolean  {
    const attrVal = elementRef.nativeElement.getAttribute(attr);
    const has: boolean = elementRef.nativeElement.hasAttribute(attr);
    return attrVal !== false && attrVal !== 'false' && has;
}

export interface Emoji {
    Meaning: string;
    OriginalFile: string;
}


/**
 * 对话框 interface
 * Dialog
 * @attr isVisible	是否可见	boolean	true
 * @attr title	标题	string
 * @attr okBtnText	确认BTN显示文字	string
 * @attr cancelBtnText	放弃BTN显示文字	string
 * @attr row	要传的东西	string
 * @attr nzMask	是否展示遮罩	boolean	true
 * @attr nzMaskClosable	点击蒙层是否允许关闭
 */
export interface Dialog {
    isVisible: boolean;
    title: string;
    okBtnText?: string;
    cancelBtnText?: string;
    row?: any;
    nzMask?: boolean;
    nzMaskClosable?: boolean;
    [x: string]: any;
}
/**
 * Function ts 检测 不能做为类型使用，就创建一个Fn 替代 Function 做为类型检查
 * 函数类型
 */
export interface Fn { (): void; (): void; }
/**
 * 图片url地址 数组[string]
 */
export type ImageUrl = string[];

export const ToolbarConfig = {
    format: [
        { name: 'bold', title: '加粗', icon: 'icon-bold', needArgs: false },
        { name: 'italic', title: '斜体', icon: 'icon-italic', needArgs: false },
        { name: 'underline', title: '下划线', icon: 'icon-underline', needArgs: false },
        { name: 'strikethrough', title: '删除线', icon: 'icon-strikethrough', needArgs: false },
        { name: 'fontSize', title: '字体大小', icon: 'icon-font-size', needArgs: true },
        { name: 'foreColor', title: '字体颜色', icon: 'icon-font-colors', needArgs: true },
        { name: 'subscript', title: '下标', icon: 'icon-sub', needArgs: false },
        { name: 'superscript', title: '上标', icon: 'icon-sup', needArgs: false },
        { name: 'removeFormat', title: '清除格式', icon: 'icon-remove-format', needArgs: false }
    ],
    insert: [
        { name: 'heading', title: '插入标题', icon: 'icon-H', needArgs: true },
        { name: 'createLink', title: '插入链接', icon: 'icon-insert-link', needArgs: true },
        { name: 'unlink', title: '去除链接', icon: 'icon-unlink', needArgs: false },
        { name: 'insertOrderedList', title: '插入编号列表', icon: 'icon-orderedlist', needArgs: false },
        { name: 'insertUnorderedList', title: '插入项目列表', icon: 'icon-unorderedlist', needArgs: false },
        { name: 'insertImage', title: '插入图片', icon: 'icon-Insert-Image', needArgs: true },
        // { name: 'emojo', title: '插入表情', icon: 'icon-smile', needArgs: true },
    ],
    align: [
        { name: 'outdent', title: '减少缩进', icon: 'icon-outdent', needArgs: false },
        { name: 'indent', title: '增加缩进', icon: 'icon-indent', needArgs: false },
        { name: 'justifyLeft', title: '左对齐', icon: 'icon-align-left', needArgs: false },
        { name: 'justifyCenter', title: '中对齐', icon: 'icon-align-center', needArgs: false },
        { name: 'justifyRight', title: '右对齐', icon: 'icon-align-right', needArgs: false },
        { name: 'justifyFull', title: '文本对齐', icon: 'icon-justify-align', needArgs: false }
    ],
    handle: [
        { name: 'fullscreen', title: '满屏', icon: 'icon-fullscreen', needArgs: true },
        { name: 'fullscreen-exit', title: '还原屏幕', icon: 'icon-fullscreen-exit', needArgs: true },
        { name: 'redo', title: '重做', icon: 'icon-redo ', needArgs: false },
        { name: 'undo', title: '撤消', icon: 'icon-undo', needArgs: false },
    ]
};
export const fontSizes = [
    { name: '12px', value: 1 },
    { name: '13px', value: 2 },
    { name: '16px', value: 3 },
    { name: '18px', value: 4 },
    { name: '24px', value: 5 },
    { name: '32px', value: 6 },
    { name: '38px', value: 7 }
];
export const HElements = [
    { name: 'h1', value: 'H1' },
    { name: 'h2', value: 'H2' },
    { name: 'h3', value: 'H3' },
    { name: 'h4', value: 'H4' },
    { name: 'h5', value: 'H5' },
    { name: 'h6', value: 'H6' }
];


export interface FileList {
    FileName: string;
    NetworkUrl: string;
}

/**
 * 把FileList转换成 FormData
 * @param files FileList
 * @description 把FileList转换成 name叫files[]的FormData
 */
export function getFilesFormDataFromFileList(files: any): FormData {
    const formData = new FormData();
    Object.keys(files).forEach((file: any) => {
        formData.append('files[]', files[file]);
    });
    return formData;
}

export interface Tabs {
    title: string;
    index?: number
    isActive?: boolean
}

export class tabStyle {
    x: number;
    width: number;
}