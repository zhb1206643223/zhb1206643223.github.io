$(function () {
    //生成菜单
    $(".nav").xmenu();
    //主页设置
    load("view/home.html", setHomeImageSize);
});

/* 页面加载 */
function load(url, fun) {
    $("#main").load(url, fun);
}

/* 设置首页图片 */
function setHomeImageSize() {
    var $win_width = $(document).width();
    var $win_height = $(document).height();
    setImgSize($("#main > #home"), $win_width - 140, $win_height);
}

/* 设置图片宽高 */
function setImgSize($node, width, height) {
    $node.css("width", width);
    $node.css("height", height);
}

function setVideoPageWidth() {
    var $win_width = $(document).width();
    var $win_height = $(document).height();
    $(".x-video-template").css("width", $win_width - 140);
    $(".x-video-media").css("width", ($win_width - 140) * 0.8);
    $(".x-video-media").css("height", $win_height * 0.8);
    $(".x-video-media > iframe").css("width", ($win_width - 140) * 0.8);
    $(".x-video-media > iframe").css("height", $win_height * 0.8);
}

function setBlogPageStyle() {
    var $win_width = $(document).width();
    var $win_height = $(document).height();
    $(".x-blog-template").css("width", $win_width - 260);
}
