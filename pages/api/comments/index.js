import connectMongo from "../../../database/connection";
import {
  getComments,
  postComment,
  putComment,
  deleteComment,
} from "../../../database/controller";
export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );

  // type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getComments(req, res);
      break;
    case "POST":
      postComment(req, res);
      //   res.status(200).json({ method, name: "POST Request" });
      break;
    case "PUT":
      putComment(req, res);
      break;
    case "DELETE":
      deleteComment(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
