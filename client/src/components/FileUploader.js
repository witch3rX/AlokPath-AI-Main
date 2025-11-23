import React, { useState } from 'react';

export default function FileUploader({ setResults, setIsLoading, setError }) {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setError(null); // Clear previous errors
        }
    };

    const handleDrag = (e, isOver) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(isOver);
    };

    const handleDrop = (e) => {
        handleDrag(e, false);
        const selectedFile = e.dataTransfer.files[0];
        if (selectedFile && (selectedFile.type === "application/pdf" || selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setError(null);
        } else {
            setError("Invalid file type. Please drop a PDF or DOCX.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file first.');
            return;
        }

        setIsLoading(true);
        setResults(null);
        setError(null);

        const formData = new FormData();
        formData.append('cvFile', file);

        try {
            // --- MAKE SURE THIS URL IS CORRECT ---
            const response = await fetch('http://localhost:5000/api/career-advisor/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Failed to analyze file.');
            }

            const data = await response.json();
            setResults(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* --- CUSTOM DRAG-AND-DROP AREA --- */}
            <label 
                onDragOver={(e) => handleDrag(e, true)}
                onDragEnter={(e) => handleDrag(e, true)}
                onDragLeave={(e) => handleDrag(e, false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-border-color border-dashed rounded-lg cursor-pointer transition-all
                            ${isDragOver ? 'border-accent bg-secondary-bg' : 'hover:border-gray-500'}`}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {/* Upload Icon */}
                    <svg className={`w-10 h-10 mb-3 ${isDragOver ? 'text-accent' : 'text-text-secondary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h.5A3.5 3.5 0 0111 2.5h2A3.5 3.5 0 0116.5 6H17a4 4 0 014 4v5a4 4 0 01-4 4H7z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15l-3-3m0 0l3-3m-3 3h6"></path></svg>
                    <p className={`mb-2 text-sm ${isDragOver ? 'text-accent' : 'text-text-secondary'}`}>
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-text-secondary">PDF or DOCX (MAX. 10MB)</p>
                </div>
                <input 
                    id="dropzone-file" 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.docx"
                    onChange={handleFileChange} 
                />
            </label>
            
            {/* --- FILE PREVIEW & BUTTON --- */}
            {fileName && (
                <div className="text-sm text-center text-accent">
                    Selected: {fileName}
                </div>
            )}
            
            <button
                type="submit"
                className="w-full bg-accent text-primary-bg font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-accent-hover transition duration-300 ease-in-out"
            >
                Analyze Career Path
            </button>
        </form>
    );
}