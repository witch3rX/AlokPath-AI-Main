import React from 'react';

// Helper function to format category names for display
const formatCategoryName = (key) => {
    switch (key) {
        case 'skill': return 'Technical Skills';
        case 'degree': return 'Education/Degree';
        case 'soft_skill': return 'Soft Skills';
        case 'experience': return 'Experience Keywords';
        case 'general': return 'General Keywords';
        default: return key.charAt(0).toUpperCase() + key.slice(1); // Capitalize
    }
};

export default function ResultsDisplay({ results, isLoading, error }) {

    // --- LOADING STATE ---
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-text-secondary">
                {/* Custom Spinner */}
                <svg className="animate-spin w-10 h-10 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-lg font-semibold">Analyzing your profile...</p>
                <p className="text-sm">This may take a few seconds.</p>
            </div>
        );
    }

    // --- ERROR STATE ---
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-red-400 bg-red-900/20 p-4 rounded-lg">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="mt-4 text-lg font-semibold">An Error Occurred</h3>
                <p className="text-center text-red-300">{error}</p>
            </div>
        );
    }

    // --- EMPTY STATE (NO RESULTS) ---
    if (!results) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-text-secondary text-center">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p className="mt-4 text-lg">Your suggested careers will appear here.</p>
            </div>
        );
    }
    
    // --- NO MATCHES FOUND STATE ---
    if (results.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-text-secondary text-center">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                <p className="mt-4 text-lg">No specific career matches found.</p>
                <p className="text-sm">Try expanding the keywords in the server's 'expert_system.js' file.</p>
            </div>
        );
    }

    // --- SUCCESS: RENDER RESULTS ---
    return (
        <div className="space-y-6">
            {results.map((career, index) => {
                // Destructure the new data for easier access
                const { id, score, details, skillAnalysis, scoreBreakdown } = career;
                
                // Determine rank text
                let rankText = 'Top Match';
                if (index === 1) rankText = 'Second Match';
                if (index === 2) rankText = 'Third Match';

                return (
                    <div key={id} 
                         className="p-5 border border-border-color rounded-lg shadow-lg bg-secondary-bg/50 transition-all duration-300 hover:shadow-2xl hover:border-accent/50"
                    >
                        {/* --- RANK & SCORE BADGE --- */}
                        <span 
                            className="inline-block bg-accent/20 text-accent text-xs font-bold px-3 py-1 rounded-full mb-3"
                        >
                            {rankText} (Weighted Score: {score})
                        </span>
                        
                        {/* --- TITLE & DESCRIPTION --- */}
                        <h3 className="text-2xl font-bold text-text-primary">
                            {details.title}
                        </h3>
                        <p className="mt-2 text-text-secondary text-sm"> {/* Slightly smaller description */}
                            {details.description}
                        </p>
                        
                        {/* --- NEW: SCORE BREAKDOWN SECTION --- */}
                        <div className="mt-4 p-3 bg-primary-bg/50 border border-border-color rounded-md">
                            <h4 className="font-semibold text-text-primary mb-2">Score Contribution:</h4>
                            <div className="text-xs text-text-secondary space-y-1">
                                {Object.entries(scoreBreakdown)
                                    .filter(([, points]) => points > 0) // Only show categories with points
                                    .map(([category, points]) => (
                                        <div key={category} className="flex justify-between">
                                            <span>{formatCategoryName(category)}:</span>
                                            <span className="font-medium text-accent/80">+{points} pts</span>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* --- NEW: SKILL GAP ANALYSIS SECTION --- */}
                        <div className="mt-5">
                            <h4 className="font-semibold text-text-primary mb-3">Skill Analysis:</h4>
                            
                            {/* Overlap Summary */}
                            <div className="mb-4 text-sm text-center bg-primary-bg/50 p-2 rounded">
                                You have <span className="font-bold text-accent">{skillAnalysis.matchedSkills.length}</span> out of <span className="font-bold">{skillAnalysis.requiredSkillCount}</span> key skills mentioned. 
                                (<span className="font-semibold">{skillAnalysis.overlapPercentage}%</span> Match)
                            </div>

                            {/* Matched Skills */}
                            {skillAnalysis.matchedSkills.length > 0 && (
                                <div className="mb-3">
                                    <h5 className="text-xs font-semibold text-green-400 mb-1 uppercase">Skills Matched (from CV):</h5>
                                    <div className="flex flex-wrap gap-1">
                                        {skillAnalysis.matchedSkills.map(skill => (
                                            <span key={skill} className="bg-green-900/50 border border-green-700 text-green-300 text-xs px-2 py-0.5 rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Missing Skills */}
                            {skillAnalysis.missingSkills.length > 0 && (
                                <div>
                                    <h5 className="text-xs font-semibold text-yellow-400 mb-1 uppercase">Key Skills to Develop:</h5>
                                    <div className="flex flex-wrap gap-1">
                                        {skillAnalysis.missingSkills.map(skill => (
                                            <span key={skill} className="bg-yellow-900/50 border border-yellow-700 text-yellow-300 text-xs px-2 py-0.5 rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                );
            })}
        </div>
    );
}