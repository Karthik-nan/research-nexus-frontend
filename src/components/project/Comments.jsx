import API_URL from '../../config';
import React, { useEffect, useState } from "react";
import axios from "axios";

function Comments({ documentId }) {

    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchComments();
    }, [documentId]);

    const fetchComments = async () => {

        try {

            const response = await axios.get(
                `${API_URL}/api/comments/document/${documentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setComments(response.data);

        } catch (error) {

            console.log("Comment Fetch Error:", error);

        }

    };

    const addComment = async () => {

        if (content.trim() === "") return;

        try {

            await axios.post(
                `${API_URL}/api/comments/document/${documentId}`,
                {
                    content: content
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setContent("");
            fetchComments();

        } catch (error) {

            console.log("Add Comment Error:", error);

        }

    };

    return (

        <div className="mt-6 border-t pt-4">

            <h3 className="font-bold text-lg mb-3">

                💬 Comments

            </h3>

            {
                comments.length === 0 ?

                    <p className="text-gray-500">

                        No comments yet

                    </p>

                    :

                    comments.map(comment => (

                        <div
                            key={comment.id}
                            className="bg-gray-100 rounded-lg p-3 mb-3"
                        >

                            <p className="font-semibold">

                                {comment.commentedBy}

                            </p>

                            <p>

                                {comment.content}

                            </p>

                            <p className="text-sm text-gray-500">

                                {new Date(comment.createdAt).toLocaleString()}

                            </p>

                        </div>

                    ))
            }

            <div className="flex gap-3 mt-4">

                <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 border rounded-lg px-3 py-2"
                />

                <button
                    onClick={addComment}
                    className="bg-blue-600 text-white px-4 rounded-lg"
                >

                    Add

                </button>

            </div>

        </div>

    );

}

export default Comments;


