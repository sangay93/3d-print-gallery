import fs from "fs";
import path from "path";

export async function GET() {
  const dir = path.join(process.cwd(), "public/models");

  let images = [];

  try {
    images = fs.readdirSync(dir).filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );
  } catch (err) {
    images = [];
  }

  return Response.json(images);
}