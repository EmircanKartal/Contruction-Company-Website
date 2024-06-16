import React, { ReactElement, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import styles from "./ProtectedRoute.module.css";
import { MagicSpinner } from "react-spinners-kit";

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(5); // Countdown from 5 seconds

  useEffect(() => {
    let timeoutId: NodeJS.Timeout; // Correctly typed

    const verifySession = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8080/api/verifySession",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
          timeoutId = setTimeout(() => {
            setLoading(false);
          }, 5000);
        }
      } catch (error) {
        console.error("Error verifying token", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        timeoutId = setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    };

    verifySession();

    // Countdown logic
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <MagicSpinner size={140} color="red" loading={true} />
        <div className={styles.loadingText}>
          Admin izinlerine sahip değilsiniz.
        </div>
        <div className={styles.loadingText}>
          Login Ekranına yönlendiriliyorsunuz...
        </div>
        <div className={styles.countdown}>
          <span style={{ fontSize: "24px", color: "red" }}>
            Redirecting in {countdown} seconds...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
