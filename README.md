Here’s a polished `README.md` for your project based on the task details and the fact that you built it with **Next.js** using **pnpm**:

---

# Student Data Manager — Temporary Data

A **Next.js** application to manage student records with add, view, edit, delete, search, and sort features — all stored temporarily in state (no backend). Includes a custom **fuzzy search** implementation without external libraries.

## 🚀 Features

### Core

* **Add Student Form** with validation:

  * Roll Number (unique)
  * Name
  * Department (CSE, ECE, ME, CE, EE)
  * Year (1, 2, 3, 4)
  * CGPA (0–10)
* **Student Table** with:

  * Edit
  * Delete
* **Search & Sort**

  * Search by Roll Number or Name (case-insensitive, accent-insensitive, typo-tolerant)
  * Sort by CGPA (High → Low / Low → High)
  * Sort by Name (A → Z / Z → A)
  * Department and Year filters
* **Fuzzy Search** (custom `isFuzzyMatch` helper)
* **Built-in Tests** button with `console.assert` checks

### Accessibility & UX

* Proper labels for all inputs
* Clear button text
* Keyboard navigation support

### Bonus (if implemented)

* Pagination (5–10 rows per page)
* Reset Filters button
* Light/Dark mode toggle

---

## 🛠️ Tech Stack

* **Framework**: [Next.js](https://nextjs.org/)
* **Language**: JavaScript (React Functional Components + Hooks)
* **Package Manager**: pnpm
* **Styling**: Tailwind CSS (if used)

---

## 📦 Installation

Make sure you have **pnpm** installed globally:

```bash
npm install -g pnpm
```

Clone the repository and install dependencies:

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
pnpm install
```

---

## ▶️ Running the Project

Start the development server:

```bash
pnpm dev
```

Then visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Built-in Tests

Click the **"Tests"** button in the app to run basic assertions in the console.
You should see **"All tests passed"** if everything is correct.

---

## 📸 Screenshots

*(Add screenshots of your app here)*

---

## 🌐 Live Demo

*(If deployed on Vercel/Netlify, add link here)*

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

If you want, I can also make you a **visually appealing GitHub README with badges, screenshots, and a feature table** so it stands out to recruiters. That would make this project look professional on your profile.
