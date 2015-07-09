$ = jQuery.noConflict();
try {
    $(document).ready(function() {
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
        var queryString = window.location.search.split("?")[1].split("&");
        var splitedQueryString = [];
        for (var i = 0; i < queryString.length; i++) {
            splitedQueryString.push(queryString[i].split("=")[1]);
        }
        var photoWrapperWidth = Number(splitedQueryString[0]);
        var photoWrapperHeight = Number(splitedQueryString[1]);
        var api_key = splitedQueryString[2];
        var displayMethod = splitedQueryString[3];
        var numberOfPhotos = Number(splitedQueryString[4]);
        var user_id = encodeURIComponent(splitedQueryString[5]);
        var photoset_id = encodeURIComponent(splitedQueryString[6]);
        var autoCycling = splitedQueryString[7];
        var baseURL = 'https://api.flickr.com/services/rest/?';
        var method = 'flickr.photosets.getPhotos';
        var completeURL = "";

        numberOfPhotos = (numberOfPhotos === 0 || typeof numberOfPhotos != 'number') ? 20 : (numberOfPhotos > 40) ? 40 : numberOfPhotos;

        completeURL = baseURL + '&method=' + method + '&api_key=' + api_key + '&user_id=' + user_id + '&photoset_id=' + photoset_id + '&format=json&jsoncallback=?';
        console.log(autoCycling);

        $.ajax({
            type: "GET",
            url: completeURL,
            crossDomian: true,
            dataType: "json",
            error: function() {
                $("#photo_wrapper").append('<p>No data was found according to your input information, please verify the provided information was correct.</p>');
            }
        }).then(function(data) {
            var farm = [];
            var photoid = [];
            var server = [];
            var secret = [];
            var photoURL = [];
            $.each(data.photoset.photo, function(i, val) {
                photoURL.push('https://farm' + val.farm + '.staticflickr.com/' + val.server + '/' + val.id + '_' + val.secret + '_z.jpg');
            })
            return photoURL;
        }).then(function(photoURL) {
            console.log(photoURL);
            $("#photo_wrapper").append('<div id="carousel-example-generic" class="carousel slide"><span class="center_helper"></span><div class="carousel-inner" style="display: inline-block; vertical-align:middle" role="listbox"></div></div>');
            for (var i = 0; i < photoURL.length; i++) {
                if (i == 0) {
                    $('.carousel-inner').append('<div class="item active" id="popup"><span class="center_helper"></span><a href="' + photoURL[i] + '" target="_blank"><div class="overlay"><i class="fa fa-search"></i></div><img style="display: inline-block;" src="' + photoURL[i] + '" alt="' + i + '"></a><div class="carousel-caption">' +
                        '<p></p></div></div>');
                } else {
                    $('.carousel-inner').append('<div class="item" id="popup"><span class="center_helper"></span><a href="' + photoURL[i] + '" target="_blank"><div class="overlay"><i class="fa fa-search"></i></div><img style="display: inline-block;" src="' + photoURL[i] + '" alt="' + i + '"></a><div class="carousel-caption">' +
                        '<p></p></div></div>');
                }
            }
            $("#carousel-example-generic").append('<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev" style="background:none;">' +
                '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' +
                '<span class="sr-only">Previous</span></a>' +
                '<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next" style="background:none;">' +
                '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
                '<span class="sr-only">Next</span></a>');
            var slideShowPhotoWrapperCss = {
                "height": photoWrapperHeight,
                "width": "100%",
                "position": "fixed",
                "text-align": "center"
            };
            var slideShowCarouselCSS = {
                "height": photoWrapperHeight,
                "width": "100%",
                "vertical-align": "middle"
            };
            var slideShowImgCSS = {
                "margin-left": "auto",
                "margin-right": "auto"
            };
            var slideShowItemCSS = {
                "height": photoWrapperHeight,
                "width": "100%",
                "vertical-align": "middle"
            }
            $("#photo_wrapper").css(slideShowPhotoWrapperCss);
            $("#carousel-example-generic").css(slideShowCarouselCSS);
            $("#photo_wrapper .item").css(slideShowItemCSS);
            $("#photo_wrapper img").css(slideShowImgCSS);
        }).then(function() {
            var $container = $('#photo_wrapper').masonry();
            $('#photo_wrapper').hide();
            $('#loading').html('<span><i class="fa fa-spinner fa-spin fa-4x" id="foko_photo_wrapper_spinner"></i><p>Loading your photo feeds...</p></span>');
            $container.imagesLoaded('always', function(instance) {
                $('#loading').remove();
                $('#photo_wrapper').show();

                var autoCycleInterval;
                if (autoCycling === "true") {
                    autoCycleInterval = 5000;
                    console.log(autoCycleInterval);
                } else {
                    autoCycleInterval = false;
                    console.log(autoCycleInterval);
                }
                $('#carousel-example-generic').carousel({
                    interval: autoCycleInterval,
                    pause: "hover"
                });
            });
        });
    });
} catch (e) {
    $("#photo_wrapper").append('<div class="error">' + err.message + '</div>');
}