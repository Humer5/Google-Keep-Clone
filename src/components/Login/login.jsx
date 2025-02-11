import { createSignal, createMemo } from "solid-js";
import { useNavigate } from "@solidjs/router";
import "./../../styles/login.css";

const Login = (props) => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const [isSignup, setIsSignup] = createSignal(false);
  const [showPassword, setShowPassword] = createSignal(false);
  const navigate = useNavigate();

  const users = createMemo(() => JSON.parse(localStorage.getItem("users")) || []);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleAuth = (e, isLogin) => {
    e.preventDefault();

    if (!isLogin && !passwordRegex.test(password())) {
      setError("Password must include at least 8 characters, one uppercase, one lowercase, and one number.");
      return;
    }

    const existingUser = users().find((u) => u.email === email());

    if (isLogin) {
      if (existingUser && existingUser.password === password()) {
        localStorage.setItem("loggedIn", "true");
        props.onLoginSuccess();
        navigate("/layout");
      } else {
        setError("Invalid email or password.");
      }
    } else {
      if (existingUser) {
        setError("Email is already registered.");
      } else {
        const updatedUsers = [...users(), { email: email(), password: password() }];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("loggedIn", "true");
        props.onLoginSuccess();
        navigate("/layout");
      }
    }
  };

  return (
    <div class="login-container">
      <form onSubmit={(e) => handleAuth(e, !isSignup())}>
        <h2>{isSignup() ? "New here? Sign up!" : "Login"} <i class="fas fa-user"></i></h2>

        <div class="email">
          <input
            type="email"
            placeholder="Enter your email"
            value={email()}
            onInput={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div class="password-wrapper">
          <input
            type={showPassword() ? "text" : "password"}
            placeholder={isSignup() ? "Create a strong password" : "Enter your password"}
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
            required
          />
          <span class="toggle-password" onClick={() => setShowPassword(!showPassword())}>
            <i class={`fas fa-eye${showPassword() ? "-slash" : ""}`}></i>
          </span>
        </div>

        <button type="submit">{isSignup() ? "Sign Up" : "Login"}</button>
        {error() && <p class="error">{error()}</p>}

        <p class="info" onClick={() => setIsSignup(!isSignup())}>
          {isSignup() ? "Already have an account? Login!" : "Don't have an account? Sign up!"}
        </p>
      </form>
    </div>
  );
};

export default Login;
