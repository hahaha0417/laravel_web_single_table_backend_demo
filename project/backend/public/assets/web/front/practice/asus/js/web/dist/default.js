function fn_localization(e) {
    if (sysWording = e.value_pair, sysWordingRead = !0, "athena.asus.com" != window.location.hostname && window.location.href.indexOf("PageError") > -1) {
        "global" != getWebsite() ? "/" + getWebsite() : ""
    }
    getWebservice("getCompare", "fn_compare", "")
}

function querySt(e) {
    hu = window.location.search.substring(1);
    var t = "";
    for (gy = hu.split("&"), i = 0; i < gy.length; i++) ft = gy[i].split("="), ft[0].toUpperCase() == e.toUpperCase() && (t = ft[1]);
    return t
}

function ButtonTrk(e, t, a, n) {
    if ("" != tracking_country) {
        var o = o || [];
        o.push("1=" + tracking_country), o.push("2=" + e), o.push("5=" + t), o.push("6=" + a), o.push("7=" + n), wmx_BtnTrack(o)
    }
}

function toShowLanguageSelection() {
    var e = getLanguageForWebsite().toUpperCase(),
        t = window.location.pathname,
        a = t.split("/"),
        n = "" == a[1] ? -1 : e.indexOf(a[1].toUpperCase());
    return isMultipleLanguageWebsite() && -1 == n
}

function getLanguageForWebsite() {
    switch (window.location.hostname.toLowerCase().replace("origin-", "")) {
        case "ca.asus.com":
            return "en,fr";
        case "ch.asus.com":
            return "it,fr,de";
        case "be.asus.com":
            return "nl,fr";
        case "ae.asus.com":
            return "en,ar";
        default:
            return ""
    }
}

function getcookiedata(e) {
    return "" == e ? "" : (theData = "", theCookie = document.cookie + ";", start = theCookie.indexOf(e + "="), -1 != start && (end = theCookie.indexOf(";", start), theData = unescape(theCookie.substring(start + e.length + 1, end))), theData.replace(";", ""))
}

function add_compare_model(e, t, a, n, o) {
    theData = getcookiedata(e), -1 != theData.indexOf(t + ".") || (document.cookie = e + "=" + escape(t + "." + a.replace(".", "^") + "." + n + "." + o + "," + theData) + "; domain=" + window.location.host.replace(/.+?\.asus/, ".asus") + ";path=/")
}

function add_recently_model(e, t) {
    add_compare_model("recently", e, t)
}

function add_cookie(e, t, a) {
    a ? document.cookie = e + "=" + t + "; domain=" + window.location.host.replace(/.+?\.asus/, ".asus") + ";path=/" : document.cookie = e + "=" + t + "; domain=" + window.location.host.replace(/.+?\.asus/, ".asus") + ";path=/"
}

function remove_compare_model(e, t, a, n, o) {
    theData = getcookiedata(e), "" != n ? theData = theData.replace(t + "." + a.replace(".", "^") + "." + n + "." + o + ",", "") : theData = theData.replace(t + "." + a.replace(".", "^") + ",", ""), "" == t && "" == a ? document.cookie = e + "=; domain=" + window.location.host.replace(/.+?\.asus/, ".asus") + ";path=/" : document.cookie = e + "=" + escape(theData) + "; domain=" + window.location.host.replace(/.+?\.asus/, ".asus") + ";path=/"
}

function remove_recently_model(e, t) {
    remove_compare_model("recently", e, t)
}

function itemcount(e) {
    if (!e) return 0;
    var t = new Array;
    return t = e.split(","), t.length - 1
}

function fileIsExisted(e) {
    var t = 0,
        a = createAJAX();
    if (!a) return !1;
    try {
        for (a.open("get", e, !1), a.send(null); 4 != a.readyState || 50 >= t;) t += 1;
        return 200 == a.status ? !0 : !1
    } catch (n) {
        return !1
    }
}

function fileIsExisted_onreadystatechange() {
    return 4 == objXHR.readyState ? 200 == objXHR.status ? (objXHR.onreadystatechange = null, !0) : !1 : void 0
}

function createAJAX() {
    var e = !1;
    try {
        e = new XMLHttpRequest
    } catch (t) {
        try {
            e = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (a) {
            try {
                e = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (n) {
                e = !1
            }
        }
    }
    return e
}

function flash_palyer(e, t, a) {
    var n = "";
    return n += "<object codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,12,36' width='" + a + "' height='" + t + "' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'>", n += "        <param name='FlashVars' value='' />", n += "        <param name='Movie' value='" + e + "' />", n += "        <param name='Src' value='" + e + "' />", n += "        <param name='WMode' value='Transparent' />", n += "        <param name='Play' value='-1' />", n += "        <param name='Loop' value='-1' />", n += "        <param name='Quality' value='High' />", n += "        <param name='SAlign' value='' />", n += "        <param name='Menu' value='-1' />", n += "        <param name='Base' value='' />", n += "        <param name='AllowScriptAccess' value='always' />", n += "        <param name='Scale' value='ShowAll' />", n += "        <param name='DeviceFont' value='0' />", n += "        <param name='EmbedMovie' value='0' />", n += "        <param name='BGColor' value='' />", n += "        <param name='SWRemote' value='' />", n += "        <param name='MovieData' value='' />", n += "        <param name='SeamlessTabbing' value='1' />", n += "        <param value='false' name='menu' />", n += "        <param value='opaque' name='wmode' />", n += "        <embed wmode='transparent' flashvars='" + e + "' src='" + e + "' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='" + a + "' height='" + t + "'></embed>", n += "</object>"
}

function date_format(e, t) {
    var a = new Date(e),
        n = a.formatDate(t);
    return n
}

function trim(e) {
    return e.replace(/(^\s*)|(\s*$)/g, "")
}

function youtubePlayer(e, t, a, n) {
    var o = "<object height='" + e + "' width='" + t + "'><param value='" + a + "&autoplay=1' name='movie'><param value='true' name='allowFullScreen'><param value='always' name='allowscriptaccess'><embed height='" + e + "' width='" + t + "' allowfullscreen='true' allowscriptaccess='always' type='application/x-shockwave-flash' src='" + a + "&autoplay=1'></object>";
    $(n).after(o), $(n).hide()
}

function getFBLangCode() {
    switch (getWebsite()) {
        case "jp":
            getFBLangCode = "ja_JP";
            break;
        case "tw":
            getFBLangCode = "zh_TW";
            break;
        case "de":
            getFBLangCode = "de_DE";
            break;
        case "es":
            getFBLangCode = "es_ES";
            break;
        case "fr":
            getFBLangCode = "fr_FR";
            break;
        case "pl":
            getFBLangCode = "pl_PL";
            break;
        default:
            getFBLangCode = "en_US"
    }
    return getFBLangCode
}

function parseURL(e) {
    var t = document.createElement("a");
    return t.href = e, {
        source: e,
        protocol: t.protocol.replace(":", ""),
        host: t.hostname,
        port: t.port,
        query: t.search,
        params: function() {
            for (var e, a = {}, n = t.search.replace(/^\?/, "").split("&"), o = n.length, r = 0; o > r; r++) n[r] && (e = n[r].split("="), a[e[0]] = e[1]);
            return a
        }(),
        file: (t.pathname.match(/\/([^\/?#]+)$/i) || [, ""])[1],
        hash: t.hash.replace("#", ""),
        path: t.pathname.replace(/^([^\/])/, "/$1"),
        relative: (t.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1],
        segments: t.pathname.replace(/^\//, "").split("/")
    }
}

function FBTrackEvent(e) {
    fbq("track", "Lead", {
        content_name: e,
        content_category: "WhereToBuy"
    })
}

function GATrackEvent(e, t, a, n) {
    Sendga("send", "event", e, t, a), void 0 != n && ("_self" == n.target ? setTimeout('document.location = "' + n.href + '"', 100) : window.open(n.href))
}

function GABannerTrackEvent(e) {
    try {
        var t = $(e).attr("data-track");
        "" != t && "undefined" != t && Sendga("send", "event", t, "click", e.href)
    } catch (a) {}
    "_self" == link.target ? setTimeout('document.location = "' + link.href + '"', 100) : window.open(link.href)
}

function googleTrackEvent(e, t, a) {
    try {
        var n = isMultipleLanguageWebsite() || isApplicationPathSite() ? window.location.pathname.split("/")[2] : window.location.pathname.split("/")[1];
        switch (e) {
            case "HotProducts":
                var o = "";
                o = $("img", t).attr("src");
                var r = -1 == o.indexOf("/products/") ? o.indexOf("/hotproduct/") : o.indexOf("/products/");
                o = -1 == o.indexOf("/products/") ? o.substr(r + 11) : o.substr(r + 9);
                var i = o;
                t.target = "_self";
                break;
            case "Banner":
                var o = $(t).data("track"),
                    i = o;
                break;
            case "Spotlight":
            case "Feature":
            case "HeadNews":
            case "ProductGroup Award":
            case "MediaReview":
            case "Video":
            case "Country_Lang_Menu":
            case "index_menu":
                var i = "" == t.title ? t.innerHTML : t.title;
                ("HeadNews" == e || "ProductGroup Award" == e || "Feature" == e || "Country_Lang_Menu" == e) && (t.target = "_self");
                break;
            default:
                var i = "";
                t.target = "_self"
        }
        "" == n && "HeadNews" == e && (a = !0), 1 == a ? Sendga("send", "event", "Index", e, i) : Sendga("send", "event", n, e, i), "Product Comparison" != e && "Video" != e && "Recently_Viewed" != t.title && "Compare_List" != t.title && "minicart" != t.title && -1 == t.title.indexOf("account_") && ("_self" == t.target ? setTimeout('document.location = "' + t.href + '"', 100) : window.open(t.href))
    } catch (c) {}
}

function TopmenuGoogleTraking(e, t, a) {
    try {
        "" == e.title ? e.innerHTML : e.title;
        Sendga("send", "event", "banner-whats-hot-" + t, "click", a), "_self" == e.target ? setTimeout('document.location = "' + e.href + '"', 100) : window.open(e.href)
    } catch (n) {}
}

function googleTrackFamilySite(e, t) {
    try {
        var a = "" == e.title ? e.innerHTML : e.title;
        Sendga("send", "event", "Family Site", t, a), -1 == t.indexOf("WhereToBuy") && ("_self" == e.target ? setTimeout('document.location = "' + e.href + '"', 100) : window.open(e.href))
    } catch (n) {}
}

function trackOverview(e, t) {
    try {
        Sendga("send", "event", "Overview", e, t)
    } catch (a) {}
}

function trackSpecialOverview(e, t) {
    try {
        Sendga("send", "event", "SpecialOverview", e, t)
    } catch (a) {}
}

function googleTrackProduct(e) {
    try {
        var t = window.location.pathname,
            a = t.split("/").length,
            n = (t.split("/")[a - 2], isMultipleLanguageWebsite() || isApplicationPathSite() ? window.location.pathname.split("/")[2] : window.location.pathname.split("/")[1]),
            o = window.location.pathname.split("/");
        url_tab = o[o.length - 2], e == url_tab && Sendga("send", "event", n + " - Product", t.replace("/" + n, ""), e)
    } catch (r) {}
}

function googleTrackProductfn(e, t) {
    try {
        switch (e) {
            case "Microsite":
            case "BuyNow":
            case "AddCompare":
            case "BusinessDataSheet":
            case "wheretobuy_adi":
                googleTrackProduct(e), "AddCompare" != e && ("_self" == t.target ? setTimeout('document.location = "' + t.href + '"', 100) : window.open(t.href));
                break;
            case "ProductPrint":
            case "Gallery":
            case "Video":
                var a = window.location.pathname,
                    n = a.split("/").length,
                    o = isMultipleLanguageWebsite() || isApplicationPathSite() ? window.location.pathname.split("/")[2] : window.location.pathname.split("/")[1];
                if ("" == t || "Gallery" != e && "Video" != e) {
                    var r = ("ProductPrint" == e ? a.split("/")[n - 3] : a.split("/")[n - 2], "ProductPrint" == e ? "/ProductPrint" : "Gallery"),
                        i = a.replace(r, "");
                    "Gallery" != e && Sendga("send", "event", o + " - Product", i.replace("/" + o, ""), e)
                } else {
                    var c = "undefined" == typeof $("img", t).attr("src") ? t.split("/")[4] : $("img", t).attr("src").split("/")[4],
                        i = (a.split("/")[n - 2], a.replace("Gallery", ""));
                    Sendga("send", "event", o + " - Product", i.replace("/" + o, ""), e + "/" + c), "undefined" != typeof $("img", t).attr("src") && setTimeout('document.location = "' + t.href + '"', 100)
                }
                break;
            case "WTB_OnlineRetailer":
                var a = window.location.pathname,
                    o = isMultipleLanguageWebsite() || isApplicationPathSite() ? window.location.pathname.split("/")[2] : window.location.pathname.split("/")[1];
                Sendga("send", "event", o + " - Product", a.replace("/" + o, ""), "WTB_OnlineRetailer - " + t.title), "_self" == t.target && setTimeout('document.location = "' + t.href + '"', 100);
                break;
            case "WTB_Iceleads_OnlineRetailer":
                var a = window.location.pathname,
                    o = isMultipleLanguageWebsite() || isApplicationPathSite() ? window.location.pathname.split("/")[2] : window.location.pathname.split("/")[1];
                Sendga("send", "event", o + " - Product", a.replace("/" + o, ""), "WTB_Iceleads_OnlineRetailer - " + t.title), "_self" == t.target ? setTimeout('document.location = "' + t.href + '"', 100) : window.open(t.href);
                break;
            case "WTB_Dealer":
                var a = window.location.pathname,
                    o = isMultipleLanguageWebsite() || isApplicationPathSite() ? window.location.pathname.split("/")[2] : window.location.pathname.split("/")[1];
                Sendga("send", "event", o + " - Product", a.replace("/" + o, ""), "WTB_Dealer");
                break;
            case "Related_Item":
                var a = window.location.pathname,
                    o = isMultipleLanguageWebsite() || isApplicationPathSite() ? window.location.pathname.split("/")[2] : window.location.pathname.split("/")[1];
                Sendga("send", "event", o + " - Product", a.replace("/" + o, ""), "Related_Item"), ButtonTrk("wmx_L3", t.rel, "8", "Related_Item"), "_self" == t.target && setTimeout('document.location = "' + t.href + '"', 300);
                break;
            case "Similar_Product":
                var a = window.location.pathname,
                    o = isMultipleLanguageWebsite() || isApplicationPathSite() ? window.location.pathname.split("/")[2] : window.location.pathname.split("/")[1];
                Sendga("send", "event", o + " - Product", a.replace("/" + o, ""), "Similar_Product"), ButtonTrk("wmx_L3", t.rel, "8", "Similar_Product"), "_self" == t.target && setTimeout('document.location = "' + t.href + '"', 300)
        }
    } catch (s) {}
}

function common_track(e, t, a) {
    try {
        Sendga("send", "event", e, t, a)
    } catch (n) {}
}

function setBanner_MDA_part(e) {
    var t = "",
        a = "",
        n = "",
        o = "";
    switch (getWebsite()) {
        case "global":
            t = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg", n = "http://morethanyourordinarypc.com", a = "http://morethanyourordinarypc.com/_banners/Asus_950x476.jpg", o = "http://morethanyourordinarypc.com";
            break;
        case "ar":
            t = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg", n = "http://es.morethanyourordinarypc.com/", a = "http://es.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_ES_LATAM.jpg", o = "http://es.morethanyourordinarypc.com/";
            break;
        case "de":
            t = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg", n = "http://de.morethanyourordinarypc.com/", a = "http://de.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_DE.jpg", o = "http://de.morethanyourordinarypc.com/";
            break;
        case "fr":
            t = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg", n = "http://fr.morethanyourordinarypc.com/", a = "http://fr.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_FR.jpg", o = "http://fr.morethanyourordinarypc.com/";
            break;
        case "it":
            t = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg", n = "http://it.morethanyourordinarypc.com/", a = "http://it.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_IT.jpg ", o = "http://it.morethanyourordinarypc.com/";
            break;
        case "nl":
            t = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg", n = "http://nl.morethanyourordinarypc.com/", a = "http://nl.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_NL.jpg", o = "http://nl.morethanyourordinarypc.com/";
            break;
        case "tw":
            t = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg", n = "http://tw.morethanyourordinarypc.com/", a = "http://tw.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_TW.jpg", o = "http://tw.morethanyourordinarypc.com/";
            break;
        case "cn":
            t = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg", n = "http://ch.morethanyourordinarypc.com/", a = "http://ch.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_CH.jpg", o = "http://ch.morethanyourordinarypc.com/";
            break;
        case "ru":
            t = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg", n = "http://ru.morethanyourordinarypc.com/", a = "http://ru.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_RU.jpg", o = "http://ru.morethanyourordinarypc.com/";
            break;
        case "pt":
            t = "http://morethanyourordinarypc.com/_banners/Asus_button_150x40.jpg", n = "http://pt.morethanyourordinarypc.com/", a = "http://pt.morethanyourordinarypc.com/_banners/ASUS_MARQUEE_950x476_PT.jpg", o = "http://pt.morethanyourordinarypc.com/"
    }
    "" != t && "" != n && "product" == e && ($("#slogo").removeClass("hide"), $("#slogo").append("<a href='" + n + "' target='_blank'><img src='" + t + "' /></a>")), "" != a && "" != o && "banner" == e && ($("#bannerlink div").length <= 6 ? ($("#bannerlink div:last").remove(), $("#bannerlink img:last").remove(), $("#bannerlink").append("<div id='divHide' style='display:none'><span id='spanLink'>" + o + "</span><span id='spanTarget'>_blank</span></div><img src='" + a + "' border='0' style='display: none'/>")) : $("#bannerlink img:eq(5)").after("<div id='divHide' style='display:none'><span id='spanLink'>" + o + "</span><span id='spanTarget'>_blank</span></div><img src='" + a + "' border='0' style='display: none'/>"))
}

function Sendga(e, t, a, n, o) {
    try {
        ga(e, t, a, n, o)
    } catch (r) {}
}
var tracking_country, sysWording, sysWordingRead = !1,
    intSysWordingCheckSpeed = 100,
    CompareJson;
getWebservice("getWordingTranslation", "fn_localization", "");
var fileIsExistedreturnvalue;
Date.prototype.formatDate = function(e) {
    var t = this;
    e = e.toLowerCase(), e || (e = "yyyy/mm/dd");
    var a = t.getMonth() + 1,
        n = t.getFullYear();
    e = e.replace("mm", a.toString().padL(2, "0")), e.indexOf("yyyy") > -1 ? e = e.replace("yyyy", n.toString()) : e.indexOf("yy") > -1 && (e = e.replace("yy", n.toString().substr(2, 2))), e = e.replace("dd", t.getDate().toString().padL(2, "0"));
    t.getHours();
    return e
}, String.prototype.padL = function(e, t) {
    if (!e || 1 > e) return this;
    t || (t = " ");
    var a = e - this.length;
    return 1 > a ? this.substr(0, e) : (String.repeat(t, a) + this).substr(0, e)
}, String.prototype.padR = function(e, t) {
    if (!e || 1 > e) return this;
    t || (t = " ");
    var a = e - this.length;
    return 1 > a && this.substr(0, e), (this + String.repeat(t, a)).substr(0, e)
}, String.repeat = function(e, t) {
    for (var a = "", n = 0; t > n; n++) a += e;
    return a
}, String.IsNumeric = function(e) {
    return e - 0 == e && e.length > 0
};
var devicesBol = !1,
    local_v_str = [{
        local: "global",
        str: ["Mobile site", "Full site"]
    }, {
        local: "tw",
        str: ["手機版", "電腦版"]
    }],
    winW = 0,
    checkMobile = function() {
        for (var e = ["iphone", "android", "iPod", "sony", "samsung", "htc", "incognito", "webmate", "dream", "cupcake", "webos", "sgh", "gradi", "jb", "dddi", "moto", "midp", "j2me", "avant", "docomo", "novarra", "palmos", "palmsource", "240x320", "opwv", "chtml", "pda", "windows ce", "mmp/", "blackberry", "mib/", "symbian", "wireless", "nokia", "hand", "mobi", "phone", "cdm", "up.b", "audio", "sie-", "sec-", "mot-", "mitsu", "sagem", "alcatel", "lg", "eric", "vx", "NEC", "philips", "mmm", "xx", "panasonic", "sharp", "wap", "sch", "rover", "pocket", "benq", "java", "pt", "pg", "vox", "amoi", "bird", "compal", "kg", "voda", "sany", "kdd", "dbt", "sendo", "s8000", "bada", "googlebot-mobile"], t = navigator.userAgent.toLowerCase(), a = !1, n = 0; n < e.length; n++)
            if (t.indexOf(e[n]) > 0) {
                a = !0;
                break
            }
        return a
    },
    setStorage = function(e, t) {
        localStorage.setItem(e, t)
    },
    getStorage = function(e) {
        try {
            return localStorage[e]
        } catch (t) {
            return !1
        }
    },
    mobieChangeVersion = function(e) {
        e.preventDefault(), 1 == e.data.v ? asus.cookie.set("viewType", "mobile") : asus.cookie.set("viewType", "desktop"), window.location.reload()
    },
    changeMeta = function(e) {
        if ($("#middle-menu-zone").css("position", "relative"), $("#version-group").css("display", "block"), "desktop" == e) {
            var t = document.querySelector('meta[name="viewport"]');
            t && (t.content = "width=1024"), $("#version-btn-1").removeClass("active"), $("#version-btn-2").addClass("active")
        } else $("#version-btn-1").addClass("active"), $("#version-btn-2").removeClass("active")
    },
    local_v_Str = function() {
        for (var e = asus.script.get_local().replace("new", ""), t = local_v_str.length, a = 0; t > a; a++)
            if (e == local_v_str[a].local) return local_v_str[a].str;
        return local_v_str[0].str
    },
    setVg = function() {
        var e = local_v_Str(),
            t = "<div class='version-group'><a href='#' id='version-btn-1' >" + e[0] + "</a><a href='#' id='version-btn-2'>" + e[1] + "</a></div>";
        $("#extra_link").append(t), $("#version-btn-1").bind("click", {
            v: 1
        }, mobieChangeVersion), $("#version-btn-2").bind("click", {
            v: 2
        }, mobieChangeVersion), devicesBol = !0
    };
$(document).ready(function() {
    winW = $(window).width(), checkMobile() && ($("body").addClass("mobile"), setVg(), changeMeta(asus.cookie.get("viewType"))), !checkMobile() && 720 > winW && changeMeta("desktop")
});