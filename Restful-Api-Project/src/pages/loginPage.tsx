import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function handleLogin(e: { preventDefault: () => void; }) {
    e.preventDefault();
    localStorage.setItem("username", username);
    navigate("/app");
  }

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h1 className={styles.heading}>Login</h1>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Username:</label>
          <input 
            className={styles.input}
            type="text"
            value={username} 
            onChange={e => setUsername(e.target.value)}
            placeholder="Inserisci il tuo username"
            required
          />
        </div>
        <button className={styles.loginButton} type="submit">Entra</button>
      </form>
    </div>
  );
}