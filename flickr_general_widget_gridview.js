(function() {
    // Localize jQuery variable
    var jQuery;

    /******** Load jQuery if not present *********/
    if (window.jQuery === undefined) {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src",
            "https://code.jquery.com/jquery-1.11.0.min.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function() { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    masonryLoader();
                }
            };
        } else { // Other browsers
            script_tag.onload = function() {
                masonryLoader();
            }
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        masonryLoader();
    }

    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        // Call our main function
        main();
    }

    function masonryLoader() {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src",
            "https://cdnjs.cloudflare.com/ajax/libs/masonry/3.3.0/masonry.pkgd.min.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function() { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    imageLoader();
                }
            };
        } else { // Other browsers
            script_tag.onload = function() {
                imageLoader();
            }
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);

    }

    function imageLoader() {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src",
            "http://haoluo.ca/widgets/flickr-gridview/imagesloaded.pkgd.min.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function() { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    migrateLoader();
                }
            };
        } else { // Other browsers
            script_tag.onload = function() {
                migrateLoader();
            }
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    }

    function migrateLoader() {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src",
            "https://code.jquery.com/jquery-migrate-1.2.1.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function() { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    html5shivLoader();
                }
            };
        } else { // Other browsers
            script_tag.onload = function() {
                html5shivLoader();
            }
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    }

    function html5shivLoader() {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src",
            "//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function() { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    ieSupportLoader();
                }
            };
        } else { // Other browsers
            script_tag.onload = function() {
                ieSupportLoader();
            }
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    }

    function ieSupportLoader() {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src",
            "//cdnjs.cloudflare.com/ajax/libs/jquery-ajaxtransport-xdomainrequest/1.0.2/jquery.xdomainrequest.min.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function() { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    scriptLoadHandler();
                }
            };
        } else { // Other browsers
            script_tag.onload = function() {
                scriptLoadHandler();
            }
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    }

    function main() {
        try {
            jQuery(document).ready(function($) {
                if (!($.browser.msie && $.browser.version < 10.0)) {
                    $('head').append('<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">');
                    $('head').append('<link href="http://haoluo.ca/widgets/flickr-gridview/flickr_general_widget_gridview.css" rel="stylesheet">');

                    function findAll(str, searchStr) {
                        var pos = 0;
                        var i = -1;
                        var arr = [];
                        while (pos != -1) {
                            pos = str.indexOf(searchStr, i + 1);
                            if (pos > -1) {
                                arr.push(pos);
                            }
                            i = pos;
                        }
                        return arr;
                    }

                    var api_key = $('#flickr-widget').attr('data-api-key');
                    var user_id = encodeURIComponent($('#flickr-widget').attr('data-user-id'));
                    var photoset_id = $('#flickr-widget').attr('data-photoset-id');
                    var numberOfPhotos = $('#flickr-widget').attr('data-number-photos');
                    var photoWrapperWidth = $('#flickr-widget').attr('data-width');
                    var displayMethod = $('#flickr-widget').attr('data-display-method');
                    var baseURL = 'https://api.flickr.com/services/rest/?';
                    var method = 'flickr.photosets.getPhotos';
                    var completeURL = "";



                    numberOfPhotos = (numberOfPhotos === "") ? 20 : (numberOfPhotos > 40) ? 40 : numberOfPhotos;

                    completeURL = baseURL + '&method=' + method + '&api_key=' + api_key + '&user_id=' + user_id + '&photoset_id=' + photoset_id + '&per_page=' + numberOfPhotos + '&format=json&jsoncallback=?';

                    $("#flickr-widget").parent().append('<div class="flickr-widget-outer-photo-wrapper" id="flickr-widget-outer-photo-wrapper">');
                    $("#flickr-widget-outer-photo-wrapper").append('<div id="flickr-widget-loading"></div><div class="flickr-widget-photo-wrapper" id="flickr-widget-photo-wrapper"></div>');

                    $.ajax({
                        type: "GET",
                        url: completeURL,
                        crossDomian: true,
                        dataType: "json",
                        error: function() {
                            $("#flickr-widget-photo-wrapper").append('<p>No data was found according to your input information, please verify the provided information was correct.</p>');
                        }
                    }).then(function(data) {
                        var farm = [];
                        var photoid = [];
                        var server = [];
                        var secret = [];
                        var photoURLFull = [];
                        var photoURLThumb = [];
                        var photoURL = [];
                        $.each(data.photoset.photo, function(i, val) {
                            photoURLFull.push('https://farm' + val.farm + '.staticflickr.com/' + val.server + '/' + val.id + '_' + val.secret + '_z.jpg');
                            photoURLThumb.push('https://farm' + val.farm + '.staticflickr.com/' + val.server + '/' + val.id + '_' + val.secret + '_q.jpg');
                        })
                        photoURL = [photoURLFull, photoURLThumb];
                        return photoURL;
                    }).then(function(photoURL) {
                        $("#flickr-widget-photo-wrapper").css('width', photoWrapperWidth);
                        if (!photoURL) {
                            $("#flickr-widget-photo-wrapper").append('<p>No data was found according to your input information, please verify the provided information was correct.</p>');
                        } else {
                            for (var i = 0; i < photoURL[1].length; i++) {
                                $("#flickr-widget-photo-wrapper").append('<div class="flickr_item">' +
                                    '<a href="' + photoURL[0][i] + '"><div class="overlay"><i class="fa fa-search"></i></div>' +
                                    '<img src="' + photoURL[1][i] + '" alt=""></a></div>'
                                );
                            }
                            $("#flickr-widget-photo-wrapper").appendTo('</div></div>');
                        }
                    }).then(function() {
                        $('#flickr-widget-photo-wrapper').hide();
                        $('#flickr-widget-loading').html('<span><i class="fa fa-spinner fa-spin fa-4x" id="foko_photo_wrapper_spinner"></i><p>Loading...</p></span>');
                        $('#flickr-widget-photo-wrapper').imagesLoaded('always', function(instance) {
                            $('#flickr-widget-loading').remove();
                            $('#flickr-widget-photo-wrapper').show();
                        });
                    }).then(function() {
                        $('.flickr-widget-photo-wrapper').magnificPopup({
                            delegate: 'a',
                            type: 'image',
                            gallery: {
                                enabled: true
                            }
                        });
                    });
                }
            });
        } catch (err) {
            $("#flickr-widget").parent().append('<div class="flickr-widget-outer-photo-wrapper" id="flickr-widget-outer-photo-wrapper">' + err.message + '</div>');
        }
    }
}());