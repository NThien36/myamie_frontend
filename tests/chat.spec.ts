import { BASE_URL } from "./config";
import { test, expect } from "@playwright/test";
import { login } from "./utils";

test.describe("Chat Feature", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, "USER");
    await page.click("#chat-link");
    await expect(page).toHaveURL(`${BASE_URL}/chat`);
  });

  test("Ensure the chat page loads correctly", async ({ page }) => {
    await expect(page.locator("body")).toContainText("tin nhắn");
  });

  test("Verify that clicking on a chat opens the chat detail view", async ({
    page,
  }) => {
    await page.click(".conversation-item:first-child");
    await expect(page).toHaveURL(/\/chat\/\d+/);
    await expect(page.getByTestId("chat-detail")).toBeVisible();
  });

  test("Test sending and receiving messages", async ({ page }) => {
    await page.click(".conversation-item:first-child");

    const messageInput = page.getByTestId("chat-input");
    const sendButton = page.getByTestId("send-message-button");
    const testMessage = "Hello, Playwright!";

    await messageInput.fill(testMessage);
    await sendButton.click();

    await expect(
      page.locator('[data-testid="message-item"]').last()
    ).toHaveText(testMessage);
    // await expect(page.getByTestId("message-item:last-child")).toHaveText(
    //   testMessage
    // );
  });
});
