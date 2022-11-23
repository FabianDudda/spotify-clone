// import clientPromise from "../lib/mongodb";
import { useEffect, useState } from "react";

import { getData } from "./api/comments";

function comments({ comments }) {
  // console.log(comments);
  return (
    <>
      {/* // INSERT COMMENTS */}

      {/* // SHOW COMMENTS */}
      <div>
        <h1>Comments</h1>
        {comments.map((comment) => (
          <p key={comment._id}>{comment.value}</p>
        ))}
      </div>
    </>
  );
}

export default comments;

export async function getServerSideProps() {
  // let res = await fetch("http://localhost:3000/api/comments", {
  //   method: "GET",
  //   headers: {
  //     "User-Agent": "*",
  //     "Content-Type": "application/json",
  //   },
  // });
  // let comments = await res.json();

  const comments = await getData();

  return {
    props: { comments },
  };
}
