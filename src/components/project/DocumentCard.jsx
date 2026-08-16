import React from "react";
import axios from "axios";
import Comments from "./Comments";

function DocumentCard({ document: doc, onDelete }) {

    const downloadDocument = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8080/api/documents/download/${doc.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    responseType: "blob"
                }
            );

            const blob = new Blob([response.data], {
                type: response.headers["content-type"]
            });

            const url = window.URL.createObjectURL(blob);

            const link = window.document.createElement("a");

            link.href = url;
            link.download = doc.fileName || "download";

            window.document.body.appendChild(link);

            link.click();

            window.document.body.removeChild(link);

            window.URL.revokeObjectURL(url);

        } catch (error) {

            console.error("Download Error:", error);

            alert("Download failed");

        }

    };


    // =========================
    // DELETE DOCUMENT
    // =========================
    const deleteDocument = async () => {

        const confirmed = window.confirm(
            `Are you sure you want to delete "${doc.title}"?`
        );

        if (!confirmed) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8080/api/documents/${doc.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            alert("Document deleted successfully");

            // Tell parent component to remove document from UI
            if (onDelete) {
                onDelete(doc.id);
            }

        } catch (error) {

            console.error("Delete Error:", error);

            if (error.response?.status === 403) {

                alert("You are not allowed to delete this document.");

            } else {

                alert("Failed to delete document.");

            }

        }

    };


    return (

        <div
            className="
                bg-white
                border
                rounded-xl
                shadow
                p-5
            "
        >

            {/* =========================
                DOCUMENT HEADER
            ========================= */}

            <div
                className="
                    flex
                    items-center
                    gap-3
                    mb-3
                "
            >

                <div className="text-3xl">
                    📄
                </div>

                <h3
                    className="
                        text-xl
                        font-bold
                    "
                >
                    {doc.title}
                </h3>

            </div>


            {/* =========================
                DESCRIPTION
            ========================= */}

            <p
                className="
                    text-gray-600
                    mb-3
                "
            >
                {doc.description}
            </p>


            {/* =========================
                UPLOADED BY
            ========================= */}

            <p
                className="
                    text-sm
                    text-gray-500
                    mb-4
                "
            >

                Uploaded by:

                <b className="ml-2">
                    {doc.userName}
                </b>

            </p>


            {/* =========================
                ACTION BUTTONS
            ========================= */}

            <div className="flex gap-3">

                {/* DOWNLOAD */}

                <button
                    onClick={downloadDocument}
                    className="
                        bg-blue-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        hover:bg-blue-700
                    "
                >
                    ⬇ Download
                </button>


                {/* DELETE */}

                <button
                    onClick={deleteDocument}
                    className="
                        bg-red-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        hover:bg-red-700
                    "
                >
                    🗑 Delete
                </button>

            </div>


            {/* =========================
                COMMENTS
            ========================= */}

            <Comments
                documentId={doc.id}
            />

        </div>

    );

}

export default DocumentCard;