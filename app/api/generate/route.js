import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  console.log("==== API /shorten called ====");

  // 1. Log raw request body
  let raw;
  try {
    raw = await request.text();
    console.log("Raw request body:", raw);
  } catch (err) {
    console.error("❌ Failed to read request body:", err);
    return Response.json({ success: false, message: "Failed to read request body" }, { status: 400 });
  }

  // 2. Parse JSON body
  let body;
  try {
    body = JSON.parse(raw);
    console.log("Parsed body:", body);
  } catch (err) {
    console.error("❌ JSON parse error:", err);
    return Response.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
  }

  // 3. Check required fields
  if (!body.url || !body.shorturl) {
    console.warn("⚠️ Missing fields:", body);
    return Response.json({ success: false, message: "url and shorturl are required" }, { status: 400 });
  }

  // 4. Log MongoDB URI (only first part for safety)
  console.log("MongoDB URI (starts with):", process.env.MONGODB_URI?.slice(0, 20) || "NOT SET");

  // 5. Test DB connection
  let client, db, collection;
  try {
    client = await clientPromise;
    db = client.db("bitlinks");
    collection = db.collection("url");
    console.log("✅ Connected to MongoDB, using DB 'bitlinks' and collection 'url'");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    return Response.json({ success: false, message: "DB connection failed", error: err.message }, { status: 500 });
  }

  // 6. Check if shorturl exists
  try {
    const existing = await collection.findOne({ shorturl: body.shorturl });
    if (existing) {
      console.warn("⚠️ Short URL already exists:", existing);
      return Response.json({ success: false, message: "URL already exists" }, { status: 409 });
    }
  } catch (err) {
    console.error("❌ DB findOne error:", err);
    return Response.json({ success: false, message: "DB query failed", error: err.message }, { status: 500 });
  }

  // 7. Insert new document
  try {
    const result = await collection.insertOne({
      url: body.url,
      shorturl: body.shorturl,
    });
    console.log("✅ Inserted document:", result.insertedId);
    return Response.json({ success: true, message: "URL Generated Successfully!" }, { status: 201 });
  } catch (err) {
    console.error("❌ DB insert error:", err);
    return Response.json({ success: false, message: "Insert failed", error: err.message }, { status: 500 });
  }
}
