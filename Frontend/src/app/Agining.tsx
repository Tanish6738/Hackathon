import React, { useRef, useState } from 'react';

const Ageing: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputImage, setInputImage] = useState<string | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [sourceAge, setSourceAge] = useState<number>(25);
  const [targetAge, setTargetAge] = useState<number>(65);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setInputImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (fileInputRef.current) fileInputRef.current.files = e.dataTransfer.files;
    const reader = new FileReader();
    reader.onload = () => setInputImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) return alert('Please select an image.');

    setLoading(true);
    setScanning(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('source_age', sourceAge.toString());
    formData.append('target_age', targetAge.toString());

    try {
      const res = await fetch('http://localhost:8000/age-face/', {
        method: 'POST',
        body: formData,
      });

      setLoading(false);
      setScanning(false);

      if (!res.ok) {
        const err = await res.json();
        alert(err.detail || 'Error processing image.');
        return;
      }

      const blob = await res.blob();
      setResultBlob(blob);
      setOutputImage(URL.createObjectURL(blob));
    } catch (error: any) {
      setLoading(false);
      setScanning(false);
      alert('Error: ' + error.message);
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(resultBlob);
    link.download = 'aged_face.png';
    link.click();
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center px-6 py-10">
      <h2 className="text-4xl font-bold mb-8">🧓 Face Aging App</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl border border-dotted border-white p-6 rounded-xl space-y-4 bg-white/10"
      >
        <div
          className="w-full p-6 border-2 border-dotted border-white text-center rounded-lg cursor-pointer hover:bg-white/10 transition"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          📁 Drag & Drop Image Here or Click to Upload
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Source Age:</label>
          <input
            type="number"
            className="w-full px-4 py-2 rounded bg-black text-white border border-white"
            value={sourceAge}
            onChange={(e) => setSourceAge(parseInt(e.target.value))}
            required
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Target Age:</label>
          <input
            type="number"
            className="w-full px-4 py-2 rounded bg-black text-white border border-white"
            value={targetAge}
            onChange={(e) => setTargetAge(parseInt(e.target.value))}
            required
          />
        </div>

        <div className="flex justify-between gap-4 mt-4">
          <button
            type="submit"
            className="flex-1 bg-white text-black font-semibold py-2 rounded hover:bg-gray-200"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
          >
            Download Result
          </button>
        </div>
        {loading && (
          <div className="w-full flex justify-center mt-4">
            <div className="loader border-t-4 border-b-4 border-white rounded-full w-10 h-10 animate-spin"></div>
          </div>
        )}
      </form>

      {inputImage && (
        <div className="flex justify-center items-center gap-6 mt-10 flex-wrap">
          <div className="relative border border-white p-2 rounded-lg">
            {scanning && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-scan z-10"></div>
            )}
            <img src={inputImage} alt="Before" className="w-96 h-auto rounded" />
            <p className="text-center mt-2">Before</p>
          </div>
          {outputImage && (
            <div className="border border-white p-2 rounded-lg">
              <img src={outputImage} alt="After" className="w-96 h-auto rounded" />
              <p className="text-center mt-2">After</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Ageing;