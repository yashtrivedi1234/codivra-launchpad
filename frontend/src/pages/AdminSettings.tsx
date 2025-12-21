import React, { useState } from "react";
import axios from "axios";
import { Loader2, Lock, Mail, Save } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminSettings = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpMessage, setOtpMessage] = useState("");

  const handleSendOtp = async () => {
    setOtpLoading(true);
    setOtpError("");
    setOtpMessage("");
    try {
      const token = window.localStorage.getItem("admin_token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/send-email-otp`,
        { email },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );
      setOtpSent(true);
      const data = res.data as { message?: string };
      setOtpMessage(data.message || "OTP sent to email");
    } catch (err: any) {
      setOtpError(
        err.response?.data?.error || "Failed to send OTP. Try again."
      );
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpLoading(true);
    setOtpError("");
    setOtpMessage("");
    try {
      const token = window.localStorage.getItem("admin_token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/verify-email-otp`,
        { email, otp },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );
      setOtpVerified(true);
      const data = res.data as { message?: string };
      setOtpMessage(data.message || "OTP verified");
    } catch (err: any) {
      setOtpError(
        err.response?.data?.error || "Failed to verify OTP. Try again."
      );
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const token = window.localStorage.getItem("admin_token");
      // If email is being updated, require OTP verification
      if (email && !otpVerified) {
        setError("Please verify OTP before updating email.");
        setLoading(false);
        return;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/update-credentials`,
        { email: email || undefined, password: password || undefined },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        }
      );
      const data = res.data as { message?: string };
      setMessage(data.message || "Updated successfully");
      setEmail("");
      setPassword("");
      setOtp("");
      setOtpSent(false);
      setOtpVerified(false);
      setOtpMessage("");
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Failed to update credentials. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 -m-6 mb-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-500 mt-1">
                Update your admin credentials
              </p>
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className="max-w-2xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Admin Credentials</h2>
              <p className="text-sm text-gray-600">
                Update your email or password. Leave fields empty to keep current values.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field + OTP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setOtpSent(false);
                      setOtpVerified(false);
                      setOtp("");
                      setOtpMessage("");
                      setOtpError("");
                    }}
                    placeholder="Enter new email address"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to keep current email
                </p>
                {/* OTP Section */}
                {email && !otpVerified && (
                  <div className="mt-3">
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      onClick={handleSendOtp}
                      disabled={otpLoading || otpSent}
                    >
                      {otpLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Mail className="w-4 h-4" />
                      )}
                      {otpSent ? "OTP Sent" : "Send OTP"}
                    </button>
                    {otpMessage && (
                      <p className="text-xs text-green-700 mt-1">{otpMessage}</p>
                    )}
                    {otpError && (
                      <p className="text-xs text-red-700 mt-1">{otpError}</p>
                    )}
                    {otpSent && !otpVerified && (
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP received on email"
                        />
                        <button
                          type="button"
                          className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          onClick={handleVerifyOtp}
                          disabled={otpLoading || !otp}
                        >
                          {otpLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                          Verify OTP
                        </button>
                        {otpMessage && (
                          <p className="text-xs text-green-700 mt-1">{otpMessage}</p>
                        )}
                        {otpError && (
                          <p className="text-xs text-red-700 mt-1">{otpError}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {otpVerified && (
                  <p className="text-xs text-green-700 mt-2">OTP verified. You can now update email.</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to keep current password
                </p>
              </div>

              {/* Success Message */}
              {message && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">{message}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800 font-medium">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Update Credentials
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Security Notice */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex gap-3">
              <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-blue-900 mb-1">
                  Security Notice
                </h3>
                <p className="text-sm text-blue-800">
                  Make sure to use a strong password with a mix of letters, numbers, and special characters. 
                  You will need to log in again after updating your credentials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;