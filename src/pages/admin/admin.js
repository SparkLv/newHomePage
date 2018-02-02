import marked from 'marked'
import './admin.scss'
import "highlight.js/styles/vs2015.css";
import hljs from "highlight.js";
import {Base64} from 'js-base64';

hljs.highlightCode = function () {
    //自定义highlightCode方法，将只执行一次的逻辑去掉
    let blocks = document.querySelectorAll("pre code");
    [].forEach.call(blocks, hljs.highlightBlock);
};

$(function () {
    const $writeBox = $('.write-box').eq(0);
    const $previewBox = $('.preview-box').eq(0);
    const repalceEle = function (Ele) {
        var ele = Ele;
        var start = this.selectionStart;
        var end = this.selectionEnd;
        var selected = window.getSelection().toString();
        selected = ele + selected.replace(/\n/g, '\n' + ele);
        this.value = this.value.substring(0, start) + selected + this.value.substring(end);
        this.setSelectionRange(start + ele.length, start + selected.length);
    }
    $writeBox.on('keydown input', function (e) {
        //支持tab键
        if (e.keyCode == 9) {
            e.preventDefault();
            repalceEle.call(this, '    ');
        }
        $previewBox.html(marked($writeBox.val()));
        hljs.highlightCode();
    });
    $writeBox.on('click', function () {
        $previewBox.scrollTop($(this).scrollTop());
    })

    $('#blog-submit').click(function () {
        let title = $('#blog-title').val();
        let author = $('#blog-author').val();
        let desc = $('#blog-desc').val();
        let tags = $('#blog-tags').val();
        let content = Base64.encode($writeBox.val());
        let create_time = $('#blog-create-time').val();
        let update_time = $('#blog-update-time').val();
        $.ajax({
            url: 'http://sparklv.cn/php/blog_write.php',
            method: 'post',
            data: { title, author, desc,tags,content, create_time, update_time },
            success: function (data) { console.log(data) },
            error: function (error) { console.log(error) }
        })
    })
})
