import React, { useRef, useState } from "react";
import "../assets/signinpages.css";

const SignIn = () => {
  // Menginisialisasi useRef untuk input username dan password
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  // Menginisialisasi state untuk menampung pesan kesalahan
  const [errorMessage, setErrorMessage] = useState("");
  
  // Mengatur tindakan saat tombol "Log In" diklik
  const handleSignIn = (e) => {
    e.preventDefault();
    // Memeriksa apakah kedua input username dan password sudah diisi
    if (usernameRef.current.value && passwordRef.current.value) {
      setErrorMessage("");
      // Melakukan proses login jika input valid
    } else {
      setErrorMessage("Tolong Masukkan Username dan Password");
    // Menampilkan pesan kesalahan jika input tidak valid
    }
  };

  // Tampilan komponen
  return (
    <div className="container">
      
      <div className="form-container">
        <h1>SILAHKAN MASUK</h1>
        {/* // Menampilkan pesan kesalahan jika ada */}
        {errorMessage && <p>{errorMessage}</p>}
        <form>
          <label>User ID</label>
          {/* //Menggunakan useRef untuk menangkap input username */}
          <input
            className="input"
            name="Username"
            ref={usernameRef}
            type="text"
            required
          />
          <label>Password</label>
          {/* //Menggunakan useRef untuk menangkap input password */}
          <input
            className="input"
            name="Password"
            ref={passwordRef}
            type="password"
            required
          />
          {/* //Menambahkan event handler ke tombol "Log In" */}
          <button className="button" onClick={handleSignIn}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;