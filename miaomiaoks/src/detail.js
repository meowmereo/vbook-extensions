load('config.js');

function execute(url) {
  var doc = fetch(url).html();

  var name = doc.select("h1.text-2xl").text();

  // Fix: dùng img trực tiếp gần h1, không dùng section.flex
  var cover = doc.select("section img").first().attr("src");

  // Fix: author
  var author = doc.select("p.text-sm.text-gray-500 a[href*='/author/']").first().text();

  var description = doc.select("#desc").html();

  var statusText = "";
  var paras = doc.select("p.text-xs.text-gray-500");
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

  // Tránh null nếu không lấy được gì
  if (!name) return null;

  return Response.success({
    name: name,
    cover: cover,
    host: "https://www.miaomiaoks.com",
    author: author,
    description: description,
    ongoing: ongoing
  });
}