import React, { useState } from "react";
import DocumentCard from "./DocumentCard";

function DocumentList({
    documents,
    myRole,
    onDelete
}) {

    const [searchTerm, setSearchTerm] = useState("");

    // =========================
    // SEARCH DOCUMENTS
    // =========================

    const filteredDocuments = documents.filter((doc) => {

        const search = searchTerm.toLowerCase();

        return (
            doc.title?.toLowerCase().includes(search) ||
            doc.fileName?.toLowerCase().includes(search) ||
            doc.description?.toLowerCase().includes(search)
        );

    });

    // =========================
    // DELETE DOCUMENT
    // =========================

    const handleDelete = (deletedDocumentId) => {

        if (onDelete) {
            onDelete(deletedDocumentId);
        }

    };

    return (

        <div className="mt-8">

            {/* =========================
                HEADER
            ========================= */}

            <div className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-4
                mb-5
            ">

                <h2 className="
                    text-3xl
                    font-bold
                    text-slate-800
                ">
                    📂 Documents
                </h2>


                {/* =========================
                    SEARCH BOX
                ========================= */}

                {documents.length > 0 && (

                    <div className="
                        relative
                        w-full
                        md:w-80
                    ">

                        <span className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                        ">
                            🔎
                        </span>

                        <input
                            type="text"
                            placeholder="Search documents..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-lg
                                pl-10
                                pr-4
                                py-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />

                    </div>

                )}

            </div>


            {/* =========================
                NO DOCUMENTS
            ========================= */}

            {documents.length === 0 ? (

                <p className="text-gray-500">
                    No documents uploaded yet.
                </p>

            ) : filteredDocuments.length === 0 ? (

                <div className="
                    bg-gray-50
                    border
                    rounded-xl
                    p-6
                    text-center
                ">

                    <p className="text-gray-500">
                        🔍 No documents found.
                    </p>

                    <p className="
                        text-sm
                        text-gray-400
                        mt-1
                    ">
                        Try searching with a different title or filename.
                    </p>

                </div>

            ) : (

                /* =========================
                   DOCUMENT GRID
                ========================= */

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-5
                ">

                    {filteredDocuments.map(doc => (

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