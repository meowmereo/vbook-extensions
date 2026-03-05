// detail.js
function execute(url) {
  var doc = fetch(url).html();

  var name = doc.select("h1.text-2xl").text();
  
  // Fix cover selector
  var cover = doc.select("section.flex.items-start img").attr("src");
  
  // Fix author selector  
  var author = doc.select("p.text-sm.text-gray-500 a[href*='/author/']").first().text();
  
  var description = doc.select("#desc").html();

  // Fix ongoing selector
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

  return Response.success({
    name: name,
    cover: cover,
    host: "https://www.miaomiaoks.com",
    author: author,
    description: description,
    ongoing: ongoing
  });
}