// jQuery(document).ready(function(){
//     //include Custom.JS
//     jQuery('head').append('<link rel="stylesheet" type="text/css" media="all" href="custom_tools/css/colorpicker.css">');
//     jQuery('head').append('<script type="text/javascript" src="custom_tools/js/jquery.cookie.js"></script>');
//     jQuery('head').append('<script type="text/javascript" src="custom_tools/js/colorpicker.js"></script>');
//     jQuery('head').append('<script type="text/javascript" src="custom_tools/js/custom-block.js"></script>');
// });

/* global jQuery:false */

// Main menu settings
var THEMEREX_mainMenuFixed  = true;
var THEMEREX_mainMenuMobile = true;
var THEMEREX_mainMenuMobileWidth = 800;
var THEMEREX_mainMenuSlider = true;
	
// Video and Audio tag wrapper
var THEMEREX_useMediaElement = true;

// Puzzles animations
var THEMEREX_puzzlesAnimations = true;
var THEMEREX_puzzlesStyle = jQuery("body").data("puzzlestyle");

// Javascript String constants for translation
var THEMEREX_GLOBAL_ERROR_TEXT	= "Global error text";
var THEMEREX_NAME_EMPTY			= "The name can't be empty";
var THEMEREX_NAME_LONG 			= "Too long name";
var THEMEREX_EMAIL_EMPTY 		= "Too short (or empty) email address";
var THEMEREX_EMAIL_LONG			= "Too long email address";
var THEMEREX_EMAIL_NOT_VALID 	= "Invalid email address";
var THEMEREX_MESSAGE_EMPTY 		= "The message text can't be empty";
var THEMEREX_MESSAGE_LONG 		= "Too long message text";
var THEMEREX_SEND_COMPLETE 		= "Send message complete!";
var THEMEREX_SEND_ERROR 		= "Transmit failed!";
var THEMEREX_LOGIN_EMPTY		= "The Login field can't be empty";
var THEMEREX_LOGIN_LONG			= "Too long login field";
var THEMEREX_PASSWORD_EMPTY		= "The password can't be empty and shorter then 5 characters";
var THEMEREX_PASSWORD_LONG		= "Too long password";
var THEMEREX_PASSWORD_NOT_EQUAL	= "The passwords in both fields are not equal";
var THEMEREX_REGISTRATION_FAILED= "Registration failed!";
var THEMEREX_REGISTRATION_AUTHOR= "Your account is waiting for the site admin moderation!";
var THEMEREX_GEOCODE_ERROR 		= "Geocode was not successful for the following reason:";
var THEMEREX_GOOGLE_MAP_NOT_AVAIL="Google map API not available!";
var THEMEREX_NAVIGATE_TO		= "Navigate to...";


var THEMEREX_error_msg_box = null;
var THEMEREX_viewmore_busy = false;


var THEMEREX_pathname = document.URL;
var THEMEREX_href = window.location.href;
var THEMEREX_page_title = document.title;

var googleMaps = "50, Golden Gate Ave, San Francisco, CA 94102, US";
var reviews_max_level = 5;
var reviews_levels = "bad,poor,normal,good,great";
var reviews_vote = "";
var allowUserReviews = true;				
				

jQuery(document).ready(function() {
	"use strict";

	//Contants
	jQuery(".sc_contact_form .sc_contact_form_submit").click(function(e){
		userSubmitForm(jQuery(this).parents("form"), "include/sendmail.php", "99ed1e7153");
		e.preventDefault();
		return false;
	});


	//Tabs
	jQuery('.popular_and_commented_tabs').tabs();
	// -----
	jQuery('div.sc_tabs').tabs({
		active: 1
	});
	// -----
	jQuery('.top10_tabs').tabs();

	// Reviews

	var arrReview = jQuery('[data-review]');	
	jQuery.each(arrReview, function(){
		var reviewPercent = jQuery(this).attr('data-review');
		jQuery(this).css("width", reviewPercent+'%');
		}
	);

	// Hihglight

	var arrHighlight = jQuery('[data-highlightcolor]');	
	jQuery.each(arrHighlight, function(){
		var highlightColor = jQuery(this).attr('data-highlightcolor');
		jQuery(this).css("color", '#'+highlightColor);
		}
	);
	var arrHighlight2 = jQuery('[data-highlightbg]');	
	jQuery.each(arrHighlight2, function(){
		var highlightBg = jQuery(this).attr('data-highlightbg');
		jQuery(this).css("background", '#'+highlightBg);
		}
	);

	// Puzzle color

	var arrPuzzleColor = jQuery('[data-puzzlecolor]');
	jQuery.each(arrPuzzleColor, function(){
		var puzzleColor = jQuery(this).attr('data-puzzlecolor');
		var clr = HexToRGB(puzzleColor);
		jQuery(this).css("background-color", '#'+puzzleColor);
		jQuery(this).find('.reviews_summary').css("background-color", '#'+puzzleColor)
		jQuery(this).find('.post_content_padding').attr('style', 'background: -moz-linear-gradient(top,  rgba('+clr.r+','+clr.g+','+clr.b+',0) 0%, rgba('+clr.r+','+clr.g+','+clr.b+',0.01) 1%, rgba('+clr.r+','+clr.g+','+clr.b+',1) 50%);	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba('+clr.r+','+clr.g+','+clr.b+',0)), color-stop(1%,rgba('+clr.r+','+clr.g+','+clr.b+',0.01)), color-stop(50%,rgba('+clr.r+','+clr.g+','+clr.b+',1)));	background: -webkit-linear-gradient(top,  rgba('+clr.r+','+clr.g+','+clr.b+',0) 0%,rgba('+clr.r+','+clr.g+','+clr.b+',0.01) 1%,rgba('+clr.r+','+clr.g+','+clr.b+',1) 50%); background: -o-linear-gradient(top,  rgba('+clr.r+','+clr.g+','+clr.b+',0) 0%,rgba('+clr.r+','+clr.g+','+clr.b+',0.01) 1%,rgba('+clr.r+','+clr.g+','+clr.b+',1) 50%); background: -ms-linear-gradient(top,  rgba('+clr.r+','+clr.g+','+clr.b+',0) 0%,rgba('+clr.r+','+clr.g+','+clr.b+',0.01) 1%,rgba('+clr.r+','+clr.g+','+clr.b+',1) 50%);	background: linear-gradient(to bottom,  rgba('+clr.r+','+clr.g+','+clr.b+',0) 0%,rgba('+clr.r+','+clr.g+','+clr.b+',0.01) 1%,rgba('+clr.r+','+clr.g+','+clr.b+',1) 50%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#00'+puzzleColor+'", endColorstr='+puzzleColor+',GradientType=0 );');
		});

	// Skills

	var arrSkill = jQuery('[data-skill]');	
	jQuery.each(arrSkill, function(){
		var skillPercent = jQuery(this).attr('data-skill');
		jQuery(this).find('.sc_skills_progress').css("width", skillPercent+'%');
		jQuery(this).find('.sc_skills_level').text(skillPercent+'%');
		}
	);

	//Slider

	var arrSlides = jQuery('[data-slide]');	
	jQuery.each(arrSlides, function(){
		var slideUrl = jQuery(this).attr('data-slide');
		jQuery(this).css("background-image", "url("+slideUrl+")")
		}
	);

	var arrSlideTextBg = jQuery('[data-slidetextbg]');	
	jQuery.each(arrSlideTextBg, function(){
		var slideTextBg = jQuery(this).attr('data-slidetextbg');
		jQuery(this).css("background-color", slideTextBg)
		}
	);

	//Category Icon Bg

	var arrCategoryIconBg = jQuery('[data-categoryiconbg]');	
	jQuery.each(arrCategoryIconBg, function(){
		var CategoryIconBg = jQuery(this).attr('data-categoryiconbg');
		jQuery(this).css("background-color", '#'+CategoryIconBg)
		}
	);

	// Accordion1
									
	jQuery('div#accordion_1.sc_accordion').accordion({
		header: "h5",
		collapsible: true,
		heightStyle: "content",
		active: 0
	});

	// Accordion2

	jQuery('div.sc_blogger.sc_accordion').accordion({
		header: "h3",
		collapsible: true,
		heightStyle: "content"
	});

	// BubbleTop block

	var maxHeight = 0;
	for (var i=0; i<2; i++) {
		jQuery('.sc_blogger_item_bordered').each(function(){
			if (i > 0) {
				if (maxHeight>0) jQuery(this).height(maxHeight);
			} else if (jQuery(this).height() > maxHeight)
				maxHeight = jQuery(this).height();
		});
	}

	
	// Google Maps				
	googlemap_init(jQuery("#sc_googlemap").get(0), {address: googleMaps, latlng: "", zoom: 16, style: ""});	
			

	// Puzzles switcher
	var box = jQuery('#custom_options .switcher2');
	var switcher = box.find('a').eq(0);
	var right = box.width() - switcher.width() + 2;
	switcher.css({left: right});	

	// Theme & Background color
	jQuery('#co_theme_color').css('backgroundColor', '');
	jQuery('#co_bg_color').css('backgroundColor', '#76007c');    						

	//Tabs Reviews
	
	jQuery('.post_reviews').tabs();
	initReviews(true);
		
		// Save user's marks
		if (allowUserReviews) {
			jQuery('.reviews_users_accept').click(function(e) {
				var marks = '3.1,3.3,3.3,3.2,3.4'.split(',');
				var users = 44;
				var marks_cnt = 0;
				jQuery('#reviews_users .reviews_data .criteria_row input').each(function (idx) {
					marks[idx] = Math.round(((marks.length>idx && marks[idx]!='' ? parseFloat(marks[idx])*users : 0) + parseFloat(jQuery(this).val()))/(users+1)*10)/10;
					jQuery(this).val(marks[idx]);
					marks_cnt++;
				});
				if (marks.length > marks_cnt)
					marks = marks.splice(marks_cnt, marks.length-marks_cnt)
				users++;

				jQuery.post(THEMEREX_ajax_url, {
					action: 'reviews_users_accept',
					nonce: THEMEREX_ajax_nonce,
					post_id: 377,
					marks: marks.join(','),
					users: users
				}).done(function(response) {
					var rez = JSON.parse(response);
					if (rez.error === '') {
						jQuery('.reviews_users .criteria_summary_text').removeClass('show_button').find('.criteria_summary_descr').html('Thanks for your vote! New average rating is:');
						allowUserReviews = false;
						jQuery.cookie('reviews_vote', reviews_vote + (reviews_vote.substr(-1)!=',' ? ',' : '') + 377 + ',', {expires: 365, path: '/'});
						jQuery('#reviews_users .reviews_data .criteria_row input').each(function (idx) {
							jQuery(this).val(marks[idx]);
						});
						jQuery('#reviews_users .reviews_data .criteria_row .criteria_dragger').hide();
						/*
						jQuery('.reviews_users .reviews_data .theme_stars').each(function() {
							setStarsOnMark(jQuery(this), null);
						});
						*/
						setAverageMark('reviews_users');
					} else {
						jQuery('.reviews_users .criteria_summary_text').removeClass('show_button').find('.criteria_summary_descr').html('Error saving your vote! Please, try again later.');
					}
				});

				e.preventDefault();
				return false;
			});
		}

							
	

	// toTop link setup
	showToTop();
	jQuery(window).scroll(showToTop);
	jQuery('#toTop').click(function(e) {
		"use strict";
		jQuery('body,html').animate({scrollTop:0}, 800);
		e.preventDefault();
		return false;
	});

	// Search link
	jQuery('.search_link').click(function(e) {
		"use strict";
		jQuery('.search_form_area').addClass('shown').removeClass('hidden');
		e.preventDefault();
		return false;
	});
	jQuery('.search_close').click(function(e) {
		"use strict";
		jQuery('.search_form_area').removeClass('shown').addClass('hidden');
		e.preventDefault();
		return false;
	});

	// Login & registration link
	jQuery('.link_login,.link_register,.popup_form .popup_title .popup_close').click(function(e) {
		"use strict";
		var obj = jQuery(this);
		var popup = obj.hasClass('link_login') ? jQuery('#popup_login') : (obj.hasClass('link_register') ? jQuery('#popup_register') : obj.parents('.popup_form'));
		if (popup.length === 1) {
			if (parseInt(popup.css('left'), 10) === 0) {
				var offset = jQuery('.link_login').offset();
				popup.css({
					left: offset.left+jQuery('.link_login').width()-popup.width(),
					top: offset.top	//+jQuery(this).height()+4
				});
			}
			jQuery('.popup_form').removeClass('visible').fadeOut();
			if (jQuery('.link_login').hasClass('icon-cancel')) {
				jQuery('.link_login').addClass('icon-login-1').removeClass('icon-cancel');
			} else {
				popup.addClass('visible').fadeIn();
				jQuery('.link_login').removeClass('icon-login-1').addClass('icon-cancel');
			}
		}
		e.preventDefault();
		return false;
	});
	jQuery('.popup_form form').keypress(function(e){
		"use strict";
		if (e.keyCode === 27) {
			jQuery(this).parents('.popup_form').find('.popup_title .popup_close').trigger('click');
			e.preventDefault();
			return false;
		} 
		/*
		else if (e.keyCode === 13) {
			jQuery(this).parents('.popup_form').find('.popup_button a').trigger('click');
			e.preventDefault();
			return false;
		}
		*/
	});
	jQuery('#popup_login .popup_button a').click(function(e){
		"use strict";
		jQuery('#popup_login form input').removeClass('error_fields_class');
		var error = formValidate(jQuery('#popup_login form'), {
			error_message_show: true,
			error_message_time: 4000,
			error_message_class: 'sc_infobox sc_infobox_style_error',
			error_fields_class: 'error_fields_class',
			exit_after_first_error: true,
			rules: [
				{
					field: "log",
					min_length: { value: 1, message: THEMEREX_LOGIN_EMPTY},
					max_length: { value: 60, message: THEMEREX_LOGIN_LONG}
				},
				{
					field: "pwd",
					min_length: { value: 4, message: THEMEREX_PASSWORD_EMPTY},
					max_length: { value: 20, message: THEMEREX_PASSWORD_LONG}
				}
			]
		});
		if (!error) {
			document.forms.login_form.submit();
		}
		e.preventDefault();
		return false;
	});
	jQuery('#popup_login .register a').click(function(e){
		"use strict";
		jQuery('.link_login').trigger('click');
		jQuery('.link_register').trigger('click');
		e.preventDefault();
		return false;
	});
	jQuery('#popup_register .registration_role input').change(function(e){
		"use strict";
		if (jQuery(this).index() > 1)
			jQuery('#popup_register .registration_msg_area').slideDown();
		else
			jQuery('#popup_register .registration_msg_area').slideUp();
	});
	jQuery('#popup_register .popup_button a').click(function(e){
		"use strict";
		jQuery('#popup_register form input').removeClass('error_fields_class');
		var error = formValidate(jQuery("#popup_register form"), {
			error_message_show: true,
			error_message_time: 4000,
			error_message_class: "sc_infobox sc_infobox_style_error",
			error_fields_class: "error_fields_class",
			exit_after_first_error: true,
			rules: [
				{
					field: "registration_username",
					min_length: { value: 1, message: THEMEREX_LOGIN_EMPTY },
					max_length: { value: 60, message: THEMEREX_LOGIN_LONG }
				},
				{
					field: "registration_email",
					min_length: { value: 7, message: THEMEREX_EMAIL_EMPTY },
					max_length: { value: 60, message: THEMEREX_EMAIL_LONG },
					mask: { value: "^([a-z0-9_\\-]+\\.)*[a-z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$", message: THEMEREX_EMAIL_NOT_VALID }
				},
				{
					field: "registration_pwd",
					min_length: { value: 4, message: THEMEREX_PASSWORD_EMPTY },
					max_length: { value: 20, message: THEMEREX_PASSWORD_LONG }
				},
				{
					field: "registration_pwd2",
					equal_to: { value: 'registration_pwd', message: THEMEREX_PASSWORD_NOT_EQUAL }
				}
			]
		});
		if (!error) {
			jQuery.post(THEMEREX_ajax_url, {
				action: 'registration_user',
				nonce: THEMEREX_ajax_nonce,
				user_name: 	jQuery('#popup_register #registration_username').val(),
				user_email: jQuery('#popup_register #registration_email').val(),
				user_pwd: 	jQuery('#popup_register #registration_pwd').val(),
				user_role: 	jQuery('#popup_register #registration_role2').get(0).checked ? 2 : 1,
				user_msg: 	jQuery('#popup_register #registration_msg').val()
			}).done(function(response) {
				var rez = JSON.parse(response);
				var result_box = jQuery('#popup_register .result');
				result_box.toggleClass('sc_infobox_style_error', false).toggleClass('sc_infobox_style_success', false);
				if (rez.error === '') {
					result_box.addClass('sc_infobox_style_success').html(THEMEREX_REGISTRATION_SUCCESS + (jQuery('#popup_register #registration_role2').get(0).checked ? '<br /><br />' + THEMEREX_REGISTRATION_AUTHOR : ''));
					setTimeout(function() { jQuery('#popup_register .popup_close').trigger('click'); jQuery('.link_login').trigger('click'); }, 2000);
				} else {
					result_box.addClass('sc_infobox_style_error').html(THEMEREX_REGISTRATION_FAILED + ' ' + rez.error);
				}
				result_box.fadeIn();
				setTimeout(function() { jQuery('#popup_register .result').fadeOut(); }, 5000);
			});
		}
		e.preventDefault();
		return false;
	});


	// Main menu
	if (THEMEREX_mainMenuMobile) {
		jQuery('#mainmenu').mobileMenu({mobileWidth: THEMEREX_mainMenuMobileWidth});
	}
	if (THEMEREX_mainMenuSlider) {
		jQuery('#mainmenu').spasticNav();
	}
	jQuery('#mainmenu').superfish({
		//plugins:{"supposition":true,"bgiframe":false},
		autoArrows: true,
		arrowClass: 'icon-right-open',
		useClick: false,
		disableHI: true,
		animation: {height:'show'},
		speed: THEMEREX_mainMenuSlider ? 300 : 100,
		animationOut: {opacity: 'hide'},
		speedOut: 'fast',
		delay: 100
	});

	jQuery('#mainmenu .sf-sub-indicator').addClass('icon-right-open').html('');
	if (THEMEREX_mainMenuFixed && jQuery('#header_middle').length > 0) {
		var menu_offset = jQuery('#header_middle').offset().top;
		jQuery(window).resize(function(){
			var winWidth =  document.body.clientWidth;
			if (winWidth < 800) jQuery('body').addClass('menu_mobile');
			if (winWidth >= 800) jQuery('body').removeClass('menu_mobile');
		});
		jQuery(window).scroll(function() {
			"use strict";
			
			if (jQuery('body').hasClass('menu_mobile')) return;
			var s = jQuery(this).scrollTop();
			if (s >= menu_offset) {
				jQuery('body').addClass('menu_fixed');
			} else {
				jQuery('body').removeClass('menu_fixed');
			}
		});
	}

	// Side menu builder
	if (jQuery('#sidemenu_link').length > 0) {
		var THEMEREX_submenu_counter = 0;
		var THEMEREX_sidemenu_speed = 500;
		jQuery('#sidemenu_area ul').each(function () {
			"use strict";
			jQuery(this).find('>li').each(function () {
				"use strict";
				var submenu = jQuery(this).find('>ul');
				if (submenu.length > 0) {
					THEMEREX_submenu_counter++;
					submenu.eq(0).addClass('theme_accent_bg submenu_item_'+THEMEREX_submenu_counter).css('zIndex', THEMEREX_submenu_counter);
					jQuery(this).addClass('submenu_present').prepend('<a class="icon-right-open submenu_opener" href="#" data-submenu="submenu_item_'+THEMEREX_submenu_counter+'"></a>');
					jQuery('#sidemenu_scroller').append(submenu.eq(0));
				}
			});
		});
		jQuery('#sidemenu_link').click(function (e) {
			"use strict";
			var sm = jQuery('#sidemenu_area');
			if (sm.hasClass('menu-open')) {
				var sm_classes = jQuery(this).data('submenu') ? jQuery(this).data('submenu').split('|') : [];
				if (sm_classes.length > 0) {
					var sm_class = sm_classes.pop();
					jQuery(this).data('submenu', sm_classes.join('|'));
					var submenu = jQuery('.'+sm_class).eq(0);
					submenu.removeClass('menu-open').animate({marginLeft: -submenu.width()}, THEMEREX_sidemenu_speed);
				} else {
					if (jQuery('#page').hasClass('page-shift')) {
						var dx = (jQuery(window).width()-jQuery('#page').width()) / 2;
						jQuery('#page').removeClass('page-shift').animate({marginLeft: dx+'px'}, THEMEREX_sidemenu_speed/3);
						setTimeout(function() {	jQuery('#page').css({marginLeft:'auto'}); }, THEMEREX_sidemenu_speed/3);
					}
					jQuery(this).removeClass('icon-left-circled').addClass('icon-menu');
					sm.removeClass('menu-open').animate({left: 0}, THEMEREX_sidemenu_speed);
				}
			} else {
				var pos = jQuery('#page').position().left;
				if (!pos) {
					pos = parseFloat(jQuery('#page').css('marginLeft'));
				}
				var dx = 0;
				if (pos < sm.width()) {
					dx = sm.width() - pos;
					jQuery('#page').addClass('page-shift').css({marginLeft: pos+'px'}).animate({marginLeft: pos + dx}, THEMEREX_sidemenu_speed);
				}
				jQuery(this).addClass('icon-left-circled').removeClass('icon-menu');
				sm.addClass('menu-open').animate({left: -parseInt(sm.css('marginLeft'))}, THEMEREX_sidemenu_speed);
			}
			e.preventDefault();
			return false;
		});
		jQuery('#sidemenu_area .submenu_opener').click(function(e) {
			"use strict";
			var sm_class = jQuery(this).data('submenu');
			var sm = jQuery('.'+sm_class).eq(0);
			var closer_classes = jQuery('#sidemenu_link').data('submenu');
			jQuery('#sidemenu_link').data('submenu', (closer_classes ? closer_classes+'|' : '')+sm_class);
			sm.addClass('menu-open').animate({marginLeft: 0}, THEMEREX_sidemenu_speed);
			e.preventDefault();
			return false;
		});
		jQuery(window).resize(function() {
			logoShift(); 
		});
		logoShift();
	}

	// Hide empty pagination
	if (jQuery('#nav_pages > ul > li').length < 3) {
		jQuery('#nav_pages').remove();
	} else {
		jQuery('.theme_paginaton a').addClass('theme_button');
	}

	// Main Sidebar and content height equals
	var h1 = 0, h2 = 0;
	if (jQuery('.with_sidebar #sidebar_main').length === 1) {
		h1 = jQuery('#content').height() - (jQuery('#content #nav_pages').length > 0 ? jQuery('#content #nav_pages').height() + parseInt(jQuery('#content #nav_pages').css('marginTop')) + parseInt(jQuery('#content #nav_pages').css('paddingTop')) + parseInt(jQuery('#content #nav_pages').css('paddingBottom')) : 0);
		h2 = jQuery('#sidebar_main').height();
		if (h1 > h2) {
			jQuery('#sidebar_main').append('<div class="sidebar_increase theme_article" style="height:' + (h1 - h2) + 'px"></div>');
		} else if (h1 < h2) {
			//jQuery('#content').append('<div class="content_increase theme_article" style="height:' + (h2 - h1) + 'px"></div>');
		}
	}
	
	// Advert Sidebar widgets height equals
	if (jQuery('#advert_sidebar').length === 1 && jQuery('body').width()>480) {
		h1 = 0;
		jQuery('#advert_sidebar .widget').each(function() {
			"use strict";
			var tabs = jQuery(this).find('ul.tabs');
			if (tabs.length > 0) {
				h2 =  jQuery(this).find('.widget_title').eq(0).height() + parseInt(jQuery(this).find('.widget_title').eq(0).css('marginBottom'))
					+ tabs.eq(0).height() 
					+ jQuery(this).find('.tab_content').eq(0).height() + parseInt(jQuery(this).find('.tab_content > .post_item').eq(0).css('marginTop'));
			} else {
				h2 = jQuery(this).height();
			}
			if (h2 > h1) {
				h1 = h2;
			}
		});
		if (h1 > 0) {
			jQuery('#advert_sidebar .widget').each(function() {
				"use strict";
				jQuery(this).height(h1);
			});
		}
	}
	
	// Footer Sidebar widgets height equals
	if (jQuery('#footer_sidebar').length === 1 && jQuery('body').width()>480) {
		h1 = 0;
		jQuery('#footer_sidebar .widget').each(function() {
			"use strict";
			var tabs = jQuery(this).find('ul.tabs');
			if (tabs.length > 0) {
				h2 =  jQuery(this).find('.widget_title').eq(0).height() + parseInt(jQuery(this).find('.widget_title').eq(0).css('marginBottom'))
					+ tabs.eq(0).height() 
					+ jQuery(this).find('.tab_content').eq(0).height() + parseInt(jQuery(this).find('.tab_content > .post_item').eq(0).css('marginTop'));
			} else {
				h2 = jQuery(this).height();
			}
			if (h2 > h1) {
				h1 = h2;
			}
		});
		if (h1 > 0) {
			jQuery('#footer_sidebar .widget').each(function() {
				"use strict";
				jQuery(this).height(h1);
			});
		}
	}
	
	// IFRAME width and height constrain proportions 
	if (jQuery('iframe').length > 0) {
		jQuery(window).resize(function() {
			videoDimensions();
		});
		videoDimensions();
	}
	
	// Fit puzzles width and height on fullwidth layout
	setPuzzlesResize();

	// View More button
	jQuery('#viewmore_link').click(function(e) {
		"use strict";
		jQuery(this).addClass('loading');
		THEMEREX_viewmore_busy = true;
		jQuery.post(THEMEREX_ajax_url, {
			action: 'view_more_posts',
			nonce: THEMEREX_ajax_nonce,
			page: Number(jQuery('#viewmore_page').val())+1,
			data: jQuery('#viewmore_data').val(),
			vars: jQuery('#viewmore_vars').val()
		}).done(function(response) {
			"use strict";
			var rez = JSON.parse(response);
			jQuery('#viewmore_link').removeClass('loading');
			THEMEREX_viewmore_busy = false;
			if (rez.error === '') {
				jQuery('#viewmore').before(rez.data);
				initPostFormats();
				var nextPage = Number(jQuery('#viewmore_page').val())+1;
				jQuery('#viewmore_page').val(nextPage);
				if (rez.no_more_data==1) {
					jQuery('#viewmore').hide();
				}
				if (jQuery('#nav_pages ul li').length >= nextPage) {
					jQuery('#nav_pages ul li').eq(nextPage).toggleClass('pager_current', true);
				}
			}
		});
		e.preventDefault();
		return false;
	});

	// Infinite pagination
	if (jQuery('#viewmore.pagination_infinite').length > 0) {
		jQuery(window).scroll(infiniteScroll);
	}

	// ----------------------- Post formats setup -----------------
	initPostFormats();


	// ----------------------- Shortcodes setup -------------------
	jQuery('div.sc_infobox_closeable').click(function(e) {
		"use strict";
		jQuery(this).fadeOut();
		e.preventDefault();
		return false;
	});

	jQuery('.sc_tooltip_parent').hover(function(){
		"use strict";
		var obj = jQuery(this);
		obj.find('.sc_tooltip').stop().animate({'marginTop': '5'}, 100).show();
	},
	function(){
		"use strict";
		var obj = jQuery(this);
		obj.find('.sc_tooltip').stop().animate({'marginTop': '0'}, 100).hide();
	});
	jQuery('.sc_toggles .sc_toggles_item .sc_toggles_title a').click(function(e) {
		"use strict";
		jQuery(this).parent().toggleClass('ui-state-active').siblings('div').slideToggle(200);
		e.preventDefault();
		return false;
	});




	// ----------------------- Comment form submit ----------------
	jQuery("form#commentform").submit(function(e) {
		"use strict";
		var error = formValidate(jQuery(this), {
			error_message_text: THEMEREX_GLOBAL_ERROR_TEXT,	// Global error message text (if don't write in checked field)
			error_message_show: true,				// Display or not error message
			error_message_time: 5000,				// Error message display time
			error_message_class: 'sc_infobox sc_infobox_style_error',	// Class appended to error message block
			error_fields_class: 'error_fields_class',					// Class appended to error fields
			exit_after_first_error: false,								// Cancel validation and exit after first error
			rules: [
				{
					field: 'author',
					min_length: { value: 1, message: THEMEREX_NAME_EMPTY},
					max_length: { value: 60, message: THEMEREX_NAME_LONG}
				},
				{
					field: 'email',
					min_length: { value: 7, message: THEMEREX_EMAIL_EMPTY},
					max_length: { value: 60, message: THEMEREX_EMAIL_LONG},
					mask: { value: '^([a-z0-9_\\-]+\\.)*[a-z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$', message: THEMEREX_EMAIL_NOT_VALID }
				},
				{
					field: 'comment',
					min_length: { value: 1, message: THEMEREX_MESSAGE_EMPTY },
					max_length: { value: 1000, message: THEMEREX_MESSAGE_LONG}
				}
			]
		});
		if (error) { e.preventDefault(); }
		return !error;
	});

	/* ================== Customize site ========================= */
	if (jQuery("#custom_options").length===1) {
		jQuery('#co_toggle').click(function(e) {
			"use strict";
			var co = jQuery('#custom_options').eq(0);
			if (co.hasClass('opened')) {
				co.removeClass('opened').animate({marginRight:-237}, 300);
			} else {
				co.addClass('opened').animate({marginRight:-15}, 300);
			}
			e.preventDefault();
			return false;
		});

		// Themes selector
		jQuery('#custom_options #co_theme_apply').click(function (e) {
			"use strict";
			jQuery('#custom_options .co_theme_selector').each(function () {
				"use strict";
				var subj = jQuery(this).attr('id').substr(3);
				var theme = jQuery(this).val();
				jQuery(this).siblings('input').attr('value', theme);
				jQuery.cookie(subj, theme, {expires: 1, path: '/'});
			});
			window.location = jQuery("#custom_options #co_site_url").val();
			e.preventDefault();
			return false;
		});
		jQuery('#custom_options #co_theme_reset').click(function (e) {
			"use strict";
			jQuery('#custom_options .co_theme_selector').each(function () {
				"use strict";
				var subj = jQuery(this).attr('id').substr(3);
				var theme = 'default';
				jQuery(this).siblings('input').attr('value', theme);
				jQuery.cookie(subj, theme, {expires: 1, path: '/'});
			});
			window.location = jQuery("#custom_options #co_site_url").val();
			e.preventDefault();
			return false;
		});

		// Reviews interval
		jQuery('#custom_options #co_reviews_max_level').change(function (e) {
			"use strict";
			var val = jQuery(this).val();
			jQuery(this).siblings('input').attr('value', val);
			jQuery.cookie('reviews_max_level', val, {expires: 1, path: '/'});
			window.location = jQuery("#custom_options #co_site_url").val();
			e.preventDefault();
			return false;
		});

		// Body style
		jQuery('#custom_options #co_body_style').change(function (e) {
			"use strict";
			var val = jQuery(this).val();
			jQuery(this).siblings('input').attr('value', val);
			jQuery('.sc_blogger_item_puzzles .post_thumb,.blog_style_puzzles article .post_thumb,.blog_style_fullpost .related_posts_item').each(function () {
				jQuery(this).removeAttr('style');
			});
			jQuery.cookie('body_style', val, {expires: 1, path: '/'});
			jQuery(document).find('body').removeClass('wide boxed fullwidth').addClass(val);
			setPuzzlesResize();
			jQuery(window).trigger('resize');
			e.preventDefault();
			return false;
		});

		// Body style and puzzles style
		jQuery("#custom_options .switcher a,#custom_options .switcher2 a" ).draggable({
			axis: 'x',
			containment: 'parent',
			stop: function() {
				var left = parseInt(jQuery(this).css('left'), 10);
				var curStyle = left < 25 ? 'wide' : 'boxed';
				switchBox(jQuery(this).parent(), curStyle, true);
			}
		});
		jQuery("#custom_options .switcher,#custom_options .switcher2" ).click(function(e) {
			"use strict";
			switchBox(jQuery(this));
			e.preventDefault();
			return false;
		});
		jQuery("#custom_options .co_switch_box .boxed" ).click(function(e) {
			"use strict";
			switchBox(jQuery(this).siblings('div'), 'boxed');
			e.preventDefault();
			return false;
		});
		jQuery("#custom_options .co_switch_box .stretched" ).click(function(e) {
			"use strict";
			switchBox(jQuery(this).siblings('div'), 'wide');
			e.preventDefault();
			return false;
		});
		// Main theme color and Background color
		iColorPicker();
		jQuery('#custom_options .iColorPicker').click(function () {
			"use strict";
			iColorShow(null, jQuery(this), function(fld, clr) {
				"use strict";
				fld.css('backgroundColor', clr);
				fld.siblings('input').attr('value', clr);
				if (fld.attr('id')==='co_theme_color') {
					jQuery.cookie('theme_color', clr, {expires: 1, path: '/'});
					window.location = jQuery("#custom_options #co_site_url").val();
				} else {
					jQuery("#custom_options .co_switch_box .boxed").trigger('click');
					jQuery('#custom_options #co_bg_pattern_list .co_pattern_wrapper,#custom_options #co_bg_images_list .co_image_wrapper').removeClass('current');
					jQuery.cookie('bg_image', null, {expires: -1, path: '/'});
					jQuery.cookie('bg_pattern', null, {expires: -1, path: '/'});
					jQuery.cookie('bg_color', clr, {expires: 1, path: '/'});
					jQuery(document).find('body').removeClass('bg_pattern_1 bg_pattern_2 bg_pattern_3 bg_pattern_4 bg_pattern_5 bg_image_1 bg_image_2 bg_image_3').css('backgroundColor', clr);
				}
			});
		});
		
		// Background patterns
		jQuery('#custom_options #co_bg_pattern_list a').click(function(e) {
			"use strict";
			jQuery("#custom_options .co_switch_box .boxed").trigger('click');
			jQuery('#custom_options #co_bg_pattern_list .co_pattern_wrapper,#custom_options #co_bg_images_list .co_image_wrapper').removeClass('current');
			var obj = jQuery(this).addClass('current');
			var val = obj.attr('id').substr(-1);
			jQuery.cookie('bg_color', null, {expires: -1, path: '/'});
			jQuery.cookie('bg_image', null, {expires: -1, path: '/'});
			jQuery.cookie('bg_pattern', val, {expires: 1, path: '/'});
			jQuery(document).find('body').removeClass('bg_pattern_1 bg_pattern_2 bg_pattern_3 bg_pattern_4 bg_pattern_5 bg_image_1 bg_image_2 bg_image_3').addClass('bg_pattern_' + val);
			e.preventDefault();
			return false;
		});
		// Background images
		jQuery('#custom_options #co_bg_images_list a').click(function(e) {
			"use strict";
			jQuery("#custom_options .co_switch_box .boxed").trigger('click');
			jQuery('#custom_options #co_bg_images_list .co_image_wrapper,#custom_options #co_bg_pattern_list .co_pattern_wrapper').removeClass('current');
			var obj = jQuery(this).addClass('current');
			var val = obj.attr('id').substr(-1);
			jQuery.cookie('bg_color', null, {expires: -1, path: '/'});
			jQuery.cookie('bg_pattern', null, {expires: -1, path: '/'});
			jQuery.cookie('bg_image', val, {expires: 1, path: '/'});
			jQuery(document).find('body').removeClass('bg_pattern_1 bg_pattern_2 bg_pattern_3 bg_pattern_4 bg_pattern_5 bg_image_1 bg_image_2 bg_image_3').addClass('bg_image_' + val);
			e.preventDefault();
			return false;
		});
		jQuery('#custom_options #co_bg_pattern_list a,#custom_options #co_bg_images_list a').hover(
			function() {
				"use strict";
				jQuery(this).parent().parent().css('backgroundImage', 'url('+jQuery(this).find('img').attr('src').replace('_thumb2', '_thumb')+')');
			},
			function() {
				"use strict";
				jQuery(this).parent().parent().css('backgroundImage', 'none');
			}
		);
	}
	/* ================== /Customize site ========================= */
});

//Fullwidth Demo
	
jQuery('nav ul li a').click(function(){
	
});

function switchBox(box) {
	"use strict";
	var toStyle = arguments[1] ? arguments[1] : '';
	var important = arguments[2] ? arguments[2] : false;
	var switcher = box.find('a').eq(0);
	var left = parseInt(switcher.css('left'), 10);
	var newStyle = left < 5 ? 'boxed' : 'wide';
	if (toStyle==='' || important || newStyle === toStyle) {
		if (toStyle==='') {toStyle = newStyle;}
		var right = box.width() - switcher.width() + 2;
		if (toStyle === 'wide') {switcher.animate({left: -2}, 200);}
		else {switcher.animate({left: right}, 200);}
		if (box.hasClass('switcher2')) {
			jQuery.cookie('puzzles_style', toStyle=='boxed' ? 'heavy' : 'light', {expires: 1, path: '/'});
			window.location = jQuery("#custom_options #co_site_url").val();
		} else {
			jQuery.cookie('body_style', toStyle, {expires: 1, path: '/'});
			jQuery(document).find('body').removeClass(toStyle==='boxed' ? 'wide' : 'boxed').addClass(toStyle);
			jQuery(window).trigger('resize');
		}
	}
	return newStyle;
}

function logoShift() {
	"use strict";
	var logo = jQuery('#header_top_inner .logo');
	var left = (jQuery(document).width() - jQuery('#header_top_inner').width())/2;
	var margin = parseFloat(logo.css('marginLeft'));
	var bw = jQuery('#sidemenu_link').width() + 20;
	if (left < bw) {
		jQuery('#header_top_inner .logo').css({marginLeft: (bw-left)+'px'});
	} else if (margin > 0) {
		jQuery('#header_top_inner .logo').css({marginLeft: Math.max(0, (margin-left+bw))+'px'});
	}
}

// Fit video frame to document width
function videoDimensions() {
	"use strict";
	jQuery('iframe').each(function() {
		"use strict";
		var iframe = jQuery(this).eq(0);
		var w_attr = iframe.attr('width');
		var h_attr = iframe.attr('height');
		if (!w_attr || !h_attr) {
			return;
		}
		var w_real = iframe.width();
		if (w_real!=w_attr) {
			var h_real = Math.round(w_real/w_attr*h_attr);
			iframe.height(h_real);
		}
	});
}

// Set puzzles resize handler
var THEMEREX_puzzles_resize = false;
function setPuzzlesResize() {
	"use strict";
	var fw = jQuery('body').hasClass('fullwidth');
	if (fw) {
		if (!THEMEREX_puzzles_resize) {
			THEMEREX_puzzles_resize = true;
			jQuery(window).resize(function() {
				puzzlesDimensions();
			});
		}
	}
	jQuery('#advert_sidebar').toggleClass('theme_article', fw);
	jQuery('#sidebar_main').toggleClass('theme_article', fw);
	jQuery('#main_slider').toggleClass('main_slider_fixed', !fw);
}

// Fit puzzles to document width
var THEMEREX_puzzles_width = 0;
function puzzlesDimensions() {
	"use strict";
	if (!jQuery('body').hasClass('fullwidth')) return;
	var w_obj = 0;
	var add = 0;
	var cnt = 0;
	var w_sidebar = jQuery('#sidebar_main').length > 0 ? jQuery('#sidebar_main').width() : 0;
	var w_content = jQuery('#content').width();
	jQuery('.sc_blogger_item_puzzles .post_thumb,.blog_style_puzzles article .post_thumb,.blog_style_fullpost .related_posts_item').each(function(idx) {
		"use strict";
		var obj = jQuery(this);
		var par = obj.hasClass('related_posts_item') ? obj : obj.parent();
		if (w_obj == 0) {
			obj.removeAttr('style');
			var mrg = parseInt(par.css('marginLeft'))+parseInt(par.css('marginRight'));
			THEMEREX_puzzles_width = obj.width()+mrg;
			cnt = Math.floor(w_content / THEMEREX_puzzles_width);
			w_obj = Math.max(THEMEREX_puzzles_width, Math.floor(w_content / cnt)) - mrg;
			add = w_content - (w_obj + mrg)*cnt + (w_sidebar ? 0 : 1);
console.log(w_content +' '+ w_sidebar+' '+w_obj+' '+add);
		}
		obj.width(w_obj + ((idx+1)%cnt==0 ? add : 0)).height(w_obj);
		obj.find('iframe').width(w_obj + ((idx+1)%cnt==0 ? add : 0)).height(w_obj);
	});
}

jQuery(window).resize(function() {
	puzzlesDimensions();
});



function initPostFormats() {
	"use strict";

	if (jQuery('body').hasClass('fullwidth')) {
		puzzlesDimensions();
	}

	// MediaElement init
	if (THEMEREX_useMediaElement) {
		jQuery('video,audio').each(function () {
			if (jQuery(this).hasClass('inited')) return;
			jQuery(this).addClass('inited').mediaelementplayer({
				videoWidth: -1,		// if set, overrides <video width>
				videoHeight: -1,	// if set, overrides <video height>
				audioWidth: '100%',	// width of audio player
				audioHeight: 30	// height of audio player
			});
		});
	}
	
	// Pretty photo
	jQuery("a[href$='jpg'],a[href$='jpeg'],a[href$='png'],a[href$='gif']").attr('rel', 'prettyPhoto[slideshow]');	//.toggleClass('prettyPhoto', true);
	jQuery("a[rel*='prettyPhoto']:not(.inited)")
		.addClass('inited')
		.prettyPhoto({
			social_tools: '',
			theme: 'facebook',
			deeplinking: false
		})
		.click(function(e) {
			"use strict";
			if (jQuery(window).width()<480)	{
				e.stopImmediatePropagation();
				window.location = jQuery(this).attr('href');
			}
			e.preventDefault();
			return false;
		});

	// Galleries Slider
	jQuery('.sc_slider_flex').each(function () {
		"use strict";
		if (jQuery(this).hasClass('inited')) return;
		jQuery(this).addClass('inited').flexslider({
			directionNav: true,
			prevText: '',
			nextText: '',
			controlNav: jQuery(this).hasClass('sc_slider_controls'),
			animation: 'fade',
			animationLoop: true,
			slideshow: true,
			slideshowSpeed: 7000,
			animationSpeed: 600,
			pauseOnAction: true,
			pauseOnHover: true,
			useCSS: false,
			manualControls: ''
			/*
			start: function(slider){},
			before: function(slider){},
			after: function(slider){},
			end: function(slider){},              
			added: function(){},            
			removed: function(){} 
			*/
		});
	});
	
	// Add video on thumb click
	jQuery('.post_thumb .post_video_play').each(function () {
		"use strict";
		if (jQuery(this).hasClass('inited')) return;
		jQuery(this).addClass('inited').click(function (e) {
			"use strict";
			var par = jQuery(this).parent();
			var video = par.data('video');
			if (video!=='') {
				video = jQuery(video).width(par.width()).height(par.height());
				par.empty().html(video);
			}
			e.preventDefault();
			return false;
		});
	});

	// ---------- Puzzles Animations setup: mousemove events for hover slider --------
	if (THEMEREX_puzzlesAnimations && THEMEREX_puzzlesStyle=='heavy' && jQuery('.puzzles_animations .post_thumb .post_content_wrapper').length > 0) {
		jQuery('.puzzles_animations .post_thumb').each(function () {
			"use strict";
			if (jQuery(this).hasClass('heavy_inited')) return;
			jQuery(this).addClass('heavy_inited').mousemove(function (e) {
				"use strict";
				var offset = jQuery(this).offset();
				var x = e.pageX - offset.left;
				var y = e.pageY - offset.top;
				var thumb = jQuery(this);
				var delta = thumb.height()/7;
				if (thumb.hasClass('down-1') || thumb.hasClass('down-2') || thumb.hasClass('down-3') || thumb.hasClass('down-4')) {
					thumb.toggleClass('open_thumb', y < delta).toggleClass('open_content', y > thumb.height() - delta);
				} else if (thumb.hasClass('left-1') || thumb.hasClass('left-2')) {
					thumb.toggleClass('open_thumb', x > thumb.height() - delta).toggleClass('open_content', x < delta);
				} else if (thumb.hasClass('right-1') || thumb.hasClass('right-2')) {
					thumb.toggleClass('open_thumb', x < delta).toggleClass('open_content', x > thumb.width() - delta);
				}
			});
		});
	}	
	// Puzzles light style - info block show/hide
	if (THEMEREX_puzzlesStyle=='light') {
		jQuery('.puzzles_light .post_thumb:not(.no_thumb)').each(function () {
			"use strict";
			if (jQuery(this).hasClass('light_inited')) return;
			jQuery(this)
				.addClass('light_inited')
				.hover(
					function () {
						var pf = jQuery(this).find('.post_format').eq(0);
						if (pf.hasClass('description_opened'))
							pf.addClass('icon-cancel-circled');
						else
							pf.addClass('icon-help-circled');
					},
					function () { 
						var pf = jQuery(this).find('.post_format').eq(0);
						if (pf.hasClass('description_opened'))
							pf.removeClass('icon-cancel-circled'); 
						else
							pf.removeClass('icon-help-circled'); 
					}
				)
				.find('.post_format')
				.click(function (e) {
					"use strict";
					var speed = 300;
					var thumb = jQuery(this).parent();
					var dir = thumb.hasClass('down-1') ? 'down' :
							  thumb.hasClass('down-2') ? 'down' :
							  thumb.hasClass('down-3') ? 'down' :
							  thumb.hasClass('down-4') ? 'down' :
							  thumb.hasClass('left-1') ? 'left' :
							  thumb.hasClass('left-2') ? 'left' : 'right';
					jQuery(this).toggleClass('description_opened');
					if (jQuery(this).hasClass('description_opened')) {
						jQuery(this).removeClass('icon-help-circled').addClass('icon-cancel-circled');
						if (dir == 'down')
							jQuery(this).siblings('.post_content_wrapper').animate({top:0, paddingTop: '12px', paddingBottom: '12px'}, speed);
						else if (dir == 'left')
							jQuery(this).siblings('.post_content_wrapper').animate({right:0, paddingLeft: '12px', paddingRight: '12px'}, speed);
						else
							jQuery(this).siblings('.post_content_wrapper').animate({left:0, paddingLeft: '12px', paddingRight: '12px'}, speed);
					} else {
						jQuery(this).addClass('icon-help-circled').removeClass('icon-cancel-circled');
						if (dir == 'down')
							jQuery(this).siblings('.post_content_wrapper').animate({top:"100%", paddingTop: 0, paddingBottom: 0}, speed);
						else if (dir == 'left')
							jQuery(this).siblings('.post_content_wrapper').animate({right:"100%", paddingLeft: 0, paddingRight: 0}, speed);
						else
							jQuery(this).siblings('.post_content_wrapper').animate({left:"100%", paddingLeft: 0, paddingRight: 0}, speed);
					}
					e.preventDefault();
					return false;
				});
		});
	}	
}
/* HexToRGB */

function HexToRGB(hex_clr){
	"use strict";
	if(!/^\#?[\da-f]{6}$/i.test(hex_clr))
		return null;

	var color = (hex_clr.charAt(0)=="#") ? hex_clr.substring(1):hex_clr;
	return {
		"r" : parseInt(color.substring(0,2),16),
		"g" : parseInt(color.substring(2,4),16),
		"b" : parseInt(color.substring(4,6),16)
	}
}


/* Show/Hide "to Top" button */
function showToTop() {
	"use strict";
	var s = jQuery(document).scrollTop();
	if (s >= 110) {
		jQuery('#toTop').show();
	} else {
		jQuery('#toTop').hide();	
	}
}

/* Infinite Scroll */
function infiniteScroll() {
	var v = jQuery('#viewmore.pagination_infinite').offset();
	if (jQuery(this).scrollTop() + jQuery(this).height() + 100 >= v.top && !THEMEREX_viewmore_busy) {
		jQuery('#viewmore_link').eq(0).trigger('click');
	}
}


/* Share Twitter */
function trexShareTwitter(){
	window.open('https://twitter.com/intent/tweet?text='+THEMEREX_page_title.replace('|', '')+'&url='+THEMEREX_pathname+'', '_blank', 'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=480, height=400, toolbar=0, status=0'); 
	return false;
}

/* Share Facebook */
function trexShareFacebook(){
	window.open('http://www.facebook.com/sharer.php?u='+THEMEREX_pathname+'&t='+THEMEREX_page_title+'', '_blank', 'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=480, height=400, toolbar=0, status=0');
	return false;
}

/* Share Google+ */
function trexShareGplus(){
	window.open('https://plus.google.com/share?url='+THEMEREX_pathname+'', '_blank', 'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=480, height=400, toolbar=0, status=0'); 
	return false;
}

/* Share Linkedin */
function trexShareLinkedin(){
	window.open('http://www.linkedin.com/shareArticle?mini=true&url='+THEMEREX_pathname+'&title='+THEMEREX_page_title+'', '_blank', 'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=480, height=400, toolbar=0, status=0'); 
	return false;
}

/* Share Pinterest */
function trexSharePinterest(){
	var symbol = THEMEREX_href.lastIndexOf("/");
	var readyUrl =  THEMEREX_href.substring(0, symbol+1);
	var imgSrc =  jQuery('#content').find('img:first').attr('src');
	var readyImgSrc;
	if(imgSrc.indexOf(readyUrl)+1) readyImgSrc = imgSrc;
	else readyImgSrc = readyUrl+jQuery('#content').find('img:first').attr('src');

	window.open('http://pinterest.com/pin/create/button/?media='+readyImgSrc+'&description='+THEMEREX_page_title+'&url='+THEMEREX_pathname+'', '_blank', 'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=480, height=400, toolbar=0, status=0'); 
	return false;
}


