load('config.js');

function execute(url, page) {
    if (page) url = page;

    let response = fetch(url);
    if (!response.ok) return null;
    let doc = response.html();

    let list = [];

    // Lấy tất cả truyện trên trang
    doc.select("div.flex.items-center.space-x-4").forEach(e => {
        let link = e.select("a[href*='/read/']").first().attr("href");
        let name = e.select("p.text-lg a").text();
        let cover = e.select("img").attr("src");
        if (cover && cover.indexOf("http") < 0) cover = BASE_URL + cover;
        if (name && link) {
            list.push({ name: name, link: link, cover: cover, host: BASE_URL });
        }
    });

    return Response.success(list, null);
}