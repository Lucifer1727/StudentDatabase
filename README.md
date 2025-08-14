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
git clone https://github.com/Lucifer1727/StudentDatabase.git
cd StudentDatabase
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

## 🌐 Live Demo

Link - https://student-database-sandy.vercel.app/

---

