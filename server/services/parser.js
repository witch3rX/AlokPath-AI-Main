// --- Converted to CJS ---
const pdf = require('pdf-parse'); // This will now work
const mammoth = require('mammoth');
// --- End Conversion ---

/**
 * Extracts text from a file buffer.
 * @param {Buffer} buffer The file's data
 * @param {string} mimetype The file's type (e.g., 'application/pdf')
 * @returns {Promise<string>} The extracted text
 */
async function extractText(buffer, mimetype) {
    if (mimetype === 'application/pdf') {
        try {
            // Call 'pdf' directly. This is the correct v1.x usage.
            const data = await pdf(buffer); 
            return data.text;
        } catch (error) {
            console.error('Error parsing PDF:', error);
            throw new Error('Failed to parse PDF file.');
        }
    } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        try {
            const result = await mammoth.extractRawText({ buffer });
            return result.value;
        } catch (error) {
            console.error('Error parsing DOCX:', error);
            throw new Error('Failed to parse DOCX file.');
        }
    } else if (mimetype === 'text/plain') {
        return buffer.toString('utf8');
    } else {
        throw new Error(`Unsupported file type: ${mimetype}. Please upload a PDF or DOCX.`);
    }
}

// --- Converted to CJS ---
module.exports = { extractText };
// --- End Conversion ---