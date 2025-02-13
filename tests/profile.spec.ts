import { test, expect } from "@playwright/test";
import { login } from "./utils";
import { BASE_URL } from "./config";

// Mock image file for uploads
// const testAvatarPath = "/public/avt.jpg";
// const testCoverPath = "/public/cover.png";

test.describe("Profile Update", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, "USER");
    await page.goto(`${BASE_URL}/info`);
  });

  test("Ensure the settings page loads correctly", async ({ page }) => {
    await expect(page.locator("text=Ảnh bìa (1400 x 320px)")).toBeVisible();
    await expect(page.locator("text=Ảnh đại diện")).toBeVisible();
    await expect(page.locator("text=Họ")).toBeVisible();
    await expect(page.locator("text=Tên")).toBeVisible();
  });

  //   test("Verify uploading a new cover photo", async ({ page }) => {
  //     const fileInput = page.locator("input[type='file']").nth(0);
  //     await fileInput.setInputFiles(testAvatarPath);
  //     await expect(page.locator("img[alt='cover image']")).toHaveAttribute(
  //       "src",
  //       /data:image\/jpeg;base64/
  //     );
  //     await page.locator("text=Lưu thay đổi").click();
  //     await expect(page.locator("text=Đang cập nhật...")).toBeVisible();
  //   });

  //   test("Verify uploading a new avatar photo", async ({ page }) => {
  //     const fileInput = page.locator("input[type='file']").nth(1);
  //     await fileInput.setInputFiles(testCoverPath);
  //     await expect(page.locator("img[alt='avatar image']")).toHaveAttribute(
  //       "src",
  //       /data:image\/jpeg;base64/
  //     );
  //     await page.locator("text=Lưu thay đổi").click();
  //     await expect(page.locator("text=Đang cập nhật...")).toBeVisible();
  //   });

  test("Ensure input fields update correctly", async ({ page }) => {
    await page.fill("input[placeholder='Nhập họ']", "Nguyễn Thị");
    await page.fill("input[placeholder='Nhập tên']", "Văn A");
    await page.fill("input[type='date']", "1995-08-15");
    await expect(page.locator("input[placeholder='Nhập họ']")).toHaveValue(
      "Nguyễn"
    );
    await expect(page.locator("input[placeholder='Nhập tên']")).toHaveValue(
      "Văn A"
    );
    await expect(page.locator("input[type='date']")).toHaveValue("1995-08-15");
  });

  test("Submit the form and check for a success message", async ({ page }) => {
    await page.fill("input[placeholder='Nhập họ']", "Nguyễn");
    await page.fill("input[placeholder='Nhập tên']", "Văn A");
    await page.click("text=Lưu thay đổi");
    // await expect(page.locator("text=Đang cập nhật...")).toBeVisible();
    await expect(
      page.locator("text=Cập nhật thông tin thành công")
    ).toBeVisible();
  });
});
