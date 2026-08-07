import React from "react";
import axios from "axios";
import Comments from "./Comments";

function DocumentCard({ document: doc }) {

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

            <p
                className="
                    text-gray-600
                    mb-3
                "
            >
                {doc.description}
            </p>

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

            <button
                onClick={downloadDocument}
                className="
                    inline-block
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

            <Comments
                documentId={doc.id}
            />

        </div>

    );

}

export default DocumentCard;