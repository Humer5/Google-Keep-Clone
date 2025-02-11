import { expect, vi } from "vitest";
import "@testing-library/jest-dom";

// ✅ Mock CSS imports to prevent errors
vi.mock("../styles/notebox.css", () => ({}));
vi.mock("../styles/login.css", () => ({}));

