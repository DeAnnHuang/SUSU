angular.module('App', ['ngAnimate', 'ngCookies'])
    .controller('mainCtrl', ['$http', '$cookies', function($http, $cookies) {

        var self = this;


        self.Iframe = false;
        self.OpenIframe = function() {
            if ($(window).width() <= 768) {
                self.Iframe = false;
            } else {
                self.Iframe = true;
            }
        };

        //=== data for cal ===//

        var nonTicket = false,
            login = false,
            couldGet = false,
            isGotTickets = false;

        //=== data for page ===//

        self.leftCount = 0;
        self.account = '\u00A0';
        self.username = '\u00A0';
        self.email = '\u00A0';
        self.orders = [{
            payTime: '\u00A0',
            amount: '\u00A0',
            payType: '尚未購買任何方案'
        }];
        self.randomS = randomS();


        self.warning = "※確認購買資訊後請填寫票券寄送資料!";




        // ========API=========

        var url = 'http://staging.mymusic.net.tw/uxapi/activity/getUserOrderInfo';
        var Id = '6';
        var name = 'guest';

        if ($cookies.get("USERNAME") != undefined && $cookies.get("USERNAME") != null) {
            name = $cookies.get("USERNAME");
        }




        self.IsFinish = function() {

            self.finishForm = true;
            self.CanOpenForm = false;

            var url = 'http://staging.mymusic.net.tw/uxapi/activity/register';

            var u_name = $('input[name="name"]').get(0).value;
            var u_address = $('input[name="address"]').get(0).value;
            var u_phone = $('input[name="phone"]').get(0).value;

            $http({
                url: url,
                method: "POST",
                data: $.param({
                    activityId: Id,
                    uname: name,
                    name: u_name,
                    address: u_address,
                    phone: u_phone
                }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function(response) {
                self.items = response.data;
                if (self.items.registerCount > 0) {
                    self.finish = "恭喜您已登記完成！我們會盡快將" + self.items.registerCount + "張票卷寄出！"
                } else {
                    self.finish = "Oops，發生了一點錯誤，請稍候再試一次！"
                }
            }, function(errResponse) {
                self.finish = "Oops，發生了一點錯誤，請稍候再試一次！"
                console.error('Error while submit data');
            });


        }




        $http({
            url: url,
            method: "GET",
            params: {
                activityId: Id,
                uname: name
            }
        }).then(
            function(response) {
                self.items = response.data;
                //
                nonTicket = self.items.nonTicket;
                login = self.items.login;
                if (login == false) {
                    $(".step2-1").find('a').attr('href', '/webPlay/setReturnUrl?returnUrl=http%3A%2F%2Fstaging.mymusic.net.tw%2Fupload%2Fevent%2Fsusu%2F');
                }
                couldGet = self.items.couldGet;
                isGotTickets = self.items.isGotTickets;
                //
                if (self.items.leftCount != null && self.items.leftCount != undefined) { self.leftCount = self.items.leftCount; }
                if (self.items.account != null && self.items.account != undefined) { self.account = self.items.account; }
                if (self.items.username != null && self.items.username != undefined) { self.username = self.items.username; }
                if (self.items.email != null && self.items.email != undefined) { self.email = self.items.email; }
                if (!$.isEmptyObject(self.items.orders)) { self.orders = self.items.orders; }


                // === cal ===//

                if (nonTicket == true) {
                    self.nonTicket = true;
                }

                if (couldGet == false) {
                    self.leftCount = 0;
                    isGotTickets = false;
                }
                if (self.leftCount == 0) {
                    self.warning = "請購買180天方案參加贈票活動!";
                }


            },
            function(errResponse) {
                console.error('Error while fetching notes');
            });



        self.CanOpenUserCard = function() {

            if (login) {
                self.openUsercard = true;

                if (self.leftCount != 0 && couldGet) {
                    self.CanOpenForm = true;

                    if (isGotTickets) {
                        self.CanOpenForm = false;
                        self.warning = "您已經領過票囉！";
                    }

                }

            }

        }

    }]);



/**
 * [randomS description]產生亂數給驗證碼使用
 * @return {[type]} [description]會隨機產生 六碼 英(大寫)數字，不會包含I/0/1/O以免混淆
 */
function randomS() {
    var seed = new Array('2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ); //數組
    seedlength = seed.length; //數組長度
    var createPassword = '';

    for (i = 0; i < 6; i++) {
        j = Math.floor(Math.random() * seedlength);
        createPassword += seed[j];
    }
    $(".scode").html(createPassword);
    return createPassword;
}


function chk_scode(element) {

    if (element.value == $(".scode").html() || $(".scode").html() == undefined) {
        element.setCustomValidity('');
    } else {
        element.setCustomValidity('驗證碼錯誤，請注意大小寫');
    }
}
