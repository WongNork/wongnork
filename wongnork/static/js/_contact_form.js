var THEMEREX_validateForm = null;
function userSubmitForm(form, url, nonce){
	"use strict";
	var error = formValidate(form, {
		error_message_show: true,
		error_message_time: 5000,
		error_message_class: "sc_infobox sc_infobox_style_error",
		error_fields_class: "error_fields_class",
		exit_after_first_error: false,
		rules: [
			{
				field: "username",
				min_length: { value: 1,	 message: THEMEREX_NAME_EMPTY },
				max_length: { value: 60, message: THEMEREX_NAME_LONG}
			},
			{
				field: "email",
				min_length: { value: 7,	 message: THEMEREX_EMAIL_EMPTY },
				max_length: { value: 60, message: THEMEREX_EMAIL_LONG},
				mask: { value: "^([a-z0-9_\\-]+\\.)*[a-z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$", message: THEMEREX_EMAIL_NOT_VALID}
			},
			{
				field: "message",
				min_length: { value: 5,  message: THEMEREX_MESSAGE_EMPTY },
				max_length: { value: 300, message: THEMEREX_MESSAGE_LONG}
			}
		]
	});
	if (!error) {
		THEMEREX_validateForm = form;
		var user_name  = form.find("#sc_contact_form_username").val();
		var user_email = form.find("#sc_contact_form_email").val();
		var user_msg   = form.find("#sc_contact_form_message").val();
		var data = {
			action: "send_contact_form",
			nonce: nonce,
			user_name: user_name,
			user_email: user_email,
			user_msg: user_msg
		};
		jQuery.post(url, data, userSubmitFormResponse, "text");
	}
}
	
function userSubmitFormResponse(response) {
	"use strict";
	var rez = JSON.parse(response);
	var result = THEMEREX_validateForm.find(".result")
		.toggleClass("sc_infobox_style_error", false)
		.toggleClass("sc_infobox_style_success", false);
	if (rez.error == "") {
		result.addClass("sc_infobox_style_success").html(THEMEREX_SEND_COMPLETE);
		setTimeout("jQuery(\'.sc_contact_form .result\').fadeOut(); jQuery(\'.sc_contact_form form\').get(0).reset();", 3000);
	} else {
		alert(rez);
		result.addClass("sc_infobox_style_error").html(THEMEREX_SEND_ERROR + ' ' + rez.error);
	}
	result.fadeIn();
}
