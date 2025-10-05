import { useEffect, useState } from "react";
import { getAccessToken, refreshAccessToken } from "../utils/tokenHelper";

export default function ProtectedPage() {
  const [secureData, setSecureData] = useState("");

  useEffect(() => {
    const fetchSecureData = async () => {
      let token = getAccessToken();
      let res = await fetch("/api/account/AdminOnly", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        token = await refreshAccessToken();
        if (!token) {
          alert("Session expired. Please login again.");
          return;
        }
        res = await fetch("/api/account/AdminOnly", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      if (res.ok) {
        const data = await res.text();
        setSecureData(data);
      } else {
        alert("Failed to fetch secure data");
      }
    };

    fetchSecureData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
      <p>{secureData}</p>
    </div>
  );
}
