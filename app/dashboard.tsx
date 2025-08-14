"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  UserPlus,
  Users,
  BarChart3,
  Moon,
  Sun,
  GraduationCap,
} from "lucide-react";

interface Student {
  rollNumber: string;
  name: string;
  department: string;
  year: number;
  cgpa: number;
}

type Page = "dashboard" | "add-student" | "list-students";

import AddStudentPage from "./pages/add-student-page";
import ListStudentsPage from "./pages/list-students-page";

export default function StudentDataManager() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [students, setStudents] = useState<Student[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
  };

  const getPageStats = () => {
    const totalStudents = students.length;
    const departments = [...new Set(students.map((s) => s.department))].length;
    const avgCGPA =
      students.length > 0
        ? (
            students.reduce((sum, s) => sum + s.cgpa, 0) / students.length
          ).toFixed(2)
        : "0.00";

    return { totalStudents, departments, avgCGPA };
  };

  const stats = getPageStats();

  if (currentPage === "add-student") {
    return (
      <AddStudentPage
        students={students}
        setStudents={setStudents}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        navigateToPage={navigateToPage}
      />
    );
  }

  if (currentPage === "list-students") {
    return (
      <ListStudentsPage
        students={students}
        setStudents={setStudents}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        navigateToPage={navigateToPage}
      />
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "dark bg-slate-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Student Data Manager
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Manage your student records efficiently
              </p>
            </div>
          </div>
          <Button
            onClick={toggleDarkMode}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-transparent"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            {isDarkMode ? "Light" : "Dark"} Mode
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Total Students
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {stats.totalStudents}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Departments
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {stats.departments}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Average CGPA
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {stats.avgCGPA}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card
            className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={() => navigateToPage("add-student")}
          >
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-300">
              <CardTitle className="text-xl flex items-center gap-3">
                <UserPlus className="h-6 w-6" />
                Add Student
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Add new student records with comprehensive details including
                roll number, name, department, year, and CGPA.
              </p>
              <div className="space-y-2 text-sm text-slate-500 dark:text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Form validation with error handling</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Unique roll number validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>CGPA range validation (0-10)</span>
                </div>
              </div>
              <Button
                className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToPage("add-student");
                }}
              >
                Start Adding Students
              </Button>
            </CardContent>
          </Card>

          <Card
            className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={() => navigateToPage("list-students")}
          >
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg group-hover:from-green-600 group-hover:to-teal-700 transition-all duration-300">
              <CardTitle className="text-xl flex items-center gap-3">
                <Users className="h-6 w-6" />
                List Students
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                View, search, filter, and manage all student records with
                advanced fuzzy search and sorting capabilities.
              </p>
              <div className="space-y-2 text-sm text-slate-500 dark:text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Fuzzy search with typo tolerance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span>Filter by department and year</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Sort by name and CGPA</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Pagination with accessible controls</span>
                </div>
              </div>
              <Button
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToPage("list-students");
                }}
              >
                View All Students
              </Button>
            </CardContent>
          </Card>
        </div>

        {students.length > 0 && (
          <Card className="mt-8 border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800 dark:text-slate-200">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigateToPage("add-student")}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Add Another Student
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigateToPage("list-students")}
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Manage Students
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {students.length === 0 && (
          <Card className="mt-8 border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Welcome to Student Data Manager
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Get started by adding your first student record. You can then
                view, search, and manage all records efficiently.
              </p>
              <Button
                onClick={() => navigateToPage("add-student")}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Your First Student
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
