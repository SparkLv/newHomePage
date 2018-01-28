import '../../common.scss'
import './home.scss'
import ArticleBar from '../../components/articlebar/articlebar'

const articleImg = require('../../assets/articleimg.jpg')

const objArr = [{
    title: '测试',
    desc: `这个效果需要JS 给<body>添加dimmed这个类，如果把遮罩层交给元素自己的::bofore伪元素来实现，就可以弥补不足。给伪元素设置z-index:-1;就可以让它出现在元素
    这个效果需要JS 给<body>添加dimmed这个类，如果把遮罩层交给元素自己的::bofore伪元这个效果需要JS 给<body>添加dimmed这个类，如果把遮罩层交给元素自己的::bofore伪元这个添加dimmed这个类，如果把遮罩自己的::bofore伪元
    的背后。尽管这解决了可移植的问题，但无法对遮罩层Z轴层次进行细粒度的控制，它可能出现在这个元素之后（期望的），但也可能出现在这个元素的父元素活着祖先元素之后。`,
    imgUrl: articleImg,
    imgDesc: '这是图片简介',
    date:'2018-01-28 17:24:01',
    tags:['js','css','webpack'],
},
{
    title: '测试1',
    desc: '这个效果需要JS 给<body>添加dimmed这个类，如果把遮罩层交给元素自己的::bofore伪元素来实现，就可以弥补不足。给伪元素设置z-index:-1;就可以让它出现在元素的背后。尽管这解决了可移植的问题，但无法对遮罩层Z轴层次进行细粒度的控制，它可能出现在这个元素之后（期望的），但也可能出现在这个元素的父元素活着祖先元素之后。',
    imgUrl: articleImg,
    imgDesc: '这是图片简介',
    date:'2018-01-28 17:24:01',
    tags:['js','css','webpack'],      
},
{
    title: '测试2',
    desc: '这个效果需要JS 给<body>添加dimmed这个类，如果把遮罩层交给元素自己的::bofore伪元素来实现，就可以弥补不足。给伪元素设置z-index:-1;就可以让它出现在元素的背后。尽管这解决了可移植的问题，但无法对遮罩层Z轴层次进行细粒度的控制，它可能出现在这个元素之后（期望的），但也可能出现在这个元素的父元素活着祖先元素之后。',
    imgUrl: articleImg,
    imgDesc: '这是图片简介',
    date:'2018-01-28 17:24:01', 
    tags:['js','css','webpack'],       
},
{
    title: '测试3',
    desc: '这个效果需要JS 给<body>添加dimmed这个类，如果把遮罩层交给元素自己的::bofore伪元素来实现，就可以弥补不足。给伪元素设置z-index:-1;就可以让它出现在元素的背后。尽管这解决了可移植的问题，但无法对遮罩层Z轴层次进行细粒度的控制，它可能出现在这个元素之后（期望的），但也可能出现在这个元素的父元素活着祖先元素之后。',
    imgUrl: articleImg,
    imgDesc: '这是图片简介',
    date:'2018-01-28 17:24:01', 
    tags:['js','css','webpack'],       
},
{
    title: '测试4',
    desc: '这个效果需要JS 给<body>添加dimmed这个类，如果把遮罩层交给元素自己的::bofore伪元素来实现，就可以弥补不足。给伪元素设置z-index:-1;就可以让它出现在元素的背后。尽管这解决了可移植的问题，但无法对遮罩层Z轴层次进行细粒度的控制，它可能出现在这个元素之后（期望的），但也可能出现在这个元素的父元素活着祖先元素之后。',
    imgUrl: articleImg,
    imgDesc: '这是图片简介',
    date:'2018-01-28 17:24:01', 
    tags:['js','css','webpack'],       
}
]

$(function () {
    const $homeBox = $('.home-box').eq(0);
    const $homeContainer = $('.home-container').eq(0);
    const $homeHeader = $('.home-header').eq(0);
    const $search = $('.icon-search').eq(0);
    const $searchInput = $('.home-nav-search').eq(0);
    const $clear = $('.icon-clear').eq(0);
    const bgImgUrl = require('../../assets/home-bg.jpg');
    const $bgImg = $(`<div class='home-bg'></div>`);
    $bgImg.css('background', `url(${bgImgUrl}) no-repeat center center/auto auto`)
    $homeBox.append($bgImg);
    $(window).scroll((e) => {
        const top = $(window).scrollTop();
        const opacity = 1 - (top / 400);
        $bgImg.css('opacity', opacity);
        if (top > 50) {
            $homeHeader.addClass('home-header-fixed')
        }
        else {
            $homeHeader.removeClass('home-header-fixed')
        }
    })
    $search.click(() => {
        alert($searchInput.val());
    });
    $searchInput.on('input', (e) => {
        if (e.target.value) {
            $clear.css('visibility', 'visible');
        }
        else {
            $clear.css('visibility', 'hidden');
        }
    })
    $searchInput.on('keypress', (e) => {
        if (event.keyCode === 13) {
            $search.click()
        }
    })
    $clear.click(() => {
        $clear.css('visibility', 'hidden');
        $searchInput.val('').focus()
    })

    let test = new ArticleBar();
    objArr.forEach((item) => {
        test.insert(item, $homeContainer);
    })
    // let insertLoading = () => {
    //     let url = require('../../assets/loading.svg');
    //     let $loadingimg = $(`<img src=${url} class='loading-img' alt='loading'>`);
    //     let $indexContainer = $('body').eq(0);
    //     $indexContainer.append($loadingimg);
    // }
    // insertLoading();
    // $.ajax({
    //     url: 'http://sparklv.cn/php/test2.php',
    //     data: {
    //         first: 'wenbin',
    //         second: 'lv',
    //         third: 'is',
    //         forth: 28
    //     },
    //     method: 'post',
    //     success: (data) => {
    //         console.log(data)
    //         $.ajax({
    //             url: 'http://sparklv.cn/php/test.php',
    //             method: 'get',
    //             success: (data) => {
    //                 console.log(data)
    //             },
    //             error: (error) => {
    //                 console.log(error)
    //             }
    //         })
    //     },
    //     error: (error) => {
    //         console.log(error)
    //     }
    // })
})