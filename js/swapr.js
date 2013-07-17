//     Swapr.js 1.0.0

//     (c) 2013 Eric Menze
//     Swapr may be freely distributed under the MIT license.

//Example Call:
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

// window.Swapr = (function (container, elements, progress, extension, debug) {

//     var version = '1.1';

//     $(elements).click(function (e) {
//         $(progress).show();
//         href = $(this).attr("href");

//         Swapr.loadContent(href);

//         //Add to Browser History
//         history.pushState('', 'New URL: ' + href, href);
//         e.preventDefault();
//     });

//     // Set Browser History for Back/Forward
//     window.onpopstate = function (event) {
//         $(progress).show();
//         if (debug) console.log("pathname: " + location.pathname);
//         loadContent(location.pathname);
//     };

//     Swapr.prototype = {

//         loadContent: function (url, debug) {
//                     if (this.e.style.display !== 'none') {
//                         this.e.style.display = 'none';
//                     } else {
//                         this.e.style.display = '';
//                     }
//                     return this;
//                 },

//         toggle: function () {
//                     if (this.e.style.display !== 'none') {
//                         this.e.style.display = 'none';
//                     } else {
//                         this.e.style.display = '';
//                     }
//                     return this;
//                 },

//         size:   function (height, width) {
//                     this.e.style.height = height + 'px';
//                     this.e.style.width = width + 'px';
//                     return this;
//                 }
//     };

//     return Swapr;
// })(window, true)


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