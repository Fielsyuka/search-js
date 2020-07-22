"use strict";

// $(function() {
var uri = new URI(window.location).query(true);
var key = uri['search-key'];
var escapeSearchKey = escapeHtml(key);
var urlLists = ["index.html", "page-2.html", "page-3.html", "page-4.html"];
var resultLists = [];
$.each(urlLists, function (i) {
  resultLists.push($.ajax({
    type: 'GET',
    url: urlLists[i],
    dataType: 'html'
  })); // $.ajax({
  //   type: 'GET',
  //   url: urlLists[i],
  //   dataType: 'html',
  // })
  // .done(data => {
  //   if ($(data).find("#article").text().indexOf(key) !== -1) {
  //     let resultData = {
  //       title: $(data).filter('title').text(),
  //       url: urlLists[i]
  //     };
  //     resultLists.push(resultData);
  //   }
  // })
  // .fail(error => alert('error'))
});
$.when.apply($, resultLists).done(function () {
  // if (counter == 0) {
  //     $('<li>キーワードに該当するページは見つかりませんでした。</li>').appendTo($('#searchResult'));
  //   } else {
  $.each(resultLists, function (i) {
    var data = resultLists[i].responseText;

    if ($(data).find("#article").text().indexOf(key) !== -1) {
      var title = $(data).filter('title').text();
      $('<li><a href="' + urlLists[i] + '">' + title + '</a></li>').appendTo($('#searchResult')); // resultLists.push(resultData);
    }
  });
  $('<h2> 検索キーワード：「' + escapeSearchKey + '」</h2>').appendTo($('#searchResultKey')); // }
}); // $(document).ajaxStop(function() {
//   if (counter === 0) {
//     $('<li>キーワードに該当するページは見つかりませんでした。</li>').appendTo($('#searchResult'));
//   } else {
//     $.each(resultLists, function(i) {
//       $('<li><a href="' + resultLists[i].url + '">' + resultLists[i].title + '</a></li>').appendTo($('#searchResult'));
//     });
//   }
// });
// });