"use strict";

var gravel_APP = { "DEV_MODE": false, "DEV_MODE_GIRD_FULL": false, "ACTIVE_FIXED_FOOTER": true, "ACTIVE_BACKTOTOP": true, "ACTIVE_RESPONSIVE": true, "ACTIVE_FIXED_HEADER": true, "HEADER_TRANPARENT": false, "ACTIVE_PADDING_MAIN": true, "ACTIVE_LIST_TO_SELECT": true, "ACTIVE_VALIDATOR": true, "ACTIVE_SELECT": true, "ACTIVE_HEADER_POSITION": 1, "DISPLAY_FOOTER": 600, "DISPLAY_BACKTOTOP": 100, "CHANGE_GRID": 991, "CHANGE_GRID_SM": 767 };

function backToTop() {
	if ($('#back-to-top').length) {
		var backToTop = function backToTop() {
			var scrollTop = $(window).scrollTop();
			if (scrollTop > gravel_APP.DISPLAY_BACKTOTOP) {
				$('#back-to-top').addClass('show');
			} else {
				$('#back-to-top').removeClass('show');
			}
		};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('#back-to-top').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}
}

$(document).ready(function () {
	if (gravel_APP.ACTIVE_BACKTOTOP) {
		backToTop();
	}
});
function gravelResponsive() {
	// Set BG Resposive
	$('[bg-img]').each(function () {
		var bgimg = $(this).attr('bg-img');
		var pos = $(this).attr('bg-pos');
		var size = $(this).attr('bg-size');
		if (pos && pos.length > 0) {
			$(this).css({
				"background-position": pos
			});
		} else {
			$(this).css({
				"background-position": "center center"
			});
		}
		if (size && size.length > 0) {
			$(this).css({
				"background-size": size
			});
		} else {
			$(this).css({
				"background-size": "cover"
			});
		}
		$(this).css({
			"background-image": "url(" + bgimg + ")"
		});
	});

	$('[bg-img-responsive]').each(function () {
		var bgimg = $(this).attr('bg-img-responsive');
		var bgimgsm = $(this).attr('bg-img-responsive-sm');
		var bgimgxs = $(this).attr('bg-img-responsive-xs');
		if ($(window).width() >= gravel_APP.CHANGE_GRID) {
			$(this).css({
				"background-image": "url(" + bgimg + ")",
				"background-position": "center center",
				"background-size": "cover"
			});
		} else if ($(window).width() < gravel_APP.CHANGE_GRID && $(window).width() > gravel_APP.CHANGE_GRID_SM) {
			$(this).css({
				"background-image": "url(" + bgimgsm + ")",
				"background-position": "center center",
				"background-size": "cover"
			});
		} else {
			$(this).css({
				"background-image": "url(" + bgimgxs + ")",
				"background-position": "center center",
				"background-size": "cover"
			});
		}
	});

	$('[img-src-responsive]').each(function () {
		var bgimg2 = $(this).attr('img-src-responsive');
		var bgimg2sm = $(this).attr('img-src-responsive-sm');
		var bgimg2xs = $(this).attr('img-src-responsive-xs');
		if ($(window).width() >= gravel_APP.CHANGE_GRID) {
			$(this).attr("src", "" + bgimg2 + "");
		} else if ($(window).width() < gravel_APP.CHANGE_GRID && $(window).width() > gravel_APP.CHANGE_GRID_SM) {
			$(this).attr("src", "" + bgimg2sm + "");
		} else {
			$(this).attr("src", "" + bgimg2xs + "");
		}
	});
};

$(function () {
	if (gravel_APP.ACTIVE_RESPONSIVE) {
		gravelResponsive();
	}
});

$(window).resize(function () {
	if (gravel_APP.ACTIVE_RESPONSIVE) {
		gravelResponsive();
	}
});

$(function () {
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover({
		trigger: 'focus'
	});
});
$(document).ready(function () {
	checkDev();
});

$(window).resize(function () {
	checkDev();
});

function checkDev() {
	if ($('#devtools').length) {
		if ($(window).width() < 576) {
			$('.gravel-develop #devtools .header-devtools h3').html('Dev - XS');
		} else if ($(window).width() >= 576 && $(window).width() < 768) {
			$('.gravel-develop #devtools .header-devtools h3').html('Dev - SM');
		} else if ($(window).width() >= 768 && $(window).width() < 992) {
			$('.gravel-develop #devtools .header-devtools h3').html('Dev - MD');
		} else if ($(window).width() >= 992 && $(window).width() < 1200) {
			$('.gravel-develop #devtools .header-devtools h3').html('Dev - LG');
		} else {
			$('.gravel-develop #devtools .header-devtools h3').html('Dev - XL');
		}
	}
}

(function ($) {
	$.fn.drags = function (opt) {

		opt = $.extend({ handle: "", cursor: "move" }, opt);

		if (opt.handle === "") {
			var $el = this;
		} else {
			var $el = this.find(opt.handle);
		}

		return $el.find('.header-devtools').css('cursor', opt.cursor).on("mousedown", function (e) {
			// getSizeDevTo()
			if (opt.handle === "") {
				var $drag = $(this).parent().addClass('draggable');
			} else {
				var $drag = $(this).parent().addClass('active-handle').parent().addClass('draggable');
			}
			var z_idx = $drag.css('z-index'),
			    drg_h = $drag.outerHeight(),
			    drg_w = $drag.outerWidth(),
			    pos_y = $drag.offset().top + drg_h - e.pageY,
			    pos_x = $drag.offset().left + drg_w - e.pageX;
			$drag.css('z-index', 99999).parents().on("mousemove", function (e) {
				getSizeDevTo();
				$('.draggable').offset({
					top: e.pageY + pos_y - drg_h,
					left: e.pageX + pos_x - drg_w
				}).on("mouseup", function () {
					// getSizeDevTo()
					$(this).removeClass('draggable').css('z-index', z_idx);
				});
				$('#devtools .inline').offset({
					top: e.pageY + pos_y - drg_h
				});
				$('#devtools .online').offset({
					left: e.pageX + pos_x - drg_w
				});
			});
			e.preventDefault(); // disable selection
		}).on("mouseup", function () {
			// getSizeDevTo()
			if (opt.handle === "") {
				$(this).removeClass('draggable');
			} else {
				$(this).removeClass('active-handle').parent().removeClass('draggable');
			}
		});
	};
})(jQuery);

if (gravel_APP.DEV_MODE) {

	$('body').append('<div id="devtools"> <div class="online"></div><div class="inline"></div><div class="header-devtools"> <h3>Dev - XL</h3> </div><div class="body-devtools"> <button class="btn btn-block btn-secondary btn-sm" type="button">Toogle Grid</button> </div></div>');

	$('#devtools').drags();
	createDevTo();

	$(document).ready(function () {
		if ($('.gravel-develop #devtools').length) {
			var devtls = $('.gravel-develop #devtools').find('.body-devtools button');
			devtls.click(function () {
				if ($(this).attr('data-click-state') == 1) {
					$(this).attr('data-click-state', 0);
					$('body').toggleClass('active');
					$('body').find('.devtool-gird').remove();
				} else {
					$(this).attr('data-click-state', 1);
					$('body').toggleClass('active');
					if (gravel_APP.DEV_MODE_GIRD_FULL) {
						$('body').append('<div class="devtool-gird"><div class="container-fluid d-flex"><div class="row d-flex align-items-stretch bd-highlight"><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div></div></div></div>');
					} else {
						$('body').append('<div class="devtool-gird"><div class="container d-flex"><div class="row d-flex align-items-stretch bd-highlight"><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div><div class="col d-flex align-items-stretch"><div class="item"></div></div></div></div></div>');
					}
				}
			});
		}
	});
}

function getSizeDevTo() {
	$('#devtools .body-devtools .size .width').html('W: ' + $(window).width() + '');
	$('#devtools .body-devtools .size .height').html('H: ' + $(window).height() + '');
	$('#devtools .body-devtools .size .top').html('T: ' + $('#devtools').offset().top + '');
	$('#devtools .body-devtools .size .left').html('L: ' + $('#devtools').offset().left + '');
}

$(window).resize(function () {
	if ($('#devtools').length) {
		getSizeDevTo();
	}
});

function createDevTo() {
	$('#devtools .body-devtools').append('<div class="size"><div class="width">W: ' + $(window).width() + '</div><div class="height">H: ' + $(window).height() + '</div><div class="top">T: ' + $('#devtools').offset().top + '</div><div class="left">L: ' + $('#devtools').offset().left + '</div></div>');
}

function countUpgravel() {

	$('[data-count]').each(function () {
		var elm = $(this).offset().top;
		var docH = $(window).height();
		var docS = $(window).scrollTop();
		var padingTop = 0;
		if ($(this).attr('data-top') && $(this).attr('data-top').length) {
			padingTop = parseInt($(this).attr('data-top'));
		}
		var result = elm + padingTop - (docH + docS);
		var run = false;

		if (result <= 0 && !run) {
			var $this = $(this),
			    countTo = $this.attr('data-count'),
			    durationTo = parseInt($this.attr('data-duration'));
			$({ countNum: $this.text() }).animate({
				countNum: countTo
			}, {
				duration: durationTo,
				easing: 'linear',
				step: function step() {
					$this.text(Math.floor(this.countNum));
				},
				complete: function complete() {
					$this.text(this.countNum);
					run = true;
				}
			});
		}
	});
}

$(document).ready(function () {
	countUpgravel();
});

$(window).scroll(function () {
	countUpgravel();
});

$(window).resize(function () {
	countUpgravel();
});

function gravelChangeDataHoverClick() {
	$('[data-change]').each(function () {
		var newSrc = $(this).attr('data-new');
		var oldSrc = $(this).attr('data-old');
		var typeChange = $(this).attr('data-change');
		if (typeChange && typeChange.length > 0) {
			if (typeChange === 'src') {
				$(this).hover(function () {
					$(this).attr(typeChange, newSrc);
				}, function () {
					$(this).attr(typeChange, oldSrc);
				});
			} else if (typeChange === 'background' || typeChange === 'background-image') {
				$(this).hover(function () {
					$(this).css(typeChange, "url(" + newSrc + ")");
				}, function () {
					$(this).css(typeChange, "url(" + oldSrc + ")");
				});
			} else if (typeChange === 'class') {
				$(this).hover(function () {
					$(this).removeClass(oldSrc).addClass(newSrc);
				}, function () {
					$(this).removeClass(newSrc).addClass(oldSrc);
				});
			}
		}
	});
};

$(function () {
	gravelChangeDataHoverClick();
});

function setFooter() {
	var bodyHeight = $("body").outerHeight(),
	    headerHeight = $("header").outerHeight(),
	    footerHeight = $("footer").outerHeight(),
	    mainHeight = $("main").outerHeight(),
	    curentHeight = mainHeight + headerHeight + footerHeight,
	    curentfixedHeight = mainHeight + footerHeight,
	    newHeight = bodyHeight - (headerHeight + footerHeight),
	    newfixedHeight = bodyHeight - footerHeight;
	if ($(window).width() > gravel_APP.DISPLAY_FOOTER) {
		if ($(window).width() <= gravel_APP.CHANGE_GRID) {
			$("main").css('min-height', newfixedHeight + 'px');
		} else {
			if (!gravel_APP.ACTIVE_FIXED_HEADER) {
				$("main").css('min-height', newHeight + 'px');
			} else {
				$("main").css('min-height', newfixedHeight + 'px');
			}
		}
	} else {
		$("main").css('min-height', 'initial');
	}
}

$(document).ready(function () {
	if (gravel_APP.ACTIVE_FIXED_FOOTER) {
		setFooter();
	}
});

$(window).resize(function () {
	if (gravel_APP.ACTIVE_FIXED_FOOTER) {
		setFooter();
	}
});
function setHeader(elm) {
	if (elm >= gravel_APP.ACTIVE_HEADER_POSITION) {
		$("header").addClass('active');
	} else {
		$("header").removeClass('active');
	}
}

$(document).ready(function () {
	if (gravel_APP.ACTIVE_FIXED_HEADER) {
		$("header").addClass('fixedheader');
		if ($(window).scrollTop() >= gravel_APP.ACTIVE_HEADER_POSITION) {
			setHeader($(window).scrollTop());
		}
	} else {
		if ($(window).width() <= gravel_APP.CHANGE_GRID) {
			$("header").addClass('fixedheader');
		} else {
			$("header").removeClass('fixedheader');
		}
	}
	if ($("header").hasClass("fixedheader")) {
		$("main").addClass('main-fixedheader');
	}
});

// Fixed Header
$(window).scroll(function () {
	setHeader($(document).scrollTop());
});
// Fixed Header
$(window).resize(function () {
	if (!gravel_APP.ACTIVE_FIXED_HEADER) {
		if ($(window).width() <= gravel_APP.CHANGE_GRID) {
			$("header").addClass('fixedheader');
		} else {
			$("header").removeClass('fixedheader');
		}
	}
});

function setMain() {
	var headerHeight = $("header").outerHeight();
	if ($(window).width() <= gravel_APP.CHANGE_GRID) {
		$("main").css('padding-top', headerHeight + 'px');
	} else {
		if (!gravel_APP.ACTIVE_PADDING_MAIN) {
			$("main").css('padding-top', '0px');
		} else {
			if (!gravel_APP.ACTIVE_FIXED_HEADER) {
				$("main").css('padding-top', 'initial');
			} else {
				$("main").css('padding-top', headerHeight + 'px');
			}
		}
	}
}

$(document).ready(function () {
	setMain();
});

$(window).resize(function () {
	setMain();
});

function setHeaderTranparent(elm) {
	if (elm >= gravel_APP.ACTIVE_HEADER_POSITION) {
		$("header").removeClass('has-tranparent');
	} else {
		$("header").addClass('has-tranparent');
	}
}

$(document).ready(function () {
	if (gravel_APP.HEADER_TRANPARENT) {
		$("header").addClass('has-tranparent');
		if ($(window).scrollTop() >= gravel_APP.ACTIVE_HEADER_POSITION) {
			setHeaderTranparent($(window).scrollTop());
		}
	}
});

// Tranparent Header
$(window).scroll(function () {
	if (gravel_APP.HEADER_TRANPARENT) {
		setHeaderTranparent($(document).scrollTop());
	}
});

function gravelID(e) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	for (var i = 0; i < e; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}return text;
}

function b64EncodeUnicode(str) {
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
		return String.fromCharCode('0x' + p1);
	}));
}

function b64DecodeUnicode(str) {
	return decodeURIComponent(atob(str).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
}

// Copyright 2014-2017 The Bootstrap Authors
// Copyright 2014-2017 Twitter, Inc.
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement('style');
	msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
	document.head.appendChild(msViewportStyle);
}

$(function () {
	var nua = navigator.userAgent;
	var isAndroid = nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1;
	if (isAndroid) {
		$('select.form-control').removeClass('form-control').css('width', '100%');
	}
});
function listToSelect() {
	$('[data-select]').each(function () {
		var list = $(this),
		    select = $(document.createElement('select')).insertBefore($(this).hide());
		select.addClass('custom-select').attr('data-select-show', '');
		$('>li a', this).each(function () {
			var option = $(document.createElement('option')).appendTo(select).val(this.href).html($(this).html());
		});
		list.hide().removeAttr('data-select').attr('data-select-changed', '');
		select.on('change', function () {
			var url = $(this).val();
			if (url) {
				window.location = url;
			}
			return false;
		});
	});
}

function selectChangeToList() {
	if (gravel_APP.ACTIVE_LIST_TO_SELECT) {
		if ($(window).width() > gravel_APP.CHANGE_GRID_SM) {
			$('[data-select-changed]').each(function () {
				$(this).show().removeAttr('data-select-changed').attr('data-select', '');
			});
			$('[data-select-show]').remove();
		} else {
			listToSelect();
		}
	}
}

$(document).ready(function () {
	if (gravel_APP.ACTIVE_LIST_TO_SELECT) {
		if ($(window).width() <= gravel_APP.CHANGE_GRID_SM) {
			listToSelect();
		}
	}
});

$(window).resize(function () {
	if (gravel_APP.ACTIVE_LIST_TO_SELECT) {
		selectChangeToList();
	}
});

console.log('%cgravel', 'font-size:100px;color:#ff451a;text-shadow:0 1px 0 #f73936,0 2px 0 #f73936 ,0 3px 0 #f73936 ,0 4px 0 #f73936 ,0 5px 0 #f73936 ,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);');
console.log('%c gravel ' + '%c - The best Web Solutions Provider', 'border-radius: 2px; padding: 3px; background: #ff451a; color: #FFF', 'color: #ff451a');
console.warn("gravel warning: This is a browser feature intended for developers. If someone told you to copy and paste something here to enable a gravel feature or 'hack' someone's account, it is a scam and will give them access to your gravel account.");
document.onkeyup = function (t) {
	if ((t = t || window.event).altKey && t.ctrlKey && t.shiftKey && 13 == t.which) return $("body"), alert(b64DecodeUnicode("QkFPIE5HVVlFTiAtIDA5Njk2ODk4OTMKRW1haWw6IGJhb25ndXllbnlhbUBnbWFpbC5jb20KV2ViOiBiYW9uZ3V5ZW55YW0uZ2l0aHViLmlv")), !1;
};

$(document).ready(function () {
	if (gravel_APP.ACTIVE_SELECT) {
		$(".select2").select2({
			placeholder: "Chọn một"
		});

		$('.select2').on("select2:select", function (e) {
			var valSelect = $(e.currentTarget).val();
		});
		$('.select2').on("select2:unselect", function (e) {
			var valUnselect = $(e.currentTarget).val();
		});
	}
});

function selectResset(e) {
	$(e).val(null).trigger("change", 0);
}

function gravelStickyComtent() {

	$('[data-fix]').each(function () {
		$(this).css({
			"z-index": '500'
		});
		if ($(this).attr('data-top') && $(this).attr('data-top').length) {
			$(this).css({
				"top": $(this).attr('data-top')
			});
		}
		if ($(this).attr('data-left') && $(this).attr('data-left').length) {
			$(this).css({
				"left": $(this).attr('data-left')
			});
		}
		if ($(this).attr('data-bottom') && $(this).attr('data-bottom').length) {
			$(this).css({
				"bottom": $(this).attr('data-bottom')
			});
		}
		if ($(this).attr('data-right') && $(this).attr('data-right').length) {
			$(this).css({
				"right": $(this).attr('data-right')
			});
		}

		var toFix = 0;
		var typeFix = 'fixed';
		var changeFix = 'static';

		if ($(this).attr('data-fix') && $(this).attr('data-fix').length) {
			toFix = parseInt($(this).attr('data-fix'));
		}
		if ($(this).attr('data-fix-type') && $(this).attr('data-fix-type').length) {
			typeFix = $(this).attr('data-fix-type');
		}
		if ($(this).attr('data-fix-change') && $(this).attr('data-fix-change').length) {
			changeFix = $(this).attr('data-fix-change');
		}

		$(this).css({
			"position": typeFix
		});

		var scrollTop = $(window).scrollTop();
		var elementOffset = $(this).offset().top;
		var currentElementOffset = elementOffset - scrollTop;
		if (currentElementOffset <= toFix) {
			$(this).css({
				"position": changeFix,
				"top": toFix + 'px'
			});
		}
	});
}

$(document).ready(function () {
	gravelStickyComtent();
});

$(window).scroll(function () {
	gravelStickyComtent();
});

$(window).resize(function () {
	gravelStickyComtent();
});

$(document).ready(function () {
	if (gravel_APP.ACTIVE_VALIDATOR) {
		$('[data-toggle="validator"]').validator({
			feedback: {
				success: 'fa fa-check',
				error: 'fa fa-close'
			}
		}).on('submit', function (e) {
			if (e.isDefaultPrevented()) {
				$('[data-toggle="validator"]').find('select').parent('.form-group').addClass('has-danger');
			}
		});
		if ($('[data-toggle="validator"]').find('select').hasClass('has-success')) {
			this.removeClass('has-danger');
		}
	}
});

function CCHeader7() {
	$('.gravel-header-7 .navbar-toggler').on("click", function () {
		$('.gravel-header-7').toggleClass('expand');
	});
	$('.gravel-header-7 .btnsearch .btn').on("click", function () {
		$('.gravel-header-7 .search').toggleClass('active');
		$('.gravel-header-7 .btnsearch').toggleClass('active');
	});
	$('.gravel-header-7 .closebnt').on("click", function () {
		$('.gravel-header-7').toggleClass('expand');
	});
	$('.dropdown.dropdown-hover').hover(function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
	}, function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
	});
};

function getMapto() {
	if ($(window).width() <= gravel_APP.CHANGE_GRID_SM) {
		$('[k-menu-map-to]').each(function () {
			var getTo = $(this).attr('k-menu-map-to');
			$(getTo).html($(this).clone().removeAttr('k-menu-map-to').show());
			$(this).hide();
		});
	} else {
		$('[k-menu-map-to]').each(function () {
			var getTo = $(this).attr('k-menu-map-to');
			$(getTo).html('');
			$(this).show();
		});
	}
}

$(function () {
	CCHeader7();
	getMapto();
});

$(window).resize(function () {
	getMapto();
	$('.gravel-header-7').removeClass('expand');
	$('.gravel-header-7 .search').removeClass('active');
	$('.gravel-header-7 .btnsearch').removeClass('active');
});

$(function () {
	if ($('.gravel-slider-2 .owl-carousel').length) {
		$('.gravel-slider-2 .owl-carousel').owlCarousel({
			items: 1,
			loop: true,
			center: true,
			padding: 0,
			margin: 0,
			navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			nav: false,
			dots: true,
			// autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
			callbacks: true,
			responsive: {
				768: {
					nav: true
				}
			}
		});
	}
});

$(document).ready(function () {});

$(window).resize(function () {});

$(function () {
	if ($('.gravel-carousel-3 .owl-carousel').length) {
		$('.gravel-carousel-3 .owl-carousel').owlCarousel({
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			items: 1,
			loop: true,
			center: false,
			padding: 10,
			margin: 30,
			navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			nav: false,
			dots: false,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: false,
			callbacks: true,
			responsive: {
				480: {
					items: 1
				},
				768: {
					items: 3,
					autoplay: false
				},
				992: {
					items: 3,
					margin: 70,
					autoplay: false
				},
				1140: {
					items: 3,
					margin: 70,
					autoplay: false

				}
			}
		});
	}
});

function __openModalInfo() {
	$('.home-intro .text').readmore({
		speed: 500,
		collapsedHeight: 100,
		moreLink: ''
	});

	// $(".home-intro .intromol").each(function () {
	// 	$(this).click(function () {
	// 		var getTitle = $(this).parents('.info').find('h2').text()
	// 		var getContent = $(this).parents('.info').find('.text').html()
	// 		$('#infoModal .modal-header h5').html(getTitle)
	// 		$('#infoModal .modal-body').html(getContent)
	// 	})
	// })
}

$(document).ready(function () {
	__openModalInfo();
});

$(document).ready(function () {
	$('.gravel-news-4 .news-list #list').click(function (event) {
		event.preventDefault();
		$(this).addClass('active');
		$('.gravel-news-4 .news-list #grid').removeClass('active');
		$('.gravel-news-4 #products').addClass('list-group-wrapper').removeClass('grid-group-wrapper');
	});
	$('.gravel-news-4 .news-list #grid').click(function (event) {
		event.preventDefault();
		$(this).addClass('active');
		$('.gravel-news-4 .news-list #list').removeClass('active');
		$('.gravel-news-4 #products').removeClass('list-group-wrapper').addClass('grid-group-wrapper');
	});
});

$(window).resize(function () {});

$(document).ready(function () {
	gravelGallery1();
	// $(".gravel-gallery-1 #price").slider({
	// 	formatter: function (value) {
	// 		return value;
	// 	}
	// });
	// $(".gravel-gallery-1 #price").on("slide", function (slideEvt) {
	// 	$(".gravel-gallery-1 #geVal").text(slideEvt.value);
	// });
	selectCountriesShop1();
});

function selectCountriesShop1() {
	var datano = $('.gravel-gallery-1 #selectcountries').attr('data-no');
	$('.gravel-gallery-1 #selectcountries').select2({
		"language": {
			"noResults": function noResults() {
				return datano;
			}
		},
		escapeMarkup: function escapeMarkup(markup) {
			return markup;
		}
	});
}

function gravelGallery1() {
	if ($(window).width() <= gravel_APP.CHANGE_GRID_SM) {
		$('.gravel-gallery-1 #filterSearch').addClass('collapse');
	} else {
		$('.gravel-gallery-1 #filterSearch').removeClass('collapse');
	}
}

$(window).resize(function () {
	gravelGallery1();
});

$(document).ready(function () {
	$('.gravel-news-5 .news-list #list').click(function (event) {
		event.preventDefault();
		$(this).addClass('active');
		$('.gravel-news-5 .news-list #grid').removeClass('active');
		$('.gravel-news-5 #products').addClass('list-group-wrapper').removeClass('grid-group-wrapper');
	});
	$('.gravel-news-5 .news-list #grid').click(function (event) {
		event.preventDefault();
		$(this).addClass('active');
		$('.gravel-news-5 .news-list #list').removeClass('active');
		$('.gravel-news-5 #products').removeClass('list-group-wrapper').addClass('grid-group-wrapper');
	});
});

$(window).resize(function () {});

function CCFooter7() {
	$('.gravel-footer-7 .validator input').on('change keypress', function (e) {
		$('.gravel-footer-7 .validator-core input').val($(this).val());
	});
	$('.gravel-footer-7 .validator button').on('click', function (e) {
		if (e.isDefaultPrevented()) {
			alert($(this).find('input').attr('data-error'));
		} else {
			alert('Đăng ký thành công!');
			$('.gravel-footer-7 .validator-core button').trigger('click');
			$('.gravel-footer-7 .validator input').val('');
			return false;
		}
		return false;
	});
};

$(function () {
	CCFooter7();
});

$(window).resize(function () {});

$(function () {
	if ($('.gravel-slider-1 .owl-carousel').length) {
		$('.gravel-slider-1 .owl-carousel').owlCarousel({
			items: 1,
			// loop: true,
			center: true,
			padding: 0,
			margin: 0,
			navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			nav: false,
			// dots: true,
			// autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
			callbacks: true,
			responsive: {
				768: {
					// nav: true
				}
			}
		});
	}
});

$(function () {
	if ($('.gravel-carousel-1 .owl-carousel').length) {
		$('.gravel-carousel-1 .owl-carousel').owlCarousel({
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			items: 2,
			loop: true,
			center: false,
			padding: 10,
			margin: 20,
			navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			nav: true,
			dots: false,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: false,
			callbacks: true,
			responsive: {
				480: {
					items: 2
				},
				768: {
					items: 3
				},
				992: {
					items: 4,
					nav: false,
					dots: true
				},
				1140: {
					items: 6,
					nav: false,
					dots: true
				}
			}
		});
	}
});

$(function () {
	if ($('.gravel-carousel-4 .owl-carousel').length) {
		$('.gravel-carousel-4 .owl-carousel').owlCarousel({
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			items: 1,
			loop: true,
			center: false,
			padding: 10,
			margin: 30,
			navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			nav: false,
			dots: false,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: false,
			callbacks: true,
			responsive: {
				480: {
					items: 1
				},
				768: {
					items: 3,
					autoplay: false
				},
				992: {
					items: 3,
					margin: 70,
					autoplay: false
				},
				1140: {
					items: 3,
					margin: 70,
					autoplay: false

				}
			}
		});
	}
});

$(document).ready(function () {

	$(".tutto-about-video").lightGallery({
		youtubePlayerParams: {
			modestbranding: 1,
			showinfo: 0,
			rel: 0,
			controls: 0
		},
		mode: 'lg-fade',
		addClass: 'tutto-about-video gravel-video-fixed-size',
		counter: false,
		download: false,
		startClass: '',
		enableSwipe: false,
		enableDrag: false,
		speed: 500,
		loadYoutubeThumbnail: true,
		youtubeThumbSize: 'default',
		thumbnail: true,
		animateThumb: false,
		showThumbByDefault: false,
		selector: '.a-video'
	});
});

$(document).ready(function () {
	shopgravel1();
	// $(".gravel-shop-1 #price").slider({
	// 	formatter: function (value) {
	// 		return value;
	// 	}
	// });
	// $(".gravel-shop-1 #price").on("slide", function (slideEvt) {
	// 	$(".gravel-shop-1 #geVal").text(slideEvt.value);
	// });
	selectCountriesShop1();
});

function selectCountriesShop1() {
	var datano = $('.gravel-shop-1 #selectcountries').attr('data-no');
	$('.gravel-shop-1 #selectcountries').select2({
		"language": {
			"noResults": function noResults() {
				return datano;
			}
		},
		escapeMarkup: function escapeMarkup(markup) {
			return markup;
		}
	});
}

function shopgravel1() {
	if ($(window).width() <= gravel_APP.CHANGE_GRID_SM) {
		$('.gravel-shop-1 #filterSearch').addClass('collapse');
	} else {
		$('.gravel-shop-1 #filterSearch').removeClass('collapse');
	}
}

$(window).resize(function () {
	shopgravel1();
});

function ProductDetailShop1() {
	$('.gravel-shop-details-1 .product-details .slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: false,
		autoplay: false,
		asNavFor: '.slider-nav'
	});

	$('.gravel-shop-details-1 .product-details .slider-nav').slick({
		autoplay: false,
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		arrows: true,
		centerMode: false,
		focusOnSelect: true,
		prevArrow: $('.top-arrow'),
		nextArrow: $('.bottom-arrow'),
		vertical: true,
		variableWidth: false,
		verticalSwiping: false,
		infinite: false,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 3,
				vertical: false,
				verticalSwiping: false,
				variableWidth: false
			}
		}]
	}).on('afterChange', function (event, slick, currentSlide, nextSlide) {
		var getcs = slick.$slides.length - 1;
		if (currentSlide == 0) {
			$('.gravel-shop-details-1 .product-details .top-arrow').attr('disabled', 'disabled');
		} else {
			$('.gravel-shop-details-1 .product-details .top-arrow').removeAttr('disabled');
		}
		if (getcs == currentSlide) {
			$('.gravel-shop-details-1 .product-details .bottom-arrow').attr('disabled', 'disabled');
		} else {
			$('.gravel-shop-details-1 .product-details .bottom-arrow').removeAttr('disabled');
		}
	});

	// setTimeout(() => {
	// 	if (!$('.gravel-shop-details-1 .product-details .slider-nav .top-arrow').is(':visible')) {
	// 		$('.gravel-shop-details-1 .product-details .slider-control').css({
	// 			'padding-top': '0px'
	// 		})
	// 	} else {
	// 		$('.gravel-shop-details-1 .product-details .slider-control').css({
	// 			'padding-top': '2.5rem'
	// 		})
	// 	}
	// }, 1000);
};

$(document).ready(function () {

	ProductDetailShop1();

	$('.gravel-shop-details-1 #quantity input').TouchSpin({
		min: 0,
		max: 100,
		buttondown_class: "btn btn-default",
		buttonup_class: "btn btn-default"
	});
});

$(function () {});

$(window).resize(function () {});

$(function () {
	if ($('.gravel-carousel-2 .owl-carousel').length) {
		$('.gravel-carousel-2 .owl-carousel').owlCarousel({
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			items: 1,
			loop: false,
			center: false,
			padding: 10,
			margin: 20,
			navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			nav: true,
			dots: false,
			autoplay: false,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
			callbacks: true,
			responsive: {
				480: {
					items: 2
				},
				768: {
					items: 3,
					nav: true,
					dots: false
				},
				992: {
					items: 4
				}
			}
		});
	}
});

function CCForm1() {
	$('.gravel-form-1 .validator').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {} else {
			$(this)[0].reset();
		}
	});
};

$(function () {
	CCForm1();
});

$(window).resize(function () {});

function changeNewsDetail1() {
	$(".gravel-news-details-1 .news-read").lightGallery({
		thumbnail: true,
		animateThumb: false,
		showThumbByDefault: false,
		selector: '.item-news-read'
	});
}
function createNewsSocial1() {
	var newsFullPath = document.URL;
	var newsFullPathEncode = encodeURIComponent(document.URL);
	$('.fb-share-button').attr('data-href', newsFullPath);
	$('.fb-share-button .fb-xfbml-parse-ignore').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + newsFullPathEncode + '&src=sdkpreparse');
	$('.twitter-share-button').attr('data-url', newsFullPath);
}

function changeIMGtoDiv1() {
	$('.gravel-news-details-1 .othernews .item figure').each(function () {
		var tmp = $(this).find('img').attr('src');
		$(this).append('<div class="thumb"></div>');
		$(this).find('.thumb').css({
			"background-image": "url(" + tmp + ")",
			"background-position": "center center",
			"background-size": "cover"
		});
	});
}

$(document).ready(function () {
	changeNewsDetail1();
	createNewsSocial1();
	changeIMGtoDiv1();
});

$(window).resize(function () {
	changeIMGtoDiv1();
});

$(function () {});

$(function () {});

function CCForm1() {
	$('.gravel-form-1 .validator').validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {} else {
			$(this)[0].reset();
		}
	});
};

$(function () {
	CCForm1();
});

$(window).resize(function () {});

$(document).ready(function () {});

$(window).resize(function () {});

// Theme list
//  - default
//  - white
//  - black
//  - river
//  - cyan
//  - green
//  - metan
//  - yellow
//  - red
// Check at http://en.mygeoposition.com/

$(document).ready(function () {
	if ($('.gravel-map-1 #ccmaps')) {
		$('.gravel-map-1 #ccmaps').kmaps();
	}
});

$(window).resize(function () {});

$(document).ready(function () {

	$(".gravel-shop-2 .boxproducts .item-detail .hidden").lightGallery({
		thumbnail: true
	});

	$('.gravel-shop-2 .boxproducts .item-detail').each(function () {
		$(this).click(function () {
			$(this).find('.hidden a:first-child').trigger('click');
		});
	});

	$(".gravel-gallery-1").lightGallery({
		youtubePlayerParams: {
			modestbranding: 1,
			showinfo: 0,
			rel: 0,
			controls: 0
		},
		mode: 'lg-fade',
		// addClass: 'gravel-shop-1 gravel-video-fixed-size',
		counter: false,
		download: false,
		startClass: '',
		enableSwipe: false,
		enableDrag: false,
		speed: 500,
		loadYoutubeThumbnail: true,
		youtubeThumbSize: 'default',
		thumbnail: true,
		animateThumb: false,
		showThumbByDefault: false,
		selector: '.item'
	});
});
//# sourceMappingURL=app.js.map
