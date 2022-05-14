$(document).ready(function(){
    $("#serv-inp").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#serv-table tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

$('.services-list-filter').click(function(){
    var dataFilter=$(this).data("services-filter");
    console.log(dataFilter);
    var value = dataFilter;
    $("#serv-table tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});


/* FATURA TALEBİ - BAŞLANGIÇ */

$('.want-billing-button').on('click', ({ target }) => {
    $('#modal-billing-form .x-billing-alert').hide()
    $("#modal-billing-form").trigger("reset");

    $('#modal-billing-form .x-payment-id').val($(target).attr("payment-detail-id"))
    $('#modal-billing-form .x-payment-amount').val($(target).attr("payment-detail-amount"))
});

$('.x-send-billing-ticket').on('click', (event) => {
    event.preventDefault();

    const id = $(`#modal-billing-form .x-payment-id`).val()
    const tutar = $(`#modal-billing-form .x-payment-amount`).val()
    const unvan = $(`#modal-billing-form .x-unvan`).val()
    const vd = $(`#modal-billing-form .x-vd`).val()
    const vno = $(`#modal-billing-form .x-vno`).val()
    const adres = $(`#modal-billing-form .x-adres`).val()
    const mesaj = $(`#modal-billing-form .x-mesaj`).val()

    if(!id || !tutar || !unvan || !vd || !vno || !adres  ){
        $('#modal-billing-form .x-billing-alert p').text("Lütfen boş girdi bırakmayın");
        $('#modal-billing-form .x-billing-alert').removeClass('alert-success').addClass('alert-danger').show();
        $('#modal-billing-form button').removeAttr('disabled').removeClass('disabled');
        return false;
    }

    $('#modal-billing-form button').attr('disabled', 'disabled').addClass('disabled');
    $('#modal-billing-form .x-billing-alert').hide()

    $("#orderid").removeClass("is-invalid");
    $("#modal-billing-form textarea").removeClass('is-invalid');

    var subject = "Fatura Talebi";
    var message = "";

    switch (subject) {
        case "Fatura Talebi":
            message = `Ödeme ID: ${id}\n` +
                `Ödeme Tutarı: ${tutar}₺\n` +
                `Ünvan: ${unvan}\n` +
                `Vergi Dairesi: ${vd}\n` +
                `Vergi No: ${vno}\n` +
                `Adres: ${adres}\n` +
                `Mesaj: ${mesaj}\n`;
            break;
        default: message = $("#modal-billing-form textarea").val();
            break;
    }

    var formData = new FormData(document.getElementById('modal-billing-form'));
    formData.append('TicketForm[subject]', subject);
    formData.append('TicketForm[message]', message);

    fetch("/ticket-create", {
        method: "POST",
        body: formData
    }).then(res => res.json()).then(response => {
        if (response.status === 'error') {
            $('#modal-billing-form .x-billing-alert').addClass('alert-danger').removeClass('alert-success').html(response.error).show()
            $('#modal-billing-form button').removeAttr('disabled').removeClass('disabled');
        } else {
            $("#modal-billing-form").trigger("reset");
            $("#modal-billing-form textarea").val('');
            $('#modal-billing-form button').removeAttr('disabled').removeClass('disabled');
            $('#modal-billing-form .x-billing-alert').removeClass('alert-danger').addClass('alert-success').html('Bu konu hakkında bilgilendirildik! En kısa süre içerisinde destek talebi üzerinden cevap vereceğiz.').show()
        }

    });


    return false;

})


/* FATURA TALEBİ - BİTİŞ */



function homeMenuToggle() {
    console.log('sa');
    $(".head-menu").toggleClass('active');
    $('body').toggleClass('body-pause');
    $('.home-menu-btn > .fas').toggleClass('fa-bars')
    $('.home-menu-btn > .fas').toggleClass('fa-times')
}

function dashMenuToggle() {
    $('.app-sidebar').toggleClass('sidebar-inact');
    $('.app-header').toggleClass('sidebar-inact');
    $('.app-content').toggleClass('sidebar-inact');
    $('body').toggleClass('body-pause');
}

$(function() {
    var header = $(".app-header");

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            header.addClass("scrolled");
        } else {
            header.removeClass("scrolled");
        }
    });

});

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function() {
    setList(0);
    setList(1);

});

function ikon(opt) {
    var ikon = "";
    if (opt.indexOf("Instagram") >= 0) {
        ikon = "<span class=\"ico-ig\"><i class=\"fab fa-instagram\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("IGTV") >= 0) {
        ikon = "<span class=\"ico-ig\"><i class=\"fab fa-instagram\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("İnstagram") >= 0) {
        ikon = "<span class=\"ico-ig\"><i class=\"fab fa-instagram\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Facebook") >= 0) {
        ikon = "<span class=\"ico-fb\"><i class=\"fab fa-facebook-square\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Youtube") >= 0) {
        ikon = "<span class=\"ico-yt\"><i class=\"fab fa-youtube\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("YouTube") >= 0) {
        ikon = "<span class=\"ico-yt\"><i class=\"fab fa-youtube\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Twitter") >= 0) {
        ikon = "<span class=\"ico-tw\"><i class=\"fab fa-twitter\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Google") >= 0) {
        ikon = "<span class=\"ico-gp\"><i class=\"fab fa-google-plus\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Soundcloud") >= 0) {
        ikon = "<span class=\"ico-sc\"><i class=\"fab fa-soundcloud\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Spotify") >= 0) {
        ikon = "<span class=\"ico-sp\"><i class=\"fab fa-spotify\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Apple") >= 0) {
        ikon = "<span class=\"ico-apple\"><i class=\"fab fa-apple\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("SEO") >= 0) {
        ikon = "<span class=\"ico-seo\"><i class=\"fas fa-search\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Telegram") >= 0) {
        ikon = "<span class=\"ico-tele\"><i class=\"fab fa-telegram-plane\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Pinterest") >= 0) {
        ikon = "<span class=\"ico-pt\"><i class=\"fab fa-pinterest-p\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Twitch") >= 0) {
        ikon = "<span class=\"ico-twc\"><i class=\"fab fa-twitch\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Tik") >= 0) {
        ikon = "<span class=\"ico-tic\"><i class=\"fab fa-tiktok\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Web") >= 0) {
        ikon = "<span class=\"ico-web\"><i class=\"fas fa-globe\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Diğer") >= 0) {
        ikon = "<span class=\"ico-dgr\"><i class=\"fas fa-stream\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Tumblr") >= 0) {
        ikon = "<span class=\"fs-tumb\"><i class=\"fab fa-tumblr\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Kampanya") >= 0) {
        ikon = "<span class=\"ico-hotjar\"><i class=\"fab fa-hotjar\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Kupon") >= 0) {
        ikon = "<span class=\"ico-ticket\"><i class=\"fas fa-ticket-alt\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Dailymotion") >= 0) {
        ikon = "<span class=\"ico-dailymotion\"><i class=\"fab fa-dailymotion\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Clubhouse") >= 0) {
        ikon = "<span class=\"ico-clubhouse\"><i class=\"fas fa-headphones\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("IMDB") >= 0) {
        ikon = "<span class=\"ico-imdb\"><i class=\"fab fa-imdb\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("PROMOSYON") >= 0) {
        ikon = "<span class=\"ico-hotjar\"><i class=\"fab fa-hotjar\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Müzik") >= 0) {
        ikon = "<span class=\"fs-music\"><i class=\"fa fa-music\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Periscope") >= 0) {
        ikon = "<span class=\"fs-peri\"><i class=\"fab fa-periscope\" aria-hidden=\"true\"></i> </span>";
    } else if (opt.indexOf("Snapchat") >= 0) {
        ikon = "<span class=\"fs-snap\"><i class=\"fab fa-snapchat-ghost\" aria-hidden=\"true\"></i> </span>";
    } else {
        ikon = "<span class=\"\"><i class=\"far fa-star\" aria-hidden=\"true\"></i> </span>  ";
    }
    return ikon;
}

function setList(val) {

    if (val == 0) {
        $("#orders-drop").empty();
        $("#orderform-service option").each(function() {
            if ($(this).attr('data-show') != 'hidden') {
                var ico = ikon($(this).text());
                $("#orders-drop").append('<button id="order-sItem" class="dropdown-item" type="button" onclick="selectOrder(' + $(this).val() + ')">' + ico + $(this).text() + '</button>');
            }
        });
        var e = document.getElementById("orderform-service");
        var selected = e.options[e.selectedIndex].text;
        var ico = ikon(selected);
        $("#order-services").html(ico + selected);


    } else if (val == 1) {

        $("#category-drop").empty();
        $("#orderform-category option").each(function() {
            if ($(this).attr('data-show') != 'hidden') {
                var ico = ikon($(this).text());
                $("#category-drop").append('<button id="order-cItem" class="dropdown-item" type="button" onclick="selectCategory(' + $(this).val() + ')">' + ico + $(this).text() + '</button>');
            }
        });

        var e = document.getElementById("orderform-category");
        var selected = e.options[e.selectedIndex].text;
        var ico = ikon(selected);
        $("#order-category").html(ico + selected);

    }
}
$(function(ready) {
    $("#orderform-service").change(function() {
        setList(0);
    });
    $("#orderform-category").change(function() {
        setList(1);
    });
});

function selectOrder(val) {
    $('#orderform-service').val(val);
    $("#orderform-service").trigger("change");
    var ico = ikon($("#orderform-service option[value='" + val + "']").text());
    $("#order-services").html(ico + $("#orderform-service option[value='" + val + "']").text());
}
$("#order-sItem").click(function() {
    $("#order-services").html($(this).html());
});

function selectCategory(val) {
    $('#orderform-category').val(val);
    $("#orderform-category").trigger("change");
    var ico = ikon($("#orderform-category option[value='" + val + "']").text());
    $("#order-category").html(ico + $("#orderform-category option[value='" + val + "']").text());
}

function selectCategory(val) {
    $('#orderform-category').val(val);
    $("#orderform-category").trigger("change");
    var ico = ikon($("#orderform-category option[value='" + val + "']").text());
    $("#order-category").html(ico + $("#orderform-category option[value='" + val + "']").text());
}

$('.home-ss-tab').click(function(){
    if($(this).hasClass('active')){
        $(this).find('.ss-tab-content').slideToggle(200);
        $(this).toggleClass('active');
    }else {
        $('.home-ss-tab').removeClass('active');
        $('.home-ss-tab > .ss-tab-content').slideUp(200);
        $(this).find('.ss-tab-content').slideToggle(200);
        $(this).toggleClass('active');
    }
});

$('.tos-nav-btn').click(function(){
    if($(this).hasClass('active')){

    }else {
        let getFor = $(this).attr('for');
        $('.tos-nav-btn').removeClass('active');
        $(this).toggleClass('active');
        $('.tos-tab').removeClass('active');
        $('#'+ getFor +'.tos-tab').addClass('active')

    }
});

function clipboard(elem, event) {
    elem.prev('input[type="text"]').focus().select();
    document.execCommand(event);
    elem.prev('input[type="text"]').blur();
    elem.addClass('clicked');
    setTimeout(function(){
        elem.removeClass('clicked');
    }, 500);
}

$('.dfb-submit').on('click', function(){
    clipboard($(this), 'copy')
});

function change_mode() {

    var app = document.getElementsByTagName("BODY")[0];

    if (localStorage.lightMode == "dark") {
        localStorage.lightMode = "light";
        app.setAttribute("class", "light");
    } else {
        localStorage.lightMode = "dark";
        app.setAttribute("class", "dark");
    }
    console.log("lightMode = " + localStorage.lightMode);
}



$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $("#orderform-service-label").before('<span><span class="">Hizmet numarası:</span> <span class="life_x" id="service_id">'+$("[name='OrderForm[service]']").val()+'</span></span>');

});



$(function(ready) {
    $("#orderform-service").change(function() {
        setList(0);

        $("#service_id").html($("[name='OrderForm[service]']").val())


    });
    $("#orderform-category").change(function() {
        setList(1);
    });
});


$("#orderform-service").change(function () {
    service_id = $(this).val();
    $("#s_id").text(service_id);
    console.log($("#s_time").text());
    service_time_text = window.modules.siteOrder.services[service_id].average_time
    $("#s_time").text(service_time_text);
    $('#s_time').val($('#s_time').text());
})



