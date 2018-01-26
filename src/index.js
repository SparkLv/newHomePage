import './index.scss'
import './common.scss'
import 'animate.css/animate.min.css'

$(function () {
    //loading图
    let insertLoading = () => {
        let url = require('./assets/loading.svg');
        let $loadingimg = $(`<img src=${url} class='loading-img' alt='loading'>`);
        let $indexContainer = $('.index-container').eq(0);
        $indexContainer.append($loadingimg);
    }
    insertLoading();
    //自适应屏幕
    let fulScreen = () => {
        let windowWidth = $(window).width()
        let windowHeight = $(window).height()
        $('.index-container').eq(0).width(windowWidth).height(windowHeight);
    }
    //插入背景图
    let insertImg = (url) => {
        let $bgimg = $(`<img src=${url} class='index-bg-img' alt='background-image'>`);
        let $indexContainer = $('.index-container').eq(0);
        $indexContainer.append($bgimg);
        $bgimg.on('load', () => {
            $('.loading-img').eq(0).css('display', 'none')
            $('.index-nav').eq(0).css('display', 'block')
        })
    }
    //获取bing每日图片url
    let getBgImg = () => {
        fulScreen();
        let nowTime = new Date().getTime()
        let ran = Math.floor(8 * Math.random())
        let uri = encodeURIComponent(`https://www.bing.com/HPImageArchive.aspx?format=js&idx=${ran}&n=1&nc=${nowTime}&pid=hp&ensearch=1&video=1&quiz=1&fav=1`)
        $.ajax({
            url: `https://jsonp.afeld.me/?url=${uri}`,
            method: 'get',
            success: (data) => {
                let imgUrl = data.images[0].url;
                let fimgUrl = 'https://www.bing.com' + imgUrl;
                insertImg(fimgUrl);
            },
            error: (error) => {
                console.log(error)
            }
        })
    }

    getBgImg()

    $(window).on('resize', () => {
        fulScreen()
    })
})