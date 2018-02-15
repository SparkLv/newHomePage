import './modal.scss'
import '../../common.scss'

class Box {
    constructor() {
        this.box = null;
        this.mask = null;
        this.modal = null;
    }
    addMask() {
        let $mask = $("<div class='common-mask'></div>");
        this.mask = $mask;
    }
    removeModal() {
        this.mask.remove();
        this.box.remove();
    }
    bindEvent(confirmFun, cancelFun, isMaskCancel) {
        if (isMaskCancel) {
            this.mask.on('click', this.removeModal.bind(this));
            this.box.find('.modal-icon-clear').eq(0).on('click', this.removeModal.bind(this));
        }
        this.box.find('.modal-cancel-btn').eq(0).on('click', cancelFun);
        this.box.find('.modal-confirm-btn').eq(0).on('click', confirmFun);
    }
    make({
        title = '标题',
        body = '<span>内容</span>',
        size = 'normal',
        confirmText = '确定',
        confirm = () => { },
        cancelText = '取消',
        cancel = () => {
            this.removeModal()
        },
        isMaskCancel = true
         } = {}) {
        this.addMask();
        this.box = $("<div class='modal-box'></div>")
        this.modal = $(`
            <div class='modal-container modal-${size}'>
                <div class='modal-header'>
                    <span class='modal-title'>${title}</span>
                    <i class='icon iconfont icon-clear modal-icon-clear'></i>
                </div>
                <div class='modal-body'></div>
                <div class='modal-footer'>
                    <button class='btn btn-primary modal-confirm-btn'>${confirmText}</button>
                    <button class='btn modal-cancel-btn'>${cancelText}</button>                    
                </div>
            </div>
        `);
        this.modal.find('.modal-body').append($(body));
        this.box.append(this.mask);
        this.box.append(this.modal);
        $('body').append(this.box);
        this.bindEvent(confirm, cancel, isMaskCancel);
    }
}

export default Box