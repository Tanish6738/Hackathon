import React from 'react';

interface FoundPersonFormProps {
  found: any;
  setFound: (data: any) => void;
  setApiResponse: (data: any) => void;
  setMessage: (msg: string) => void;
  foundFilePreview: string | null;
  setFoundFilePreview: (url: string | null) => void;
  genderOptions: string[];
  organizationOptions: string[];
  designationOptions: string[];
  GuideResponsePanel: React.FC<{ response: any }>;
  guideFoundResponse: any;
}

const FoundPersonForm: React.FC<FoundPersonFormProps> = ({
  found,
  setFound,
  setApiResponse,
  setMessage,
  foundFilePreview,
  setFoundFilePreview,
  genderOptions,
  organizationOptions,
  designationOptions,
  GuideResponsePanel,
  guideFoundResponse,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, files } = e.target as HTMLInputElement;
    if (id === 'file' && files && files[0]) {
      const file = files[0];
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setMessage('Only JPG and PNG files are allowed.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size must be less than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = ev => setFoundFilePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
      setFound((prev: any) => ({ ...prev, [id]: file }));
    } else {
      setFound((prev: any) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(found).forEach(([key, value]) => {
      if (key === 'file' && value) formData.append('file', value as File);
      else if (key !== 'file') formData.append(key, value as string);
    });
    try {
      const response = await fetch('http://localhost:8000/upload_found', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setApiResponse(data);
      setMessage(data.message || JSON.stringify(data));
    } catch (error: any) {
      setApiResponse({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
      setMessage(error instanceof Error ? `Error: ${error.message}` : 'An unknown error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-semibold text-blue-800">Name</label>
            <input type="text" id="name" required value={found.name} onChange={handleChange} placeholder="Name (or 'Unknown')" className="input-form" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="gender" className="text-sm font-semibold text-blue-800">Gender</label>
            <select id="gender" required value={found.gender} onChange={handleChange} className="input-form">
              <option value="" disabled>Select Gender</option>
              {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="age" className="text-sm font-semibold text-blue-800">Age</label>
            <input type="number" id="age" required value={found.age} onChange={handleChange} placeholder="Age" className="input-form" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="where_found" className="text-sm font-semibold text-blue-800">Where Found</label>
            <input type="text" id="where_found" required value={found.where_found} onChange={handleChange} placeholder="Where Found" className="input-form" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="your_name" className="text-sm font-semibold text-blue-800">Your Name</label>
            <input type="text" id="your_name" required value={found.your_name} onChange={handleChange} placeholder="Your Name" className="input-form bg-gray-100" readOnly />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="organization" className="text-sm font-semibold text-blue-800">Organization</label>
            <select id="organization" required value={found.organization} onChange={handleChange} className="input-form">
              <option value="" disabled>Select Organization</option>
              {organizationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="designation" className="text-sm font-semibold text-blue-800">Designation</label>
            <select id="designation" required value={found.designation} onChange={handleChange} className="input-form">
              <option value="" disabled>Select Designation</option>
              {designationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="user_id" className="text-sm font-semibold text-blue-800">User ID</label>
            <input type="text" id="user_id" required value={found.user_id} onChange={handleChange} placeholder="User ID" className="input-form bg-gray-100" readOnly />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="mobile_no" className="text-sm font-semibold text-blue-800">Mobile No</label>
            <input type="text" id="mobile_no" required value={found.mobile_no} onChange={handleChange} placeholder="Mobile Number" className="input-form bg-gray-100" readOnly />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email_id" className="text-sm font-semibold text-blue-800">Email ID</label>
            <input type="email" id="email_id" required value={found.email_id} onChange={handleChange} placeholder="Email Address" className="input-form bg-gray-100" readOnly />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="file" className="text-sm font-semibold text-blue-800">Photo of Found Person</label>
          <input type="file" id="file" required onChange={handleChange} className="input-form-file" accept="image/jpeg,image/png" />
          <p className="text-xs text-gray-500 mt-1">Upload a clear face photo (JPG/PNG, max 5MB).</p>
          {foundFilePreview && <img src={foundFilePreview} alt="Preview" className="mt-2 rounded shadow max-h-40 mx-auto border-2 border-blue-200" />}
        </div>
      </div>
      <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition text-lg tracking-wide flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        Upload Found Person
      </button>
      <GuideResponsePanel response={guideFoundResponse} />
    </form>
  );
};

export default FoundPersonForm;
