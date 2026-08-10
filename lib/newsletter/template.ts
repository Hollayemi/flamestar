import type { NewsletterBlock } from "./types";

const COLORS = {
  ink: "#0b0d10",
  paper: "#ffffff",
  paperSoft: "#FAFAF9",
  flame: "#e1432e",
  flameDeep: "#b52d1c",
  signal: "#1449e0",
  mutedDark: "#9aa0a6",
  mutedLight: "#5b6169",
  border: "#e5e5e3",
};

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderBlock(block: NewsletterBlock): string {
  switch (block.type) {
    case "heading":
      return `
        <tr>
          <td style="padding: 32px 0 12px;">
            <p style="margin:0; font-family: 'Courier New', monospace; font-size:12px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:${COLORS.flame};">
              ${escapeHtml(block.text)}
            </p>
            <div style="margin-top:8px; height:2px; background:${COLORS.ink};"></div>
          </td>
        </tr>`;

    case "subheading":
      return `
        <tr>
          <td style="padding: 20px 0 8px;">
            <p style="margin:0; font-size:15px; font-weight:700; color:${COLORS.ink};">
              ${escapeHtml(block.text)}
            </p>
          </td>
        </tr>`;

    case "paragraph": {
      const flamestarViewMatch = block.text.match(/^(FLAMESTAR VIEW:)\s*([\s\S]*)$/i);
      if (flamestarViewMatch) {
        const [, label, rest] = flamestarViewMatch;
        return `
        <tr>
          <td style="padding: 0 0 14px;">
            <p style="margin:0; font-size:14px; line-height:1.7; color:${COLORS.mutedLight};">
              <strong style="color:${COLORS.flame};">${escapeHtml(label)}</strong> ${escapeHtml(rest)}
            </p>
          </td>
        </tr>`;
      }
      return `
        <tr>
          <td style="padding: 0 0 14px;">
            <p style="margin:0; font-size:14px; line-height:1.7; color:${COLORS.mutedLight};">
              ${escapeHtml(block.text)}
            </p>
          </td>
        </tr>`;
    }

    case "quote":
      return `
        <tr>
          <td style="padding: 20px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid ${COLORS.flame}; background:${COLORS.paperSoft};">
              <tr>
                <td style="padding:18px 20px;">
                  <p style="margin:0; font-size:14px; font-style:italic; line-height:1.6; color:${COLORS.ink};">
                    &ldquo;${escapeHtml(block.text)}&rdquo;
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>`;

    case "list":
      return `
        <tr>
          <td style="padding: 4px 0 14px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${block.items
                .map(
                  (item, i) => `
              <tr>
                <td valign="top" style="padding:0 10px 12px 0; width:26px;">
                  <div style="width:20px; height:20px; border-radius:50%; background:${COLORS.flame}; color:${COLORS.paper}; font-size:11px; font-weight:700; text-align:center; line-height:20px;">
                    ${i + 1}
                  </div>
                </td>
                <td valign="top" style="padding:0 0 12px;">
                  <p style="margin:0; font-size:14px; line-height:1.6; color:${COLORS.mutedLight};">
                    ${escapeHtml(item)}
                  </p>
                </td>
              </tr>`
                )
                .join("")}
            </table>
          </td>
        </tr>`;

    case "table":
      return `
        <tr>
          <td style="padding: 10px 0 20px;">
            ${
              block.title
                ? `<p style="margin:0 0 10px; font-family:'Courier New', monospace; font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:${COLORS.ink};">${escapeHtml(
                    block.title
                  )}</p>`
                : ""
            }
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${COLORS.border}; border-radius:8px; overflow:hidden;">
              <tr style="background:${COLORS.ink};">
                <td style="padding:9px 14px; font-family:'Courier New', monospace; font-size:10.5px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:${COLORS.paper};">
                  Indicator
                </td>
                <td style="padding:9px 14px; font-family:'Courier New', monospace; font-size:10.5px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:${COLORS.paper};">
                  Value
                </td>
                <td style="padding:9px 14px; font-family:'Courier New', monospace; font-size:10.5px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:${COLORS.paper};">
                  Note
                </td>
              </tr>
              ${block.rows
                .map(
                  (row, i) => `
              <tr style="background:${i % 2 === 0 ? COLORS.paper : COLORS.paperSoft};">
                <td style="padding:10px 14px; border-bottom:1px solid ${COLORS.border}; font-size:12.5px; color:${COLORS.mutedLight};">
                  ${escapeHtml(row.label)}
                </td>
                <td style="padding:10px 14px; border-bottom:1px solid ${COLORS.border}; font-size:13px; font-weight:700; color:${COLORS.ink}; white-space:nowrap;">
                  ${escapeHtml(row.value)}
                </td>
                <td style="padding:10px 14px; border-bottom:1px solid ${COLORS.border}; font-size:12px; color:${COLORS.mutedDark};">
                  ${escapeHtml(row.note ?? "")}
                </td>
              </tr>`
                )
                .join("")}
            </table>
          </td>
        </tr>`;
  }
}

export function renderNewsletterHTML({
  subject,
  dateLine,
  intro,
  blocks,
  logoUrl,
}: {
  subject: string;
  dateLine: string;
  intro: string;
  blocks: NewsletterBlock[];
  logoUrl: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0; padding:0; background:${COLORS.paperSoft}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.paperSoft}; padding: 24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background:${COLORS.paper};">

          <!-- Header -->
          <tr>
            <td style="background:${COLORS.ink}; padding:28px 32px;">
              <img src="${logoUrl}" alt="Flamestar Capital" width="140" style="display:block; margin:0 0 18px; height:auto;" />
              <p style="margin:0; font-family:'Courier New', monospace; font-size:20px; font-weight:700; letter-spacing:1px; color:${COLORS.paper};">
                FLAMESTAR MARKET PULSE
              </p>
              <p style="margin:6px 0 0; font-size:12.5px; color:${COLORS.paper}CC;">
                Your Weekly Intelligence Brief for the Discerning Investor
              </p>
              <p style="margin:14px 0 0; font-family:'Courier New', monospace; font-size:10.5px; letter-spacing:0.5px; color:${COLORS.flame};">
                ${escapeHtml(dateLine.toUpperCase())} &nbsp;|&nbsp; CONFIDENTIAL &mdash; FOR CLIENTS OF FLAMESTAR CAPITAL
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 28px 32px 8px;">
              <p style="margin:0 0 4px; font-family:'Courier New', monospace; font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:${COLORS.mutedDark};">
                From the Desk of Flamestar Capital
              </p>
              <p style="margin:10px 0 0; font-size:14px; line-height:1.7; color:${COLORS.ink};">
                ${escapeHtml(intro)}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 32px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${blocks.map(renderBlock).join("")}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${COLORS.ink}; padding:24px 32px;">
              <p style="margin:0 0 10px; font-size:12px; font-weight:700; letter-spacing:1px; color:${COLORS.paper};">
                STAY DISCIPLINED. STAY INVESTED. STAY FLAMESTAR.
              </p>
              <p style="margin:0 0 14px; font-size:11.5px; color:${COLORS.paper}99;">
                Flamestar Capital Ltd &middot; Lagos, Nigeria &middot; www.flamestarcapital.ng &middot; info@flamestarcapital.ng
              </p>
              <p style="margin:0; font-size:10px; line-height:1.6; color:${COLORS.paper}66;">
                Disclaimer: This newsletter is provided by Flamestar Capital Ltd for informational purposes only and does not constitute
                investment, financial, legal or tax advice, nor an offer or solicitation to buy or sell any security. Past performance is
                not indicative of future results. All investments carry risk, including possible loss of principal. Clients should consult
                their Flamestar advisor before making investment decisions. &copy; ${new Date().getFullYear()} Flamestar Capital Ltd. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
