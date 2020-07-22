"use strict";

var uri = new URI(window.location).query(true);
var key = uri['search-key'];
var escapeSearchKey = escapeHtml(key);
var urlLists = ["index.html", "page-2.html", "page-3.html", "page-4.html"];
$('<h2> 検索キーワード：「' + escapeSearchKey + '」</h2>').appendTo($('#searchResultKey'));
var resultLists = [];
var resultCount = 0;
$.each(urlLists, function (i) {
  resultLists.push($.ajax({
    type: 'GET',
    url: urlLists[i],
    dataType: 'html'
  }));
});
$.when.apply($, resultLists).done(function () {
  $.each(resultLists, function (i) {
    var data = resultLists[i].responseText;

    if ($(data).find("#article").text().indexOf(key) !== -1) {
      resultCount += 1;
      var title = $(data).filter('title').text();
      $('<li><a href="' + urlLists[i] + '">' + title + '</a></li>').appendTo($('#searchResult'));
    }
  });
}).then(function () {
  if (resultCount === 0) {
    $('<li>キーワードに該当するページは見つかりませんでした。</li>').appendTo($('#searchResult'));
  }
});