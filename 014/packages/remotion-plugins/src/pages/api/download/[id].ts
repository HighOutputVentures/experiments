import {execSync} from "child_process";
import {existsSync} from "fs";
import fs from "fs/promises";
import {NextApiHandler} from "next";
import path from "node:path";
import constants from "../../../config/constants";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method?.toLowerCase();

  if (method === "get") {
    const id = req.query.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid video id",
      });
    }

    try {
      // check if record exists
      await fetch(`${constants.apiEndpoint}/birthdayCards/${id}`, {
        method: "head",
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: "Record does not exist",
      });
    }

    const filepath = `public/downloads/${id}.mp4`;

    // only build if video has not built before
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

  if (method === "delete") {
    const id = req.query.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid video id",
      });
    }

    const filepath = `public/downloads/${id}.mp4`;
    const fullpath = path.join(process.cwd(), filepath);

    if (existsSync(fullpath)) await fs.unlink(fullpath);

    res.status(204).end();
    return;
  }

  return res.status(405).json({
    success: false,
    message: "Method not allowed",
  });
};

export default handler;
