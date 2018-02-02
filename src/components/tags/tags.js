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
            this.tagClickFun(JSON.stringify(this.activeTag));
        }
    }
    makeTag(item) {
        let $tag = $(`
        <span class='tags-item' style='background-color:${item.color}'>
            <i class='icon iconfont icon-tag'></i>
            <span class='tag-text'>${item.name}</span>
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