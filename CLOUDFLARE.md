# Cloudflare setup notes


Content-Security-Policy-Report-Only:
default-src 'self'; script-src 'self' https://apis.google.com https://accounts.google.com; style-src 'self' https://accounts.google.com 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://accounts.google.com https://apis.google.com https://api.metcarob.com; frame-src https://accounts.google.com https://content-sheets.googleapis.com https://www.youtube.com https://youtube.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';

Cross-Origin-Opener-Policy
same-origin-allow-popups

Strict-Transport-Security
max-age=31536000; includeSubDomains; preload

X-Content-Type-Options
nosniff
