export default function CustomBootstrapStyle() {
  return (
    <style type="text/css">
      {`
      @import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700|Source+Sans+Pro:400,600,700");
      body {
        line-height: 1.4;
        font-family: "Source Sans Pro", sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      
      p {
        font-family: "Source Sans Pro", sans-serif;
        color: #848484;
        font-size: 16px;
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: "Roboto", sans-serif;
        font-weight: 600;
      }
      
      /*=== MEDIA QUERY ===*/
      body {
        font-size: 15px;
        color: #777777;
        line-height: 1.8em;
        font-weight: 400;
        background: #ffffff;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center top;
        -webkit-font-smoothing: antialiased;
        font-family: "Roboto", sans-serif;
      }
      
      .page-wrapper {
        overflow: hidden;
      }
      
      a {
        text-decoration: none;
        cursor: pointer;
      }
      a:hover, a:focus, a:visited {
        text-decoration: none;
        outline: none;
      }
      
      h1, h2, h3, h4, h5, h6 {
        margin: 0px;
      }
      
      input, button, select, textarea {
        font-family: "Roboto", sans-serif;
      }
      
      p {
        position: relative;
        line-height: 1.8em;
      }
      
      .section-title h3 {
        font-size: 40px;
        line-height: 50px;
        color: #222222;
        font-weight: 700;
        font-family: "Source Sans Pro", sans-serif;
      }
      .section-title span {
        color: #222222;
        font-weight: 400;
      }
      .section-title p {
        font-size: 15px;
        line-height: 25px;
        font-weight: 400;
        color: #777777;
        font-family: "Roboto", sans-serif;
      }
      
      .strike-through {
        text-decoration: line-through;
      }
      
      .auto-container {
        position: static;
        max-width: 1200px;
        padding: 0px 15px;
        margin: 0 auto;
      }
      
      .small-container {
        max-width: 680px;
        margin: 0 auto;
      }
      
      .page-wrapper {
        position: relative;
        margin: 0 auto;
        width: 100%;
        min-width: 300px;
      }
      
      li {
        list-style: none;
        padding: 0px;
        margin: 0px;
      }
      
      .anim-3, .anim-3-all * {
        transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        -webkit-transition: all 0.3s ease;
        -ms-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
      }
      
      .anim-5, .anim-5-all * {
        transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -webkit-transition: all 0.5s ease;
        -ms-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
      }
      
      .anim-7, .anim-7-all * {
        transition: all 0.7s ease;
        -moz-transition: all 0.7s ease;
        -webkit-transition: all 0.7s ease;
        -ms-transition: all 0.7s ease;
        -o-transition: all 0.7s ease;
      }
      
      .btn-style-one {
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        line-height: 27px;
        padding: 8px 36px;
        background: #48bdc5;
        border: 1px solid #48bdc5;
        display: inline-block;
        text-transform: uppercase;
        font-family: "Source Sans Pro", sans-serif;
        transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -webkit-transition: all 0.5s ease;
        -ms-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
      }
      .btn-style-one:hover {
        color: #48bdc5;
        border: 1px solid #48bdc5;
        background: #ffffff;
        transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -webkit-transition: all 0.5s ease;
        -ms-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
      }
      
      .btn-style-two {
        font-size: 14px;
        font-weight: 600;
        color: #222222;
        line-height: 27px;
        padding: 8px 36px;
        background: #f4f4f4;
        border: 1px solid #ececec;
        display: inline-block;
        text-transform: uppercase;
        font-family: "Source Sans Pro", sans-serif;
        transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -webkit-transition: all 0.5s ease;
        -ms-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
      }
      .btn-style-two:hover {
        color: #ffffff;
        border: 1px solid #48bdc5;
        background: #48bdc5;
        transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -webkit-transition: all 0.5s ease;
        -ms-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
      }
      
      .section {
        padding: 100px 0;
      }
      
      .pb-0 {
        padding-bottom: 0 !important;
      }
      
      .pt-0 {
        padding-top: 0 !important;
      }
      
      .p-0 {
        padding: 0 !important;
      }
      
      .bg-gray {
        background: #fafafa;
      }
      
      .logo {
        display: inline-block;
      }
      
      .single-page-header {
        background-image: url("../images/about/about-header.jpg");
        background-size: cover;
        padding: 140px 0 70px;
        text-align: center;
        color: #fff;
        position: relative;
      }
      .single-page-header:before {
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        content: "";
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
      }
      
      .header-top {
        background: #ffffff;
        border-bottom: 1px solid #ececec;
      }
      .header-top .top-left h6 {
        font-size: 15px;
        line-height: 26px;
        color: #777777;
        font-weight: 400;
        padding: 14px 0px;
        font-family: "Roboto", sans-serif;
      }
      .header-top .top-left .contact-links li {
        display: inline-block;
        font-size: 15px;
        font-weight: 400;
        line-height: 26px;
        color: #b2b2b7;
        margin-right: 40px;
        font-family: "Open Sans", sans-serif;
      }
      .header-top .top-right .social-links {
        position: relative;
        display: inline-block;
        margin-bottom: 0px;
      }
      @media (max-width: 767px) {
        .header-top .top-right .social-links {
          padding-left: 0;
        }
      }
      .header-top .top-right .social-links li {
        display: inline-block;
      }
      .header-top .top-right .social-links li i {
        width: 40px;
        height: 40px;
        line-height: 40px;
        margin: -1px;
        font-size: 16px;
        color: #777777;
        text-align: center;
        border: 1px solid #ececec;
        transition: 0.3s;
      }
      .header-top .top-right .social-links li:hover i {
        color: #7b64cb;
        border-color: #7b64cb;
      }
      
      .header-uper {
        padding: 40px 0px;
      }
      .header-uper .contact-info {
        float: left;
      }
      @media (max-width: 991px) {
        .header-uper .contact-info {
          text-align: center;
        }
        .header-uper .contact-info .item {
          margin: 0 20px;
        }
      }
      .header-uper .contact-info .item {
        position: relative;
        display: inline-block;
        padding-left: 70px;
        margin-right: 40px;
      }
      .header-uper .contact-info .item .icon-box {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 53px;
        height: 53px;
        border-radius: 50%;
        text-align: center;
        line-height: 57px;
        border: 1px solid #5ec5cc;
      }
      .header-uper .contact-info .item .icon-box i:before {
        color: #5ec5cc;
        font-size: 22px;
      }
      .header-uper .contact-info .item strong {
        font-size: 16px;
        line-height: 26px;
        font-weight: 600;
        color: #222222;
        text-transform: capitalize;
        font-family: "Roboto", sans-serif;
      }
      .header-uper .contact-info .item span {
        font-size: 15px;
        line-height: 26px;
        font-weight: 400;
        color: #777777;
        font-family: "Roboto", sans-serif;
      }
      .header-uper .right-side .link-btn {
        margin-left: 20px;
        margin-top: 5px;
      }
      
      .navbar {
        margin-bottom: 0;
        background: #48bdc5;
        border: none;
        border-radius: 0;
      }
      @media (max-width: 991px) {
        .navbar .navbar-nav {
          padding: 15px 0;
        }
      }
      .navbar .navbar-nav li > .nav-link {
        font-family: "Source Sans Pro", sans-serif;
        font-size: 17px;
        color: #fff;
        text-transform: uppercase;
        padding: 13px 18px !important;
        transition: 0.3s;
      }
      @media (max-width: 991px) {
        .navbar .navbar-nav li > .nav-link {
          padding: 6px 18px !important;
          text-align: center;
        }
      }
      .navbar .navbar-nav li > .nav-link:hover {
        color: #fff;
        opacity: 0.7;
      }
      .navbar .navbar-nav li.active > a {
        background: transparent;
        font-weight: 600;
        text-decoration: underline;
      }
      .navbar .navbar-nav li.active > a:hover {
        background: transparent;
      }
      
      .dropdown-toggle::after {
        border: 0;
        margin-left: 6px;
        vertical-align: 1px;
        content: "\f078";
        font-family: "Font Awesome 5 Free";
        font-weight: bold;
        font-size: 11px;
        width: auto;
      }
      
      @media (min-width: 1200px) {
        .navbar .dropdown-menu {
          display: block;
          transition: 0.2s;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 0;
          border: 0;
          background-color: white;
          z-index: 1;
          opacity: 0;
          visibility: hidden;
        }
        .navbar .dropdown-menu .dropdown-item {
          padding-top: 5px;
          padding-bottom: 5px;
        }
      
        .navbar .dropdown:hover > .dropdown-menu {
          opacity: 1;
          visibility: visible;
          margin-top: 8px;
        }
      }
      .dropdown-menu {
        padding: 0 20px 0 5px;
        min-width: auto;
      }
      @media (max-width: 991px) {
        .dropdown-menu {
          padding: 0;
        }
      }
      .dropdown-menu li:first-child {
        margin-top: 10px;
      }
      .dropdown-menu li:last-child {
        margin-bottom: 10px;
      }
      .dropdown-menu .dropdown-item {
        color: #333;
        font-size: 16px;
        transition: 0.3s;
      }
      .dropdown-menu .dropdown-item:focus, .dropdown-menu .dropdown-item:hover, .dropdown-menu .dropdown-item.active, .dropdown-menu .dropdown-item:active {
        background-color: transparent;
        color: #333;
      }
      .dropdown-menu .dropdown-item.active {
        text-decoration: underline;
        font-weight: 500;
      }
      .dropdown-menu .dropdown-item:hover {
        opacity: 0.7;
      }
      
      .dropdown-submenu a.dropdown-toggle {
        color: #333;
      }
      .dropdown-submenu a.dropdown-toggle::after {
        margin-left: 7px;
        vertical-align: 0.255em !important;
        transform: scale(1.3);
      }
      .dropdown-submenu .dropdown-menu {
        transform: initial;
        top: -15px;
      }
      @media (max-width: 991px) {
        .dropdown-submenu .dropdown-menu {
          margin: 0 10px !important;
        }
      }
      .dropdown-submenu.dropright .dropdown-menu {
        left: calc(100% + 10px);
        margin-left: 0;
      }
      .dropdown-submenu.dropleft .dropdown-menu {
        left: auto;
        right: 100%;
        margin-right: 0;
      }
      
      @media (max-width: 991px) {
        .dropdown-item {
          text-align: center;
        }
      }
      
      .navbar-dark .navbar-toggler {
        color: rgba(255, 255, 255, 0.5);
        border-color: #cef4f7;
        border-radius: 0;
        padding-left: 8px;
        padding-right: 8px;
        margin: 6px auto;
      }
      
      button:focus {
        outline: 0;
      }
      
      .accordion-section .accordion-holder {
        margin-top: 60px;
      }
      .accordion-section .accordion-holder .card {
        box-shadow: none;
        border-radius: 0;
        margin-bottom: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      }
      .accordion-section .accordion-holder .card .card-header {
        background: #fff;
        padding: 0;
        border-radius: 0;
      }
      .accordion-section .accordion-holder .card .card-header .card-title {
        margin-bottom: 0;
      }
      .accordion-section .accordion-holder .card .card-header h4 {
        position: relative;
      }
      .accordion-section .accordion-holder .card .card-header h4 a {
        font-weight: bold;
        font-family: "Source Sans Pro", sans-serif;
        font-size: 20px;
        display: block;
        background: #48bdc5;
        color: #fff;
        padding: 20px 30px;
        transition: all 0.3s ease;
      }
      .accordion-section .accordion-holder .card .card-header h4 a:before {
        content: "\f077";
        position: absolute;
        right: 20px;
        font-family: "Font Awesome 5 Free";
        font-weight: bold;
      }
      .accordion-section .accordion-holder .card .card-header h4 a.collapsed {
        background: #fff;
        color: #000;
      }
      .accordion-section .accordion-holder .card .card-header h4 a.collapsed:before {
        content: "\f078";
        position: absolute;
        font-family: "Font Awesome 5 Free";
        font-weight: bold;
      }
      .accordion-section .accordion-holder .card .card-header h4 a.collapsed:hover {
        color: #48bdc5;
      }
      .accordion-section .accordion-holder .card .card-body {
        padding: 20px 30px;
      }
      
      .hero-slider {
        height: 80vh;
      }
      .hero-slider .slider-item {
        height: 80vh;
        display: flex !important;
        justify-content: center;
        align-items: center;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        position: relative;
      }
      .hero-slider .slider-item:focus {
        outline: 0;
      }
      .hero-slider .slider-item:before {
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        content: "";
        top: 0;
        height: 100%;
        width: 100%;
      }
      .hero-slider .content {
        position: relative;
        z-index: 2;
      }
      .hero-slider .content.style h2 {
        font-size: 60px;
      }
      @media (max-width: 767px) {
        .hero-slider .content.style h2 {
          font-size: 30px;
        }
      }
      .hero-slider .content.style .offer-text {
        letter-spacing: 7px;
        font-size: 15px;
        margin-bottom: 5px;
      }
      .hero-slider .content.style .tag-text {
        font-size: 20px;
        font-weight: normal;
      }
      .hero-slider .content.style .btn-main {
        border-radius: 3px;
        padding: 16px 50px;
        font-weight: 700;
      }
      .hero-slider .content h2 {
        font-size: 35px;
        text-transform: capitalize;
        font-weight: 600;
        font-family: "Roboto", sans-serif;
        color: #fff;
      }
      .hero-slider .content p {
        font-size: 26px;
        color: #fff;
      }
      .hero-slider .content .btn-white {
        background: transparent;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #fff;
        border: 1px solid #fff;
        transition: all 0.3s ease;
      }
      .hero-slider .content .btn-white:hover {
        background: #fff;
        color: #000;
      }
      .hero-slider .slick-dots {
        bottom: 20px;
      }
      .hero-slider .slick-dots li {
        margin: 0 3px;
      }
      .hero-slider .slick-dots li button:before {
        font-size: 15px;
      }
      .hero-slider .slick-dots li.slick-active button:before {
        color: #fff;
      }
      .hero-slider .slick-prev {
        left: 20px;
        z-index: 100;
      }
      .hero-slider .slick-prev:before {
        content: "\f053";
        font-family: "Font Awesome 5 Free";
        font-weight: bold;
      }
      .hero-slider .slick-next {
        right: 20px;
        z-index: 100;
      }
      .hero-slider .slick-next:before {
        content: "\f054";
        font-family: "Font Awesome 5 Free";
        font-weight: bold;
      }
      
      .slick-dotted.slick-slider {
        margin-bottom: 0 !important;
      }
      
      .cta {
        padding: 40px 0;
      }
      .cta .cta-block {
        border-radius: 4px;
        overflow: hidden;
      }
      .cta .cta-block .emmergency {
        background: #48bdc5;
      }
      .cta .cta-block .emmergency a {
        color: #fff;
        font-size: 30px;
      }
      .cta .cta-block .emmergency p {
        padding-top: 20px;
      }
      .cta .cta-block .top-doctor {
        background: #5bc4cb;
      }
      .cta .cta-block .top-doctor .btn-main {
        margin-top: 10px;
        color: #fff;
        border: 1px solid #fff;
        padding: 10px 20px;
        transition: all 0.3s ease;
      }
      .cta .cta-block .top-doctor .btn-main:hover {
        background: #fff;
        color: #48bdc5;
      }
      .cta .cta-block .working-time {
        background: #6fcbd1;
      }
      .cta .cta-block .working-time ul {
        margin: 0;
        padding: 0;
      }
      .cta .cta-block .working-time ul li {
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 2px;
        padding: 5px 0;
      }
      .cta .cta-block .working-time ul li span {
        float: right;
      }
      .cta .cta-block .working-time ul li:not(:last-child) {
        border-bottom: 1px solid #fff;
      }
      .cta .cta-block .item {
        padding: 45px 30px;
      }
      .cta .cta-block .item i, .cta .cta-block .item h2, .cta .cta-block .item p {
        transition: all 0.2s ease;
        color: #fff;
      }
      .cta .cta-block .item i {
        font-size: 30px;
        margin-bottom: 20px;
      }
      .cta .cta-block .item h2 {
        font-weight: normal;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 25px;
        margin-bottom: 30px;
      }
      .cta .cta-block .item p {
        font-size: 16px;
        line-height: 25px;
      }
      
      .map {
        position: relative;
      }
      .map #map {
        height: 400px;
        color: white;
      }
      
      .contact .contact-form .form-control {
        margin-bottom: 30px;
      }
      .contact .address-block .media {
        display: flex;
      }
      @media (max-width: 767px) {
        .contact .address-block .media {
          flex-wrap: wrap;
          text-align: center;
        }
        .contact .address-block .media:last-child {
          margin-bottom: 30px;
        }
      }
      .contact .address-block .media i {
        color: #48bdc5;
        font-size: 30px;
        margin-right: 35px;
        width: 40px;
        display: block;
      }
      @media (max-width: 767px) {
        .contact .address-block .media i {
          flex-basis: 100%;
          margin-right: 0;
          margin-bottom: 30px;
        }
      }
      .contact .address-block .media .media-body h3 {
        font-size: 24px;
        margin-bottom: 15px;
      }
      .contact .address-block .media .media-body p {
        line-height: 25px;
      }
      .contact .address-block .media:not(:last-child) {
        margin-bottom: 20px;
      }
      
      .form-control {
        box-shadow: none;
        border-radius: 0;
        padding: 15px 20px;
        font-size: 14px;
      }
      .form-control:focus {
        box-shadow: none;
        border: 1px solid #48bdc5;
      }
      .form-control.main {
        padding: 20px;
      }
      
      .feature-section {
        position: relative;
      }
      .feature-section .image-content .section-title {
        margin-bottom: 20px;
      }
      .feature-section .image-content .section-title h3 {
        position: relative;
        padding-bottom: 15px;
      }
      .feature-section .image-content .section-title p {
        margin-bottom: 40px;
      }
      .feature-section .image-content .item {
        position: relative;
        margin-top: 40px;
        padding: 0 30px;
      }
      @media (max-width: 767px) {
        .feature-section .image-content .item {
          padding: 0;
        }
      }
      .feature-section .image-content .icon-box {
        height: 50px;
        margin-bottom: 20px;
      }
      .feature-section .image-content .item h3 {
        font-size: 20px;
        line-height: 30px;
        font-weight: 400;
        text-transform: uppercase;
        color: #222222;
        font-family: "Roboto", sans-serif;
      }
      .feature-section .image-content .item p {
        font-size: 15px;
        line-height: 28px;
      }
      .feature-section .contact-info .item {
        position: relative;
        display: inline-block;
        margin: -2px;
        padding: 22px 67px 20px 105px;
      }
      .feature-section .contact-info .item:nth-child(1) {
        background: #8383d1;
      }
      .feature-section .contact-info .item:nth-child(2) {
        background: #7491ce;
      }
      .feature-section .contact-info .item:nth-child(3) {
        background: #6fb4d0;
      }
      .feature-section .contact-info .icon-box {
        position: absolute;
        top: 40px;
        left: 45px;
      }
      .feature-section .contact-info i:before {
        font-size: 30px;
        color: #ffffff;
      }
      .feature-section .contact-info h6 {
        font-size: 22px;
        line-height: 30px;
        font-weight: 600;
        color: #ffffff;
        font-family: "Source Sans Pro", sans-serif;
      }
      .feature-section .contact-info p {
        font-size: 15px;
        line-height: 28px;
        font-weight: 600;
        color: #ffffff;
        font-family: "Roboto", sans-serif;
      }
      
      .feature-section.style-two {
        position: relative;
        padding: 0px;
        margin-top: -56px;
        margin-bottom: -50px;
        z-index: 11;
      }
      
      .service-tab-section {
        position: relative;
      }
      .service-tab-section .outer-box {
        position: relative;
        z-index: 1;
      }
      
      .tabs .nav-tabs > li,
      .tabs .nav-pills > li {
        margin-bottom: 10px;
      }
      .tabs .nav-tabs {
        text-align: center;
        border-bottom: 0;
        margin-bottom: 20px;
      }
      .tabs .nav-tabs li:not(:last-child) {
        margin-right: 10px;
      }
      .tabs .nav-tabs li a {
        text-transform: capitalize;
        font-size: 20px;
        padding: 10px 25px;
        font-weight: 600;
        color: #4d4d4d;
        font-family: "Source Sans Pro", sans-serif;
        border: 2px solid #48bdc5;
        border-radius: 0;
        transition: all 0.3s ease;
      }
      .tabs .nav-tabs li a.active, .tabs .nav-tabs li a:hover {
        color: #fff;
        background: #48bdc5;
        border: 2px solid #48bdc5;
      }
      
      .tab-content {
        position: relative;
        float: left;
        width: 100%;
        z-index: 99;
      }
      
      .service-box {
        position: relative;
        width: 100%;
      }
      .service-box img {
        border-radius: 14px;
        width: 100%;
        box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.2);
      }
      .service-box .contents {
        margin-left: 30px;
      }
      @media (max-width: 991px) {
        .service-box .contents {
          margin-left: 0;
          margin-top: 50px;
        }
      }
      .service-box .contents .btn-style-one {
        margin-top: 20px;
      }
      .service-box .section-title h3 {
        position: relative;
        font-size: 32px;
        line-height: 42px;
        font-weight: 700;
        padding-bottom: 20px;
        margin-bottom: 45px;
        color: #000;
        text-transform: uppercase;
      }
      .service-box .section-title h3:before {
        position: absolute;
        left: 0px;
        content: "";
        bottom: 0px;
        background: #333333;
        height: 1px;
        width: 55px;
      }
      .service-box .text {
        position: relative;
        margin-bottom: 15px;
      }
      .service-box .text p {
        font-size: 15px;
        line-height: 26px;
        font-weight: 500;
        padding-top: 5px;
      }
      .service-box .icon-box {
        position: absolute;
        top: 0px;
        left: -5px;
      }
      .service-box .content-list {
        padding-left: 0;
      }
      .service-box .content-list li {
        font-size: 15px;
        line-height: 26px;
        font-weight: 500;
        padding: 4px 0px;
        padding-left: 27px;
        list-style: none;
        position: relative;
      }
      .service-box .content-list li i {
        position: absolute;
        left: 0;
        top: 9px;
      }
      
      .service-section {
        position: relative;
      }
      .service-section .section-title h3 {
        position: relative;
        padding-bottom: 15px;
      }
      .service-section .section-title p {
        font-size: 15px;
        line-height: 26px;
        color: #777777;
        font-weight: 400;
      }
      .service-section .items-container {
        margin-top: 30px;
      }
      .service-section .items-container .slick-prev:before,
      .service-section .items-container .slick-next:before {
        font-size: 25px;
        color: #48bdc5;
      }
      .service-section .items-container .item {
        margin: 10px 15px;
        outline: 0;
      }
      @media screen and (max-width: 525px) {
        .service-section .items-container .item {
          margin: 10px 5px;
        }
      }
      .service-section .inner-box {
        position: relative;
        border-radius: 5px 5px 0px 0px;
        box-shadow: 0 0 20px #f1f1f1;
      }
      .service-section .inner-box .img_holder img {
        width: 100%;
        border-radius: 5px;
      }
      .service-section .inner-box .image-content {
        padding: 38px 30px;
        background: #fff;
      }
      .service-section .inner-box .image-content span {
        font-size: 15px;
        line-height: 26px;
        font-weight: 400;
        color: #777777;
        letter-spacing: 0.5px;
      }
      .service-section .inner-box .image-content h6 {
        font-size: 18px;
        line-height: 28px;
        font-weight: 600;
        color: #222222;
        padding-top: 6px;
        padding-bottom: 8px;
        text-transform: uppercase;
      }
      .service-section .inner-box .image-content p {
        font-size: 15px;
        line-height: 26px;
        font-weight: 400;
        color: #777777;
        margin-bottom: 0;
      }
      
      .service-two .left-side {
        padding: 140px 0px;
      }
      .service-two .left-side .section-title h3 {
        position: relative;
        padding-bottom: 15px;
        margin-bottom: 22px;
      }
      .service-two .left-side .section-title h3:before {
        position: absolute;
        content: "";
        background: #ececec;
        bottom: 0px;
        left: 0px;
        height: 1px;
        width: 240px;
      }
      .service-two .left-side .section-title h3:after {
        position: absolute;
        content: "";
        background: #48bdc5;
        bottom: 0px;
        left: 0px;
        height: 1px;
        width: 50px;
      }
      .service-two .left-side .section-title p {
        font-size: 15px;
        line-height: 26px;
        color: #777777;
        font-weight: 400;
        padding-bottom: 40px;
      }
      .service-two .social-links {
        margin-bottom: 50px;
      }
      .service-two .social-links li {
        position: relative;
        display: inline-block;
        width: 170px;
        margin-right: 40px;
      }
      .service-two .social-links li .icon-box {
        width: 95px;
        height: 95px;
        line-height: 95px;
        border-radius: 50%;
        text-align: center;
        margin-bottom: 20px;
        border: 1px solid #dfdfdf;
      }
      .service-two .social-links li .icon-box i:before {
        font-size: 35px;
        color: #222222;
      }
      .service-two .social-links li .border-shep {
        position: absolute;
        content: "";
        top: 50px;
        right: 0px;
        background: #cdcdcd;
        height: 1px;
        width: 20px;
      }
      .service-two .social-links li h6 {
        font-size: 16px;
        line-height: 28px;
        color: #222222;
        font-weight: 400;
        padding-bottom: 5px;
        letter-spacing: 0.5px;
      }
      .service-two .link-buttons li {
        display: inline-block;
        color: #777777;
        font-size: 18px;
        font-weight: 400;
      }
      .service-two .link-buttons li.link-btn a {
        font-size: 14px;
        line-height: 26px;
        font-weight: 600;
        text-transform: uppercase;
        color: #ffffff;
        height: 45px;
        padding: 0px 35px;
        line-height: 45px;
      }
      .service-two .link-buttons li.link-btn.style-one {
        background: #48bdc5;
        transition: all 500ms ease;
      }
      .service-two .link-buttons li.link-btn.style-one:hover {
        background: #7b64cb;
        transition: all 500ms ease;
      }
      .service-two .link-buttons li.or-background {
        margin: 0px 20px;
      }
      .service-two .link-buttons li.link-btn.style-two {
        background: #7b64cb;
        transition: all 500ms ease;
      }
      .service-two .link-buttons li.link-btn.style-two:hover {
        background: #48bdc5;
        transition: all 500ms ease;
      }
      .service-two .image-box img {
        width: 100%;
        margin-top: 28px;
      }
      
      .service-details {
        padding: 120px 0px;
      }
      .service-details .left-side {
        margin-right: 40px;
      }
      .service-details .left-side .image-holder .image-box {
        margin-bottom: 40px;
      }
      .service-details .left-side .image-holder img {
        width: 100%;
      }
      .service-details .left-side .text-title h6 {
        font-size: 20px;
        line-height: 30px;
        font-weight: 600;
        color: #222222;
        padding: 10px 0px;
        text-transform: uppercase;
      }
      .service-details .left-side .links-btn a {
        font-size: 14px;
        line-height: 26px;
        font-weight: 700;
        color: #222222;
        padding: 11px 32px;
        display: inline-block;
        border-radius: 5px;
        margin-left: 10px;
        border: 1px solid #ececec;
        text-transform: uppercase;
      }
      .service-details .left-side .links-btn a i {
        font-size: 14px;
        margin-right: 10px;
      }
      .service-details .left-side .text p {
        font-size: 15px;
        line-height: 30px;
        font-weight: 400;
        color: #777777;
        padding-top: 30px;
        letter-spacing: 0.3px;
      }
      .service-details .left-side .image-text {
        margin-top: 40px;
        margin-bottom: 10px;
      }
      .service-details .left-side .image-text h6 {
        position: relative;
        font-size: 22px;
        font-weight: 700;
        color: #222222;
        line-height: 30px;
        padding-bottom: 15px;
        margin-bottom: 15px;
      }
      .service-details .left-side .image-text h6:before {
        position: absolute;
        content: "";
        background: #e0e0e0;
        bottom: 0px;
        left: 0;
        height: 1px;
        width: 50px;
      }
      .service-details .left-side .image-text p {
        font-size: 15px;
        line-height: 30px;
        font-weight: 400;
        color: #777777;
        margin-bottom: 0px;
      }
      
      .accordion-box {
        margin-top: 40px;
      }
      .accordion-box .accordion {
        position: relative;
        margin-bottom: 20px;
        box-shadow: 0 0 20px #f1f1f1;
      }
      .accordion-box .accordion .accord-btn {
        position: relative;
        cursor: pointer;
        padding: 20px;
        background: #fafafa;
        transition: all 500ms ease;
      }
      .accordion-box .accordion .accord-btn h6 {
        font-size: 15px;
        font-weight: 400;
        color: #222222;
        line-height: 26px;
        transition: all 500ms ease;
      }
      .accordion-box .accordion .accord-btn::after {
        position: absolute;
        color: #777777;
        content: "\f107";
        font-size: 17px;
        font-weight: 400;
        line-height: 24px;
        top: 20px;
        right: 20px;
        width: 26px;
        text-align: center;
        height: 26px;
        border-radius: 25px;
        font-family: "FontAwesome";
        transition: all 500ms ease 0s;
      }
      .accordion-box .accordion .accord-btn.active {
        background: #f4f4f4;
        transition: all 500ms ease;
      }
      .accordion-box .accordion .accord-btn.active h6 {
        font-weight: 700;
        transition: all 500ms ease;
      }
      .accordion-box .accordion .accord-btn.active:after {
        content: "\f106";
        color: #012f5d;
        transition: all 500ms ease 0s;
      }
      .accordion-box .accordion .accord-content {
        position: relative;
        display: none;
        padding-left: 20px;
        padding-right: 50px;
      }
      .accordion-box .accordion .accord-content.collapsed {
        display: block;
      }
      .accordion-box .accordion .accord-content p {
        font-size: 15px;
        line-height: 26px;
        font-weight: 400;
        color: #777777;
        padding: 20px 0px;
      }
      
      .service-details .right-side {
        margin-left: -30px;
      }
      .service-details .right-side .categori-list {
        margin-top: 25px;
      }
      .service-details .right-side .categori-list li {
        transition: all 500ms ease 0s;
      }
      .service-details .right-side .categori-list li:hover {
        transition: all 500ms ease 0s;
        background: linear-gradient(to right, rgba(122, 102, 203, 0.8) 0%, rgba(72, 189, 197, 0.74) 100%);
      }
      .service-details .right-side .categori-list li a {
        font-size: 17px;
        line-height: 28px;
        font-weight: 400;
        color: #222222;
        display: inline-block;
        padding: 20px 30px;
        width: 100%;
        border: 1px solid #ececec;
      }
      .service-details .right-side .categori-list li i:before {
        margin-top: 8px;
        margin-right: 10px;
        color: #334d5e;
      }
      .service-details .right-side .categori-list li:hover a,
      .service-details .right-side .categori-list li:hover i:before {
        color: #ffffff;
        transition: all 500ms ease 0s;
      }
      .service-details .service-testimonials {
        margin-top: 65px;
        margin-bottom: 60px;
      }
      .service-details .service-testimonials .text-title h6 {
        margin-bottom: 30px;
      }
      .service-details .service-testimonials .item {
        padding: 40px 17px;
        border: 2px solid #e5e5e5;
      }
      .service-details .service-testimonials .text p {
        font-size: 15px;
        font-weight: 400;
        line-height: 26px;
        color: #777777;
        padding-top: 15px;
      }
      .service-details .service-testimonials strong {
        font-size: 14px;
        line-height: 26px;
        color: #222222;
        font-weight: 700;
        text-transform: uppercase;
      }
      .service-details .service-testimonials .image img {
        display: inline-block;
      }
      .service-details .service-testimonials .owl-theme .owl-controls {
        display: none;
      }
      .service-details .contact-links {
        padding: 50px 30px;
        border: 2px solid #e5e5e5;
      }
      .service-details .contact-links .text-title h6 {
        margin-bottom: 30px;
      }
      .service-details .contact-text .item {
        position: relative;
        padding-left: 65px;
        margin-bottom: 20px;
      }
      .service-details .contact-text .item:last-child {
        margin-bottom: 0px;
      }
      .service-details .contact-text .item .icon-box {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: #f2f2f2;
      }
      .service-details .contact-text .item i:before {
        font-size: 20px;
        color: #53c0c8;
      }
      .service-details .contact-text .item p {
        font-size: 15px;
        line-height: 26px;
        font-weight: 400;
        color: #777777;
        margin-bottom: 0px;
      }
      
      .service-overview .content-block h2 {
        font-size: 40px;
        color: #000;
        text-transform: uppercase;
        font-family: "Source Sans Pro", sans-serif;
        font-weight: bold;
        margin-bottom: 40px;
        position: relative;
      }
      .service-overview .content-block h2:before {
        position: absolute;
        width: 50px;
        height: 1px;
        content: "";
        bottom: -10px;
        background: #48bdc5;
      }
      .service-overview .content-block p {
        font-size: 16px;
        margin-bottom: 30px;
      }
      .service-overview .content-block ul {
        padding-left: 0;
        padding-bottom: 20px;
      }
      .service-overview .content-block ul li {
        text-transform: capitalize;
        font-weight: bold;
        font-size: 16px;
      }
      .service-overview .content-block ul li i {
        margin-right: 10px;
      }
      .service-overview .content-block ul li:not(:last-child) {
        margin-bottom: 5px;
      }
      .service-overview .accordion-holder {
        margin-top: 0;
      }
      
      .team-section {
        position: relative;
        background: #ffffff;
        z-index: 1;
      }
      .team-section .section-title h3 {
        position: relative;
        padding-bottom: 30px;
      }
      .team-section .section-title p {
        font-size: 15px;
        line-height: 26px;
        color: #777777;
        font-weight: 400;
        padding-bottom: 30px;
      }
      .team-section .team-member {
        margin-top: 30px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.2);
      }
      .team-section .team-member img {
        width: 100%;
      }
      .team-section .team-member .contents {
        background: #fff;
        padding: 35px 10px;
      }
      .team-section .team-member .contents h4 {
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 20px;
        color: #000;
        position: relative;
      }
      .team-section .team-member .contents h4:before {
        position: absolute;
        content: "";
        width: 30px;
        height: 1px;
        background: #777777;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
      }
      .team-section .team-member .contents .btn-main {
        background: #fff;
        text-transform: uppercase;
        color: #48bdc5;
        padding: 10px 25px;
        border: 1px solid #48bdc5;
        transition: all 0.2s ease-in;
      }
      .team-section .team-member .contents .btn-main:hover {
        background: #48bdc5;
        color: #fff;
      }
      
      .team-members .team-person {
        margin-top: 30px;
      }
      .team-members .team-person img {
        border-radius: 5px;
        width: 100%;
      }
      .team-members .team-person h6 {
        margin-top: 20px;
        font-size: 20px;
        text-transform: uppercase;
        color: #000;
      }
      .team-members .team-person p {
        font-weight: bold;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-size: 14px;
        font-family: "Source Sans Pro", sans-serif;
      }
      
      .testimonial-section {
        position: relative;
        background-size: cover !important;
        padding: 110px 0px;
        background-repeat: no-repeat !important;
      }
      .testimonial-section:before {
        position: absolute;
        top: 0px;
        left: 0px;
        content: "";
        width: 100%;
        height: 100%;
        background: rgba(72, 189, 197, 0.7);
      }
      .testimonial-section .section-title h3 {
        position: relative;
        padding-bottom: 30px;
        color: #ffffff;
      }
      .testimonial-section .section-title h3 span {
        color: #ffffff;
      }
      .testimonial-section .testimonial-carousel .slide-item {
        outline: 0;
      }
      .testimonial-section .testimonial-carousel .slick-dots li button:before {
        font-size: 15px;
        color: #fff;
      }
      .testimonial-section .inner-box {
        position: relative;
        padding: 80px 30px 35px;
        background: #fff;
        margin-top: 50px;
        margin-bottom: 20px;
        margin-left: 15px;
        margin-right: 15px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.2);
      }
      @media screen and (max-width: 525px) {
        .testimonial-section .inner-box {
          margin-left: 5px;
          margin-right: 5px;
        }
      }
      .testimonial-section .inner-box h6 {
        position: relative;
        font-size: 18px;
        line-height: 26px;
        font-weight: 600;
        color: #000;
        padding-bottom: 15px;
        text-transform: uppercase;
        font-weight: normal;
      }
      .testimonial-section .inner-box p {
        font-size: 15px;
        line-height: 24px;
        font-weight: 400;
        color: #1a1a1a;
      }
      .testimonial-section .inner-box .image-box {
        position: absolute;
        top: -45px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 50%;
        border: 5px solid #fff;
      }
      .testimonial-section .inner-box .image-box img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
      
      .blog-section .section-title h3 {
        position: relative;
        font-size: 36px;
      }
      .blog-section .blog-side {
        margin-right: -30px;
      }
      .blog-section .item-holder {
        position: relative;
        margin-top: 60px;
      }
      .blog-section .image-box {
        position: relative;
        display: table-cell;
      }
      .blog-section .content-text {
        position: relative;
        display: table-cell;
        vertical-align: middle;
        padding-left: 30px;
      }
      .blog-section .content-text h6 {
        font-size: 18px;
        font-weight: 700;
        color: #222222;
        padding-bottom: 4px;
        letter-spacing: 0.4px;
        margin-top: -5px;
        text-transform: uppercase;
      }
      .blog-section .content-text span {
        font-size: 13px;
        font-weight: 400;
        color: #777777;
        line-height: 24px;
      }
      .blog-section .content-text p {
        font-size: 15px;
        font-weight: 400;
        color: #777777;
        line-height: 24px;
        padding: 10px 0px 15px 0px;
        letter-spacing: 0.4px;
      }
      
      .contact-area {
        padding-left: 70px;
      }
      .contact-area form {
        margin-top: 60px;
      }
      .contact-area .form-group {
        position: relative;
        margin-bottom: 20px;
      }
      .contact-area input,
      .contact-area textarea {
        position: relative;
        width: 100%;
        height: 50px;
        color: #777777;
        padding: 10px 25px;
        background: #f4f4f4;
        display: block;
        border: 1px solid #ececec;
      }
      .contact-area .form-group select {
        -webkit-appearance: none;
        -ms-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        height: 50px;
        width: 100%;
        padding: 10px 20px;
        border: 1px solid #ececec;
        background: #f4f4f4 url(../images/icons/icon-select.png) right center no-repeat;
        cursor: pointer;
      }
      .contact-area .form-group option {
        font-weight: normal;
        display: block;
        white-space: pre;
        height: 50px;
        padding: 20px;
      }
      .contact-area .form-group option:hover {
        background: #7b64cb;
      }
      .contact-area textarea {
        height: 190px;
        resize: none;
        padding-top: 15px;
      }
      .contact-area button {
        width: 100%;
        height: 50px;
      }
      .contact-area .form-group i {
        position: absolute;
        top: 16px;
        right: 20px;
        font-size: 15px;
      }
      
      .blog-section.style-two .section-title h3 {
        position: relative;
        padding-bottom: 15px;
        margin-bottom: 22px;
      }
      .blog-section.style-two .section-title h3:before {
        position: absolute;
        content: "";
        background: #ececec;
        bottom: 0px;
        left: 50%;
        margin-left: -115px;
        height: 1px;
        width: 230px;
      }
      .blog-section.style-two .section-title h3:after {
        position: absolute;
        content: "";
        background: #48bdc5;
        bottom: 0px;
        left: 50%;
        margin-left: -25px;
        height: 1px;
        width: 50px;
      }
      .blog-section.style-two .section-title p {
        font-size: 15px;
        line-height: 26px;
        color: #777777;
        font-weight: 400;
        padding-bottom: 40px;
      }
      .blog-section.style-two .item-holder {
        margin-top: 0px;
      }
      .blog-section.style-two .content-text {
        padding: 55px 37px;
        border: 1px solid #ececec;
      }
      .blog-section.style-two .owl-theme .owl-controls .owl-nav {
        display: none;
      }
      .blog-section.style-two .owl-theme .owl-controls .owl-dots {
        margin-top: 40px;
      }
      .blog-section.style-two .owl-theme .owl-controls .owl-dots span {
        height: 6px;
        width: 12px;
        background: #e2e2e2;
      }
      .blog-section.style-two .owl-theme .owl-controls .owl-dot.active span {
        height: 6px;
        width: 30px;
        background: #e2e2e2;
      }
      
      .blog-section.style-four .content-text h4 {
        font-weight: 700;
        color: #222222;
        margin-top: -10px;
        margin-bottom: 10px;
      }
      .blog-section.style-four .left-side {
        margin-right: 45px;
      }
      .blog-section.style-four .item-holder {
        margin-top: 50px;
      }
      .blog-section.style-four .item-holder:first-child {
        margin-top: 0px;
      }
      .blog-section.style-four .image-box {
        display: block;
      }
      .blog-section.style-four .image-box img {
        border-radius: 10px;
        width: 100%;
        box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.2);
      }
      .blog-section.style-four .content-text {
        display: block;
        padding-top: 40px;
        padding-left: 10px;
      }
      .blog-section.style-four .right-side {
        margin-left: -15px;
        margin-top: 10px;
      }
      .blog-section.style-four .link-btn a {
        border-radius: 4px;
      }
      
      .right-side .search-box {
        position: relative;
        margin-bottom: 40px;
      }
      .right-side .text-title h6 {
        position: relative;
        font-size: 20px;
        line-height: 26px;
        font-weight: 600;
        color: #222222;
        padding-bottom: 10px;
        margin-bottom: 20px;
        text-transform: capitalize;
        font-family: "Source Sans Pro", sans-serif;
      }
      .right-side .text-title h6:before {
        position: absolute;
        bottom: 0px;
        left: 0px;
        content: "";
        height: 1px;
        width: 40px;
        background: #48bdc5;
      }
      .right-side .search-box input {
        height: 50px;
        width: 100%;
        padding: 10px 20px;
        font-size: 15px;
        line-height: 26px;
        color: #777777;
        font-weight: 400;
        background: #ffffff;
        border: 1px solid #ececec;
      }
      .right-side .search-box button {
        position: absolute;
        top: 12px;
        right: 20px;
        background: #ffffff;
      }
      .right-side .search-box i:before {
        font-size: 20px;
      }
      .right-side .categorise-menu {
        margin-bottom: 30px;
      }
      .right-side .categorise-list {
        padding-left: 0;
      }
      .right-side .categorise-list li {
        border-bottom: 1px solid #e0e0e0;
      }
      .right-side .categorise-list li:last-child {
        border-bottom: none;
      }
      .right-side .categorise-list li a {
        padding: 10px 0px;
        text-transform: capitalize;
        font-size: 15px;
        font-weight: 400;
        color: #000;
        display: block;
        transition: 0.3s;
      }
      .right-side .categorise-list li a:hover {
        color: #48bdc5;
      }
      .right-side .categorise-list li:first-child a {
        padding-top: 5px;
      }
      .right-side .categorise-list li span {
        float: right;
      }
      .right-side .tag-list {
        position: relative;
        margin-right: -6px;
      }
      .right-side .tag-list a {
        border-radius: 4px;
        font-size: 14px;
        line-height: 26px;
        font-weight: 400;
        color: #777777;
        padding: 6px 26px;
        margin-right: 5px;
        margin-bottom: 10px;
        display: inline-block;
        border: 1px solid #48bdc5;
        transition: all 0.5s ease;
      }
      .right-side .tag-list a:hover {
        background: #48bdc5;
        color: #fff;
      }
      
      .blog-section.style-five .content-text .social-link {
        margin-top: 20px;
        margin-bottom: 50px;
      }
      .blog-section.style-five .content-text .social-link li {
        position: relative;
        display: inline-block;
        width: 29px;
        height: 29px;
        line-height: 26px;
        border-radius: 50%;
        margin: 5px;
        border: 2px solid #888888;
      }
      .blog-section.style-five .content-text .social-link li i {
        font-size: 14px;
        color: #969696;
      }
      .blog-section.style-five .comments-area {
        margin-top: 50px;
      }
      .blog-section.style-five .comment {
        position: relative;
        margin-bottom: 40px;
      }
      .blog-section.style-five .comment.reply-comment {
        position: relative;
        padding-left: 130px;
        padding-bottom: 10px;
      }
      @media (max-width: 767px) {
        .blog-section.style-five .comment.reply-comment {
          padding-left: 0;
        }
      }
      .blog-section.style-five .image-holder {
        display: table-cell;
      }
      @media (max-width: 575px) {
        .blog-section.style-five .image-holder {
          display: block;
        }
      }
      .blog-section.style-five .image-holder img {
        border-radius: 50%;
      }
      @media (max-width: 575px) {
        .blog-section.style-five .image-holder img {
          height: 60px;
        }
      }
      .blog-section.style-five .image-text {
        display: table-cell;
        padding-left: 20px;
        vertical-align: middle;
        position: relative;
      }
      @media (max-width: 1200px) {
        .blog-section.style-five .image-text {
          padding-bottom: 25px;
        }
      }
      @media (max-width: 575px) {
        .blog-section.style-five .image-text {
          padding-left: 0;
        }
      }
      .blog-section.style-five .content-text p {
        font-size: 15px;
        line-height: 28px;
        font-weight: 400;
        padding-top: 20px;
      }
      .blog-section.style-five .content-text .text {
        margin-top: 10px;
      }
      .blog-section.style-five .content-text .image-side {
        margin-right: 40px;
      }
      .blog-section.style-five .content-text .image-side img {
        width: 100%;
      }
      .blog-section.style-five .item-title h6 {
        font-size: 18px;
        line-height: 26px;
        font-weight: 700;
        color: #222222;
        padding-bottom: 20px;
        text-transform: capitalize;
      }
      .blog-section.style-five .text-image {
        margin-left: -15px;
      }
      .blog-section.style-five .text-image p {
        font-size: 15px;
        line-height: 28px;
        font-weight: 400;
        padding-top: 0px;
        margin-top: -5px;
      }
      .blog-section.style-five .image-text h6 {
        font-size: 14px;
        line-height: 26px;
        font-weight: 700;
        color: #222222;
        padding-bottom: 20px;
        text-transform: uppercase;
      }
      .blog-section.style-five .image-text h6 span {
        position: relative;
        font-size: 14px;
        line-height: 26px;
        font-weight: 400;
        color: #777777;
        margin-left: 10px;
        padding-left: 10px;
        text-transform: capitalize;
      }
      .blog-section.style-five .image-text h6 span:before {
        position: absolute;
        top: 4px;
        left: 0px;
        content: "";
        height: 15px;
        width: 1px;
        background: #c1c1c1;
      }
      .blog-section.style-five .comment h5 {
        position: absolute;
        font-size: 14px;
        line-height: 26px;
        font-weight: 400;
        right: 0px;
        top: 4px;
        text-transform: capitalize;
      }
      @media (max-width: 1200px) {
        .blog-section.style-five .comment h5 {
          right: auto;
          top: auto;
          left: 20px;
          bottom: 0;
        }
      }
      @media (max-width: 575px) {
        .blog-section.style-five .comment h5 {
          left: 0;
        }
      }
      .blog-section.style-five .comment h5 a,
      .blog-section.style-five .comment h5 i {
        color: #48bdc5;
        margin-right: 10px;
        transition: 0.3s;
      }
      .blog-section.style-five .comment h5 a:hover,
      .blog-section.style-five .comment h5 i:hover {
        color: #222222;
      }
      .blog-section.style-five .comment p {
        font-size: 15px;
        line-height: 26px;
        font-weight: 400;
        color: #777777;
      }
      .blog-section.style-five .form-group {
        margin-bottom: 20px;
      }
      .blog-section.style-five .sec-title h6 {
        position: relative;
        font-size: 20px;
        line-height: 30px;
        font-weight: 700;
        color: #222222;
        padding-bottom: 20px;
        margin-bottom: 40px;
        text-transform: uppercase;
      }
      .blog-section.style-five .sec-title h6:before {
        position: absolute;
        bottom: 0px;
        left: 0px;
        content: "";
        height: 2px;
        width: 35px;
        background: #48bdc5;
      }
      .blog-section.style-five .form-group input {
        height: 50px;
        font-size: 15px;
        font-weight: 400;
        line-height: 26px;
        border-radius: 0px;
        box-shadow: none;
        padding: 10px 20px;
        display: inline-block;
        border: 1px solid #ececec;
      }
      .blog-section.style-five .form-group textarea {
        height: 160px;
        border-radius: 0px;
        box-shadow: none;
        padding: 10px 20px;
        resize: none;
        border: 1px solid #ececec;
      }
      
      .appointment-image-holder img {
        border-radius: 14px;
      }
      
      .sponsors-logos {
        padding: 52px 0px;
        background: #f8f8fa;
      }
      .sponsors-logos .owl-theme .owl-controls {
        display: none;
      }
      .sponsors-logos img {
        padding: 15px 50px;
        width: 100%;
      }
      
      .about-section {
        padding: 100px 0px;
      }
      .about-section .section-title h3 {
        position: relative;
        padding-bottom: 15px;
        margin-bottom: 30px;
      }
      .about-section .section-title h3:before {
        position: absolute;
        content: "";
        background: #ececec;
        bottom: 0px;
        left: 50%;
        margin-left: -120px;
        height: 1px;
        width: 240px;
      }
      .about-section .section-title h3:after {
        position: absolute;
        content: "";
        background: #48bdc5;
        bottom: 0px;
        left: 50%;
        margin-left: -25px;
        height: 1px;
        width: 50px;
      }
      .about-section .section-title p {
        font-size: 15px;
        line-height: 26px;
        color: #777777;
        font-weight: 400;
        padding-bottom: 30px;
      }
      .about-section .item-holder {
        position: relative;
        padding: 55px;
        margin-bottom: 28px;
        z-index: 1;
        cursor: pointer;
        background-size: cover !important;
        background-repeat: no-repeat !important;
        transition: all 1500ms ease;
      }
      .about-section .item-holder:before {
        position: absolute;
        top: 0px;
        left: 0px;
        content: "";
        width: 100%;
        height: 100%;
        background: #fafafa;
      }
      .about-section .item-holder:hover:before {
        display: none;
      }
      .about-section .item-holder:hover:after {
        position: absolute;
        top: 0px;
        left: 0px;
        content: "";
        width: 100%;
        height: 100%;
        z-index: -1;
        transition: all 1500ms ease;
        background: linear-gradient(to right, rgba(122, 102, 203, 0.8) 0%, rgba(72, 189, 197, 0.74) 100%);
      }
      .about-section .item-holder .icon-box {
        position: relative;
        margin-bottom: 20px;
      }
      .about-section .item-holder i:before {
        font-size: 55px;
      }
      .about-section .item-holder:hover i:before {
        color: #ffffff;
      }
      .about-section .item-holder h6 {
        position: relative;
        font-size: 18px;
        font-weight: 600;
        line-height: 26px;
        color: #222222;
        padding-bottom: 10px;
        margin-bottom: 10px;
        text-transform: uppercase;
      }
      .about-section .item-holder:hover h6 {
        color: #ffffff;
      }
      .about-section .item-holder h6:before {
        position: absolute;
        bottom: 0px;
        left: 50%;
        content: "";
        margin-left: -25px;
        background: #d1d1d1;
        height: 1px;
        width: 55px;
      }
      .about-section .item-holder:hover h6:before {
        background: #ffffff;
      }
      .about-section .item-holder p {
        font-size: 15px;
        line-height: 26px;
        font-weight: 400;
        color: #777777;
        margin-bottom: 0px;
      }
      .about-section .item-holder:hover p {
        color: #ffffff;
      }
      
      .story {
        padding: 100px 0;
      }
      .story img {
        border-radius: 14px;
        width: 100%;
        box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.2);
      }
      @media (max-width: 991px) {
        .story .story-content {
          margin-top: 50px;
        }
      }
      .story .story-content h2 {
        text-transform: uppercase;
        color: #000;
        font-family: "Source Sans Pro", sans-serif;
        font-weight: bold;
        margin-bottom: 30px;
        font-size: 40px;
        text-transform: capitalize;
      }
      .story .story-content .tagline {
        color: #48bdc5;
        font-size: 20px;
        font-weight: normal;
        font-style: italic;
        font-family: "Source Sans Pro", sans-serif;
        margin-bottom: 20px;
        line-height: 1.5;
      }
      .story .story-content p {
        font-size: 16px;
      }
      .story .story-content h6 {
        margin-top: 30px;
        color: #333333;
        font-size: 20px;
        margin-bottom: 10px;
        font-family: "Source Sans Pro", sans-serif;
        font-weight: bold;
      }
      
      .promo-video {
        position: relative;
        padding: 150px 0;
        background: url("../images/background/promo-video.jpg");
        background-size: cover;
        background-position: center center;
      }
      .promo-video:before {
        position: absolute;
        top: 0;
        content: "";
        height: 100%;
        width: 100%;
        background: rgba(12, 120, 163, 0.8);
      }
      .promo-video .block {
        position: relative;
        z-index: 10;
      }
      .promo-video h6,
      .promo-video h1,
      .promo-video i {
        color: #fff;
      }
      .promo-video h6 {
        font-size: 16px;
        text-transform: uppercase;
        font-family: "Source Sans Pro", sans-serif;
        letter-spacing: 2px;
      }
      .promo-video h1 {
        font-size: 60px;
        text-transform: uppercase;
        font-family: "Source Sans Pro", sans-serif;
        font-weight: bold;
        margin-bottom: 30px;
      }
      .promo-video a {
        display: block;
        height: 80px;
        width: 80px;
        margin: 0 auto;
        border: 5px solid #fff;
        transition: all 0.3s ease;
        border-radius: 100%;
      }
      .promo-video a i {
        line-height: 70px;
        font-size: 20px;
      }
      .promo-video a:hover {
        transform: scale(1.1);
      }
      
      .gallery {
        padding: 100px 0;
      }
      .gallery .gallery-item {
        margin-top: 30px;
        border-radius: 6px;
        overflow: hidden;
        position: relative;
        box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.2);
      }
      .gallery .gallery-item img {
        width: 100%;
      }
      .gallery .gallery-item:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5));
        top: 0;
        opacity: 0;
        transition: all 0.3s ease;
      }
      .gallery .gallery-item a {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      .gallery .gallery-item h3 {
        position: absolute;
        z-index: 5;
        bottom: 85px;
        color: #fff;
        font-weight: bold;
        opacity: 0;
        transition: all 0.3s ease;
        padding: 30px;
        font-family: "Source Sans Pro", sans-serif;
        transform: translateY(20px);
      }
      .gallery .gallery-item p {
        position: absolute;
        z-index: 5;
        bottom: 20px;
        color: #fff;
        font-weight: normal;
        opacity: 0;
        transition: all 0.3s ease;
        padding: 30px;
        font-size: 14px;
        line-height: 20px;
        transform: translateY(20px);
        transition-delay: 0.1s;
      }
      .gallery .gallery-item:hover:before {
        opacity: 1;
      }
      .gallery .gallery-item:hover h3,
      .gallery .gallery-item:hover p {
        opacity: 1;
        transform: translateY(0);
      }
      
      .video-gallery {
        padding: 100px 0;
      }
      .video-gallery .video-gallery-item {
        margin-top: 50px;
      }
      .video-gallery .video-gallery-item .image-holder {
        position: relative;
        border-radius: 3px;
        overflow: hidden;
        box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.2);
      }
      .video-gallery .video-gallery-item .image-holder img {
        width: 100%;
      }
      .video-gallery .video-gallery-item .image-holder:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(19, 38, 70, 0.7);
        top: 0;
      }
      .video-gallery .video-gallery-item .image-holder a {
        position: absolute;
        display: block;
        width: 80px;
        height: 80px;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        text-align: center;
        z-index: 5;
        border: 5px solid #fff;
        border-radius: 50%;
        transition: all 0.3s ease-in-out;
      }
      .video-gallery .video-gallery-item .image-holder a i {
        font-size: 25px;
        line-height: 70px;
        color: #fff;
      }
      @media (max-width: 991px) {
        .video-gallery .video-gallery-item .image-holder a {
          width: 50px;
          height: 50px;
          border: 2px solid #fff;
        }
        .video-gallery .video-gallery-item .image-holder a i {
          font-size: 16px;
          line-height: 48px;
        }
      }
      .video-gallery .video-gallery-item h3 {
        text-align: center;
        color: #48bdc5;
        margin-top: 15px;
        text-transform: capitalize;
        font-family: "Source Sans Pro", sans-serif;
        font-size: 20px;
      }
      
      .work-skill {
        position: relative;
        z-index: 1;
        background-size: cover !important;
        background-repeat: no-repeat !important;
      }
      .work-skill:before {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        content: "";
        z-index: -1;
        background: linear-gradient(to right, rgba(122, 102, 203, 0.8) 0%, rgba(72, 189, 197, 0.74) 100%);
      }
      .work-skill .pie-value {
        display: block;
        position: absolute;
        font-size: 24px;
        height: 40px;
        top: 50%;
        margin-top: -26px;
        margin-left: -25px;
        left: 50%;
        color: #ffffff;
        font-weight: 600;
        line-height: 40px;
      }
      .work-skill .knob {
        position: relative;
        text-align: center;
        width: 270px;
      }
      
      .work-wkill .knob {
        position: relative;
      }
      
      .work-skill .knob:before {
        position: absolute;
        top: 9px;
        left: 59px;
        right: 59px;
        bottom: 18px;
        content: "";
        border: 24px solid #ffffff;
        border-radius: 50%;
      }
      .work-skill .skills {
        padding: 105px 0px;
      }
      .work-skill .skills h6 {
        color: #ffffff;
        font-size: 20px;
        font-weight: 700;
        padding-top: 25px;
        text-transform: capitalize;
      }
      
      .page-title {
        position: relative;
        padding: 80px 0;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .page-title:before {
        content: "";
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(19, 38, 70, 0.6);
      }
      .page-title .title-text h1 {
        position: relative;
        font-size: 40px;
        color: #ffffff;
        line-height: 50px;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 10px;
        letter-spacing: 1px;
        font-family: "Source Sans Pro", sans-serif;
      }
      .page-title .title-text .title-menu {
        padding-left: 0;
        margin-bottom: 0;
      }
      .page-title .title-text .title-menu li {
        position: relative;
        color: #48bdc5;
        font-size: 17px;
        display: inline-block;
        line-height: 30px;
        text-transform: capitalize;
      }
      .page-title .title-text .title-menu li a {
        margin-right: 8px;
        color: #ffffff;
        font-weight: 500;
        transition: all 500ms ease;
      }
      .page-title .title-text .title-menu li a:hover {
        color: #48bdc5;
        transition: all 500ms ease;
      }
      
      .styled-pagination {
        padding-top: 50px;
      }
      .styled-pagination ul {
        padding-left: 0;
      }
      .styled-pagination ul li {
        position: relative;
        display: inline-block;
        margin-right: 5px;
      }
      .styled-pagination ul li a {
        position: relative;
        display: block;
        line-height: 50px;
        font-size: 16px;
        width: 50px;
        height: 50px;
        color: #777777;
        font-weight: 500;
        text-align: center;
        background: #f4f4f4;
        border-radius: 4px;
        transition: all 500ms ease;
      }
      .styled-pagination ul li a.prev, .styled-pagination ul li a.next {
        font-size: 18px;
      }
      .styled-pagination ul li a:hover, .styled-pagination ul li a.active {
        color: #ffffff;
        background: #48bdc5;
        transition: all 500ms ease;
      }
      
      .footer-main {
        position: relative;
        background-size: cover;
        z-index: 1;
        background: #132646;
      }
      .footer-main .footer-top {
        padding-top: 85px;
        padding-bottom: 60px;
      }
      .footer-main .footer-top .footer-logo {
        padding-bottom: 20px;
      }
      .footer-main .footer-top p {
        font-size: 15px;
        line-height: 26px;
        font-weight: 400;
        color: #ababab;
      }
      .footer-main .footer-top h2 {
        font-size: 18px;
        line-height: 26px;
        font-weight: 400;
        color: #ffffff;
        padding-bottom: 35px;
        text-transform: uppercase;
      }
      .footer-main .footer-top .location-link {
        padding-top: 10px;
        padding-left: 0;
      }
      .footer-main .footer-top .location-link .item {
        position: relative;
        padding-left: 30px;
        margin-bottom: 15px;
      }
      .footer-main .footer-top .location-link .item i {
        position: absolute;
        top: 3px;
        left: 0px;
      }
      .footer-main .footer-top .location-link .item i:before {
        font-size: 18px;
        color: #ababab;
      }
      .footer-main .footer-top .social-icons {
        margin-top: 20px;
      }
      .footer-main .footer-top .social-icons li a {
        display: block;
        height: 40px;
        width: 40px;
        color: #48bdc5;
        background: #fff;
        text-align: center;
        border-radius: 50%;
      }
      .footer-main .footer-top .social-icons li a i {
        line-height: 40px;
      }
      .footer-main .footer-top .menu-link {
        padding-left: 0;
      }
      .footer-main .footer-top .menu-link li {
        padding-bottom: 15px;
      }
      .footer-main .footer-top .menu-link li a {
        font-size: 15px;
        line-height: 26px;
        font-weight: 400;
        color: #ababab;
        letter-spacing: 0.5px;
        font-family: "Source Sans Pro", sans-serif;
      }
      .footer-main .footer-top .menu-link li i {
        margin-right: 12px;
        font-size: 13px;
      }
      .footer-main .footer-top .media-left img {
        height: 80px;
        width: 80px;
      }
      .footer-main .footer-top .social-links ul {
        padding-left: 0;
      }
      .footer-main .footer-top .social-links ul li {
        position: relative;
        margin-bottom: 30px;
      }
      .footer-main .footer-top .social-links ul li h5 {
        margin-bottom: 5px;
      }
      .footer-main .footer-top .social-links ul li p {
        line-height: 24px;
        margin-bottom: 0;
      }
      .footer-main .footer-top .social-links ul li a {
        color: #ffffff;
      }
      .footer-main .footer-top .social-links ul li i {
        position: absolute;
        left: 0px;
        top: 7px;
        width: 47px;
        height: 47px;
        color: #ffffff;
        line-height: 47px;
        text-align: center;
        background: #48bdc5;
        margin-right: 10px;
      }
      .footer-main .footer-top .social-links span {
        color: #ababab;
        font-size: 15px;
        line-height: 26px;
        font-weight: 400;
      }
      .footer-main .footer-top .gallery-widget {
        position: relative;
        margin-left: 15px;
      }
      .footer-main .footer-top .gallery-widget .image {
        position: relative;
        float: left;
        width: 30%;
        margin: 2.5px;
        overflow: hidden;
      }
      .footer-main .footer-top .gallery-widget .image img {
        position: relative;
        width: 100%;
      }
      .footer-main .footer-top .gallery-widget .image .lightbox-image {
        position: absolute;
        width: 100%;
        height: 100%;
        content: "";
        top: 0px;
        left: 0px;
        display: flex;
        z-index: 99;
        align-items: center;
        justify-content: center;
        background: linear-gradient(to right, rgba(122, 102, 203, 0.8) 0%, rgba(72, 189, 197, 0.74) 100%);
        transition: all 500ms ease;
        transform: scale(0, 0);
      }
      .footer-main .footer-top .gallery-widget .image .lightbox-image i {
        color: #ffffff;
        font-size: 20px;
        font-weight: 400;
      }
      .footer-main .footer-top .gallery-widget .image:hover .lightbox-image {
        transition: all 500ms ease;
        transform: scale(1, 1);
      }
      
      .footer-bottom {
        padding: 24px 0px;
        background: #0d1a2f;
      }
      .footer-bottom .copyright-text {
        float: left;
      }
      .footer-bottom .copyright-text p {
        font-size: 15px;
        font-weight: 400;
        color: #ababab;
        line-height: 26px;
        margin-bottom: 0px;
        letter-spacing: 0.5px;
        text-transform: capitalize;
      }
      .footer-bottom .copyright-text a {
        color: #ababab;
      }
      .footer-bottom .footer-bottom-link {
        float: right;
        margin-bottom: 0px;
        padding-left: 0;
      }
      .footer-bottom .footer-bottom-link li {
        display: inline-block;
        margin-left: 32px;
      }
      @media (max-width: 1200px) {
        .footer-bottom .footer-bottom-link li {
          margin-left: 15px;
          margin-right: 15px;
        }
      }
      .footer-bottom .footer-bottom-link li a {
        font-size: 15px;
        line-height: 26px;
        color: #ababab;
        font-weight: 400;
      }
      
      .scroll-to-top {
        position: fixed;
        bottom: 40px;
        right: 40px;
        color: #ffffff;
        font-size: 24px;
        line-height: 45px;
        width: 50px;
        height: 50px;
        border: 1px solid #7b64cb;
        background: #7b64cb;
        text-align: center;
        z-index: 100;
        cursor: pointer;
        display: none;
        border-radius: 25px;
        transition: all 500ms ease;
      }
      .scroll-to-top:hover {
        background: #ffffff;
        color: #7b64cb;
        border-color: #7b64cb;
        transition: all 500ms ease;
      }
      
      .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 999;
        height: 40px;
        width: 40px;
        background: #48bdc5;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        color: white;
        cursor: pointer;
        transition: 0.3s;
        display: none;
      }
      @media (max-width: 575px) {
        .back-to-top {
          bottom: 15px;
          right: 15px;
        }
      }
      .back-to-top:hover {
        background-color: #333;
      }
      
      /*  Theme HTML Template */
      @media only screen and (min-width: 768px) {
        .main-menu .navigation > li > ul,
      .main-menu .navigation > li > ul > li > ul {
          display: block !important;
          visibility: hidden;
          opacity: 0;
        }
      }
      @media only screen and (min-width: 1920px) {
        .service-tab-section .tab-list-column .tab-list {
          margin-left: 30% !important;
          margin-right: -30% !important;
        }
      }
      @media only screen and (max-width: 1200px) {
        .service-section .filter {
          margin-bottom: 20px !important;
        }
      
        .footer-bottom .copyright-text {
          float: none !important;
          text-align: center;
          margin-bottom: 20px;
        }
      
        .footer-bottom .footer-bottom-link {
          float: none !important;
          text-align: center;
        }
      
        .feature-section.style-two {
          margin-bottom: 0px !important;
        }
      
        .feature-section .contact-info .item {
          display: block !important;
          margin-bottom: 20px !important;
        }
      }
      @media only screen and (max-width: 991px) {
        .main-header .search-box {
          display: none;
        }
      
        .header-uper .logo {
          float: none !important;
          text-align: center;
          margin-bottom: 20px;
          width: 100%;
        }
      
        .main-header.style-two .logo {
          float: none !important;
          text-align: center;
          margin-bottom: 20px;
        }
      
        .main-header.style-two .search-box-btn {
          top: 95px !important;
        }
      
        .main-header.style-two .main-menu {
          float: none !important;
        }
      
        .service-tab-section .tab-content .inner-box {
          padding-left: 0px;
        }
      
        .feature-section .contact-info .item {
          width: 100%;
          margin-right: 30px !important;
          margin-bottom: 20px !important;
        }
      
        .service-tab-section .tab-list-column {
          width: 100% !important;
        }
      
        .service-tab-section .tab-list-column .tab-list,
      .service-tab-section .tab-content .inner-box {
          float: none !important;
          padding-left: 115px !important;
          max-width: 700px !important;
        }
      
        .service-tab-section .tab-content {
          width: 100% !important;
        }
      
        .service-tab-section .tab-content .content-list {
          margin-top: 40px !important;
        }
      
        .fact-counter .column .item {
          margin-bottom: 40px !important;
        }
      
        .contact-area {
          margin-top: 70px !important;
          padding-left: 0px !important;
        }
      
        .contact-area.style-two {
          margin-top: 0 !important;
        }
      
        .footer-main .footer-top .social-links {
          margin-left: 0px !important;
        }
      
        .blog-section.style-four .content-text {
          padding-left: 0px !important;
        }
      
        .blog-section.style-four .right-side {
          margin-left: 0px !important;
          margin-top: 40px !important;
        }
      
        .blog-section.style-four .left-side {
          margin-right: 0px !important;
        }
      
        .blog-section.style-four .image-box img {
          width: 100%;
        }
      
        .blog-section.style-five .text-image {
          margin-left: 0px !important;
          margin-top: 40px !important;
        }
      
        .service-details .right-side {
          margin-left: 0px !important;
        }
      
        .gallery-section .owl-theme .owl-controls .owl-nav .owl-prev {
          left: 90px !important;
        }
      
        .gallery-section .owl-theme .owl-controls .owl-nav .owl-next {
          right: 90px !important;
        }
      
        .feature-section.style-two {
          margin-bottom: 40px !important;
        }
      }
      @media only screen and (max-width: 767px) {
        .main-header .main-menu {
          top: 0px;
          width: 100%;
        }
      
        .main-menu .navbar-header {
          position: relative;
          float: none;
          display: block;
          text-align: right;
          width: 100%;
          padding: 0px;
          right: 0px;
          z-index: 12;
        }
      
        .main-menu .navbar-header .navbar-toggle {
          display: block;
          border: 1px solid #ffffff;
          float: left;
          height: 50px;
          width: 50px;
          padding-left: 12px;
          text-align: center;
          margin: 0px 0px 0px 0px;
          border-radius: 0px;
          background: #7b64cb;
        }
      
        .main-menu .navbar-header .navbar-toggle .icon-bar {
          background: #ffffff;
        }
      
        .main-menu .navbar-collapse > .navigation {
          float: none !important;
          margin: 0px !important;
          width: 100% !important;
          background: #48bdc5;
          border: 1px solid #ffffff;
          border-top: none;
        }
      
        .main-menu .navbar-collapse > .navigation > li {
          margin: 0px !important;
          float: none !important;
          width: 100%;
        }
      
        .main-menu .navigation > li > a,
      .main-menu .navigation > li > ul:before {
          border: none;
        }
      
        .main-menu .navbar-collapse > .navigation > li > a {
          padding: 10px 10px !important;
          border: none !important;
        }
      
        .main-menu .navigation li.dropdown > a:after,
      .main-menu .navigation > li.dropdown > a:before,
      .main-menu .navigation > li > ul > li > a::before,
      .main-menu .navigation > li > ul > li > ul > li > a::before {
          color: #ffffff !important;
          right: 15px;
          font-size: 16px;
          display: none !important;
        }
      
        .main-menu .navbar-collapse > .navigation > li > ul,
      .main-menu .navbar-collapse > .navigation > li > ul > li > ul {
          position: relative;
          border: none;
          float: none;
          visibility: visible;
          opacity: 1;
          display: none;
          margin: 0px;
          left: auto !important;
          right: auto !important;
          top: auto !important;
          width: 100%;
          background: #e4b700;
          border-radius: 0px;
          transition: none !important;
          -webkit-transition: none !important;
          -ms-transition: none !important;
          -o-transition: none !important;
          -moz-transition: none !important;
        }
      
        .main-menu .navbar-collapse > .navigation > li > ul,
      .main-menu .navbar-collapse > .navigation > li > ul > li > ul {
          border-top: 1px solid white !important;
        }
      
        .main-menu .navbar-collapse > .navigation > li,
      .main-menu .navbar-collapse > .navigation > li > ul > li,
      .main-menu .navbar-collapse > .navigation > li > ul > li > ul > li {
          border-top: 1px solid white !important;
          opacity: 1 !important;
          top: 0px !important;
          left: 0px !important;
          visibility: visible !important;
        }
      
        .main-menu .navbar-collapse > .navigation > li:first-child {
          border: none;
        }
      
        .main-menu .navbar-collapse > .navigation > li > a,
      .main-menu .navbar-collapse > .navigation > li > ul > li > a,
      .main-menu .navbar-collapse > .navigation > li > ul > li > ul > li > a {
          padding: 15px 10px !important;
          line-height: 22px;
          color: #ffffff;
          background: #7b64cb;
          text-align: left;
        }
      
        .main-header.style-two .main-menu .navigation > li > a {
          color: #ffffff !important;
        }
      
        .main-menu .navbar-collapse > .navigation > li > a:hover,
      .main-menu .navbar-collapse > .navigation > li > a:active,
      .main-menu .navbar-collapse > .navigation > li > a:focus {
          background: #1cc9ce;
        }
      
        .main-menu .navbar-collapse > .navigation > li:hover > a,
      .main-menu .navbar-collapse > .navigation > li > ul > li:hover > a,
      .main-menu .navbar-collapse > .navigation > li > ul > li > ul > li:hover > a,
      .main-menu .navbar-collapse > .navigation > li.current > a,
      .main-menu .navbar-collapse > .navigation > li.current-menu-item > a {
          background: #48bdc5;
          color: #fff !important;
        }
      
        .main-menu .navbar-collapse > .navigation li.dropdown:after,
      .main-menu .navigation > li > ul:before {
          display: none !important;
        }
      
        .main-menu .navbar-collapse > .navigation li.dropdown .dropdown-btn {
          display: block;
          position: absolute;
          right: 15px;
          top: 12px;
          color: #ffffff;
        }
      
        .main-menu .navbar-collapse > .navigation li.current .dropdown-btn,
      .main-menu .navbar-collapse > .navigation li:hover .dropdown-btn {
          color: #ffffff;
        }
      
        .main-header {
          margin-bottom: 0px !important;
        }
      
        .main-header .logo {
          position: absolute !important;
          top: -5px;
          left: 30%;
        }
      
        .search_option {
          position: absolute !important;
          top: 2px;
          right: 5px;
        }
      
        .footer-main .footer-top .menu-link {
          margin-left: 0px !important;
        }
      
        .main-header.style-two .search-box-btn {
          top: 15px !important;
        }
      
        .footer-main .footer-top .gallery-widget {
          margin-left: 0px !important;
        }
      
        .service-tab-section .tab-list-column .tab-list,
      .service-tab-section .tab-content .inner-box {
          margin-left: 0px !important;
        }
      
        .rev_slider_wrapper .tp-caption img {
          display: none;
        }
      
        .header-uper .right-side {
          float: none !important;
          text-align: center !important;
        }
      
        .header-uper .contact-info {
          float: none !important;
          margin-bottom: 30px !important;
        }
      
        .header-uper .logo {
          margin-bottom: 40px !important;
        }
      
        .header-uper .contact-info .item {
          text-align: left !important;
          margin-left: 40px !important;
          margin-right: 0px !important;
        }
      
        .header-uper .link-btn {
          float: none !important;
          margin-left: 0px !important;
        }
      
        .gallery-section .owl-theme .owl-controls {
          display: none !important;
        }
      
        .work-skill .knob {
          display: inline-block !important;
        }
      
        .work-skill .skills h6 {
          margin-bottom: 40px;
        }
      
        .service-two .social-links li .border-shep {
          display: none !important;
        }
      
        .service-two .social-links li {
          margin-bottom: 20px;
        }
      
        .service-two .link-buttons li {
          margin-bottom: 20px;
        }
      
        .service-two .left-side {
          padding: 50px 0px !important;
        }
      
        .fixed-header {
          background: #000000 !important;
        }
      
        .google-map-area {
          margin-right: 0px !important;
        }
      }
      @media only screen and (max-width: 567px) {
        .blog-section .content-text {
          display: block !important;
          padding-left: 0px !important;
          margin-top: 20px !important;
        }
      
        .header-uper .contact-info {
          margin-bottom: 0px !important;
        }
      
        .header-uper .contact-info .item {
          margin-left: 10px !important;
          margin-right: 10px !important;
          margin-bottom: 30px !important;
        }
      
        .service-tab-section .tab-list-column .tab-list,
      .service-tab-section .tab-content .inner-box {
          padding-left: 20px !important;
        }
      }
      @media only screen and (max-width: 467px) {
        .rev_slider_wrapper .tp-caption {
          display: none !important;
        }
      
        .main-header .logo {
          position: relative !important;
          top: 0px !important;
          left: 0px !important;
        }
      
        .main-header.style-two .search-box-btn {
          top: 95px !important;
        }
      }
      @media only screen and (max-width: 350px) {
        .feature-section .contact-info .item {
          padding-left: 50px !important;
          padding-right: 0px !important;
        }
      
        .feature-section .contact-info .icon-box {
          left: 10px !important;
        }
      }
      `}
      </style>
  );
}
      