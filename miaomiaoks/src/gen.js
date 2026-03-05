load('config.js');

function execute(url, page) {
    if (page) url = page;

    var response = fetch(url);
    if (!response.ok) return null;
    var doc = response.html();

    var list = [];

    doc.select("div.flex.items-center.space-x-4").forEach(function(e) {
        var nameEl = e.select("p.text-lg a").first();
        var cover = e.select("img").attr("src");
        var link = e.select("a[href*='/read/']").first().attr("href");
        if (cover && cover.indexOf("http") < 0) cover = BASE_URL + cover;
        if (nameEl && link) {
            list.push({
                name: nameEl.text(),
                link: link,
                cover: cover,
                description: e.select("p.text-sm.text-gray-500").first().text(),
                host: BASE_URL
            });
        }
    });

    if (list.length === 0) {
        doc.select("div.grid > div").forEach(function(e) {
            var link = e.select("a[href*='/read/']").first().attr("href");
            var name = e.select("h3").text();
            var cover = e.select("img").attr("src");
            if (cover && cover.indexOf("http") < 0) cover = BASE_URL + cover;
            if (name && link) {
                list.push({ name: name, link: link, cover: cover, host: BASE_URL });
            }
        });
    }

    var next = null;
    var nextEl = doc.select("a[href*='page=']").last();
    if (nextEl && nextEl.text().indexOf("下一页") >= 0) {
        next = BASE_URL + nextEl.attr("href");
    }

    return Response.success(list, next);
}