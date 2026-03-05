// detail.js
// url: https://www.miaomiaoks.com/read/{id}/
function execute(url) {
  var doc = fetch(url).html();

  var name = doc.select("h1.text-2xl").text();
  var cover = doc.select("section.flex img").attr("src");
  var author = doc.select("p.text-sm a[href*='/author/']").text();
  var description = doc.select("#desc").html();

  var statusText = "";
  var paras = doc.select("section.flex p.text-xs");
  for (var i = 0; i < paras.size(); i++) {
    var t = paras.get(i).text();
    if (t.indexOf("状态") >= 0) {
      statusText = t;
      break;
    }
  }
  var ongoing = statusText.indexOf("连载") >= 0;

  if (cover && cover.indexOf("http") < 0) {
    cover = "https://www.miaomiaoks.com" + cover;
  }

  return Response.success({
    name: name,
    cover: cover,
    host: "https://www.miaomiaoks.com",
    author: author,
    description: description,
    ongoing: ongoing
  });
}
