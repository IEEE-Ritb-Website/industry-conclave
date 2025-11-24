import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { sendConfirmationEmail } from "@/lib/email";

async function main() {
    console.log("Sending test email...");
    await sendConfirmationEmail("shiveshtiwari0@gmail.com", "Test", "asdfasdfasdf");
    console.log("Test email sent!");
}

main();
