"use struct";

import phantom from "phantom";

const output = "phantomjs_org.png";

(async () => {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on("onResourceRequested", requestData => {
        console.info("Requesting", requestData.url);
    });

    await page.property("viewSize", {width: 800, height: 600});

    const status = await page.open("http://phantomjs.org/");
    console.info(`Page opened with status: ${status}`);

    await page.render(output);
    console.info(`File created at ${output}`);

    await instance.exit();
})().catch(err => {
    console.error(err);
});
