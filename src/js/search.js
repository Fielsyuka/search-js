const uri = new URI(window.location).query(true);
const key = uri['search-key'];
const escapeSearchKey = escapeHtml(key);
const urlLists = [
  "index.html",
  "page-2.html",
  "page-3.html",
  "page-4.html",
];
$('<h2> 検索キーワード：「' + escapeSearchKey + '」</h2>').appendTo($('#searchResultKey'));

let resultLists = [];
let resultCount = 0;

$.each(urlLists, (i) => {
  resultLists.push(
    $.ajax({
      type: 'GET',
      url: urlLists[i],
      dataType: 'html',
    })
  )
});
$.when.apply($, resultLists)
  .done(() => {
    $.each(resultLists, (i) => {
      const data = resultLists[i].responseText;
      if ($(data).find("#article").text().indexOf(key) !== -1) {
        const title = $(data).filter('title').text();
        $('<li><a href="' + urlLists[i] + '">' + title + '</a></li>').appendTo($('#searchResult'));
      }

    });
  })
  .then(() => {
    if (resultCount === 0) {
      $('<li>キーワードに該当するページは見つかりませんでした。</li>').appendTo($('#searchResult'));
    }
  });