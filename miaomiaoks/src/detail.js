load('config.js');

function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        let info = doc.select("section.flex.items-start");

        let name = info.select("h1").text();
        let cover = info.select("img").attr("src");
        let author = info.select("a[href*='/author/']").text();
        let description = doc.select("div#desc").html();

        if (cover && cover.indexOf("http") < 0) {
            cover = BASE_URL + cover;
        }

        let ongoing = false;
        info.select("p.text-xs").forEach(p => {
            if (p.text().indexOf("状态") >= 0) {
                ongoing = p.text().indexOf("连载") >= 0;
            }
        });

        let similarSection = null;
        doc.select("section").forEach(s => {
            if (s.select("h2").text() === "相关小说") {
                similarSection = s;
            }
        });

        return Response.success({
            name: name,
            cover: cover,
            author: author,
            description: description,
            host: BASE_URL,
            ongoing: ongoing,
            suggests: similarSection ? [
                {
                    title: "相关小说",
                    input: similarSection.html(),
                    script: "similar.js"
                }
            ] : []
        });
    }
    return null;
}