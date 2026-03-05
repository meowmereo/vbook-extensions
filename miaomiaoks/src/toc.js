load('config.js');

function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let links = doc.select("section a[href*='/content/']");
        let data = [];
        for (let i = 0; i < links.size(); i++) {
            let e = links.get(i);
            data.push({
                name: e.text(),
                url: e.attr("href"),
                host: BASE_URL
            });
        }
        return Response.success(data);
    }
    return null;
}