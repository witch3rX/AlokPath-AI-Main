// This is your complete, working feature page
import React, { useState } from 'react';
// We are in the 'pages' folder, so we go '../components'
import FileUploader from '../components/FileUploader'; 
import ResultsDisplay from '../components/ResultsDisplay';

export default function CareerAdvisorPage() {
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // This is the logic from your old App.js, now encapsulated
    return (
        <main className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-glass backdrop-blur-lg border border-border-color p-6 rounded-2xl shadow-2xl">
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                    Upload your CV or Transcript
                </h2>
                <p className="text-text-secondary mb-6">
                    Upload a .PDF or .DOCX file. Your document will be analyzed to suggest relevant career paths.
                </p>
                <FileUploader 
                    setResults={setResults} 
                    setIsLoading={setIsLoading} 
                    setError={setError} 
                />
            </div>

            <div className="bg-glass backdrop-blur-lg border border-border-color p-6 rounded-2xl shadow-2xl">
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                    Suggested Career Paths
                </h2>
                <div className="h-[450px] overflow-y-auto pr-2">
                    <ResultsDisplay 
                        results={results} 
                        isLoading={isLoading} 
                        error={error} 
                    />
                </div>
            </div>
        </main>
    );
}