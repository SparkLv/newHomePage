import '../../common.scss'
import './home.scss'
import ArticleBar from '../../components/articlebar/articlebar'

$(function () {
    const $homeBox = $('.home-box').eq(0);
    const $homeContainer = $('.home-container').eq(0);
    const $homeAside = $('.home-aside').eq(0);
    const $homeHeader = $('.home-header').eq(0);
    const $search = $('.icon-search').eq(0);
    const $searchInput = $('.home-nav-search').eq(0);
    const $homeNavbarNav = $('.home-navbar-nav').eq(0);
    const $clear = $('.icon-clear').eq(0);
    const $bgImg = $('.home-bg').eq(0);
    $(window).scroll((e) => {
        const top = $(window).scrollTop();
        const opacity = 1 - (top / 800);
        $bgImg.css('opacity', opacity);
    })
    $(window).click((e) => {
        if (e.target.className !== 'home-nav-search' && e.target.className !== 'icon iconfont icon-search') {
            $searchInput.val('').css({ 'display': 'none', 'width': '0' });
            $clear.css('visibility', 'hidden');
            $homeNavbarNav.css({ 'opacity': 1, 'z-index': 2 });
        }
    })
    $search.click(() => {
        if ($searchInput.css('display') === 'none') {
            $searchInput.css({ 'display': 'inline-block', 'width': '255px' });
            $homeNavbarNav.css({ 'opacity': 0, 'z-index': -1 });
        }
        else {
            $searchInput.val('').css({ 'display': 'none', 'width': '0' });
            $clear.css('visibility', 'hidden');
            $homeNavbarNav.css({ 'opacity': 1, 'z-index': 2 });
        }
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
            alert(e.target.value)
        }
    })
    $clear.click(() => {
        $clear.css('visibility', 'hidden');
        $searchInput.val('').focus()
    })
    $.ajax({
        url: 'http://sparklv.cn/php/blog_all_tag.php',
        method: 'get',
        success: (data) => {
            let tagsToColor = {};
            data.forEach((item) => {
                tagsToColor[item.name] = { id: item.id, color: item.color };
            })
            $.ajax({
                url: 'http://sparklv.cn/php/blog_read.php',
                method: 'get',
                success: (data) => {
                    let data1 = JSON.parse(data);
                    let test = new ArticleBar();
                    data1.forEach((item) => {
                        if (item.imgurl) {
                            item.imgUrl = imgurl
                        }
                        else {
                            item.imgUrl = 'http://sparklv.cn/photo/articleimg.jpg';
                        }
                        item.desc = item.description;
                        item.tags = item.tags.split(',');
                        item.tags = item.tags.map((item1) => {
                            return {
                                id: tagsToColor[item1].id,
                                name: item1,
                                color: tagsToColor[item1].color
                            }
                        })
                        item.date = item.update_time;
                        item.url = '/article.html?id=' + item.id;
                        item.imgDesc = item.title;
                        test.insert(item, $homeContainer);
                        test.insert(item,$homeAside)
                    });
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
    // $.ajax({
    //     url: 'http://sparklv.cn/php/get_book_tags.php',
    //     method: 'get',
    //     success: (data) => {
    //         let bookTags = [];
    //         let tagType = [];
    //         data.forEach((item) => {
    //             if (tagType.indexOf(item.type) === -1) {
    //                 tagType.push(item.type)
    //             }
    //         })
    //         tagType.forEach((item) => {
    //             bookTags.push([]);
    //             data.forEach((item1) => {
    //                 if (item1.type === item) {
    //                     bookTags[bookTags.length - 1].push(item1)
    //                 }
    //             })
    //         })
    //         let $bookBox = $('.book-box').eq(0);
    //         bookTags.forEach((item2) => {
    //             let $Box = $("<div class='middle-nav-box'></div>")
    //             let $title = $(`<div class='middle-nav-title'>${item2[0].type}</div>`)
    //             $Box.append($title)
    //             item2.forEach((item3) => {
    //                 let $Nav = $(`<span class='middle-nav-nav'>${item3.name}</span>`);
    //                 $Box.append($Nav);
    //             })
    //             $bookBox.append($Box);
    //         })
    //     },
    //     error: (error) => {
    //         console.log(error)
    //     }
    // })
    // $.ajax({
    //     url: 'http://sparklv.cn/php/get_essay_tags.php',
    //     method: 'get',
    //     success: (data) => {
    //         let essayTags = [];
    //         let tagType = [];
    //         data.forEach((item) => {
    //             if (tagType.indexOf(item.type) === -1) {
    //                 tagType.push(item.type)
    //             }
    //         })
    //         tagType.forEach((item) => {
    //             essayTags.push([]);
    //             data.forEach((item1) => {
    //                 if (item1.type === item) {
    //                     essayTags[essayTags.length - 1].push(item1)
    //                 }
    //             })
    //         })
    //         let $essayBox = $('.essay-box').eq(0);
    //         essayTags.forEach((item2) => {
    //             let $Box = $("<div class='middle-nav-box'></div>")
    //             let $title = $(`<div class='middle-nav-title'>${item2[0].type}</div>`)
    //             $Box.append($title)
    //             item2.forEach((item3) => {
    //                 let $Nav = $(`<span class='middle-nav-nav'>${item3.name}</span>`);
    //                 $Box.append($Nav);
    //             })
    //             $essayBox.append($Box);
    //         })
    //     },
    //     error: (error) => {
    //         console.log(error)
    //     }
    // })
    // //it box
    // $.ajax({
    //     url: 'http://sparklv.cn/php/get_it_tags.php',
    //     method: 'get',
    //     success: (data) => {
    //         let itTags = [];
    //         let tagType = [];
    //         data.forEach((item) => {
    //             if (tagType.indexOf(item.type) === -1) {
    //                 tagType.push(item.type)
    //             }
    //         })
    //         tagType.forEach((item) => {
    //             itTags.push([]);
    //             data.forEach((item1) => {
    //                 if (item1.type === item) {
    //                     itTags[itTags.length - 1].push(item1)
    //                 }
    //             })
    //         })
    //         let $itBox = $('.it-box').eq(0);
    //         itTags.forEach((item2) => {
    //             let $Box = $("<div class='middle-nav-box'></div>")
    //             let $title = $(`<div class='middle-nav-title'>${item2[0].type}</div>`)
    //             $Box.append($title)
    //             item2.forEach((item3) => {
    //                 let $Nav = $(`<span class='middle-nav-nav'>${item3.name}</span>`);
    //                 $Box.append($Nav);
    //             })
    //             $itBox.append($Box);
    //         })
    //     },
    //     error: (error) => {
    //         console.log(error)
    //     }
    // })
})