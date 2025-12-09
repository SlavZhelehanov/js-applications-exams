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

- [x] 01. JS Applications Regular Exam - 8 December 2024 - "Drone-Deals" - Bonus: Notifications
- [x] 02. JS Applications Retake Exam - 14 August 2024 - "Show-Share" - Bonus: Search Page
- [x] 03. JS Applications Retake Exam - 9 April 2024 - "RenewTech-Cleanup" - Bonus: Like
- [x] 04. JS Applications Regular Exam - 1 April 2023 - "Fruitipedia" - Bonus: Search Page
- [x] 05. JS Applications Retake Exam - 11 April 2023 - "Eventer" - Bonus: Go to Event
- [x] 06. JS Applications Retake Exam - 13 December 2022 - "Cosmetic Kingdom" - Bonus: Buy Product
- [x] 07. JS Applications Retake Exam - 15 August 2022 - "Sole Mates" - Bonus: Search Page
- [x] 08. JS Applications Regular Exam - 06 August 2022 - "Clear Career" - Bonus: Apply on an Offer
- [x] 09. JS Applications Retake Exam - 10 April 2022 - "Local Orphanages" - Bonus: Donate materials
- [x] 10. JS Applications Regular Exam - 2 April 2022 - "Pet Care" - Bonus: Donate Action
- [x] 11. JS Applications Retake Exam - 16 August 2021 - "GamesPlay" - Bonus: Comments
- [x] 12. JS Applications Regular Exam - 8 August 2021 - "Online Books Library" - Bonus: Like a book