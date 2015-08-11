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
            dataModel.lastIndex = dataModel.images.length - 1;
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

        $gallery.html(Templates.thumbs(dataModel));

    };

    var addThumbsController = function() {
        var $thumbs = $gallery.find('img');

        $thumbs.on('click', function() {
            dataModel.currentIndex = $thumbs.index($(this));
            addOverlay();
            loadImage();
        });
    };

    var renderOverlayView = function() {
        $overlay = $(Templates.overlay(dataModel));
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
        $overlay.find('.next-btn').on('click', function() {
            dataModel.currentIndex = dataModel.currentIndex < dataModel.lastIndex ? dataModel.currentIndex + 1 : 0;
            loadImage()
        });
        $overlay.find('.prev-btn').on('click', function() {
            dataModel.currentIndex = dataModel.currentIndex > 0 ? dataModel.currentIndex - 1 : dataModel.lastIndex;
            loadImage()
        });
    }

    var loadImage = function() {
        var image = dataModel.images[dataModel.currentIndex],
            $image = $(Templates.image(image));
        
        $overlay.find('figure').html(Templates.image(image));
        $overlay.find('img').css({"opacity": 0}).load(function(){
            $(this).velocity('fadeIn', {duration: 600});
        });
    };

    var addOverlay = function() {
        $body.append($overlay).css({
            'overflow': 'hidden'
        });
    };

    var removeOverlay = function() {
        $overlay.detach();
        $body.css({
            'overflow': 'scroll'
        });
    };



    loadData();

});