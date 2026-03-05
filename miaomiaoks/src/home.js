load('config.js');

function execute() {
    let response = fetch(BASE_URL);
    if (response.ok) {
        let doc = response.html();
        let sections = [];

        doc.select("section").forEach(s => {
            let title = s.select("h2").text();
            if (!title) return;

            let books = [];

            // Dạng 1: flex items-center (danh sách ngang)
            s.select("div.flex.items-center.space-x-4").forEach(e => {
                let link = e.select("a[href*='/read/']").first().attr("href");
                let name = e.select("p.text-lg a").text();
                let cover = e.select("img").attr("src");
                if (!cover.startsWith("http")) cover = BASE_URL + cover;
                if (name && link) books.push({ name, link, cover, host: BASE_URL });
            });

            // Dạng 2: grid (lưới ảnh)
            if (books.length === 0) {
                s.select("div.grid > div").forEach(e => {
                    let a = e.select("a[href*='/read/']").first();
                    let link = a ? a.attr("href") : "";
                    let name = e.select("h3").text();
                    let cover = e.select("img").attr("src");
                    if (!cover.startsWith("http")) cover = BASE_URL + cover;
                    if (name && link) books.push({ name, link, cover, host: BASE_URL });
                });
            }

            if (books.length > 0) {
                sections.push({ title, script: "gen.js", books });
            }
        });

        return Response.success(sections);
    }
    return null;
}