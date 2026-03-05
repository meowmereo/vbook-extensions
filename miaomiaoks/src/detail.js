load('config.js');

function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        let name = doc.select("h1.text-2xl").text();
        let cover = doc.select("section img").first().attr("src");
        let author = doc.select("p.text-sm.text-gray-500 a[href*='/author/']").first().text();
        let description = doc.select("#desc").html();

        if (cover && cover.indexOf("http") < 0) {
            cover = BASE_URL + cover;
        }

        let statusText = "";
        let paras = doc.select("p.text-xs.text-gray-500");
        for (let i = 0; i < paras.size(); i++) {
            let t = paras.get(i).text();
            if (t.indexOf("状态") >= 0) { statusText = t; break; }
        }
        let ongoing = statusText.indexOf("连载") >= 0;

        let genres = [];
        doc.select("a[href*='/tag/']").forEach(e => {
            genres.push({
                title: e.text(),
                input: BASE_URL + e.attr('href'),
                script: 'gen.js'
            });
        });

        let suggestHtml = doc.select("section.p-3:has(h2.text-2xl)").first().html();
        let suggests = [];
        if (suggestHtml) {
            suggests.push({
                title: "相关小说",
                input: suggestHtml,
                script: "similar.js"
            });
        }

        return Response.success({
            name: name,
            cover: cover,
            author: author,
            description: description,
            host: BASE_URL,
            ongoing: ongoing,
            genres: genres,
            suggests: suggests
        });
    }
    return null;
}