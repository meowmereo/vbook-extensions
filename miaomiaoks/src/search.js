// search.js
// Search URL: https://www.miaomiaoks.com/search/?keyword={key}
function execute(key, page) {
  var url = "https://www.miaomiaoks.com/search/?keyword=" + encodeURIComponent(key);
  if (page) {
    url = page;
  }

  var doc = fetch(url).html();
  var items = doc.select("div.flex.items-center.space-x-4");
  var list = [];

  for (var i = 0; i < items.size(); i++) {
    var el = items.get(i);
    var nameEl = el.select("a[href*='/read/']").first();
    var imgEl = el.select("img").first();
    var descEl = el.select("p.text-sm.text-gray-500").last();

    if (nameEl) {
      list.push({
        name: nameEl.text(),
        link: nameEl.attr("href"),
        host: "https://www.miaomiaoks.com",
        cover: imgEl ? "https://www.miaomiaoks.com" + imgEl.attr("src") : "",
        description: descEl ? descEl.text() : ""
      });
    }
  }

  // Tìm nút next page
  var nextEl = doc.select("a[href*='page=']").last();
  var next = null;
  if (nextEl && nextEl.text().indexOf("下一页") >= 0) {
    next = "https://www.miaomiaoks.com" + nextEl.attr("href");
  }

  return Response.success(list, next);
}
