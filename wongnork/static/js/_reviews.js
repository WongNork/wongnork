/* global jQuery:false */
var THEMEREX_user_marks = false;



	

function initReviews() {
	"use strict";

	var fromFront = arguments[0] ? true : false;
	
	// Show current marks
	jQuery('.reviews_data '+(reviews_max_level < 100 ? '.criteria_stars' : '.criteria_bar')).each(function() {
		"use strict";
		setStarsOnMark(jQuery(this).find(reviews_max_level < 100 ? '.theme_stars' : '.criteria_level').eq(0), null);
	});
	
	if (allowUserReviews) {
		if (reviews_max_level < 100) {
			// Stars selector: over, out and click
			jQuery('.reviews_users .reviews_data').on('mouseover', '.theme_stars', function(e) {
				"use strict";
				if (!allowUserReviews) return;
				jQuery(this).parent().find('.theme_stars').removeClass('theme_stars_on');
				jQuery(this).addClass('theme_stars_on').prevAll().addClass('theme_stars_on');
			});
			jQuery('.reviews_users .reviews_data').on('mouseout', '.theme_stars', function(e) {
				"use strict";
				if (!allowUserReviews) return;
				setStarsOnMark(jQuery(this), null);
			});
			jQuery('.reviews_users .reviews_data').on('click', '.theme_stars', function(e) {
				"use strict";
				if (!allowUserReviews) return;
				if (!THEMEREX_user_marks && jQuery(this).parents('#reviews_users').length > 0) {
					jQuery(this).parent().parent().parent().find('.theme_stars').removeClass('theme_stars_on');
					jQuery(this).parent().parent().parent().find('input').val(0);
					THEMEREX_user_marks = true;
				}
				var mark = Number(jQuery(this).data('mark'));
				if (mark === 1 && mark === Number(jQuery(this).parent().siblings('input').val())) {
					mark = 0;
				}
				setStarsOnMark(jQuery(this), mark);
				setAverageMark(jQuery(this).parents('.reviews_tab').attr('id'));
				// Change description to button
				if (!jQuery('.reviews_users .criteria_summary_text').hasClass('show_button')) {
					jQuery('.reviews_users .criteria_summary_text').addClass('show_button');
				}
			});
		} else {
			initDrag();
		}
	} else {
		if (reviews_max_level == 100) {
			jQuery(".reviews_users .reviews_data .criteria_dragger" ).hide();
		}
	}
	
	// Summary hover
	if (fromFront) {
		jQuery('.criteria_summary').hover(
			function(e) {
				"use strict";
				jQuery(this).addClass('show_word');
			},
			function(e) {
				"use strict";
				jQuery(this).removeClass('show_word');
			}
		);
	}
}

function initDrag() {
	"use strict";
	var step = 0;
	jQuery(".reviews_users .reviews_data .criteria_dragger" ).each(function () {
		"use strict";
		var obj = jQuery(this);
		var bar = jQuery(this).parent();
		var barWidth = bar.width()-obj.width();
		var mark = bar.siblings('input').val();
		if (step == 0) {
			step = barWidth/reviews_max_level;
		}
		obj.css('left', Math.round(mark*step));
	});
	jQuery(".reviews_users .reviews_data .criteria_dragger" ).draggable({
		axis: 'x',
		grid: [step, step],
		containment: 'parent',
		drag: function(e, ui) {
			"use strict";
			if (!allowUserReviews) return;
			var pos = ui.position.left;
			var mark = Math.max(0, Math.min(reviews_max_level, Math.round(ui.position.left / step)));
			if (!THEMEREX_user_marks && ui.helper.parents('#reviews_users').length > 0) {
				ui.helper.parents('#reviews_users').find('.criteria_level').width(0);
				ui.helper.parents('#reviews_users').find('input').val(0);
				ui.helper.parents('#reviews_users').find('.criteria_mark').html(0);
				ui.helper.parents('#reviews_users').find('.criteria_dragger').css('left', 0);
				THEMEREX_user_marks = true;
			}
			setStarsOnMark(ui.helper.siblings('.criteria_bar').find('.criteria_level'), mark);
			setAverageMark(ui.helper.parents('.reviews_tab').attr('id'));
			// Change description to button
			if (!jQuery('.reviews_users .criteria_summary_text').hasClass('show_button')) {
				jQuery('.reviews_users .criteria_summary_text').addClass('show_button');
			}
		}
	});
}

// Show average mark
function setAverageMark() {
	"use strict";
	var id = arguments[0] ? arguments[0] : '';
	var avg = 0;
	var cnt = 0;
	jQuery((id ? '#'+id+' ' : '')+'.reviews_data .criteria_row input').each(function() {
		avg += parseFloat(jQuery(this).val());
		cnt++;
	});
	avg = cnt > 0 ? Math.round(avg/cnt*10)/10 : '0.0';
	if (String(avg).indexOf('.') < 0) {
		avg += '.0';
	}
	jQuery((id ? '#'+id+' ' : '')+'.reviews_summary .criteria_mark').html(avg);
	jQuery((id ? '#'+id+' ' : '')+'.reviews_summary .criteria_word').html(getReviewsRatingWordValue(avg));
	setAverageStars(id, avg);
}

// Set average stars width
function setAverageStars(id, avg) {
	"use strict";
	jQuery((id ? '#'+id+' ' : '')+'.reviews_summary '+(reviews_max_level < 100 ? '.stars_on' : '.criteria_level')).css('width', Math.round(avg/reviews_max_level*100)+'%');
}

// Restore or set new stars value
function setStarsOnMark(obj, mark) {
	"use strict";
	var prnt = reviews_max_level < 100 ? obj.parent() : obj.parent().parent();
	if (mark!==null) {
		prnt.siblings('input').val(mark);
	} else {
		mark = prnt.siblings('input').val();
	}
	prnt.siblings('.criteria_mark').html(mark);
	if (reviews_max_level < 100) {
		prnt.find('.theme_stars').removeClass('theme_stars_on').each(function(idx) {
			if (idx+1 <= Math.round(mark)) jQuery(this).addClass('theme_stars_on');
		});
	} else {
		obj.css('width', mark/reviews_max_level*100+'%');
	}
}

// Get word-value review rating
function getReviewsRatingWordValue(r) {
	"use strict";
	var words = reviews_levels.split(',');
	var k = reviews_max_level / words.length;
	r = Math.max(0, Math.min(words.length-1, Math.floor(r/k)));
	return words[r];
}
