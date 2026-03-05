load('config.js');

function execute() {
    var response = fetch(BASE_URL);
    if (!response.ok) return null;
    var doc = response.html();

    var data = [];
    doc.select("a[href*='/tag/']").forEach(function(e) {
        data.push({
            title: e.text(),
            input: BASE_URL + e.attr("href"),
            script: "gen.js"
        });
    });

    return Response.success(data);
}