load('config.js');

function execute(url, page) {
    if (!page) page = '0';
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        let next = null;
        let nextEl = doc.select("a[href*='page=']").last();
        if (nextEl && nextEl.text().indexOf("下一页") >= 0) {
            next = BASE_URL + nextEl.attr("href");
        }

        let data = [];
        doc.select("div.flex.items-center.space-x-4").forEach(e => {
            data.push({
                name: e.select("p.text-lg a").text(),
                link: e.select("a[href*='/read/']").first().attr("href"),
                cover: BASE_URL + e.select("img").attr("src"),
                description: e.select("p.text-sm.text-gray-500").first().text(),
                host: BASE_URL
            });
        });

        return Response.success(data, next);
    }
    return null;
}