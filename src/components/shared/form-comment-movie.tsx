import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

interface FormCommentMovieProps {
  movieId?: number;
  onAddComment: (comment: string) => void;
}

export function FormCommentMovie({ onAddComment }: FormCommentMovieProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(comment);
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-6 max-w-4xl">
        <Textarea
          placeholder="Type your comment here."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit" className="w-fit">
          Add a comment
        </Button>
      </div>
    </form>
  );
}
