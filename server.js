require("dotenv").config();
const express    = require("express");
const nodemailer = require("nodemailer");
const cors       = require("cors");
const path       = require("path");

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["https://turnaj.mobi", "https://www.turnaj.mobi", "http://localhost:3000"] }));
app.use(express.static(path.join(__dirname, "public")));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP Error:", error.message);
  } else {
    console.log("SMTP connection verified - ready to send emails");
  }
});

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: "Please enter a valid email address." });
  }

  try {
    await transporter.sendMail({
      from: "Turnaj Subscriptions <" + process.env.EMAIL_USER + ">",
      to: process.env.ADMIN_EMAIL,
      subject: "New Subscriber: " + email,
      html: "<div style='font-family:sans-serif;padding:24px;'><h2 style='color:#4f1c93;'>New Newsletter Subscriber</h2><p><strong>Email:</strong> " + email + "</p><p><strong>Time:</strong> " + new Date().toLocaleString('en-GB', { timeZone: 'Africa/Lagos' }) + "</p></div>",
    });

    await transporter.sendMail({
      from: "Turnaj Fantasy <" + process.env.EMAIL_USER + ">",
      to: email,
      subject: "You are subscribed to Turnaj!",
      html: "<!DOCTYPE html><html><body style='margin:0;padding:0;background:#f5f5f5;font-family:system-ui,sans-serif;'><table width='100%' cellpadding='0' cellspacing='0' style='padding:40px 20px;'><tr><td align='center'><table width='600' cellpadding='0' cellspacing='0' style='background:#fff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;'><tr><td style='background:#4f1c93;padding:40px 48px;text-align:center;'><h1 style='color:#fff;margin:0;font-size:2rem;font-weight:800;'>TURNAJ</h1><p style='color:rgba(255,255,255,0.8);margin:8px 0 0;'>Fantasy Football</p></td></tr><tr><td style='padding:48px;'><h2 style='color:#4f1c93;margin:0 0 16px;'>You are in!</h2><p style='color:#444;line-height:1.7;margin:0 0 28px;'>Thanks for subscribing. You will be the first to hear about new features, fantasy tips, and exclusive competitions.</p><div style='background:#faf9ff;border-radius:12px;padding:24px;border-left:4px solid #4f1c93;margin-bottom:32px;'><p style='margin:0 0 10px;color:#4f1c93;font-weight:700;'>What to expect:</p><p style='margin:4px 0;color:#555;'>- New league launches and platform updates</p><p style='margin:4px 0;color:#555;'>- Fantasy tips and manager insights</p><p style='margin:4px 0;color:#555;'>- Exclusive rewards and competitions</p></div><div style='text-align:center;'><a href='https://game.turnaj.mobi/auth/login' style='background:#4f1c93;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;text-decoration:none;display:inline-block;'>Start Playing Now</a></div></td></tr><tr><td style='padding:20px 48px;border-top:1px solid #f0f0f0;text-align:center;'><a href='https://x.com/turnajfantasy?s=21' style='margin:0 8px;color:#4f1c93;font-weight:600;text-decoration:none;'>X / Twitter</a> | <a href='https://www.instagram.com/turnaj_' style='margin:0 8px;color:#4f1c93;font-weight:600;text-decoration:none;'>Instagram</a> | <a href='https://www.tiktok.com/@turnajfantasy_' style='margin:0 8px;color:#4f1c93;font-weight:600;text-decoration:none;'>TikTok</a></td></tr><tr><td style='background:#f5f5f5;padding:20px 48px;text-align:center;'><p style='color:#bbb;font-size:0.78rem;margin:0;'>2026 Turnaj Fantasy Sports. All rights reserved.</p></td></tr></table></td></tr></table></body></html>",
    });

    return res.status(200).json({ success: true, message: "Subscribed successfully!" });

  } catch (err) {
    console.log("Email error:", err.message);
    return res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
});

app.listen(PORT, () => console.log("Turnaj server running on http://localhost:" + PORT));
