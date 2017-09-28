    $('li#slider-range').on("mousedown", function(e){
        var div = $('li#slider-range');
        var div1 = $('div.ui-slider-range');

        if(div[0] == e.target || div1[0] == e.target) {
           e.stopImmediatePropagation();
        }
    });

jQuery(document).ready(function($) {
    var $grid = $('#masonry_container').imagesLoaded( function() {
        $grid.masonry({
            itemSelector: '.info_block',
            columnWidth: '.info_block',
            transitionDuration: '0.9s',
            resize: true,
            percentPosition: true,
            gutter: 10,
            initLayout: true
        });
    });

    $('.value .title span').click(function(){
        $(".value .title span").removeClass('active');
        $(this).addClass('active');
    });


    var initial_values = [ 870, 22000 ];
    $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: 30000,
            values: initial_values,
            slide: function( event, ui ) {
                $( "#amount" ).val( "" +numberWithDots(ui.values[0]) + " - " + numberWithDots(ui.values[1]) );
            }
        });
    $( "#amount" ).val( "" + numberWithDots(initial_values[0]) + " - " + numberWithDots(initial_values[1]) );

    function numberWithDots(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }


    var timer = null;
    $(".info_block").hover(function() {
        var self = this;
        if(timer) {
            clearTimeout(timer);
            timer = null
        }
        timer = window.setTimeout(function() { 
            $('.info_block_hidden ', self).stop(true, true).slideDown("slow");
            $(this).toggleClass('open');
        }, 600)}, function() {
            clearTimeout(timer);
            $('.info_block_hidden ', this).stop(true, true).slideUp("slow");
            $(this).toggleClass('open');
        }
    );

    $('.dislike').on("click", function(){
        $(this).closest('.info_block').find('.hand_down').removeClass('dn');
        $(this).closest('.info_block').find('.hand_up').addClass('dn');
        $(this).closest('.info_block').find('.like').removeClass('active');
        $(this).addClass('active');
    });

    $('.like').on("click", function(){
        $(this).closest('.info_block').find('.hand_up').removeClass('dn');
        $(this).closest('.info_block').find('.hand_down').addClass('dn');
        $(this).closest('.info_block').find('.dislike').removeClass('active');
        $(this).addClass('active');
    });

    $('li#slider-range').off("click");



});

    //horizontal menu with MORE
    var elemWidth, fitCount, varWidth = 0, ctr, $menu = $("ul#menu"), $collectedSet;
    var elemCount = $menu.children().length;
    ctr = $menu.children().length;
    $menu.children().each(function() {
        varWidth += $(this).outerWidth();
    });

    collect();
    $(window).resize(collect);

    function collect() {
        elemWidth = $menu.width();
        fitCount = Math.floor((elemWidth / varWidth) * ctr) - 1;
        $menu.children().css({"display": "block", "width": "auto"});
        $collectedSet = $menu.children(":gt(" + fitCount + ")");
        $("#submenu").empty().append($collectedSet.clone());
        $collectedSet.css({"display": "none", "width": "0"});
    }

function collect() {
    elemWidth = $menu.width();

    fitCount = Math.floor((elemWidth / varWidth) * ctr) - 1;
    if(elemCount >= fitCount){
        $menu.children().css({"display": "block", "width": "auto"});
        $collectedSet = $menu.children(":lt(" + (elemCount - fitCount) + ")");
        $("#submenu").empty().append($collectedSet.clone());
        $collectedSet.css({"display": "none", "width": "0"});
    }
    $collectedSet && $collectedSet.length ? $('.dropdown').removeClass('dn') :  $('.dropdown').addClass('dn');
}