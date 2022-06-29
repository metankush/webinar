( function($) {
	$( document ).ready(function() {
		$('#participants').owlCarousel({
		    loop:true,
		    margin:30,
		    nav:true,
		    nav:false,
		    dots: true,
		    touchDrag  : false,
     		mouseDrag  : false,
     		autoHeight:true,
		    responsive:{
		        0:{
		            items:1
		        }
		    }
		});

		$('#upcoming-webinars').owlCarousel({
		    loop:false,
		    margin:30,
		    nav:true,
		    nav:true,
		    dots: false,
		    touchDrag  : true,
     		mouseDrag  : true,
     		autoWidth:false,
		    responsive:{
		        0:{
		            items:1
		        },
		        768:{
		        	items:2
		        },
		        1199:{
		        	items:3
		        },
		        1499:{
		        	items:4
		        }
		    }
		});

		$('#webinar-recordings').owlCarousel({
		    loop:false,
		    margin:30,
		    nav:true,
		    nav:true,
		    dots: false,
		    touchDrag  : true,
     		mouseDrag  : true,
     		autoWidth:false,
		    responsive:{
		        0:{
		            items:1
		        },
		        768:{
		        	items:2
		        },
		        1199:{
		        	items:3
		        },
		        1499:{
		        	items:4
		        }
		    }
		});

		$('#login-page-slider').owlCarousel({
		    loop:true,
		    margin:10,
		    nav:false,
		    dots:true,
		    responsive:{
		        0:{
		            items:1
		        }
		    }
		});

		$(document).ready(function() {
		    $("#login-password-show").on('click', function(event) {
		        event.preventDefault();
		        if($('.login-password-field input').attr("type") == "text"){
		            $('.login-password-field input').attr('type', 'password');
		            $('.login-password-field i').addClass( "fa-eye-slash" );
		            $('.login-password-field i').removeClass( "fa-eye" );
		        }else if($('.login-password-field input').attr("type") == "password"){
		            $('.login-password-field input').attr('type', 'text');
		            $('.login-password-field i').removeClass( "fa-eye-slash" );
		            $('.login-password-field i').addClass( "fa-eye" );
		        }
		    });
		});

		$("ul.home-sidebar-menu li a").click(function(){
			if ($(".kt-header-menu-wrapper").hasClass("kt-header-menu-wrapper--on")) {
				$("#kt_header_menu_mobile_close_btn").trigger("click");
			}
		});

		$("#show-vide-folder").click(function(){
			$(".add-new-video-box").slideToggle("medium");
		});

		
	});
} )( jQuery );

function openNav() {
	$("#mySidenav").addClass("open");
	$("#kt_header,.kt-content").addClass("toggle-open");
	$('.owl-carousel').trigger('refresh.owl.carousel');
	//document.getElementById("mySidenav").style.width = "350px";
	//document.getElementById("kt_wrapper").style.marginRight = "350px";
  }
  
  function closeNav() {
  	$("#mySidenav").removeClass("open");
  	$(".home-sidebar-menu li a").removeClass("active");
  	$("#kt_header,.kt-content").removeClass("toggle-open");
  	$('.owl-carousel').trigger('refresh.owl.carousel');
	//document.getElementById("mySidenav").style.width = "0";
	//document.getElementById("kt_wrapper").style.marginRight= "0";
  }