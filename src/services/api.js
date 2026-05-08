/**
 * API Service - Handles all API calls for image and video headline generation
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

/**
 * Generate headline from image
 * @param {File} imageFile - Image file (JPG, PNG)
 * @param {string} tone - Headline tone (default: "breaking news")
 * @param {string} language - Output language (english/urdu, default: english)
 * @returns {Promise<HeadlineResponse>} - Response with category, confidence, and headline
 */
export const imageToHeadline = async (
  imageFile,
  tone = "breaking news",
  language = "english"
) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("tone", tone);
    formData.append("language", language);

    const response = await fetch(`${API_BASE_URL}/api/image-to-headline`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.detail || `Error: ${response.statusText}`
      );
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Image to headline error:", error);
    return {
      success: false,
      error: error.message || "Failed to generate headline from image",
    };
  }
};

/**
 * Generate headline from video
 * @param {File} videoFile - Video file (MP4, AVI, etc)
 * @param {string} language - Output language (english/urdu, default: english)
 * @returns {Promise<HeadlineResponse>} - Response with category, transcript, and headline
 */
export const videoToHeadline = async (
  videoFile,
  language = "english"
) => {
  try {
    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("language", language);

    const response = await fetch(`${API_BASE_URL}/api/video-to-headline`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.detail || `Error: ${response.statusText}`
      );
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Video to headline error:", error);
    return {
      success: false,
      error: error.message || "Failed to generate headline from video",
    };
  }
};

/**
 * Generate headline from any media file (image or video)
 * @param {File} file - Media file (image or video)
 * @param {string} type - Media type ("image" or "video")
 * @param {Object} options - Additional options
 * @param {string} options.tone - Headline tone (for images)
 * @param {string} options.language - Output language
 * @returns {Promise<HeadlineResponse>} - Response with headline and metadata
 */
export const mediaToHeadline = async (
  file,
  type = "image",
  options = {}
) => {
  const { tone = "breaking news", language = "english" } = options;

  if (type === "image") {
    return imageToHeadline(file, tone, language);
  } else if (type === "video") {
    return videoToHeadline(file, language);
  } else {
    return {
      success: false,
      error: "Invalid media type. Use 'image' or 'video'",
    };
  }
};

export default {
  imageToHeadline,
  videoToHeadline,
  mediaToHeadline,
};
