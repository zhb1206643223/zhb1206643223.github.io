(function ($) {
    $.fn.xmenu = function (options) {
        // 默认配置
        var defaults = {
            url: "config/menu.json"
        };

        // 参数
        var opts = $.extend(defaults, options);
        var menuLists = {};
        var rootNode = $(this);

        // 数据加载
        $.getJSON(opts.url, function (data) {
            for (var i = 0; i < data.length; i++) {
                var menuList = menuLists[data[i].parentId];
                if (menuList == null || menuList == undefined) {
                    menuList = [];
                    menuLists[data[i].parentId] = menuList;
                }
                menuList.push(data[i]);
            }
            createMenu(rootNode, menuLists);
        });

        // 创建菜单
        function createMenu(rootNode, menuLists) {
            //清空数据
            rootNode.empty();
            //创建菜单跟节点
            rootNode.append("<ul class=\"menu\"></ul>");
            //获取一级菜单数据
            var menuLV1Array = menuLists["null"];
            var menuNode = rootNode.find(".menu");
            //循环遍历
            for (var i = 0; i < menuLV1Array.length; i++) {
                var menuItem = menuLV1Array[i];
                // 超链接设置
                var aHref = getAHref(menuItem);
                // 图标设置
                var icon = getIcon(menuItem);
                // 后置图标及二级菜单
                var menuLV2Array = menuLists[menuItem["id"]];
                var plus = "<span class=\"plus\">+</span>";
                if (menuLV2Array == null || menuLV2Array == undefined || menuLV2Array.length <= 0) {
                    menuLV2Array = [];
                    plus = "";
                }
                var html = "<li><a href=\"" + aHref + "\">" + icon + menuItem["title"] + plus + "</a>" + createLV2MenuStr(menuLV2Array) + "</li>";
                menuNode.append(html);
            }
            setMenuLV2Action();
            setMenuLV3Action(menuLists);
        }

        function createLV3Menu(menuLV3Array) {
            $("nav.nav-bar").empty();
            var html = "<ul class=\"last-menu\">";
            for (var i = 0; i < menuLV3Array.length; i++) {
                var menuItem = menuLV3Array[i];
                // 超链接设置
                var aHref = getAHref(menuItem);
                // 图标设置
                var icon = getIcon(menuItem);
                html += "<li><a href=\"" + aHref + "\">" + icon + menuItem["title"] + "</a></li>";
            }
            html += "</ul>";
            $("nav.nav-bar").append(html);
        }

        //三级菜单动作设置
        function setMenuLV3Action(menuLists) {
            $("ul.sub-menu > li > a").hover(
                function () {
                    var path = $(this).attr("href");
                    //获取选中的3级菜单
                    var menuLV3Array = menuLists[path.substring(path.lastIndexOf("#") + 1)];
                    if (menuLV3Array != null && menuLV3Array != undefined && menuLV3Array.length > 0) {
                        createLV3Menu(menuLV3Array);
                        $("nav.nav-bar").css("display", "block");
                    }
                },
                function () {
                    var path = $(this).attr("href");
                    //获取选中的3级菜单
                    var menuLV3Array = menuLists[path.substring(path.lastIndexOf("#") + 1)];
                    if (menuLV3Array != null && menuLV3Array != undefined && menuLV3Array.length > 0) {
                        $("nav.nav-bar").css("display", "none");
                    }
                }
            );
            $("nav.nav-bar").hover(
                function () {
                    $("nav.nav-bar").css("display", "block");
                },
                function () {
                    $("nav.nav-bar").css("display", "none");
                }
            );
        }

        //二级菜单动作设置
        function setMenuLV2Action() {
            $(".sub-menu").css("display", "none");
            $(".sub-menu").each(function () {
                var node = $(this);
                $(this).prev("a").bind("click", function () {
                    $(".sub-menu").each(function () {
                        if ($(this).is(node)) {
                            var displayVal = node.css("display");
                            if (displayVal == "none") {
                                node.show("fast");
                                $(this).prev("a").find(".plus").html("-");
                            } else {
                                node.hide("fast");
                                $(this).prev("a").find(".plus").html("+");
                            }
                        } else {
                            $(this).hide("fast");
                            $(this).prev("a").find(".plus").html("+");
                        }
                    });
                });
            });
        }

        //二级菜单字符串
        function createLV2MenuStr(menuLV2Array) {
            var html = "";
            if (menuLV2Array.length <= 0) {
                return html;
            }
            html += "<ul class=\"sub-menu\">";
            for (var i = 0; i < menuLV2Array.length; i++) {
                var menuItem = menuLV2Array[i];
                // 超链接设置
                var aHref = getAHref(menuItem);
                // 图标设置
                var icon = getIcon(menuItem);
                html += "<li><a href=\"" + aHref + "\">" + icon + menuItem["title"] + "</a></li>";
            }
            html += "</ul>";
            return html;
        }

        //获取超链接
        function getAHref(menuItem) {
            var aHref = menuItem["url"];
            if (aHref == null || aHref == undefined) {
                aHref = menuItem["path"];
            }
            return aHref;
        }

        //获取图标
        function getIcon(menuItem) {
            var icon = menuItem["icon"];
            if (icon == null || icon == undefined) {
                icon = "";
            } else {
                icon = "<i class=\"" + menuItem["icon"] + "\"></i>";
            }
            return icon;
        }
    };
})(jQuery);
