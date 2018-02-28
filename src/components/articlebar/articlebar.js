import './articlebar.scss'
import Tags from '../../components/tags/tags'
class Box {
    dealDesc(text) {
        //分辨率1920下，三行字288个长度
        let maxWidth = 150;
        // let maxNum = ($(window).width() / 1920) * maxWidth;
        let maxNum = 150;
        if (text.length > maxNum) {
            text = text.slice(0, maxNum);
            text = text + '...';
        }
        return text
    }
    makeTags(arr) {
        let tag = new Tags();
        tag.bindTagClick((item) => {
            location.hash = JSON.parse(item).name;
        })
        return tag.addTags(arr);
    }
    insert(data, $parent) {
        data.desc = this.dealDesc(data.desc);
        const $box = $(`
        <div class='articlebar-box'>
            <div class='articlebar-imgbox' style='background:url(${data.imgUrl}) center center/370px 180px'>
            </div>
            <div class='articlebar-container'>
                <div class='articlebar-header'>
                    <a href=${data.url}>${data.title}</a>
                    <div class="article-title-detail">
                        <span class="article-author">${data.author}</span>
                        <span>|</span>
                        <span class="article-edit-date">${data.date}</span>
                    </div>
                </div>
                <div class='articlebar-body'>
                    <p>${data.desc}</p>
                </div>
                <div class='articlebar-footer'>
                </div>
            </div>
        </div>
        `)
        const $tags = this.makeTags(data.tags);
        $box.find('.articlebar-footer').eq(0).append($tags);
        $parent.append($box);
    }
}

export default Box