load('config.js');

function execute() {
    return Response.success([
        {
            "title": "喵喵看书",
            "input": BASE_URL,
            "script": "gen.js"
        }
    ]);
}