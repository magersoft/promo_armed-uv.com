'use strict';

$(window).on('load', function () {
    $('.preload').delay(500).fadeOut(1000);
});


$(window).on("resize", function () {
    if($(window).width() >= 1024) {
        $('.obluchateli-howto__icon-block').addClass('row');
        $('.obluchateli-howto').css('height', '550px');
    }
}).resize();

$(window).on("resize", function () {
   if($(window).width() <= 1023) {
       $('.obluchateli-howto__icon-block').removeClass('row');
       $('.obluchateli-howto').css('height', '1324px');
   }
}).resize();

function mobileDetect() {
	window.isMobile = $(window).width() <= 992;
}

$(document).ready(function($) {

	mobileDetect();
	//mobNav();
	//hideNav();
	//closeModalByHeader();

	if(!isMobile){

	// Засасывание бацил в рециркуляторы
	// =================================
	// noinspection JSAnnotator
        function sucking_bacillus(_num) {
            $('.obluchateli-promo__recirculators-item--'+_num).on('mouseenter', function() {
                $('.obluchateli-promo__recirculators').addClass('obluchateli-promo__recirculators--active');
                $('.obluchateli-promo__recirculators').addClass('obluchateli-promo__recirculators--active-'+_num);
            });
            $('.obluchateli-promo__recirculators-item--'+_num).on('mouseleave', function() {
                $('.obluchateli-promo__recirculators').removeClass('obluchateli-promo__recirculators--active');
                $('.obluchateli-promo__recirculators').removeClass('obluchateli-promo__recirculators--active-'+_num);
            });
	}
	sucking_bacillus(1);
	sucking_bacillus(2);
	sucking_bacillus(3);

	// Наведение на лампу
	// ==================
	$('.obluchateli-lamp__img').on('mouseenter', function() {
		$('.obluchateli-lamp').addClass('obluchateli-lamp--active');
	});
	$('.obluchateli-lamp__img').on('mouseleave', function() {
		$('.obluchateli-lamp').removeClass('obluchateli-lamp--active');
	});


}

	// конец if(!isMobile)

});


// Форма обратной связи
$("#feedback").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Fill in required fields!");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});

function submitForm(){
    // Initiate Variables With Form Content
    var name    = $("#name").val();
    var email   = $("#email").val();
    var message = $("#message").val();

    $.ajax({
        type: "POST",
        url: "form.php",
        data: "&name=" + name + "&email=" + email + "&message=" + message,
        success : function(text){
            if (text == "success"){
                formSuccess();
            } else {
                formError();
                submitMSG(false,text);
            }
        }
    });
}

function formSuccess(){
    $("#feedback")[0].reset();
    $("msgSubmit").removeClass('hidden');
    submitMSG(true, "Thank you! We will answer you soon!")
}
/*
function formError(){
    $("#feedback").removeClass();
}
*/
function submitMSG(valid, msg){
    if(valid){
        $("#msgSubmit").removeClass().addClass('text-success').html('Thank you <br> We will answer you soon!');
    } else {
        $("#msgSubmit").removeClass().addClass('text-danger').html('Fill in required fields!');
    }

}


// Gallery slick
$('.obluchateli-device__slider').slick({
  dots: true,
  infinite: true,
  speed: 300,
  Autoplay: true,
  slidesToShow: 1,
  centerMode: true,
  variableWidth: true,
  responsive: [
  	{
  		breakpoint: 769,
  		settings: {
  			dots: false
  		}
  	}]
});

// Price slick
$('.obluchateli-price__slider').slick({
  dots: false,
  arrows: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
  {
      breakpoint: 1270,
      settings: {
          dots: true,
          arrows: false,
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true
      }
  },
    {
      breakpoint: 1025,
      settings: {
        dots: true,
		slidesToShow: 3,
	  	slidesToScroll: 3,
        centerMode: true,
        variableWidth: true,
        infinite: true
      }
    },
    {
      breakpoint: 769,
      settings: {
      	infinite: true,
      	dots: true,
        slidesToShow: 2,
	  	slidesToScroll: 2,
        centerMode: true,
        variableWidth: true
      }
    },
      {
          breakpoint: 500,
          settings: {
              infinite: true,
              dots: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              variableWidth: true
          }
      },
      {
          breakpoint: 321,
          settings: {
              infinite: true,
              dots: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              variableWidth: true
          }
      }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

 $('.dialog-left__slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.dialog-left__slider-nav'
});
$('.dialog-left__slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.dialog-left__slider-for',
    dots: false,
    focusOnSelect: true
});

$('.popup-image').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    fade: true
});

$(document).ready(function() {

	var scrollTop = $(".first");

	$(window).scroll(function () {
		var topPos = $(this).scrollTop();

		if (topPos > 800) {
			$(scrollTop).removeClass('first');
		} else {
			$(scrollTop).addClass('first');
		}
	});	
});

// Scroll Top button
$(document).ready(function() {

  var scrollTop = $(".scrollTop");

  $(window).scroll(function() {
    var topPos = $(this).scrollTop();

    // if user scrolls down - show scroll to top button
    if (topPos > 500) {
      $(scrollTop).css("opacity", ".5").css("display", "block");

    } else {
      $(scrollTop).css("opacity", "0").css("display", "none");
    }

  }); // scroll END

});

$(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('.first').on('click').addClass('active');

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.header-inner__menu_nav-item a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.header-inner__menu_nav-item a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}
});

$(document).on("scroll",function(){
    if($(document).scrollTop()>100){
        $("header").addClass("small");
    } else{
        $("header").removeClass("small");
    }
});

$('.nav-item').click(function(){
	$('#toggle').attr('checked', false);
});

/*
$('.modalbg:target').click(function () {
    $('body').css('overflow', 'hidden');
});

$('.overlay, .close, .modalbg__button').click(function () {
    $('body').css('overflow', 'auto');
});
*/