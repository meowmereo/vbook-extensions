// toc.js
// url: https://www.miaomiaoks.com/read/{id}/
function execute(url) {
  var doc = fetch(url).html();

  var links = doc.select("section a[href*='/content/']");
  var list = [];

  for (var i = 0; i < links.size(); i++) {
    var el = links.get(i);
    list.push({
      name: el.text(),
      url: el.attr("href"),
      host: "https://www.miaomiaoks.com"
    });
  }

  return Response.success(list);
}
