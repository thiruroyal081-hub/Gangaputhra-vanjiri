 (cd "$(git rev-parse --show-toplevel)" && printf '%s' 'diff --git a/README.md b/README.md
index 37999cd7d71fd09b21bde39e97fd5ccc5cc8d271..d2810d98fd6fe56c30890fd1951e4a1db85e6c3b 100644
--- a/README.md
+++ b/README.md
@@ -1,16 +1,51 @@
-# Introduction to GitHub
+# Ganesh Utsav Village Website
 
-<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />
+A dependency-free, responsive website for a village Ganesh Utsav. It includes a celebration plan, event schedule, memory wall, countdown, and participation form.
 
-Hey thiruroyal081-hub!
+## Run the website
 
-Mona here. I'\''m done preparing your exercise. Hope you enjoy! 💚
+You need Python 3. From this folder, run:
 
-Remember, it'\''s self-paced so feel free to take a break! ☕️
+```bash
+python3 server.py
+```
 
-[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/thiruroyal081-hub/My-GitHub-learning/issues/1)
+Then open this address in a browser:
 
----
+```text
+http://127.0.0.1:4173
+```
 
-&copy; 2025 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)
+To use another port:
 
+```bash
+PORT=8080 python3 server.py
+```
+
+## Participation form
+
+The form works without a database: it opens the visitor'\''s default email application with their selected contribution pre-filled. Change `ganeshutsav@example.com` in `script.js` to the village organiser'\''s real email address before publishing.
+
+## Publish online with GitHub Pages
+
+This repository includes a GitHub Actions deployment workflow in `.github/workflows/deploy-pages.yml`.
+
+1. Push this branch and merge it into `main` on GitHub.
+2. In the GitHub repository, open **Settings → Pages**.
+3. Under **Build and deployment**, select **GitHub Actions** as the source.
+4. Open the **Actions** tab and wait for **Deploy Ganesh Utsav website to GitHub Pages** to finish.
+5. GitHub will show the public URL in that workflow’s deployment summary. It will normally be:
+
+```text
+https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY-NAME/
+```
+
+After deployment, the website works from any phone or computer with internet access. `server.py` remains available only for local previews.
+
+## Donation records
+
+The donation ledger includes previous contribution entries, a total, and a CSV export button. New entries are saved in the browser'\''s local storage, so they remain available after refresh on the same phone or computer. Download the CSV after updates and keep it with the village committee'\''s records. For one shared record across every device, connect the form to a secure database before relying on it for official accounts.
+
+## Temple donation management demo
+
+The **Temple Donations / ఆలయ విరాళాలు** section is a frontend demo designed to be connected to Flask + SQLite later. It gives each donation a unique yearly receipt number, keeps new entries pending until an admin verifies them, and shows only verified records in the public temple ledger. Transaction IDs are masked in public views and CSV exports. The form data is stored only in the current browser'\''s local storage, so it is not yet a secure multi-admin accounting system; use a server-side database and authentication before using it for official financial records.
' | git apply --3way)
