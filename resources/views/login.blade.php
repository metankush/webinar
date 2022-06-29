<!DOCTYPE html>
<html lang="en">
<!-- begin::Head -->

<head>
    <!--begin::Base Path (base relative path for assets of this page) -->
    <!--end::Base Path -->
    <meta charset="utf-8" />
    <title>Webinar</title>
    <meta name="description" content="Page with empty content">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!--begin::Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Roboto:300,400,500,600,700">
    <!--end::Fonts -->
    <!--begin::Page Vendors Styles(used by this page) -->
    <!--end::Page Vendors Styles -->
    <!--begin:: Global Mandatory Vendors -->
    <link href="{{asset('assets/vendors/general/perfect-scrollbar/css/perfect-scrollbar.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/general/bootstrap-datepicker/dist/css/bootstrap-datepicker3.cs')}}s" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/general/bootstrap-datetime-picker/css/bootstrap-datetimepicker.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/general/bootstrap-timepicker/css/bootstrap-timepicker.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/general/bootstrap-daterangepicker/daterangepicker.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/general/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/general/bootstrap-select/dist/css/bootstrap-select.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/general/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/general/select2/dist/css/select2.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/general/ion-rangeslider/css/ion.rangeSlider.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/general/owl.carousel/dist/assets/owl.carousel.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/general/owl.carousel/dist/assets/owl.theme.default.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/general/sweetalert2/dist/sweetalert2.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/general/socicon/css/socicon.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/custom/vendors/line-awesome/css/line-awesome.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/custom/vendors/flaticon/flaticon.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/custom/vendors/flaticon2/flaticon.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/general/@fortawesome/fontawesome-free/css/all.min.css')}}" rel="stylesheet" type="text/css" />
    <!--end:: Global Mandatory Vendors -->
    <!--begin:: Global Optional Vendors -->

    <!-- <link href="assets/vendors/general/nouislider/distribute/nouislider.css" rel="stylesheet" type="text/css" /> -->

    <!--begin::Global Theme Styles(used by all pages) -->
    <link href="{{asset('assets/css/style.bundle.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/custom.css')}}" rel="stylesheet" type="text/css" />
    <!--end::Global Theme Styles -->
    <!--begin::Layout Skins(used by all pages) -->
    <!--end::Layout Skins -->
    <link rel="shortcut icon" href="{{asset('assets/media/site-logo.png')}}" />

</head>
<!-- end::Head -->
<!-- begin::Body -->

<body class="dark kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-subheader--fixed kt-subheader--enabled kt-subheader--solid kt-aside--enabled kt-aside--fixed kt-page--loading">
    <!-- begin:: Page -->
    <div class="login-outer vh-100 align-items-center d-flex" style="background-color: #101826;">
        <div class="container-fluid height-100 padding-0">
            <div class="row height-100 align-items-center">
                <div class="col-md-5">
                    <div class="login-form-box">
                        <h1 class="fw-normal mb-3 pb-3 text-white weight-700" style="letter-spacing: 1px;">Login<br> to your account</h1>
                        <form id="sitelogin" name="login-form" action="{{route('login-process')}}" method="POST">
                        <div class="kt-alert kt-alert--outline alert-dismissible" role="alert" id="alert">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>
                        	<span id="alertmsg"></span>
                        </div>
                        @if (session('ERROR'))
                            <div class="alert alert-danger" id="alert">
                                {{ session('ERROR') }}
                            </div>
                            @endif
                            {{ csrf_field() }}
                            <div class="form-outline mb-4">
                                <label class="form-label text-white">Email address</label>
                                <input name="email" type="email" id="form2Example17" class="form-control form-control-lg bg-white">
                            </div>
                            <label class="form-label text-white">Password</label>
                            <div class="form-outline input-group mb-1 login-password-field">
                                <input name="password" type="password" id="form2Example27" class="form-control form-control-lg bg-white">
                                <div class="input-group-append">
                                    <span class="input-group-text" id="login-password-show"><i class="fa fa-eye-slash" aria-hidden="true"></i></span>
                                </div>
                            </div>
                            <a class="small mb-3 text-blue" href="#!">Forgot password?</a>
                            <div class="mt-4 mb-4">
                                <button id="loginbtn" class="btn btn-primary btn-lg btn-block btn-blue" type="submit">Login</button>
                                <!-- <button id="loginbtn"  class="btn btn-brand btn-pill btn-elevate">Login</button> -->
                            </div>
                            <p class="mb-5 pb-lg-2" style="color: #FFFF;">Don't have an account? <a href="{{route('signup-form')}}" class="text-blue">Signup here</a></p>
                        </form>
                    </div>
                </div>
                <div class="col-md-7 height-100">
                    <div class="login-right-banner height-100 align-items-center d-flex" style="color: #78B0ED;background-image: linear-gradient(200deg,rgba(172, 206, 247, 1),rgba(240, 210, 238, 1));border-radius: 1rem 1rem;">
                        <div class="top-text">
                            <h3 class="text-dark">
                                <img alt="Logo" src="assets/media/site-logo.png"> <span class="ml-1"><span class="weight-700">Fill Quick</span> Webinar</span>
                            </h3>
                        </div>
                        <div class="owl-carousel owl-theme" id="login-page-slider">
                            <div class="item">
                                <img src="assets/media/brodcast.jpg" alt="banner" />
                                <h2 class="text-dark text-center mt-5">The <b>Most Powerful</b> webinar Software</h2>
                                <p class="text-dark text-center">webinar Softwaree that puts you in control of your broadcasts.</p>
                            </div>
                            <div class="item">
                                <img src="assets/media/brodcast.jpg" alt="banner" />
                                <h2 class="text-dark text-center mt-5">The <b>Most Powerful</b> webinar Software</h2>
                                <p class="text-dark text-center">webinar Softwaree that puts you in control of your broadcasts.</p>
                            </div>
                            <div class="item">
                                <img src="assets/media/brodcast.jpg" alt="banner" />
                                <h2 class="text-dark text-center mt-5">The <b>Most Powerful</b> webinar Software</h2>
                                <p class="text-dark text-center">webinar Softwaree that puts you in control of your broadcasts.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end:: Page -->

    <!--begin:: Global Mandatory Vendors -->
    <script src="{{asset('assets/vendors/general/jquery/dist/jquery.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/vendors/general/popper.js/dist/umd/popper.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/vendors/general/bootstrap/dist/js/bootstrap.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/vendors/general/js-cookie/src/js.cookie.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/vendors/general/moment/min/moment.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/vendors/general/tooltip.js/dist/umd/tooltip.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/vendors/general/perfect-scrollbar/dist/perfect-scrollbar.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/vendors/general/sticky-js/dist/sticky.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/vendors/general/wnumb/wNumb.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/vendors/general/owl.carousel/dist/owl.carousel.min.js')}}" type="text/javascript"></script>
    <!--end:: Global Mandatory Vendors -->
    <!--begin:: Global Optional Vendors -->

    <!--begin::Global Theme Bundle(used by all pages) -->
    <script src="{{asset('assets/js/scripts.bundle.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/js/custom.js')}}" type="text/javascript"></script>

    <!--end::Global Theme Bundle -->
    <!--begin::Page Vendors(used by this page) -->

    <!--end::Page Vendors -->
    <!--begin::Page Scripts(used by this page) -->

    <!--end::Page Scripts -->
</body>
<!-- end::Body -->
<script type="text/javascript">
    jQuery(document).ready(function() {
        jQuery('#sitelogin').submit(function(e) {
            e.preventDefault();
            var form_id = jQuery(this).attr('id');
            var fd = new FormData(this);
            jQuery.ajax({
                url: jQuery(this).prop('action'),
                method: "POST",
                contentType: false,
                cache: false,
                processData: false,
                data: fd,
                beforeSend: function() {
                    $("#alert").hide();
                    $("#loginbtn").addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);
                },
                success: function(data) {
                    var response = jQuery.parseJSON(data);
                    if (!response.result) {
                        setTimeout(function() {
                            $("#loginbtn").removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                                $("#alert").removeClass();
                                $("#alert").addClass("alert alert-danger");
                                $("#alertmsg").html("");
                                $("#alertmsg").html(response.msg);
                                $("#alert").show();
                                $("html").animate({ scrollTop: 0 }, "slow");
                        }, 2000);
                    } else if (response.result) {
                        setTimeout(function() {
                            $("#loginbtn").removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                                $("#alert").removeClass();
                                $("#alert").addClass("alert alert-success");
                                $("#alertmsg").html("");
                                $("#alertmsg").html(response.msg);
                                $("#alert").show();
                                $("html").animate({ scrollTop: 0 }, "slow");
                            setTimeout(function() {
                                window.location.href = "{{route('main-broadcast')}}";
                            }, 2000);
                        }, 2000);
                    }
                }
            });
        });
    });
</script>

</html>
