import React from "react";
import DocumentCard from "./DocumentCard";

function DocumentList({
    documents,
    setDocuments,
    myRole
}) {

    // =========================
    // REMOVE DOCUMENT FROM UI
    // =========================

    const handleDelete = (deletedDocumentId) => {

        setDocuments(prevDocuments =>
            prevDocuments.filter(
                doc => doc.id !== deletedDocumentId
            )
        );

    };

    return (

        <div className="mt-8">

            <h2 className="
                text-3xl
                font-bold
                mb-5
                text-slate-800
            ">
                📂 Documents
            </h2>

            {documents.length === 0 ? (

                <p className="text-gray-500">
                    No documents uploaded yet.
                </p>

            ) : (

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-5
                ">

                    {documents.map(doc => (

                        <DocumentCard
                            key={doc.id}
                            document={doc}
                            myRole={myRole}
                            onDelete={handleDelete}
                        />

                    ))}

                </div>

            )}

        </div>

    );

}

export default DocumentList;