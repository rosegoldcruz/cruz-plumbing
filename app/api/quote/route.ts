import { NextRequest, NextResponse } from "next/server";

// ─── Airtable config ───────────────────────────────────────────────
// Set these in .env.local when you're ready to connect:
//   AIRTABLE_API_KEY=your_key
//   AIRTABLE_BASE_ID=your_base_id
//   AIRTABLE_TABLE_NAME=Leads  (or whatever you name it)
// ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, issue, details, submittedAt } = body;

    // Validate
    if (!name || !phone || !issue) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME ?? "Leads";

    // If Airtable isn't configured yet, just log and return success
    if (!apiKey || !baseId) {
      console.log("[Cruz Plumbing Lead]", { name, phone, issue, details, submittedAt });
      return NextResponse.json({ success: true, message: "Lead logged (Airtable not configured)" });
    }

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Phone: phone,
            Issue: issue,
            Details: details ?? "",
            "Submitted At": submittedAt,
            Status: "New",
          },
        }),
      }
    );

    if (!airtableRes.ok) {
      const err = await airtableRes.text();
      console.error("[Airtable Error]", err);
      return NextResponse.json({ error: "Airtable error" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Quote API Error]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
