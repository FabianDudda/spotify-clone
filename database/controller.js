/** Controller */
import Comments from "../model/comment";

// get : http://localhost:3000/api/comments
export async function getComments(req, res) {
  try {
    const comments = await Comments.find({});

    if (!comments) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}

// get : http://localhost:3000/api/comments/1
export async function getComment(req, res) {
  try {
    const { commentId } = req.query;

    if (commentId) {
      const comment = await Comments.findById(commentId);
      res.status(200).json(comment);
    }
    res.status(404).json({ error: "Comment not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Cannot get the Comment...!" });
  }
}

// post : http://localhost:3000/api/comments
export async function postComment(req, res) {
  try {
    const formData = req.body;

    if (!formData)
      return res.status(404).json({ error: "Form Data Not Provided...!" });
    Comments.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
}

// // put : http://localhost:3000/api/comments/1
export async function putComment(req, res) {
  try {
    const { commentId } = req.query;
    const formData = req.body;

    if (commentId && formData) {
      const comment = await Comments.findByIdAndUpdate(commentId, formData);
      res.status(200).json(comment);
    }
    res.status(404).json({ error: "Comment Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Updating the Data...!" });
  }
}

// delete : http://localhost:3000/api/comments/1
export async function deleteComment(req, res) {
  try {
    const { commentId } = req.query;

    if (commentId) {
      const comment = await Comments.findByIdAndDelete(commentId);
      return res.status(200).json(comment);
    }

    res.status(404).json({ error: "Comment Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Deleting the Comment...!" });
  }
}
