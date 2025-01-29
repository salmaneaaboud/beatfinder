import React, { useState } from "react";
import "./CommentBox.css";

const CommentBox = () => {
  const [comments, setComments] = useState([
    {
      userId: "1",
      text: "Este es un comentario",
      fullName: "Usuario 1",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = () => {
    if (newComment) {
      const newCommentObj = {
        userId: "2",
        text: newComment,
        fullName: "Usuario 2",
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  return (
    <div className="comments">
      <h3>Comentarios</h3>
      <div className="comment-input">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe un comentario..."
        />
        <button onClick={handleCommentSubmit}>Comentar</button>
      </div>
      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="no-comments">
            <p>No hay comentarios todavía.</p>
          </div>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <strong>{comment.fullName}:</strong> {comment.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentBox;
