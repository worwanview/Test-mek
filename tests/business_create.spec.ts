import { test, expect } from "@playwright/test";

const TEST_USER = {
  email: "vworwan@gmail.com",
  password: "vpp120718",
};

const URL = "https://mek-web-dev.mekstack.com/";

test.describe("Business Create Flow", () => {
  test("should create new business successfully", async ({ page }) => {
    // Login
    await page.goto(URL);
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
    await page.getByRole("textbox", { name: "อีเมล" }).fill(TEST_USER.email);
    await page.getByRole("textbox", { name: "รหัสผ่าน" }).fill(TEST_USER.password);
    await page
      .getByLabel("เข้าสู่ระบบ")
      .getByRole("button", { name: "เข้าสู่ระบบ" })
      .click();

    // Navigate to create business
    await page.getByRole("button", { name: "เพิ่มธุรกิจใหม่" }).click();
    await page.goto(`${URL}dashboard/business-info`);

    // Fill business details
    await page.getByRole("textbox", { name: "ชื่อธุรกิจ *" }).fill("krubkrob22");
    await page.getByRole("textbox", { name: "สินค้า/บริการหลัก" }).fill("ของทอดกรอบเช่นเฟรนช์ฟราย นัคเก็ต ไก่ทอด");
      await page.getByRole("button", { name: "ร้านอาหาร" }).click();

    // Select target audience, price range, highlights, category
    await page.getByRole("button", { name: "วัยรุ่น (13-24 ปี)" }).click();
    await page.getByRole("button", { name: "ราคาประหยัด" }).click();
    await page.getByRole("button", { name: "บริการรวดเร็ว" }).click();

    // Save
    await page.getByRole("button", { name: "บันทึกข้อมูล" }).click();

    await expect(page.getByRole("button", { name: "krubkrob22" })).toBeVisible();
  });
});

//Automate Bug บันทึกแล้วเปลี่ยนชื่อธุรกิจอันอื่นไปด้วย