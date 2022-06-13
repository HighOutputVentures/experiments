import {execSync} from "child_process";
import {existsSync} from "fs";
import {NextApiHandler} from "next";
import path from "node:path";

const handler: NextApiHandler = async (req, res) => {
  if (req.method?.toLowerCase() === "get") {
    const id = req.query.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid video id",
      });
    }

    try {
      await fetch(`http://localhost:5000/birthdayCards/${id}`, {
        method: "head",
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: "Record does not exist",
      });
    }

    const filepath = `public/downloads/${id}.mp4`;

    if (!existsSync(path.join(process.cwd(), filepath))) {
      const props = JSON.stringify({id});

      execSync(
        `npx remotion render src/remotion/index.tsx Video ${filepath} --props='${props}'`,
      );
    }

    return res.status(200).json({
      success: true,
      message: "Video successfuly built",
    });
  }

  return res.status(405).json({
    success: false,
    message: "Method not allowed",
  });
};

export default handler;
