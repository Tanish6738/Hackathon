// Knowledge base for Dhruv AI
const knowledgeBase = {
  general: [
    {
      keywords: ["what", "dhruv", "ai", "platform", "for"],
      response:
        "This platform helps match lost and found persons using face recognition. You can upload photos of missing or found individuals, and the system tries to match them automatically.",
    },
    {
      keywords: ["purpose", "goal", "aim"],
      response:
        "The purpose of Dhruv AI is to help locate lost individuals and reunite them with their loved ones using advanced face detection and recognition technologies. It serves as a guiding star to bring the lost back home.",
    },
    {
      keywords: ["name", "meaning", "dhruv"],
      response:
        "The name 'Dhruv' means 'pole star' in Sanskrit. Just as the pole star guides travelers, Dhruv AI aims to guide lost individuals back to their homes and families.",
    },
  ],

  technology: [
    {
      keywords: ["how", "system", "work"],
      response:
        "We use YOLO for face detection and DeepFace for facial verification. Uploaded images are compared with our database to find potential matches.",
    },
    {
      keywords: ["face", "detection", "yolo"],
      response:
        "Dhruv AI uses YOLOv5 for face detection. YOLOv5 is a state-of-the-art object detection model that can identify human faces with high accuracy, even in complex backgrounds and varying lighting conditions.",
    },
    {
      keywords: ["face", "matching", "verification", "deepface"],
      response:
        "For face matching, Dhruv AI uses DeepFace to compare images and verify whether a face from the 'found' list matches any face from the 'lost' list. The system uses advanced facial recognition algorithms to compare facial features.",
    },
    {
      keywords: ["api", "backend", "fastapi"],
      response:
        "Dhruv AI is built using FastAPI for creating the API and handling requests. FastAPI is a modern, fast web framework for building APIs with Python.",
    },
    {
      keywords: ["architecture", "system", "design"],
      response:
        "The architecture follows a modular design with clear separation of concerns between face detection, face matching, data storage, and API interfaces. This allows for easy maintenance and future enhancements.",
    },
  ],

  features: [
    {
      keywords: ["features", "capabilities"],
      response:
        "Core features of Dhruv AI include: 1) Face detection and cropping, 2) Storing metadata with face images, 3) Matching faces from 'lost' and 'found' databases, and 4) Real-time face recognition and matching from live feed.",
    },
    {
      keywords: ["metadata", "information", "store"],
      response:
        "Dhruv AI stores and manages metadata related to lost and found persons in JSON files. This metadata includes information like name, age, gender, and location where the person was lost or found.",
    },
    {
      keywords: ["real-time", "live", "feed", "camera"],
      response:
        "Dhruv AI supports real-time face recognition and matching from live camera feeds. This allows for continuous monitoring and immediate alerts when a match is found.",
    },
  ],

  security: [
    {
      keywords: ["data", "secure", "security", "privacy"],
      response:
        "Yes, your data is stored securely and is only used for the purpose of reuniting lost individuals. We implement industry-standard security measures to protect all uploaded information.",
    },
    {
      keywords: ["encryption", "protect"],
      response:
        "All data transmissions are encrypted using HTTPS, and sensitive information is stored using secure encryption methods to ensure your data remains protected.",
    },
  ],

  usage: [
    {
      keywords: ["upload", "lost", "person", "how"],
      response:
        "Click on 'Upload Lost Person', fill out the required information and upload a clear photo of the missing individual. Make sure the photo shows the face clearly for better matching results.",
    },
    {
      keywords: ["found", "someone", "what", "should", "do"],
      response:
        "Go to 'Upload Found Person', fill out the form and upload the person's image. The system will try to match it with missing person records and notify relevant parties if a match is found.",
    },
    {
      keywords: ["live", "feed", "photo", "can", "upload"],
      response:
        "Yes, use the 'Upload Live Feed' option. Provide camera location and a snapshot. We'll check for matches automatically against our database of missing persons.",
    },
  ],

  matching: [
    {
      keywords: ["know", "match", "how", "will"],
      response:
        "You'll see the match result immediately after uploading. If there's a close match, we'll also notify you via email. You can also check the 'Matches' section in your dashboard.",
    },
    {
      keywords: ["match", "confidence", "what", "is"],
      response:
        "It's a percentage that tells how closely the uploaded face matches an existing record. Higher confidence means a stronger match. We typically consider matches above 80% to be significant.",
    },
    {
      keywords: ["notified", "match", "found", "later"],
      response:
        "Yes, our system sends automatic emails when a new match is detected based on your uploaded data. You'll be notified as soon as a potential match is identified.",
    },
  ],

  troubleshooting: [
    {
      keywords: ["photo", "isn't", "uploading", "what", "should", "do"],
      response:
        "Ensure it's a JPG/PNG under 5MB. Also, make sure you're filling out all required fields. If problems persist, try using a different browser or contact our support team.",
    },
    {
      keywords: ["422", "unprocessable", "entity", "error", "why"],
      response:
        "This usually means some form fields are missing. Please double-check all inputs before submitting. Make sure all required fields are completed and the image contains a clearly visible face.",
    },
    {
      keywords: ["edit", "delete", "submission", "can"],
      response:
        "Currently, editing/deleting isn't available via UI. Please contact support with your face ID, and our team will assist you with modifying or removing your submission.",
    },
    {
      keywords: ["email", "didn't", "get", "what", "if"],
      response:
        "Please check your spam folder. If still not received, contact our support via email or chatbot. Make sure to provide your submission details so we can investigate the issue.",
    },
  ],

  deployment: [
    {
      keywords: ["deploy", "installation", "setup"],
      response:
        "You can deploy Dhruv AI locally, using Docker, or on cloud platforms like AWS, Azure, or GCP. Check the Deployment section in the documentation for detailed instructions.",
    },
    {
      keywords: ["requirements", "system", "hardware"],
      response:
        "Minimum hardware requirements include: CPU: 4+ cores, 2.5GHz+, RAM: 8GB minimum (16GB recommended), Storage: 20GB+ SSD, and preferably an NVIDIA GPU with CUDA support for optimal performance.",
    },
    {
      keywords: ["docker", "container"],
      response:
        "For Docker deployment, you can build the image with 'docker build -t dhruv-ai:latest .' and run it with 'docker run -d -p 8000:8000 --name dhruv-ai dhruv-ai:latest'.",
    },
    {
      keywords: ["cloud", "aws", "azure", "gcp"],
      response:
        "For cloud deployment, you can use services like AWS Elastic Beanstalk or ECS, Azure App Service or AKS, or Google Cloud Run or GKE. These platforms provide scalability and high availability.",
    },
  ],

  api: [
    {
      keywords: ["api", "endpoints", "reference"],
      response:
        "Dhruv AI provides several API endpoints including /upload_lost, /upload_found, /upload_live_feed, /search_face/{face_id}, /matches, and /statistics. You can find detailed documentation in the API Reference section.",
    },
    {
      keywords: ["upload", "lost", "person"],
      response:
        "To upload a lost person, use the POST /upload_lost endpoint with parameters like name, gender, age, where_lost, and an image file containing a clear face.",
    },
    {
      keywords: ["upload", "found", "person"],
      response:
        "To upload a found person, use the POST /upload_found endpoint with parameters like name (optional), gender (optional), age (optional), where_found, and an image file containing a clear face.",
    },
    {
      keywords: ["authentication", "security", "api", "key"],
      response:
        "The Dhruv AI API uses API keys for authentication. Include your API key in the X-API-Key header when making requests.",
    },
  ],

  future: [
    {
      keywords: ["future", "roadmap", "plans"],
      response:
        "Future plans for Dhruv AI include advanced face recognition models, multi-modal recognition, age progression capabilities, real-time processing improvements, and integrations with law enforcement systems and social media platforms.",
    },
    {
      keywords: ["contribute", "involvement", "open", "source"],
      response:
        "Dhruv AI is an open-source project, and contributions from the community are welcome. Whether you're a developer, data scientist, designer, or domain expert, there are many ways to get involved and help improve the system.",
    },
    {
      keywords: ["research", "directions"],
      response:
        "Research directions include privacy-preserving recognition, cross-cultural face recognition improvements, explainable AI for transparency, and adversarial robustness against attacks.",
    },
  ],
}

// Function to find the best matching response from the knowledge base
export function generateResponse(userMessage) {
  const message = userMessage.toLowerCase()
  let bestMatch = null
  let highestScore = 0

  // Check all categories in the knowledge base
  for (const category in knowledgeBase) {
    for (const item of knowledgeBase[category]) {
      const score = calculateMatchScore(message, item.keywords)
      if (score > highestScore) {
        highestScore = score
        bestMatch = item.response
      }
    }
  }

  // If no good match is found, return a default response
  if (highestScore < 0.3) {
    return "I'm not sure I understand. Could you please rephrase your question about Dhruv AI? You can ask about face detection, face matching, API endpoints, deployment, or future plans."
  }

  return bestMatch
}

// Calculate a match score based on keyword presence
function calculateMatchScore(message, keywords) {
  let matchCount = 0

  for (const keyword of keywords) {
    if (message.includes(keyword.toLowerCase())) {
      matchCount++
    }
  }

  // Return a score between 0 and 1
  return matchCount / keywords.length
}

// Additional helper functions for the chatbot
export function getGreeting() {
  const hours = new Date().getHours()
  if (hours < 12) {
    return "Good morning! I'm Dhruv AI Assistant. How can I help you today?"
  } else if (hours < 18) {
    return "Good afternoon! I'm Dhruv AI Assistant. How can I help you today?"
  } else {
    return "Good evening! I'm Dhruv AI Assistant. How can I help you today?"
  }
}

// Function to handle special commands
export function handleSpecialCommands(message) {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage === "help") {
    return "You can ask me about Dhruv AI's features, technology, deployment, API, or future plans. Try questions like 'What is Dhruv AI?', 'How does face matching work?', or 'How do I deploy Dhruv AI?'"
  }

  if (lowerMessage === "features") {
    return "Core features of Dhruv AI include:\n1. Face detection and cropping\n2. Storing metadata with face images\n3. Matching faces from 'lost' and 'found' databases\n4. Real-time face recognition from live feed"
  }

  return null // Not a special command
}

// Get suggested questions for the chatbot
export function getSuggestedQuestions() {
  return [
    "What is this platform for?",
    "How does the system work?",
    "Is my data secure?",
    "How do I upload details of a lost person?",
    "How will I know if there's a match?",
    "What if my photo isn't uploading?",
  ]
}
