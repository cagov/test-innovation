import fs from 'fs';
import { test, expect } from "@playwright/test";
import {
  injectAxe,
  checkA11y
} from "axe-playwright";

let testLocation = "http://localhost:8080";

let pageUrls = ["/"];


let pageList = JSON.parse(fs.readFileSync('./_site_dist/allFiles.json'));
pageList.forEach(page => {
  let outputUrl = page.outputPath.replace('_site/','/').replace('/index.html','/');
  if(pageUrls.indexOf(outputUrl) === -1) {
    pageUrls.push(outputUrl);
  }
})



pageUrls.forEach(pageUrl => {
  console.log('testing '+pageUrl)

  test("desktop: a11y page tests "+pageUrl, async ({ page }) => {
    // use default viewport size which is desktop

    await page.goto(testLocation+pageUrl);
  
    await injectAxe(page);

    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    })
  
  });
});
/*

// run same tests on mobile too
pageUrls.forEach(pageUrl => {

  test("mobile: a11y page tests "+pageUrl, async ({ page }) => {
    await page.setViewportSize({
      width: 360,
      height: 740,
    });

    await page.goto(testLocation+pageUrl);
  
    await injectAxe(page);

    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    })
  
  });
});
*/