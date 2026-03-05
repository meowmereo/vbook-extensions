load('config.js');

function execute() {
    return Response.success([
        {
            "title": "Kinh điển",
            "script": "gen.js",
            "input": BASE_URL
        },
        {
            "title": "Tác phẩm chọn lọc",
            "script": "gen.js",
            "input": BASE_URL
        },
        {
            "title": "Đề cử tuần này",
            "script": "gen.js",
            "input": BASE_URL
        },
        {
            "title": "Đề cử hot",
            "script": "gen.js",
            "input": BASE_URL
        },
        {
            "title": "Mới cập nhật",
            "script": "gen.js",
            "input": BASE_URL
        }
    ]);
}