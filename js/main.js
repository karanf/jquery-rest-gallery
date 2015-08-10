jQuery(document).ready(function($) {

    var dataURL = "data/data.json",
        dataModel = {},
        $body = $('body'),
        $gallery = $('.gallery'),
        $thumbsContainer,
        $overlay;



    var loadData = function() {
        $.getJSON(dataURL, function(data) {
            dataModel.images = data;
            dataModel.lastIndex = dataModel.images.length -1;
            init();
        });
    };

    var init = function() {
        renderThumbsView();
        addThumbsController();
        renderOverlayView();
        addOverlayControllers();
    };

    var renderThumbsView = function() {

        $thumbsContainer = $('<div>', {
            'class': 'thumbs clearfix'
        });
        var images = dataModel.images,
            $thumb;

        images.forEach(function(image) {
            $thumb = $('<img>', {
                'src': image.medium,
                'alt': image.caption
            });
            $thumbsContainer.append($thumb);
        });

        $gallery.append($thumbsContainer);

    };

    var addThumbsController = function() {
        var $thumbs = $thumbsContainer.find('img');

        $thumbs.on('click', function() {
            dataModel.currentIndex = $thumbs.index($(this));
            addOverlay();
            loadImage();
        });
    };

    var renderOverlayView = function() {
        $overlay = $('<div>', {
            'class': 'overlay',
            'z-index': 9000
        });
        var $imageContainer = $('<div>', {
                'class': 'image-container clearfix'
            }),
            $figure = $('<figure>'),
            $image = $('<img>'),
            $figCaption = $('<figcaption>'),
            $close = $('<div>', {
                'class': 'close-btn fa fa-close'
            }),
            $nextBtn = $('<div>', {
                'class': 'next-btn fa fa-arrow-right'
            }),
            $prevBtn = $('<div>', {
                'class': 'prev-btn fa fa-arrow-left'
            });

        $figure.append($image, $figCaption, $close, $prevBtn, $nextBtn);
        $imageContainer.append($figure);
        $overlay.append($imageContainer);
    };

    var addOverlayControllers = function() {
        $overlay.find('.close-btn').on('click', function() {
            removeOverlay();
        });
        $overlay.on('click', function(e) {
            if (e.target === this) {
                removeOverlay();
            }
        });
        $overlay.find('.next-btn').on('click', function(){
        	dataModel.currentIndex = dataModel.currentIndex < dataModel.lastIndex? dataModel.currentIndex + 1:0;
        		loadImage()
        });
        $overlay.find('.prev-btn').on('click', function(){
        	dataModel.currentIndex = dataModel.currentIndex > 0? dataModel.currentIndex - 1:dataModel.lastIndex;
        		loadImage()
        });
    }

    var loadImage = function() {
        var image = dataModel.images[dataModel.currentIndex];
        $overlay.find('img').css({
            'opacity': 0
        }).attr({
            'src': image.image,
            'alt': image.caption
        }).load(function() {
            $(this).unbind('load').velocity('fadeIn', {
                duration: 600
            });
        });
        $overlay.find('figcaption').html(image.caption);
    };

    var addOverlay = function() {
        $body.append($overlay).css({'overflow': 'hidden'});
    };

    var removeOverlay = function() {
        $overlay.detach();
        $body.css({'overflow': 'scroll'});
    };



    loadData();

});