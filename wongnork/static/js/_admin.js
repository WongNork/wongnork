/* global jQuery:false */

// Post categories change handler
// show additional fields for reviews
function initPostReviews() {
	"use strict";

	jQuery('#categorychecklist input[type="checkbox"]').on('change', categoryChangeHandler);
	checkPostCategories();

	initReviews();	
}


// Rebuild reviews criterias list
function rebuildReviewsCriterias() {
	"use strict";

	var id = jQuery('.reviews_meta .reviews_id').val();
	var criterias = jQuery('.reviews_meta .criterias_list').val().split(',');
	var marks = jQuery('.reviews_meta .marks_list').val().split(',');
	var out = '';
	for (var i=0; i<criterias.length; i++) { 
		if (criterias[i]==='') continue;
		var sb = criterias[i].split('|');
		if (sb[0]==='') continue;
		if (sb.length==1) sb[1] = i+1;
		if (marks.length <= i) marks[i] = 0;
		out += '<div id="criteria_'+i+'_row" class="criteria_row">'
			+'<input type="hidden" name="'+id+'[]" id="'+id+'_'+i+'" value="' + marks[i] + '" />'
			+'<span class="criteria_label">'+sb[0]+'</span>';
		if (reviews_max_level < 100) {
			out += '<span class="criteria_stars">';
			for (var s=1; s <= reviews_max_level; s++)
				out += '<span class="theme_stars" data-mark="'+s+'"></span>';
			out += '</span>';
		} else {
			out += '<span class="criteria_stars"><span class="criteria_bar theme_rating_bar"><span class="criteria_level theme_rating_level"></span></span><span class="criteria_dragger theme_rating_drag"></span></span>';
		}
		out += '<span class="criteria_mark">' + marks[i] + (reviews_max_level == 100 ? '%' : '') + '</span>'
			+'</div>';
	}
	jQuery('.reviews_meta .reviews_data').empty().append(out);
	jQuery('.reviews_meta '+(reviews_max_level<100 ? '.criteria_stars' : '.criteria_bar')).each(function() {
		setStarsOnMark(jQuery(this).find(reviews_max_level<100 ? '.theme_stars' : '.criteria_level').eq(0), null);
	});
	setAverageMark();
	initDrag();
}

// Category change handler
function categoryChangeHandler() {
	"use strict";
	checkPostCategories();
}

function checkPostCategories() {
	"use strict";
	var cat_ids = '';
	jQuery('#categorychecklist input[type="checkbox"]').each(function() {
		if (jQuery(this).get(0).checked) {
			cat_ids += (cat_ids!=='' ? ',' : '')+jQuery(this).val();
		}
	});
	if (cat_ids=='') {
		jQuery('.reviews_meta #criterias_list').val(reviews_criterias);
		rebuildReviewsCriterias();
		return;
	}
	// Check selected cats for portfolio fields
	jQuery.post( THEMEREX_ajax_url, {
		action: 'check_reviews_criterias',
		ids: cat_ids,
		nonce: THEMEREX_ajax_nonce
	}).done( function(response) {
		var rez = null;
		try {
			rez = JSON.parse(response);
		} catch(e) {
			rez = null;
		}
		jQuery('.reviews_meta .criterias_list').val(rez.criterias !== '' ? rez.criterias : reviews_criterias);
		rebuildReviewsCriterias();
	});
}




// Media manager handler
var media_frame = null;
var media_link = '';
function showMediaManager(el) {
	"use strict";

	media_link = jQuery(el);
	// If the media frame already exists, reopen it.
	if ( media_frame ) {
		media_frame.open();
		return false;
	}

	// Create the media frame.
	media_frame = wp.media({
		// Set the title of the modal.
		title: media_link.data('choose'),
		// Tell the modal to show only images.
		library: {
			type: 'image'
		},
		// Multiple choise
		multiple: media_link.data('multiple')===true ? 'add' : false,
		// Customize the submit button.
		button: {
			// Set the text of the button.
			text: media_link.data('update'),
			// Tell the button not to close the modal, since we're
			// going to refresh the page when the image is selected.
			close: true
		}
	});

	// When an image is selected, run a callback.
	media_frame.on( 'select', function() {
		"use strict";
		// Grab the selected attachment.
		var field = jQuery("#"+media_link.data('linked-field')).eq(0);
		var attachment = '';
		if (media_link.data('multiple')===true) {
			media_frame.state().get('selection').map( function( att ) {
				attachment += (attachment ? "\n" : "") + att.toJSON().url;
			});
			var val = field.val();
			attachment = val + (val ? "\n" : '') + attachment;
		} else {
			attachment = media_frame.state().get('selection').first().toJSON().url;
		}
		field.val(attachment);
		field.trigger('change');
	});

	// Finally, open the modal.
	media_frame.open();
	return false;
}
