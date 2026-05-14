import { test, expect } from "@playwright/test";

const TEST_USER = {
  email: "vworwan@gmail.com",
  password: "vpp120718",
};

const URL = "https://mek-web-dev.mekstack.com/";

test.describe("Product Create Flow", () => {
  test("should create product without new category", async ({ page }) => {
    // Login
    await page.goto(URL);
    await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
    await page.getByRole("textbox", { name: "อีเมล" }).fill(TEST_USER.email);
    await page
      .getByRole("textbox", { name: "รหัสผ่าน" })
      .fill(TEST_USER.password);
    await page
      .getByLabel("เข้าสู่ระบบ")
      .getByRole("button", { name: "เข้าสู่ระบบ" })
      .click();

    await page.getByText("Matcha Lab").waitFor({ state: "visible" });
    await page.getByText("Matcha Lab").click();

    // Navigate to create product
    await page.goto(`${URL}dashboard/products/new?lang=th`);

    // Fill product details
    await page
      .getByRole("textbox", { name: "ชื่อสินค้า *" })
      .fill("ชาเขียวนมสด");
    await page
      .getByRole("textbox", { name: "คำอธิบายสินค้า" })
      .fill("ชาเขียว นมสด หอมกลิ่นชาเขียว");
    await page
      .getByRole("spinbutton", { name: "ราคา", exact: true })
      .fill("50");
    await page.getByRole("spinbutton", { name: "ราคาเดิม" }).fill("69");
    await page.getByRole("textbox", { name: "SKU" }).fill("pd102");
    await page.getByRole("spinbutton", { name: "จำนวนคงเหลือ" }).fill("50");

    // Select category
    await page.getByRole("combobox").first().click();
    await page.getByRole("option", { name: "เครื่องดื่มพร้อมดื่ม" }).click();

    // Save
    await page.getByRole("button", { name: "บันทึก" }).click();

  });
});
