// chap.js
// url: https://www.miaomiaoks.com/content/{bookId}/{chapNum}.html
function execute(url) {
  var doc = fetch(url).html();

  // Lấy nội dung từ div#chapter-content
  var contentEl = doc.select("#chapter-content");

  // Xóa các thẻ script và navigation buttons
  contentEl.select("script").remove();
  contentEl.select("div.p-2.rounded-lg").remove();

  var content = contentEl.html();

  return Response.success(content);
}
