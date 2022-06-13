import {execSync} from "child_process";
import {NextApiHandler} from "next";

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

      execSync(
        `npx remotion render src/remotion/index.tsx Video public/downloads/${id}.mp4 --props='${JSON.stringify(
          {id},
        )}'`,
      );

      return res.status(200).json({
        success: true,
        message: "Video successfuly built",
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        message: "Record does not exist",
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: "Method not allowed",
  });
};

export default handler;
