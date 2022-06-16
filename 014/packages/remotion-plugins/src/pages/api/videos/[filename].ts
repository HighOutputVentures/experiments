import {existsSync} from "fs";
import fs from "fs/promises";
import {NextApiHandler} from "next";
import path from "path";

const handler: NextApiHandler = async (req, res) => {
  if (req.method?.toLowerCase() === "get") {
    const filename = req.query.filename;
    const filepath = `public/downloads/${filename}`;

    if (!existsSync(path.join(process.cwd(), filepath))) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    const buffer = await fs.readFile(filepath);
    res.setHeader("Content-Type", "video/mp4");
    return res.send(buffer);
  }

  return res.status(405).json({
    message: "Invalid method",
  });
};

export default handler;
