(function($) {

	$.fn.spasticNav = function(options) {
	
		options = $.extend({
			overlap : 0,
			speed : 500,
			reset : 50,
			color : '#00c6ff',
			easing : 'easeOutExpo'
		}, options);
	
		return this.each(function() {
		
		 	var nav = $(this),
		 		currentPageItem = $('.current-menu-item', nav),
				hidden = false,
		 		blob,
		 		reset;

			if (currentPageItem.length === 0) {
		 		currentPageItem = nav.find('li').eq(0);
				hidden = true;
			}

		 	$('<li id="blob"></li>').css({
					width : currentPageItem.outerWidth(),
					height : currentPageItem.outerHeight() + options.overlap,
					left : currentPageItem.position().left,
					top : currentPageItem.position().top - options.overlap / 2,
					backgroundColor : currentPageItem.find('a').css('backgroundColor'), //options.color,
					opacity: hidden ? 0 : 1
				}).appendTo(this);
		 	
		 	blob = $('#blob', nav);
					 	
			nav.find('>li:not(#blob)').hover(function() {
				// mouse over
				clearTimeout(reset);
				var a = $(this).find('a');
				var bg = a.css('backgroundColor');
				$(this).addClass('blob_over');
				blob.css({backgroundColor: bg}).animate(
					{
						left : $(this).position().left,
						top : $(this).position().top - options.overlap / 2,
						width : $(this).outerWidth(),
						height : $(this).outerHeight(),
						opacity: 1
					},
					{
						duration : options.speed,
						easing : options.easing,
						queue : false
					}
				);
			}, function() {
				// mouse out	
				reset = setTimeout(function() {
					/*
					var a = currentPageItem.find('a');
					var bg = a.css('backgroundColor');
					*/
					blob.animate({
						/*
						width : currentPageItem.outerWidth(),
						left : currentPageItem.position().left,
						*/
						opacity: 0	//hidden ? 0 : 1,
					}, options.speed)
					//.css({backgroundColor: bg})
				}, options.reset);
				$(this).removeClass('blob_over');
			});
		 
		
		}); // end each
	
	};

})(jQuery);