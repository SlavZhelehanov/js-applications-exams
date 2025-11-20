# js-applications-exams

✅ Necessary Fix: Upgrade http-server & enable fallback:
    To enable correct SPA routing, update to a newer version of http-server (v14+) which supports --fallback.
        1. Update package.json:
            "devDependencies": {
                "http-server": "^14.1.1",
                ...
            }
        2. Update start script:
            "start": "http-server -a localhost -p 3000 --fallback=index.html -c-1"
    🎉 Result:
        This ensures that any unknown route returns index.html, allowing the SPA router (page.js) to handle navigation correctly.
        Direct navigation now works:
            /details/abc123 → ✔ loads details page
            /offers → ✔ loads dashboard
            /createOffer → ✔ loads create form

Solutions for SoftUni JS Applications Exams

- [x] 01. JS Applications Regular Exam - 8 December 2024
- [x] 02. JS Applications Retake Exam - 14 August 2024
- [x] 03. JS Applications Retake Exam - 9 April 2024
- [x] 04. JS Applications Regular Exam - 1 April 2023
- [x] 05. JS Applications Retake Exam - 11 April 2023
- [x] 06. JS Applications Retake Exam - 13 December 2022
- [x] 07. JS Applications Retake Exam - 15 August 2022
- [x] 08. JS Applications Regular Exam - 06 August 2022