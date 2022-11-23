import clientPromise from "../../lib/mongodb";

export const getData = async () => {
  const client = await clientPromise;
  const db = client.db("social-spotify");
  const comments = await db.collection("comments").find({}).toArray();
  return JSON.parse(JSON.stringify(comments));
};

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("social-spotify");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myComment = await db.collection("comments").insertOne(bodyObject);
      res.json(myComment.ops[0]);
      break;
    case "GET":
      // const comments = await db.collection("comments").find({}).toArray();
      const comments = await getData();
      res.json({ comments: comments });
      break;
  }
};
