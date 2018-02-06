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
    let insertLoading = () => {
        let url = require('../../../assets/loading.gif');
        let $loadingimg = $(`<img src=${url} class='loading-img' alt='loading'>`);
        $articleBox.append($loadingimg);
    }
    insertLoading();
    $.ajax({
        url: 'http://sparklv.cn/php/blog_essay.php',
        method: 'post',
        data: { id: location.search.split('=')[1] },
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