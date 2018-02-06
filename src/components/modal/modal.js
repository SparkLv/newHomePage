import './modal.scss'

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
    make(title = '标题', body = '内容', size = 'normal') {
        this.addMask();
        this.box = $("<div class='modal-box'></div>")
        this.modal = $(`
            <div class='modal-container modal-${size}'>
                <div class='modal-header'>
                    <span class='modal-title'>${title}</span>
                </div>
                <div class='modal-body'>${body}</div>
                <div class='modal-footer'></div>
            </div>
        `);
        this.box.append(this.mask);
        this.box.append(this.modal);
        $('body').append(this.box)
    }
}

export default Box