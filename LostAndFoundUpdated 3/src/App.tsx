import HomePage from "./app/HomePage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from "./app/AboutPage";
import Header from "./components/header";
import HowItWorkPage from "./app/HowItWorkPage";
import Footer from "./components/footer";
import ContactPage from "./app/ContactPage";
import UserPage from "./app/UserPage";
import DocumentationPage from "./app/DocumentationPage";
import EnhancedChatBot from "./components/enhanced-chat-bot.js"
import ProtectedRoute from "./components/ProtectedRoute";
import SignInPage from "./components/SignInPage";
import Dashboard from "./components/Dashboard.js";
import AdminDashboard from "./app/AdminDashboard.js";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScrollToTop from "./ScrollToTop.js"
import FaceRestoration from "./app/Image_inhancer.js";
import Ageing from "./app/Agining.js";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Router>
      <Header />
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/documentation" element={
            <ProtectedRoute>
              <DocumentationPage />
            </ProtectedRoute>
          }/>
          <Route path="/admin-dashboard" element={
              <AdminDashboard />
          }/>
          <Route path="/dashboard" element={
              <Dashboard />
          }/>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/Enhancer" element={<FaceRestoration />} />
          <Route path="/Aging" element={<Ageing />} />
        </Routes>
        <EnhancedChatBot />
        <Footer />
      </Router>
    </QueryClientProvider>
    </>
  );
}

export default App;