$(document).ready(function() {

    if ($(window).width() <= 768) {
        //footer hide and show / link 
        $(".links").find('a').css('display', 'none');
        $(".links").find('a').first().css('display', '').attr('href', 'https://www.mymusic.net.tw/ux/m/main');
        $(".links").find('a').eq(7).css('display', '');
        $(".links").find('a').last().css('display', '');

        //change float btn
        $(".float_btns").find('a').eq(0).find('p').html('付費');
        $(".float_btns").find('a').eq(1).find('p').html('下載');
        $(".float_btns").find('a').eq(2).find('p').html('分享');

        //change logo
        $(".logo").attr('src', 'build/img/logo2.png');



        // ==== Live Music chage link and GA ====
        
        $('.liveBtn').find('a').attr('href', 'http://live-1-twm.cdn.jforce.com.tw/HLS/KBRO_2CH/index.m3u8'); //link
        $('.liveBtn').find('a').attr('onclick', "ga_event_mobile('演唱會直播','Click_View',' 演唱會直播_蘇蘇_Mobile')"); //GA

    } else {

    }



    // // ======== scroll btn ========== //

    // scroll($('.liveBtn a'), $('.Step'));




});

/**
 * @param  {[type]} btn [description]點擊觸發的按鈕 
 * @param  {[type]} d   [description]要去的目的地
 */
function scroll(btn, d) {
    btn.click(function() {
        $('html,body').animate({
            scrollTop: (d.offset().top) - 70
        }, 600);
    });
}
