import './tags.scss'

class Box {
    makeTag(item) {
        return $(`<span class='tags-item'>${item}</span>`);
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