load('config.js');

function execute(url, page) {
    if (!page) page = '1';
    let response = fetch(url, {
        method: "GET",
        queries: {"page": page}
    });

    if (response.ok) {
        let doc = response.html();

        let next = null;
        let nextEl = doc.select("a[href*='page=']").last();
        if (nextEl && nextEl.text().indexOf("下一页") >= 0) {
            next = (parseInt(page) + 1) + "";
        }

        let data = [];
        doc.select("div.flex.items-center.space-x-4").forEach(e => {
            let nameEl = e.select("p.text-lg a").first();
            let linkEl = e.select("a[href*='/read/']").first();
            let imgEl = e.select("img").first();

            if (!nameEl || !linkEl) return;

            let cover = imgEl ? imgEl.attr("src") : "";
            if (cover && cover.indexOf("http") < 0) cover = BASE_URL + cover;

            data.push({
                name: nameEl.text(),
                link: linkEl.attr("href"),
                cover: cover,
                description: e.select("p.text-sm.text-gray-500").first() ? e.select("p.text-sm.text-gray-500").first().text() : "",
                host: BASE_URL
            });
        });

        return Response.success(data, next);
    }

    return null;
}