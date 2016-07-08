function checkForm(objForm) {


    for (i = 0; i < objForm.elements.length; i++) {
        var obj = objForm.elements[i];
        if (obj.className.indexOf('required') >= 0) {
            if (obj.value == null || obj.value == '') {
                alert("您尚有欄位未填寫，請確認");
                return false;
            }
        }

        if (obj.name == 'phone') {
            if (obj.value != null && obj.value != '' && !chk_mobile(obj.value)) {
                alert("手機格式錯誤");
                return false;
            }
        }
        // 完全不檢查:因為客戶可以填Email以外的東西 
        if (obj.name == 'account') {
            // if (obj.value != null && obj.value != '' && obj.value.indexOf('@') < 0 && !chk_email(obj.value)) {
            //     alert("帳號格式錯誤");
            //     return false;
            // }
        }

        if (obj.name == 'question') {
            if (obj.value.length > 100) {
                alert("問題回答字數限制100字");
                return false;
            }
        }

        if (obj.name == 'scode') {
            if (obj.value != null && obj.value != '' && !chk_scode(obj.value)) {

                alert("驗證碼錯誤");
                randomS();
                return false;

            }
        }
    }
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var endDate;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            endDate = new Date(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", "http://www.mymusic.net.tw/activityUserRegister/getEndDate?id=9", false);
    xmlhttp.send();


    if (new Date() > endDate) {
        alert("本活動已結束");
        return false;
    }
    return true;
}

function chk_mobile(tVal) {
    if (/^[0]{1}[9]{1}[0-9]{8}$/.test(tVal)) {
        return true;
    } else {
        return false;
    }
}

// 驗證信箱
function chk_email(tVal) {
    if (/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/.test(tVal)) {
        return true;
    } else {
        return false;
    }
}

/**
 * [chk_scode description]驗證輸入格是否和驗證碼相等
 * @return {[type]} [description]
 */
function chk_scode(tVal) {

    if (tVal.toUpperCase() == $(".scode").html() || $(".scode").html() == undefined) {
        return true;
    } else {
        return false;
    }
}

/*
when Pageload ready
 */
$(document).ready(function() {
    randomS();
});

