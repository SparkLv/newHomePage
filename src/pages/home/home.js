import '../../common.scss'
import './home.scss'
import 'animate.css/animate.min.css'
import ArticleBar from '../../components/articlebar/articlebar'

$(function () {
    const $homeBox = $('.home-box').eq(0);
    const $homeContainer = $('.home-container').eq(0);
    const $homeAside = $('.home-aside').eq(0);
    const $homeHeader = $('.home-header').eq(0);
    const $search = $('.icon-search').eq(0);
    const $searchInput = $('.home-nav-search').eq(0);
    const $searchInput2 = $('.home-nav-search2').eq(0);
    const $searchDownList = $('.search-downList').eq(0);
    const $searchDownList2 = $('.search-downList2').eq(0);
    const $homeNavbarNav = $('.home-navbar-nav').eq(0);
    const $clear = $('.icon-clear').eq(0);
    const $bgImg = $('.home-bg').eq(0);
    const $homeHeaderSlideBg = $('.home-header-slide-bg').eq(0);
    const $homeItCatelog = $('.home-it-catelog').eq(0);
    const $homeBookCatelog = $('.home-book-catelog').eq(0);
    const $homeEssayCatelog = $('.home-essay-catelog').eq(0);
    const $homeContentNavGroup = $('.home-content-nav-group').eq(0);
    const $collapseNavGroup = $('.collapse-nav-group').eq(0);
    const $homeCollapseNav = $('.home-collapse-nav').eq(0);
    const $navCallapseList = $('.nav-callapse-list').eq(0);

    /**
     * @desc 搜索框输入事件
     * @param {array} 所有内容数组
     */
    function searchInput(data) {
        $searchInput.on('input', (e) => {
            if (e.target.value) {
                $clear.css('visibility', 'visible');
                $searchDownList.css('display', 'block');
                searchResult(data, e.target.value);
            }
            else {
                $clear.css('visibility', 'hidden');
                $searchDownList.css('display', 'none');
            }
        })
    }

    function searchInput2(data) {
        $searchInput2.on('input', (e) => {
            if (e.target.value) {
                $searchDownList2.css('display', 'block');
                searchResult2(data, e.target.value);
            }
            else {
                $searchDownList2.css('display', 'none');
            }
        })
    }

    /**
     * @desc 搜索内容结果
     * @param {array} 所有内容数组
     * @param {String} 搜索的文字
     */
    function searchResult(data, text) {
        $searchDownList.html('');
        let matchReg = new RegExp(text, 'i');
        let matchArr = data.filter((item) => {
            return matchReg.test(item.title);
        })
        if (matchArr.length) {
            let matchReg1 = new RegExp(text, 'ig');
            matchArr.forEach((item) => {
                let title = item.title.replace(matchReg1, `<span style="color:red">$&</span>`);
                $searchDownList.append(`<li class='search-downList-item'><a href="${item.url}">${title}</a></li>`)
            })
        }
        else {
            $searchDownList.append(`<li class='search-downList-item' style="text-align:center"><a href="#">No Result !</a></li>`)
        }
    }

    function searchResult2(data, text) {
        $searchDownList2.html('');
        let matchReg = new RegExp(text, 'i');
        let matchArr = data.filter((item) => {
            return matchReg.test(item.title);
        })
        if (matchArr.length) {
            let matchReg1 = new RegExp(text, 'ig');
            matchArr.forEach((item) => {
                let title = item.title.replace(matchReg1, `<span style="color:red">$&</span>`);
                $searchDownList2.append(`<li class='search-downList-item'><a href="${item.url}">${title}</a></li>`)
            })
        }
        else {
            $searchDownList2.append(`<li class='search-downList-item' style="text-align:center"><a href="#">No Result !</a></li>`)
        }
    }

    /**
     * @desc 获取所有文章函数
     */
    function getAllEssay() {
        $.ajax({
            url: 'http://sparklv.cn/php/blog_all_tag.php',
            method: 'get',
            success: (data) => {
                let tagsToColor = {};
                let index = 0;
                //将标签数组转化成形式为 id=>color 的对象
                data.forEach((item) => {
                    tagsToColor[item.name] = { id: item.id, color: item.color };
                })
                //获取所有文章对象
                $.ajax({
                    url: 'http://sparklv.cn/php/blog_read.php',
                    method: 'get',
                    success: (data) => {
                        let createBar = new ArticleBar();
                        $homeContainer.html('');
                        // 使文章标签和颜色对应
                        data.forEach((item) => {
                            item.tags = item.tags.split(',');
                            item.tags = item.tags.map((item1) => {
                                return {
                                    id: tagsToColor[item1].id,
                                    name: item1,
                                    color: tagsToColor[item1].color
                                }
                            })
                            //添加缩略图参数
                            let filterJpg = /(.+)\.jpg/g;
                            let imgUrl2 = item.imgUrl.split('.jpg')[0] + '_d.jpg';
                            item.url = `/article.html?id=${item.id}&bgimg=${encodeURIComponent(imgUrl2)}`;
                            item.imgDesc = item.title;
                            //将文章bar插入到主页
                            createBar.insert(item, $homeContainer);
                            //添加侧边栏内容
                            if (index < 3) {
                                createBar.insert(item, $homeAside);
                            }
                            index++;
                        });
                        searchInput(data);
                        // searchInput2(data);
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

    /**
     * @desc 获取筛选文章函数
     */
    function getFilterEssay() {
        $.ajax({
            url: 'http://sparklv.cn/php/blog_all_tag.php',
            method: 'get',
            success: (data) => {
                let tagsToColor = {};
                let index = 0;
                //将标签数组转化成形式为 id=>color 的对象
                data.forEach((item) => {
                    tagsToColor[item.name] = { id: item.id, color: item.color };
                })
                $.ajax({
                    url: 'http://sparklv.cn/php/blog_filter.php',
                    method: 'post',
                    data: { tag: decodeURIComponent(location.hash.slice(1)) },
                    success: (data) => {
                        $homeContainer.html('');
                        if (data.length) {
                            let createBar = new ArticleBar();
                            // 使文章标签和颜色对应
                            data.forEach((item) => {
                                item.tags = item.tags.split(',');
                                item.tags = item.tags.map((item1) => {
                                    return {
                                        id: tagsToColor[item1].id,
                                        name: item1,
                                        color: tagsToColor[item1].color
                                    }
                                })
                                //添加缩略图参数
                                let filterJpg = /(.+)\.jpg/g;
                                let imgUrl2 = item.imgUrl.split('.jpg')[0] + '_d.jpg';
                                item.url = `/article.html?id=${item.id}&bgimg=${encodeURIComponent(imgUrl2)}`;
                                item.imgDesc = item.title;
                                //将文章bar插入到主页
                                createBar.insert(item, $homeContainer);
                            });
                        }
                        else {
                            $homeContainer.append('<h3 style="margin-top:50px;">暂无文章！</h3>');
                        }
                        $homeContentNavGroup.html('');
                        $homeContentNavGroup.append(`<li><a href="/home.html">全部文章</a></li>`);
                        $homeContentNavGroup.append(`<li>/</li>`);
                        $homeContentNavGroup.append(`<li>${decodeURIComponent(location.hash.slice(1))}</li>`);
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

    //全局滚动事件
    $(window).scroll((e) => {
        const top = $(window).scrollTop();
        const opacity = 1 - (top / 800);
        $bgImg.css('opacity', opacity);
        if ($(window).scrollTop() > 100) {
            $homeHeaderSlideBg.css('background', '#658db5').removeClass('slideOutRight').addClass('slideInRight');
        } else {
            $homeHeaderSlideBg.removeClass('slideInRight').addClass('slideOutRight');
        }
    })

    //全局点击事件
    $(window).click((e) => {
        if (e.target.className !== 'home-nav-search' && e.target.className !== 'icon iconfont icon-search' && e.target.className !== 'search-downList' && e.target.className !== 'search-downList-item') {
            $searchInput.val('').css({ 'display': 'none', 'width': '0' });
            $clear.css('visibility', 'hidden');
            $searchDownList.css('display', 'none');
            $homeNavbarNav.css({ 'opacity': 1, 'z-index': 2 });
        }
    })

    //hash改变事件
    $(window).on('hashchange', (e) => {
        getFilterEssay();
    })

    //点击搜索图标事件
    $search.click(() => {
        if ($searchInput.css('display') === 'none') {
            $searchInput.css({ 'display': 'inline-block', 'width': '255px' });
            $homeNavbarNav.css({ 'opacity': 0, 'z-index': -1 });
        }
        else {
            $searchInput.val('').css({ 'display': 'none', 'width': '0' });
            $clear.css('visibility', 'hidden');
            $searchDownList.css('display', 'none');
            $homeNavbarNav.css({ 'opacity': 1, 'z-index': 2 });
        }
    });

    //搜索文字清除点击事件
    $clear.click(() => {
        $clear.css('visibility', 'hidden');
        $searchInput.val('').focus()
    })

    $homeCollapseNav.click(() => {
        if ($navCallapseList.css('display') === 'none') {
            $navCallapseList.css('display', 'block');
        }
        else {
            $navCallapseList.css('display', 'none');
        }
    })

    getAllEssay();
    $homeContentNavGroup.html('');
    $homeContentNavGroup.append(`<li><a href="/home.html">全部文章</a></li>`);
    if (location.hash) {
        getFilterEssay();
        $homeContentNavGroup.append(`<li>/</li>`);
        $homeContentNavGroup.append(`<li>${decodeURIComponent(location.hash.slice(1))}</li>`);
    }

    //it box
    $.ajax({
        url: 'http://sparklv.cn/php/get_it_tags.php',
        method: 'get',
        success: (data) => {
            let itAllTags = [];
            let itTags = [];
            data.forEach((item) => {
                if (itAllTags.indexOf(item.type) === -1) {
                    itAllTags.push(item.type);
                }
            });
            itAllTags.forEach((item) => {
                let obj = {};
                obj.name = item;
                obj.item = [];
                data.forEach((item1) => {
                    if (item1.type === item) {
                        obj.item.push(item1)
                    }
                })
                itTags.push(obj);
            })
            itTags.forEach((item) => {
                let $ul = $(`<ul><h4>${item.name}</h4></ul>`);
                item.item.forEach((item1) => {
                    let $li = $(`<li class="catalog-item">${item1.name}</li>`);
                    $ul.append($li);
                });
                let $ul2 = $(`<ul><h4>${item.name}</h4></ul>`);
                item.item.forEach((item1) => {
                    let $li = $(`<li class="catalog-item">${item1.name}</li>`);
                    $ul2.append($li);
                });
                $homeItCatelog.append($ul);
                $collapseNavGroup.append($ul2);
            })
            $.ajax({
                url: 'http://sparklv.cn/php/get_book_tags.php',
                method: 'get',
                success: (data) => {
                    let bookAllTags = [];
                    let bookTags = [];
                    data.forEach((item) => {
                        if (bookAllTags.indexOf(item.type) === -1) {
                            bookAllTags.push(item.type);
                        }
                    });
                    bookAllTags.forEach((item) => {
                        let obj = {};
                        obj.name = item;
                        obj.item = [];
                        data.forEach((item1) => {
                            if (item1.type === item) {
                                obj.item.push(item1)
                            }
                        })
                        bookTags.push(obj);
                    })
                    bookTags.forEach((item) => {
                        let $ul = $(`<ul><h4>${item.name}</h4></ul>`);
                        item.item.forEach((item1) => {
                            let $li = $(`<li class="catalog-item">${item1.name}</li>`);
                            $ul.append($li);
                        });
                        $homeBookCatelog.append($ul);
                        let $ul2 = $(`<ul><h4>${item.name}</h4></ul>`);
                        item.item.forEach((item1) => {
                            let $li = $(`<li class="catalog-item">${item1.name}</li>`);
                            $ul2.append($li);
                        });
                        $collapseNavGroup.append($ul2);
                    })
                    $.ajax({
                        url: 'http://sparklv.cn/php/get_essay_tags.php',
                        method: 'get',
                        success: (data) => {
                            let essayAllTags = [];
                            let essayTags = [];
                            data.forEach((item) => {
                                if (essayAllTags.indexOf(item.type) === -1) {
                                    essayAllTags.push(item.type);
                                }
                            });
                            essayAllTags.forEach((item) => {
                                let obj = {};
                                obj.name = item;
                                obj.item = [];
                                data.forEach((item1) => {
                                    if (item1.type === item) {
                                        obj.item.push(item1)
                                    }
                                })
                                essayTags.push(obj);
                            })
                            essayTags.forEach((item) => {
                                let $ul = $(`<ul><h4>${item.name}</h4></ul>`);
                                item.item.forEach((item1) => {
                                    let $li = $(`<li class="catalog-item">${item1.name}</li>`);
                                    $ul.append($li);
                                });
                                $homeEssayCatelog.append($ul);
                                let $ul2 = $(`<ul><h4>${item.name}</h4></ul>`);
                                item.item.forEach((item1) => {
                                    let $li = $(`<li class="catalog-item">${item1.name}</li>`);
                                    $ul2.append($li);
                                });
                                $collapseNavGroup.append($ul2);
                            })
                            $('.catalog-item').each((index, item) => {
                                $(item).on('click', () => {
                                    location.hash = $(item).html();
                                })
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
        },
        error: (error) => {
            console.log(error)
        }
    })

})