//     Swapr.js 1.0.0

//     (c) 2013 Eric Menze
//     Swapr may be freely distributed under the MIT license.

$(function () {
    $('.dropdown a').click(function (e) {
        $("#loading").show();
        href = $(this).attr("href");

        loadContent(href);

        // HISTORY.PUSHSTATE
        history.pushState('', 'New URL: ' + href, href);
        e.preventDefault();
    });

    // Set Browser History for Back/Forward
    window.onpopstate = function (event) {
        $("#loading").show();
        console.log("pathname: " + location.pathname);
        loadContent(location.pathname);
    };

});

function loadContent(url) {
    // USES JQUERY TO LOAD THE CONTENT
    $.load("content.php", { cid: url, format: 'json' }, function (json) {
        // THIS LOOP PUTS ALL THE CONTENT INTO THE RIGHT PLACES
        $.each(json, function (key, value) {
            $(key).html(value);
        });
        $("#loading").hide();
    });

    // THESE TWO LINES JUST MAKE SURE THAT THE NAV BAR REFLECTS THE CURRENT URL
    $('li').removeClass('current');
    $('a[href="' + url + '"]').parent().addClass('current');
}
