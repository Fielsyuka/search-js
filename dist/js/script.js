"use strict";

$(function () {
  //スマホ・タブレット用　search
  $('.btn-search, .btn-close').on('click', function () {
    $(this).closest('.l-header_sp').toggleClass('search-is-active');
  });
});