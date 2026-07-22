"use client";

import { useEffect, useRef } from "react";
import { logoutSilently } from "@/app/actions/auth";

// Only mounted by /login/page.tsx when a session cookie was found server-side
// (see hasSession there). Landing on /login while still logged in shouldn't
// leave the user stuck: this frees up the backend's single-session slot and
// clears the local cookie on mount, so submitting the form right after works
// cleanly instead of hitting the "active session" 403. Renders nothing.
export default function LoginSessionReset() {
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    void logoutSilently();
  }, []);

  return null;
}
