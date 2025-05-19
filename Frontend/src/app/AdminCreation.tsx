import React, { useState } from "react";

const AdminRegistration = () => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    age: "",
    where_found: "",
    your_name: "",
    organization: "",
    designation: "",
    mobile_no: "",
    email_id: "",
    full_name: "",
    email: "",
    role: "admin"
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("https://krish09bha-dhruvai.hf.space/create_admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });      if (response.ok) {
        setMessage("Admin created successfully!");
        setForm({
          name: "",
          gender: "",
          age: "",
          where_found: "",
          your_name: "",
          organization: "",
          designation: "",
          mobile_no: "",
          email_id: "",
          full_name: "",
          email: "",
          role: "admin"
        });
      } else {
        const data = await response.json();
        setMessage(data.detail || "Failed to create admin");
      }
    } catch (err) {
      setMessage("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Registration</h2>      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full border px-2 py-1" />
        </div>
        <div>
          <label className="block mb-1">Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange} required className="w-full border px-2 py-1">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Age</label>
          <input name="age" type="number" value={form.age} onChange={handleChange} required className="w-full border px-2 py-1" />
        </div>
        <div>
          <label className="block mb-1">Organization</label>
          <input name="organization" value={form.organization} onChange={handleChange} required className="w-full border px-2 py-1" />
        </div>
        <div>
          <label className="block mb-1">Designation</label>
          <input name="designation" value={form.designation} onChange={handleChange} required className="w-full border px-2 py-1" />
        </div>
        <div>
          <label className="block mb-1">Mobile No</label>
          <input name="mobile_no" type="tel" value={form.mobile_no} onChange={handleChange} required className="w-full border px-2 py-1" />
          <label className="block mb-1">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full border px-2 py-1" />
        </div>
        <div>
          <label className="block mb-1">Role</label>
          <input name="role" value={form.role} onChange={handleChange} required className="w-full border px-2 py-1" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>
          {loading ? "Registering..." : "Register Admin"}
        </button>
      </form>
      {message && <div className="mt-4 text-center text-red-600">{message}</div>}
    </div>
  );
};

export default AdminRegistration;