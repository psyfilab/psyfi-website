/**
 * Where the "Book a diagnostic" form is sent.
 * 1. Create a form at https://formspree.io
 * 2. Copy its endpoint (looks like https://formspree.io/f/xxxxxxxx)
 * 3. Paste it below.
 */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/meagrenl";

/** Shown if sending fails. */
export const CONTACT_EMAIL = "hello@psyfilab.com";

/** "Talk to the lab" button: opens a Gmail compose window addressed to this email. */
export const LAB_EMAIL = "hello@psyfilab.com";
export const TALK_TO_LAB_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${LAB_EMAIL}&su=${encodeURIComponent("Talking to the lab")}`;