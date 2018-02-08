import marked from 'marked'
import './admin.scss'
import '../../common.scss'
import "highlight.js/styles/vs2015.css";
import hljs from "highlight.js";
import { Base64 } from 'js-base64';

import Modal from '../../components/modal/modal'

hljs.highlightCode = function () {
    //自定义highlightCode方法，将只执行一次的逻辑去掉
    let blocks = document.querySelectorAll("pre code");
    [].forEach.call(blocks, hljs.highlightBlock);
};

$(function () {
    const $writeBox = $('.write-box').eq(0);
    const $previewBox = $('.preview-box').eq(0);
    const $toggleSign = $('.toggle-sign').eq(0);
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
    })
    let previewScroll = function () {
        $writeBox.scrollTop($previewBox.scrollTop());
    }
    let writeScroll = function () {
        $previewBox.scrollTop($writeBox.scrollTop());
    }
    $previewBox.on('scroll', previewScroll);
    $writeBox.on('click', writeScroll);
    //获取所有tag
    $.ajax({
        url: 'http://sparklv.cn/php/blog_all_tag.php',
        method: 'get',
        success(data) {
            console.log(data)
        },
        error(error) {
            console.log(data)
        }
    })
    //切换按钮
    $toggleSign.on('click', function () {
        if ($previewBox.css('display') === 'none') {
            $previewBox.css('display', 'block');
            $toggleSign.text('>');
        }
        else {
            $previewBox.css('display', 'none');
            $toggleSign.text('<')
        }
    })
    //上传图片
    $('#img-input').on('change', () => {
        let formData = new FormData();
        let fileData = $('#img-input').prop('files')[0];
        formData.append("user", "Mike");
        formData.append("img", fileData);
        $.ajax({
            type: "POST", // 上传文件要用POST
            url: "http://sparklv.cn/php/upload_blog_img.php",
            dataType: "json",
            crossDomain: true, // 如果用到跨域，需要后台开启CORS
            processData: false,  // 注意：不要 process data
            contentType: false,  // 注意：不设置 contentType
            data: formData,
            success: function (data) {
                let img = `![essay_img](${data.url} "img")`;
                $writeBox.val($writeBox.val() + img);
                console.log($writeBox.val());
            },
            error: function (error) {
                console.log(error.responseText);
            }
        })
    })

    $('.title-submit-btn').eq(0).on('click', () => {
        let modal = new Modal();
        let now = new Date();
        let nowTime = now.getFullYear() + '-' + ((now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)) + '-' + (now.getDate() < 10 ? '0' + now.getDate() : now.getDate());
        modal.make({
            title: '提交信息',
            size: 'normal',
            body: `
            <div class="oper-box">
                <label>
                    <span>作者：</span>
                    <input id="blog-author" type="text">
                </label>
                <label>
                    <span>描述：</span>
                    <textarea id="blog-desc" rows=5 />
                </label>
                <label>
                    <span>Tags：</span>
                    <input id="blog-tags" type="text">
                </label>
                <span class='blog-now-time'>编辑于：${nowTime}</span>
            </div>
            `,
            confirm: function () {
                let title = $('#blog-title').val();
                let author = $('#blog-author').val();
                let desc = $('#blog-desc').val();
                let tags = $('#blog-tags').val();
                let content = Base64.encode($writeBox.val());
                let create_time = nowTime;
                let update_time = nowTime;
                $.ajax({
                    url: 'http://sparklv.cn/php/blog_write.php',
                    method: 'post',
                    data: { title, author, desc, tags, content, create_time, update_time },
                    success: function (data) {
                        console.log(data);
                        modal.removeModal();
                    },
                    error: function (error) {
                        console.log(error);
                    }
                })
            }
        });
    })
})
