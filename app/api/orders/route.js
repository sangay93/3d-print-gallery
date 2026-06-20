export async function POST(req) {
  try {
    const data = await req.json();
    const requiredFields = ["name", "email", "phone", "address", "product", "quantity"];

    const missing = requiredFields.filter((field) => !data[field]);
    if (missing.length) {
      return Response.json({ error: `Missing fields: ${missing.join(", ")}` }, { status: 400 });
    }

    return Response.json(
      {
        message: "Thank you! Your request has been submitted successfully. Our team will contact you shortly by WhatsApp or SMS to review the details.",
        order: data,
      },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { error: "Unable to process order. Please try again later." },
      { status: 500 }
    );
  }
}
