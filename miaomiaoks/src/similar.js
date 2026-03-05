load('config.js');

function execute(data) {
    let doc = Html.parse(data);
    let books = [];
    doc.select("div.flex.items-center.space-x-4").forEach(e => {
        books.push({
            name: e.select("p.text-lg a").text(),
            link: e.select("a[href*='/read/']").first().attr("href"),
            cover: BASE_URL + e.select("img").attr("src"),
            description: e.select("p.text-sm.text-gray-500").first().text(),
            host: BASE_URL
        });
    });
    return Response.success(books);
}