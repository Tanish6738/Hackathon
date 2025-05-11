# Dhruv - AI : A Guiding Star for Uniting Lost Souls

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Contributions](https://img.shields.io/badge/contributions-welcome-orange)

---

## ✨ Overview

**Dhruv - AI** is an intelligent, real-time Lost & Found system designed to reunite missing individuals with their families at large public gatherings, disaster zones, and more. Leveraging advanced facial recognition, instant alerts, and a dynamic database, Dhruv AI bridges the gap between lost souls and their loved ones—anywhere, anytime.

---

## 🔍 Problem Statement

In large public gatherings such as fairs, festivals, or disaster-affected areas, it becomes extremely difficult and time-consuming to manually identify and reunite lost individuals—especially children and elderly people—with their families. Traditional methods rely heavily on verbal communication, public announcements, or paper records, which are inefficient, prone to human error, and often result in delays or missed reunions.

There is a critical need for an automated, intelligent system that can:
- Accurately detect and recognize faces
- Match them against a dynamic database of missing/found individuals
- Instantly notify relevant parties through a secure and fast communication channel

This project addresses the problem by developing a Lost & Found system powered by facial recognition, enabling quick identification and real-time alerts to assist authorities and families in reuniting individuals effectively.

---

## 🚀 Key Features

- **Real-time facial recognition** using advanced AI models
- **Dynamic, live-updated database** (edge + cloud)
- **Multi-platform integration:** CCTV, mobile cameras, drones, kiosks
- **Instant multichannel alerts:** SMS, WhatsApp, email
- **Community reporting** via app/web
- **Multilingual & accessible UI**
- **Open API** for NGOs, police, rescue teams, event organizers
- **Scalable architecture** for various environments (fairs, festivals, schools, etc.)
- **Image enhancement & preprocessing** for better recognition accuracy
- **Secure data handling, privacy measures, and authentication** (using Clerk)
- **User-friendly interface** for families and authorities
- **Admin dashboard** for monitoring and managing the system
- **Aging tool:** Generate projected images of lost individuals after a time gap
- **Integration with existing systems** (e.g., police databases, NGO networks)

---

## 🖼️ Demo

> _Add screenshots or a demo video link here to showcase the UI and workflow._

---

## ⚖️ Comparison with Existing Solutions

| Feature / Factor         | Dhruv AI (Indian Railways)                  | Lost & Found Facial Recognition System (This Project)         |
|-------------------------|---------------------------------------------|--------------------------------------------------------------|
| **Deployment Area**     | Primarily at railway stations               | Scalable to fairs, festivals, disaster zones, schools, etc.  |
| **Database Handling**   | Static centralized database                 | Dynamic, live-updated database (edge + cloud)                |
| **Target Users**        | Tracking criminals/missing children         | All missing individuals, including elderly                   |
| **Facial Recognition**  | CCTV in railway premises                    | Mobile cams, drones, kiosks, and more                        |
| **Alert System**        | Internal notification to authorities        | Real-time multichannel alerts to families/officials          |
| **Community Reporting** | No                                          | Yes, via app/web                                             |
| **Language & Accessibility** | Limited                              | Multilingual & accessible UI                                 |
| **Integration Potential** | Specific to railway infrastructure        | Open API for NGOs, police, rescue teams, event organizers    |

**Key Differentiator:**

While Dhruv AI is a station-specific surveillance tool, this system is a universal, real-time, multi-platform solution focused on reuniting all missing individuals—anywhere, not just at stations.

---

## 🏗️ Project Structure

```
Backend/
  app.py
  Backend.md
  index.html
  requirements.txt
  yolov11s-face.pt
  db/
    admins/
      Admin.json
LostAndFoundUpdated 3/
  src/
    app/
    components/
    hooks/
    lib/
    services/
    styles/
  public/
  ...
README.md
```

---

## 🛠️ Tech Stack

- **Backend:** Python (Flask/FastAPI), YOLOv11s for facial recognition
- **Frontend:** React (TypeScript), Vite
- **Database:** JSON-based (for demo), scalable to SQL/NoSQL
- **Cloud/Edge Integration:** Ready for deployment on cloud and edge devices
- **Notification Services:** SMS, WhatsApp, Email (integrated via APIs)

---

## 🚦 Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm / pnpm

### Backend Setup

1. Navigate to the `Backend` directory:
   ```sh
   cd Backend
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run the backend server:
   ```sh
   python app.py
   ```

### Frontend Setup

1. Navigate to the `LostAndFoundUpdated 3/` directory:
   ```sh
   cd "LostAndFoundUpdated 3"
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Start the frontend:
   ```sh
   pnpm dev
   ```

> _If you encounter issues, ensure Python and Node.js are correctly installed and available in your PATH._

---

## 📦 API & Integration

- Open API endpoints for third-party integration (see `src/components/Documentation/APIEndpoint.tsx`)
- Example usage and code samples available in the documentation section

**Sample Endpoint:**
```http
POST /api/found-person
Content-Type: application/json
{
  "name": "John Doe",
  "photo": "base64string...",
  "location": "Event Hall 3"
}
```

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements, bug fixes, or new features.

---

## 📄 License

This project is licensed under the MIT License.

---

## 📬 Contact & Support

For questions, support, or partnership inquiries, please contact the project maintainers.

---

## ❓ FAQ

**Q: Is my data secure?**
A: Yes, all data is handled with strict privacy and security measures.

**Q: Can I deploy this on my own infrastructure?**
A: Absolutely! The system is designed to be easily deployable on various environments.

**Q: How can I contribute?**
A: Fork the repo, make your changes, and submit a pull request.