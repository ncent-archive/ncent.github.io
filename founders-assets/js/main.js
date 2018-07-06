(function() {
	'use strict';

	/*----------------------------------------
		Detect Mobile
	----------------------------------------*/
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	/*----------------------------------------
		Back to top
	----------------------------------------*/
	var backToTop = function() {
		$('.js-backtotop').on('click', function(e){
			e.preventDefault();
			$('html, body').animate({
	      scrollTop: $('body').offset().top
	    }, 700, 'easeInOutExpo');
		});
	}

	/*----------------------------------------
		Burger Menu
	----------------------------------------*/	
	var mobileMenuControl = function() {
		

		// click burger menu
		$('.probootstrap-burger-menu').on('click', function(e){

			if ($('body').hasClass('show')) {
				$('.probootstrap-burger-menu').removeClass('active');
				$('body').removeClass('show');
			} else {
				$('.probootstrap-burger-menu').addClass('active');
				$('body').addClass('show');
			}
			
			e.preventDefault();

		});

		if ($(window).width() > 766) {
			console.log('resizing');
			$('body').removeClass('probootstrap-mobile-menu-active');
			$('.probootstrap-burger-menu').removeClass('active');
		} else {
			$('body').addClass('probootstrap-mobile-menu-active');
		}

		$(window).resize(function(){
			console.log($(window).width());
			if ($(window).width() > 766) {
				console.log('resizing');
				$('body').removeClass('probootstrap-mobile-menu-active');
				$('.probootstrap-burger-menu').removeClass('active');
			} else {
				$('body').addClass('probootstrap-mobile-menu-active');
			}
		});

		// Click outside of the Mobile Menu content
		$(document).click(function (e) {
	    var container = $(".probootstrap-nav, .probootstrap-burger-menu");
	    
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('show') ) {
					$('body').removeClass('show');
					$('.probootstrap-burger-menu').removeClass('active');
				}
	    }
		});
		

	};

	/*----------------------------------------
		Search
	----------------------------------------*/
	var searchControl = function() {
		$('.js-probootstrap-search').on('click', function(){
			$('#probootstrap-search').addClass('active');
			setTimeout(function(){
				$('#probootstrap-search').find('#search').focus().select();
			}, 500);
		});
		$('.js-probootstrap-close').on('click', function(){
			$('#probootstrap-search').removeClass('active');
		});
	};

	/*----------------------------------------
		Menu Hover
	----------------------------------------*/
	var menuHover = function() {
		if (!isMobile.any()) {
			$('.probootstrap-navbar .navbar-nav li.dropdown').hover(function() {
			  $(this).find('> .dropdown-menu').stop(true, true).delay(200).fadeIn(500).addClass('animated-fast fadeInUp');
			}, function() {
				$(this).find('> .dropdown-menu').stop(true, true).fadeOut(200).removeClass('animated-fast fadeInUp')
			});
		}
	}
	/*----------------------------------------
		Carousel
	----------------------------------------*/
	var owlCarousel = function(){

		var owl = $('.owl-carousel-carousel');
		owl.owlCarousel({
			items: 3,
			loop: true,
			margin: 20,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
		      "<i class='icon-keyboard_arrow_left owl-direction'></i>",
		      "<i class='icon-keyboard_arrow_right owl-direction'></i>"
	     	],
	     	responsive:{
	        0:{
	            items:1
	        },
	        400:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:3
	        }
	    	}
		});

		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 20,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			autoplay: true,
			navText: [
		      "<i class='icon-keyboard_arrow_left owl-direction'></i>",
		      "<i class='icon-keyboard_arrow_right owl-direction'></i>"
	     	]
		});

		var owl = $('.owl-work');
		owl.owlCarousel({
			stagePadding: 150,
			loop: true,
			margin: 20,
			nav: true,
			dots: false,
			mouseDrag: false,
			autoWidth: true,
			autoHeight: true,
	    autoplay: true,
	    autoplayTimeout:2000,
	    autoplayHoverPause:true,
			navText: [	
				"<i class='icon-chevron-thin-left'></i>",
				"<i class='icon-chevron-thin-right'></i>"
			],
			responsive:{
			  0:{
		      items:1,
		      stagePadding: 10
			  },
			  500:{
			  	items:2,
		      stagePadding: 20
			  },
			  600:{
		      items:2,
		      stagePadding: 40
			  },
			  800: {
			  	items:2,
			  	stagePadding: 100
			  },
			  1100:{
		      items:3
			  },
			  1400:{
		      items:4
			  },
			}
		});
	};

	
	/*----------------------------------------
		Slider
	----------------------------------------*/
	var flexSlider = function() {
	  $('.flexslider').flexslider({
	    animation: "fade",
	    prevText: "",
	    nextText: "",
	    slideshow: true
	  });
	}

	
	/*----------------------------------------
		Content Animation
	----------------------------------------*/
	var contentWayPoint = function() {
		var i = 0;
		$('.probootstrap-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('probootstrap-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .probootstrap-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn probootstrap-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft probootstrap-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight probootstrap-animated');
							} else {
								el.addClass('fadeInUp probootstrap-animated');
							}
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};

	

	/*----------------------------------------
		Counter Animation
	----------------------------------------*/
	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};
	var counterWayPoint = function() {
		if ($('#probootstrap-counter').length > 0 ) {
			$('#probootstrap-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('probootstrap-animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('probootstrap-animated');
				}
			} , { offset: '90%' } );
		}
	};

	var magnificPopupControl = function() {


		$('.image-popup').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			gallery:{
				enabled:true
			},
			zoom: {
				enabled: true, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				// The "opener" function should return the element from which popup will be zoomed in
				// and to which popup will be scaled down
				// By defailt it looks for an image tag:
				opener: function(openerElement) {
				// openerElement is the element on which popup was initialized, in this case its <a> tag
				// you don't need to add "opener" option if this code matches your needs, it's defailt one.
				return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});

		$('.with-caption').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				titleSrc: function(item) {
					return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
				}
			},
			zoom: {
				enabled: true
			}
		});


		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
    });
	}

	/*----------------------------------------
		Stellar
	----------------------------------------*/
	var stellarInit = function() {
		if( !isMobile.any() ) {
			$(window).stellar();
		}
	};


	var progressBarControl = function() {
		if ( $(".progress-bar-s2").length > 0 ) {
      var $progress_bar = $('.progress-bar-s2');

      $progress_bar.appear();
      $(document.body).on('appear', '.progress-bar-s2', function() {
          var current_item = $(this);
          if (!current_item.hasClass('appeared')) {
              var percent = current_item.data('percent');
              current_item.append('<span>' + percent + '%' + '</span>').css('width', percent + '%').addClass('appeared');
          }
          
      });
    };
	}

	/*----------------------------------------
		Document Ready 
	----------------------------------------*/
	$(document).ready(function(){
		menuHover();
		counterWayPoint();
		contentWayPoint();
		backToTop();
		searchControl();
		magnificPopupControl();
		stellarInit();
		progressBarControl();
		mobileMenuControl();
	});

	$(window).load(function(){
		owlCarousel();
		flexSlider();
	});

	

})();