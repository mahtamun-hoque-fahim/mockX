import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = "mockX <noreply@mockx.app>";

/* ── Welcome email ──────────────────────────────────────────── */
export async function sendWelcomeEmail(to: string, name: string) {
  const firstName = name.split(" ")[0];
  await resend.emails.send({
    from:    FROM,
    to,
    subject: `Welcome to mockX, ${firstName}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0a0c10;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#f2f2f3;">
  <div style="max-width:560px;margin:40px auto;padding:0 24px;">
    <!-- Logo -->
    <div style="margin-bottom:32px;">
      <span style="font-size:22px;font-weight:700;letter-spacing:-0.03em;">
        mock<span style="color:#6c63ff">X</span>
      </span>
    </div>
    <!-- Card -->
    <div style="background:#131720;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:32px;">
      <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;line-height:1.2;">
        Hey ${firstName}, welcome aboard 👋
      </h1>
      <p style="margin:0 0 24px;font-size:15px;color:rgba(255,255,255,0.55);line-height:1.6;">
        Your mockX account is ready. Start turning screenshots into pixel-perfect MacBook mockups in seconds.
      </p>

      <!-- Features -->
      <div style="margin-bottom:28px;">
        ${[
          ["Screen Mockup", "Wrap any screenshot in Safari, Chrome, Arc, and more"],
          ["Scene Mockup",  "Place your MacBook on a desk with day/night lighting"],
          ["Export PNG",    "Export at 1×, 2× — clean and sharp"],
        ].map(([title, desc]) => `
        <div style="display:flex;gap:12px;margin-bottom:14px;align-items:flex-start;">
          <div style="width:6px;height:6px;border-radius:50%;background:#6c63ff;margin-top:7px;flex-shrink:0;"></div>
          <div>
            <div style="font-size:13px;font-weight:600;margin-bottom:2px;">${title}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.45);">${desc}</div>
          </div>
        </div>`).join("")}
      </div>

      <!-- CTA -->
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/app/dashboard"
         style="display:inline-block;background:#6c63ff;color:#fff;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.01em;">
        Open the editor →
      </a>
    </div>

    <!-- Footer -->
    <p style="margin:20px 0 0;font-size:11px;color:rgba(255,255,255,0.25);text-align:center;">
      You received this because you signed up at mockx.app
    </p>
  </div>
</body>
</html>`,
  });
}

/* ── Pro upgrade confirmation ───────────────────────────────── */
export async function sendProUpgradeEmail(to: string, name: string) {
  const firstName = name.split(" ")[0];
  await resend.emails.send({
    from:    FROM,
    to,
    subject: `You're now on mockX Pro, ${firstName}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0a0c10;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#f2f2f3;">
  <div style="max-width:560px;margin:40px auto;padding:0 24px;">
    <div style="margin-bottom:32px;">
      <span style="font-size:22px;font-weight:700;letter-spacing:-0.03em;">mock<span style="color:#6c63ff">X</span></span>
    </div>
    <div style="background:#131720;border:1px solid rgba(108,99,255,0.25);border-radius:16px;padding:32px;">
      <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;">You're Pro now, ${firstName} ⚡</h1>
      <p style="margin:0 0 24px;font-size:15px;color:rgba(255,255,255,0.55);line-height:1.6;">
        3× exports, no watermarks, unlimited saves — everything is unlocked.
      </p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/app/screen"
         style="display:inline-block;background:#6c63ff;color:#fff;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;">
        Start creating →
      </a>
    </div>
  </div>
</body>
</html>`,
  });
}
