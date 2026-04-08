📅 Wall Calendar App

A beautifully designed, interactive wall calendar built with **React, TypeScript, and Framer Motion**. This project focuses on smooth animations, modern UI, and an engaging user experience.

---
🔗 Live Demo
https://calender-bjpj.vercel.app/

---
🎯 Why this project?

This project was built to explore advanced UI interactions, animation design, and user-centric features beyond basic CRUD apps. It focuses on delivering a smooth, visually engaging experience with meaningful date insights.

---

✨ Features

🎞️ **Smooth Page Flip Animation**

* 3D flip transitions between months using Framer Motion

📆 **Date Range Selection**

* Select start and end dates
* Auto-calculates:

  * Total days
  * Weekdays
  * Weekends
  * Holidays

🖼️ **Custom Image Upload**

* Upload your own background image per month
* Reset anytime

🎨 **Dynamic Themes**

* Seasonal themes (Winter ❄️, Spring 🌸, Summer ☀️, Autumn 🍂)
* Light & Dark mode support

📊 **Smart Range Summary**

* Clean UI showing selected range insights

⚡ **Modern UI/UX**

* Responsive layout
* Glassmorphism + gradients
* Clean typography

---

🛠️ Tech Stack

* ⚛️ React
* 📘 TypeScript
* 🎞️ Framer Motion
* 🎨 Tailwind CSS

---

🚀 Getting Started

1. Clone the repo

```bash
git clone https://github.com/radhikaa188/wall-calendar.git
cd wall-calendar
```

2. Install dependencies

```bash
npm install
```

3. Run the app

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

---

📂 Project Structure

```
src/
 ├── components/
 │   ├── Calendar/
 │   │   ├── RangeSummary.tsx
 │   │   └── ...
 │   ├── HeroImage.tsx
 │   └── ...
 ├── utils/
 │   ├── dateUtils.ts
 │   ├── themes.ts
 │   └── types.ts
 └── App.tsx
```

---

🧠 Key Concepts Used

* Custom date utilities (replacing date-fns)
* Controlled animations using variants
* State-driven UI updates
* Component reusability

---

💡 Future Improvements

* Drag & select date range
* Google Calendar sync
* Event reminders
* Mobile gesture support

---

🤝 Contributing

Feel free to fork this repo and improve it!

---

⭐ Show your support

If you like this project, give it a ⭐ on GitHub!
