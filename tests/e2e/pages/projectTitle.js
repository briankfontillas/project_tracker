const { test, expect } = require('@playwright/test');
const { webkit } = require('playwright');

class TitlePage {
  constructor(page) {
    this.page = page;
    this.projectTitle = page.locator("#project-title");
    this.submitBtn = page.locator('.start-btn');
  }

  async verifyPage(project) {
    let title = project.title;

    await expect(this.projectTitle).toBeVisible()
    await expect(this.submitBtn).toBeVisible();
    // await expect(this.projectTitle).toContainText(title);
  }
}

module.exports = TitlePage;