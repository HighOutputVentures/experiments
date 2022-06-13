import {NextApiHandler} from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method?.toLowerCase() === "post") {
    const pathname = req.body.pathname;

    if (typeof pathname !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid pathname to revalidate",
      });
    }

    try {
      await res.unstable_revalidate(pathname);

      return res.status(200).json({
        success: true,
        message: `Successfuly revalidated '${pathname}'`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to revalidate path",
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: "Method not allowed",
  });
};

export default handler;
