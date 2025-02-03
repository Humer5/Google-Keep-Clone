import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import "./../../styles/login.css";

const Login = (props) => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const [isSignup, setIsSignup] = createSignal(false); // Toggle between login and signup
  const [showPassword, setShowPassword] = createSignal(false); // Toggle password visibility
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email());

    if (user && user.password === password()) {
      localStorage.setItem("loggedIn", "true");
      props.onLoginSuccess(); // Call the correct prop to update login state
      navigate("/layout"); 
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!validatePassword(password())) {
      setError(
        "Password must include at least 8 characters, one uppercase, one lowercase, and one number."
      );
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === email())) {
      setError("Email is already registered.");
    } else {
      users.push({ email: email(), password: password() });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedIn", "true");
      props.onLoginSuccess(); // Call the correct prop to update login state
      navigate("/layout"); 
    }
  };

  return (
    <div class="login-container">
      {!isSignup() ? (
        <form onSubmit={handleLogin}>
          <h2>Login <i class="fas fa-user"></i></h2>
          
          <div class="email">
          <input
            type="email"
            placeholder="Enter your email"
            value={email()}
            onInput={(e) => setEmail(e.target.value)}
            required/>
          </div>

          <div class="password-wrapper">
            <input
              type={showPassword() ? "text" : "password"}
              placeholder="Enter your password"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
              required
            />
            <span
              class="toggle-password"
              onClick={() => setShowPassword(!showPassword())}
            >
              <i class={showPassword() ? "fas fa-eye-slash" : "fas fa-eye"}></i>
            </span>
          </div>
          <button type="submit">Login</button>
          {error() && <p class="error">{error()}</p>}
          <p class="info" onClick={() => setIsSignup(true)}>
            Don't have an account? Sign up!
          </p>
        </form>
      ) : (
        <div class="signup-section">
          <h2>New here? Sign up!</h2>
          <form onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email()}
              onInput={(e) => setEmail(e.target.value)}
              required
            />
            <div class="password-wrapper">
              <input
                type={showPassword() ? "text" : "password"}
                placeholder="Create a strong password"
                value={password()}
                onInput={(e) => setPassword(e.target.value)}
                required
              />
              <span
                class="toggle-password"
                onClick={() => setShowPassword(!showPassword())}
              >
                <i class={showPassword() ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </span>
            </div>
            <button type="submit">Sign Up</button>
            {error() && <p class="error">{error()}</p>}
          </form>
          <p class="info" onClick={() => setIsSignup(false)}>
            Already have an account? Login!
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
