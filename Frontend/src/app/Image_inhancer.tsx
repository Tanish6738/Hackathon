import React, { useRef, useState } from "react";

const FaceRestoration: React.FC = () => {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [restoredSrc, setRestoredSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewSrc(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClickDropArea = () => {
    fileInputRef.current?.click();
  };

  const uploadImage = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      alert("Please select an image file.");
      return;
    }

    setLoading(true);
    setRestoredSrc(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay

      const response = await fetch("https://krish09bha-image-enhancer.hf.space/restore-face/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        alert("Error: " + error.detail);
        setLoading(false);
        return;
      }

      const blob = await response.blob();
      setRestoredSrc(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Upload or Drag & Drop Image for Face Restoration</h2>

      <div
        style={styles.dropArea}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClickDropArea}
      >
        <p>Drag & drop your image here, or click to select</p>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileChange(file);
          }}
        />
      </div>

      {previewSrc && (
        <div style={styles.imageBox}>
          <h4 style={styles.subheading}>Original Image</h4>
          <img src={previewSrc} alt="Preview" style={styles.image} />
        </div>
      )}

      <button style={styles.button} onClick={uploadImage}>
        Restore Face
      </button>

      {loading && (
        <div style={styles.loadingSpinner}>
          <div style={styles.spinner}></div>
          <p style={{ textAlign: "center" }}>Processing Image...</p>
        </div>
      )}

      {restoredSrc && (
        <div style={styles.resultBox}>
          <h4 style={styles.subheading}>Restored Image</h4>
          <img src={restoredSrc} alt="Restored" style={styles.image} />
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    margin: 0,
    marginTop: 25,
    padding: 20,
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
  },
  heading: {
    fontSize: 28,
    marginTop: 20,
    color: "#fff",
    textAlign: "center",
  },
  subheading: {
    color: "#fff",
    marginBottom: 10,
  },
  dropArea: {
    border: "2px dashed #fff",
    borderRadius: 10,
    padding: 40,
    textAlign: "center",
    width: "80%",
    maxWidth: 600,
    margin: "30px 0",
    cursor: "pointer",
    background: "#111",
  },
  button: {
    background: "linear-gradient(45deg, #007bff, #00d4ff)",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    fontSize: 18,
    borderRadius: 8,
    cursor: "pointer",
    marginTop: 20,
  },
  imageBox: {
    textAlign: "center",
    marginTop: 20,
  },
  image: {
    maxWidth: 300,
    maxHeight: 300,
    borderRadius: 10,
    boxShadow: "0 0 15px rgba(0, 136, 255, 0.5)",
  },
  loadingSpinner: {
    display: "block",
    marginTop: 20,
    textAlign: "center",
  },
  spinner: {
    border: "6px solid rgba(255, 255, 255, 0.2)",
    borderTop: "6px solid #00d4ff",
    borderRadius: "50%",
    width: 40,
    height: 40,
    animation: "spin 1s linear infinite",
    margin: "auto",
  },
  resultBox: {
    border: "2px dotted gold",
    padding: 25,
    borderRadius: 12,
    marginTop: 40,
    textAlign: "center",
    width: "90%",
    maxWidth: 800,
    backgroundColor: "#111",
  },
};

// Inject keyframes manually for spinner
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`,
  styleSheet.cssRules.length
);

export default FaceRestoration;
