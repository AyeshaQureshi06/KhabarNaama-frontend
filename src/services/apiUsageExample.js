/**
 * Example: How to use the API service in your React components
 */

import { imageToHeadline, videoToHeadline, mediaToHeadline } from "./api";

// ==========================================
// EXAMPLE 1: Using in UploadSection.js
// ==========================================

/*
import { imageToHeadline, videoToHeadline } from "../services/api";

function UploadSection() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const response = await imageToHeadline(
      file,
      "breaking news", // tone
      "english"        // language
    );

    if (response.success) {
      setResult(response.data);
      console.log("Headline:", response.data.headline);
      console.log("Category:", response.data.category);
      console.log("Confidence:", response.data.confidence);
    } else {
      setError(response.error);
    }

    setLoading(false);
  };

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const response = await videoToHeadline(file, "english");

    if (response.success) {
      setResult(response.data);
      console.log("Headline:", response.data.headline);
      console.log("Transcript:", response.data.transcript);
      console.log("Category:", response.data.category);
    } else {
      setError(response.error);
    }

    setLoading(false);
  };

  return (
    <div>
      {loading && <p>Processing...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {result && (
        <div>
          <p><strong>Headline:</strong> {result.headline}</p>
          <p><strong>Category:</strong> {result.category}</p>
          <p><strong>Processing Time:</strong> {result.processing_time}s</p>
          {result.confidence && <p><strong>Confidence:</strong> {result.confidence}</p>}
          {result.transcript && <p><strong>Transcript:</strong> {result.transcript}</p>}
        </div>
      )}
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      <input type="file" onChange={handleVideoUpload} accept="video/*" />
    </div>
  );
}
*/

// ==========================================
// EXAMPLE 2: Using in ConfigPanel.js with tone selection
// ==========================================

/*
import { imageToHeadline } from "../services/api";

function ConfigPanel() {
  const [tone, setTone] = useState("breaking news");
  const [language, setLanguage] = useState("english");
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleToneChange = (event) => {
    setTone(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    setLoading(true);
    const response = await imageToHeadline(selectedFile, tone, language);

    if (response.success) {
      setResult(response.data);
    } else {
      alert(`Error: ${response.error}`);
    }

    setLoading(false);
  };

  return (
    <div>
      <select value={tone} onChange={handleToneChange}>
        <option value="breaking news">Breaking News</option>
        <option value="casual">Casual</option>
        <option value="formal">Formal</option>
        <option value="urgent">Urgent</option>
      </select>

      <select value={language} onChange={handleLanguageChange}>
        <option value="english">English</option>
        <option value="urdu">Urdu</option>
      </select>

      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Generate Headline"}
      </button>

      {result && (
        <div>
          <h3>Generated Headline</h3>
          <p>{result.headline}</p>
          <p>Category: {result.category}</p>
          <p>Confidence: {result.confidence}</p>
        </div>
      )}
    </div>
  );
}
*/

// ==========================================
// EXAMPLE 3: Using mediaToHeadline (generic function)
// ==========================================

/*
import { mediaToHeadline } from "../services/api";

const generateHeadline = async (file, mediaType) => {
  const result = await mediaToHeadline(file, mediaType, {
    tone: "breaking news",
    language: "english",
  });

  if (result.success) {
    console.log("Success:", result.data);
  } else {
    console.log("Error:", result.error);
  }
};

// Usage
generateHeadline(imageFile, "image");
generateHeadline(videoFile, "video");
*/

// ==========================================
// EXAMPLE 4: Error Handling
// ==========================================

/*
const handleUpload = async (file) => {
  try {
    const response = await imageToHeadline(file);

    if (response.success) {
      console.log("Headline generated:", response.data.headline);
      // Update UI with response data
    } else {
      console.error("API Error:", response.error);
      // Show error message to user
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    // Handle unexpected errors
  }
};
*/

export default {};
