//     Swapr.js 1.0.0

//     (c) 2013 Eric Menze
//     Swapr may be freely distributed under the MIT license.

//Example Call:
//Setup Call
//Swapr({
//    conditionOfRewrite, )
//Swapr(container, elements, progress, extension)
//Swapr("#swap", ".nav .dropdown-menu li a", "#loading", "html")

function checkRewrite() {
    var path = window.location.pathname;
    if (path.indexOf('.') == -1) {
        //This is a friendly URL
        var page = path + '.html';

        console.log('Rewritten Request, loading: ' + page);

        $("#swap").load(page, function(response, status, xhr) {
            $("#loading").hide();
            if (status == "error") {
                var msg = "Sorry but there was an error: ";
                $("#error").html(msg + xhr.status + " " + xhr.statusText);
            }
        });
    }
};
checkRewrite();

$(function(){
    $('.nav .dropdown-menu li a').click(function (e) {
        $("#loading").show();
        href = $(this).attr("href");

        loadContent(href);

        // HISTORY.PUSHSTATE
        history.pushState('', 'New URL: ' + href, href);
        e.preventDefault();
    });

    $('.featured a').click(function (e) {
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
    if (url == "#" || url == "/"){
        $("#loading").hide();
        return;
    }
    var urlPage = url;
    if (urlPage.toLowerCase().indexOf('.html') == -1)
        urlPage += '.html';
    console.log('Swapping: ' + urlPage);
    $("#swap").load(urlPage, function(response, status, xhr) {
        if (status != 'success') {
            $("#swap").load("/sections/comingSoon.html");
            //$("#error").html(msg + xhr.status + " " + xhr.statusText);
        }
        $("#loading").hide();
    });

    // Update Nav Bar   
    $('li').removeClass('active');
    $('a[href="' + url + '"]').parent().addClass('active');
}