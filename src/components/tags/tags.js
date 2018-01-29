import './tags.scss'

class Box {
    constructor() {
        this.activeTag = '';
        this.tagClickFun = null;
    }
    bindTagClick(func) {
        this.tagClickFun = func;
    }
    clickTag(item, e) {
        this.activeTag = item;
        if (this.tagClickFun) {
            this.tagClickFun(this.activeTag);
        }
    }
    makeTag(item) {
        let color = '';
        switch (item) {
            case 'js': color = '#20B2AA'; break;
            case 'css': color = '#C67171'; break;
            default: color = 'cornflowerblue';
        }
        let $tag = $(`
        <span class='tags-item' style='background-color:${color}'>
            <i class='icon iconfont icon-tag'></i>
            <span class='tag-text'>${item}</span>
        </span>
        `);
        $tag.on('click', this.clickTag.bind(this, item));
        return $tag
    }
    addTags(arr) {
        const $tags = $("<div class='tags-group'></div>");
        arr.forEach((item) => {
            $tags.append(this.makeTag(item))
        })
        return $tags
    }
}

export default Box