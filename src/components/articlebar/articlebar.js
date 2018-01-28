import './articlebar.scss'
import Tags from '../../components/tags/tags'
class Box {
    dealDesc(text) {
        //分辨率1920下，三行字288个长度
        let maxWidth = 165;
        let maxNum = ($(window).width() / 1920) * maxWidth;
        if (text.length > maxNum) {
            text = text.slice(0, maxNum);
            text = text + '...';
        }
        return text
    }
    makeTags(arr){
        let tag = new Tags();
        return tag.addTags(arr);
    }
    insert(data, $parent) {
        data.desc = this.dealDesc(data.desc);
        const $box = $(`
        <div class='articlebar-box'>
            <div class='articlebar-imgbox'>
                <img class='articlebar-img' src=${data.imgUrl} alt=${data.imgDesc}/>
            </div>
            <div class='articlebar-container'>
                <div class='articlebar-header'>
                    <a>${data.title}</a>
                </div>
                <div class='articlebar-body'>
                    <p>${data.desc}</p>
                </div>
                <div class='articlebar-date'>
                    <span>写于${data.date}</span>
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