(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

//muMusic GA key
var ga_key_mobile = 'UA-32211794-3';
var ga_key_web = 'UA-32211794-1';

//GA page view 小網
function ga_pv_mobile() {
    send_ga_pageview(ga_key_mobile);
}

//GA page view 大網
function ga_pv_web() {
    send_ga_pageview(ga_key_web);
}

//GA event 小網
function ga_event_mobile(category, action, label) {
    send_ga(ga_key_mobile, category, action, label);
}

//GA event 大網
function ga_event_web(category, action, label) {
    send_ga(ga_key_web, category, action, label);
}

var send_ga_pageview = function(key) {
    ga('create', key, 'mymusic.net.tw');
    ga('create', key, 'auto');
    ga('require', 'linkid', 'linkid.js');
    ga('send', 'pageview');
}

function send_ga(key, category, action, label) {
    //alert(key);
    ga('create', key, 'mymusic.net.tw');
    ga('create', key, 'auto');
    ga('require', 'linkid', 'linkid.js');
    ga('send', 'event', category, action, label);
}

function sayHI(name) {
    console.log(name + "hihihihihihi");
}
