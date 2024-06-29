const URL = require('../../lib/url');

describe("Initialize URL", () => {
  test("URL to exist", () => {
    let url = new URL(URL.TYPES.related, "https://localhost:3000");

    expect(url).toBeTruthy();
    expect(url.type).toBe('Related');
    expect(url.link).toBe("https://localhost:3000");
  });
});

describe("URL operations", () => {
  let testURL;

  beforeEach(() => {
    testURL = new URL("other", "https://test.com");
  });

  test("Updating URL type", () => {
    testURL.updateType(URL.TYPES.pr);

    expect(testURL.type).toBe("Pull-request");
    expect(testURL.link).toBe("https://test.com");
  });

  test("Updating URL link", () => {
    testURL.updateLink("https://anothertesturl.com");

    expect(testURL.type).toBe("other");
    expect(testURL.link).toBe("https://anothertesturl.com");
  });
});