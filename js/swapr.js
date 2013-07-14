//     Swapr.js 1.0.0

//     (c) 2013 Eric Menze
//     Swapr may be freely distributed under the MIT license.

//Example Call:
//Swapr(container, elements, progress, extension)
//Swapr("#swap", ".nav .dropdown-menu li a", "#loading", "html")

function checkRewrite() {
    var href = window.location.href;
    if (href.toLowerCase().indexOf('sections') != -1) {
        //This is a section
        var url = window.location.pathname;
        if (url.toLowerCase().indexOf('.html') == -1)
            url += '.html';

        console.log('Rewritten Request, loading: ' + url);

        $("#swap").load(url, function(response, status, xhr) {
            $("#loading").hide();
            if (status == "error") {
                var msg = "Sorry but there was an error: ";
                $("#error").html(msg + xhr.status + " " + xhr.statusText);
            }
        });
    }
};

$(function () {
    $('.nav .dropdown-menu li a').click(function (e) {
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
        $("#loading").hide();
        if (status == "error") {
            var msg = "Sorry but there was an error: ";
            $("#error").html(msg + xhr.status + " " + xhr.statusText);
        }
    });

    // Update Nav Bar   
    $('li').removeClass('active');
    $('a[href="' + url + '"]').parent().addClass('active');
}