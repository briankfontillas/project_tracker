const { test, expect } = require('@playwright/test');
const TitlePage = require("../pages/projectTitle");

test('tempcheck', async({ page }) => {
    const titlePage = new TitlePage(page);
    await page.goto("localhost:3000");
    await titlePage.verifyPage();
});