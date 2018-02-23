import './article.scss'
import '../../../common.scss'

import marked from 'marked'
import "highlight.js/styles/vs2015.css";
import hljs from "highlight.js";
import { Base64 } from 'js-base64';

hljs.highlightCode = function () {
    //自定义highlightCode方法，将只执行一次的逻辑去掉
    let blocks = document.querySelectorAll("pre code");
    [].forEach.call(blocks, hljs.highlightBlock);
};

$(function () {
    let $articleBox = $('.article-box').eq(0);
    let $articleTitleBg = $('.article-title-bg').eq(0);
    let $articleProgress = $('.article-progress').eq(0);
    let $articleProgressActive = $('.article-progress-active').eq(0);
    let $backBtn = $('.back-btn').eq(0);
    let params = location.search.split('?')[1].split('&');
    let paramObj = {};

    $backBtn.click(() => {
        window.history.go(-1);
    })

    params.forEach((item) => {
        let arr = item.split('=');
        paramObj[arr[0]] = arr[1];
    })
    $articleTitleBg.css('background', `url(${decodeURIComponent(paramObj.bgimg)}) no-repeat center center/cover`);
    let insertLoading = () => {
        let url = require('../../../assets/loading.gif');
        let $loadingimg = $(`<img src=${url} class='loading-img' alt='loading'>`);
        $articleBox.append($loadingimg);
    }
    insertLoading();
    setTimeout(() => {
        let windowToBottom = $('body').height() - $(window).scrollTop() - $(window).height();
        $(window).on('scroll', () => {
            if ($(window).scrollTop() > $articleTitleBg.height()) {
                let percent = Math.floor(100 * ($(window).scrollTop()) / windowToBottom);
                if (percent > 100) {
                    percent = 100;
                }
                $articleProgress.css('display', 'block').find('span').eq(0).text(percent + '% READ')
                $articleProgressActive.width(percent + '%');
            }
            else {
                $articleProgress.css('display', 'none');
            }
        })
    }, 500)

    $.ajax({
        url: 'http://sparklv.cn/php/blog_essay.php',
        method: 'post',
        data: { id: paramObj.id },
        success: (data) => {
            let data1 = JSON.parse(data);
            let content = Base64.decode(data1.content);
            $('#essay-content').html(marked(content));
            hljs.highlightCode();
            $('.loading-img').eq(0).css('display', 'none');
        },
        error: (error) => {
            console.log(error)
        }
    })
})