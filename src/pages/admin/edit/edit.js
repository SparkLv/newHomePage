import marked from 'marked'
import './edit.scss'
import '../../../common.scss'
import "highlight.js/styles/vs2015.css";
import hljs from "highlight.js";
import { Base64 } from 'js-base64';

import Modal from '../../../components/modal/modal'

hljs.highlightCode = function () {
    //自定义highlightCode方法，将只执行一次的逻辑去掉
    let blocks = document.querySelectorAll("pre code");
    [].forEach.call(blocks, hljs.highlightBlock);
};

$(function () {
    const $adminBox = $('.admin-box').eq(0);
    const $writeBox = $('.write-box').eq(0);
    const $previewBox = $('.preview-box').eq(0);
    const $toggleSign = $('.toggle-sign').eq(0);

    if (!location.search) {
        function selectModal() {
            let modal = new Modal();
            modal.make({
                title: '选择文章',
                size: 'normal',
                body: `
                    <ul id="modify-list">
                    </ul>
                `,
                confirmText: '新建一篇',
                confirm: function () {
                    document.location = '/create.html'
                },
                cancelText: '返回',
                cancel: function () {
                    document.location = '/admin.html'
                },
                isMaskCancel:false
            });
        }
        //获取所有tag
        $.ajax({
            url: 'http://sparklv.cn/php/blog_all_tag.php',
            method: 'get',
            success: (data) => {
                selectModal();
                let tagsToColor = {};
                data.forEach((item) => {
                    tagsToColor[item.name] = { id: item.id, color: item.color };
                })
                $.ajax({
                    url: 'http://sparklv.cn/php/blog_read.php',
                    method: 'get',
                    success: (data) => {
                        data.forEach((item) => {
                            const $children = $(`<li class='edit-select-item'>
                                <a class='edit-select-link' href='/edit.html?${item.id}'>
                                    <span style='float:left'>${item.title}</span>
                                    <span style='float:right'>${item.date}</span>
                                </a>
                            </li>`);
                            $('#modify-list').append($children);
                        })
                    },
                    error: (error) => {
                        console.log(error)
                    }
                })
            },
            error: (error) => {
                console.log(error)
            }
        })
    }
    else {
        $adminBox.css('display', 'flex');
        $.ajax({
            url: 'http://sparklv.cn/php/select_onepage.php',
            method: 'post',
            data: { id: location.search.slice(1) },
            success: (data) => {
                $('#blog-title').val(data.title);
                $writeBox.val(Base64.decode(data.content));
                $previewBox.html(marked($writeBox.val()));
                hljs.highlightCode();
            },
            error: (error) => {
                console.log(error)
            }
        })
    }
    let dImg;
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

    $('.title-submit-btn').eq(0).on('click', () => {
        let now = new Date();
        let nowTime = now.getFullYear() + '-' + ((now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)) + '-' + (now.getDate() < 10 ? '0' + now.getDate() : now.getDate());
        let title = $('#blog-title').val();
        let content = Base64.encode($writeBox.val());
        let update_time = nowTime;
        $.ajax({
            url: 'http://sparklv.cn/php/blog_update.php',
            method: 'POST',
            data: { id: location.search.slice(1), title, content, update_time },
            success: function () {
                document.location = '/edit.html';
            },
            error: function (error, textStatus) {
                console.log(error);
                console.log(textStatus);
            }
        })
    })
    //上传图片
    $('#img-input').on('change', () => {
        let formData = new FormData();
        let fileData = $('#img-input').prop('files')[0];
        formData.append("user", "Spark");
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
            },
            error: function (error) {
                console.log(error.responseText);
            }
        })
    })
})
