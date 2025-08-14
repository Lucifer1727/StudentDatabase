"use client";

import type React from "react";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  ArrowUpDown,
  Search,
  Trash2,
  Edit,
  RotateCcw,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";

interface Student {
  rollNumber: string;
  name: string;
  department: string;
  year: number;
  cgpa: number;
}

interface ListStudentsPageProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  navigateToPage: (page: "dashboard" | "add-student" | "list-students") => void;
}

type SortField = "cgpa" | "name";
type SortDirection = "asc" | "desc";

const DEPARTMENTS = ["CSE", "ECE", "ME", "CE", "EE"];
const YEARS = [1, 2, 3, 4];
const ITEMS_PER_PAGE = 8;

export default function ListStudentsPage({
  students,
  setStudents,
  isDarkMode,
  toggleDarkMode,
  navigateToPage,
}: ListStudentsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterYear, setFilterYear] = useState("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const handleResetFilters = () => {
    setSearchTerm("");
    setFilterDepartment("all");
    setFilterYear("all");
    setSortField("name");
    setSortDirection("asc");
    setCurrentPage(1);
  };

  const handleEdit = (student: Student) => {
    navigateToPage("add-student");
  };

  const handleDelete = (rollNumber: string) => {
    setStudents((prev) =>
      prev.filter((student) => student.rollNumber !== rollNumber)
    );
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const isFuzzyMatch = (query: string, text: string): boolean => {
    if (!query || !text) return false;

    const normalizeString = (str: string) =>
      str
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const normalizedQuery = normalizeString(query);
    const normalizedText = normalizeString(text);

    if (normalizedText.includes(normalizedQuery)) return true;

    if (/^[a-z0-9]+$/i.test(normalizedText)) {
      return false;
    }
    const queryLen = normalizedQuery.length;
    const textLen = normalizedText.length;
    if (Math.abs(queryLen - textLen) > 1) return false;

    const dp: number[][] = Array(queryLen + 1)
      .fill(null)
      .map(() => Array(textLen + 1).fill(0));

    for (let i = 0; i <= queryLen; i++) dp[i][0] = i;
    for (let j = 0; j <= textLen; j++) dp[0][j] = j;

    for (let i = 1; i <= queryLen; i++) {
      for (let j = 1; j <= textLen; j++) {
        if (normalizedQuery[i - 1] === normalizedText[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
    }

    return dp[queryLen][textLen] <= 1;
  };

  const filteredAndSortedStudents = useMemo(() => {
    const filtered = students.filter((student) => {
      const matchesSearch =
        searchTerm === "" ||
        isFuzzyMatch(searchTerm, student.rollNumber) ||
        isFuzzyMatch(searchTerm, student.name);

      const matchesDepartment =
        filterDepartment === "all" || student.department === filterDepartment;
      const matchesYear =
        filterYear === "all" || student.year.toString() === filterYear;

      return matchesSearch && matchesDepartment && matchesYear;
    });

    filtered.sort((a, b) => {
      let comparison = 0;

      if (sortField === "cgpa") {
        comparison = a.cgpa - b.cgpa;
      } else if (sortField === "name") {
        comparison = a.name.localeCompare(b.name);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [
    students,
    searchTerm,
    filterDepartment,
    filterYear,
    sortField,
    sortDirection,
  ]);

  const totalPages = Math.ceil(
    filteredAndSortedStudents.length / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStudents = filteredAndSortedStudents.slice(startIndex, endIndex);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, filterDepartment, filterYear]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getVisiblePageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "dark bg-slate-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateToPage("dashboard")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Student Records
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                View, search, and manage all student records
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

        <Card className="mb-8 border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
            <CardTitle className="text-xl flex items-center gap-3">
              <Search className="h-6 w-6" />
              Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <Label
                htmlFor="search"
                className="text-slate-700 dark:text-slate-300 font-medium"
              >
                Fuzzy Search by Roll Number or Name
              </Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Try: jose, rvi, cse2025-01..."
                  className="pl-10 border-slate-300 focus:border-green-500 transition-colors"
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Supports typo tolerance and accent-insensitive search
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label
                  htmlFor="filterDepartment"
                  className="text-slate-700 dark:text-slate-300 font-medium"
                >
                  Filter by Department
                </Label>
                <Select
                  value={filterDepartment}
                  onValueChange={setFilterDepartment}
                >
                  <SelectTrigger className="mt-1 border-slate-300">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="filterYear"
                  className="text-slate-700 dark:text-slate-300 font-medium"
                >
                  Filter by Year
                </Label>
                <Select value={filterYear} onValueChange={setFilterYear}>
                  <SelectTrigger className="mt-1 border-slate-300">
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {YEARS.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        Year {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-slate-700 dark:text-slate-300 font-medium">
                  Sort by Name
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSort("name")}
                  className={`w-full mt-1 flex items-center gap-2 ${
                    sortField === "name"
                      ? "bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-900/20 dark:border-blue-600 dark:text-blue-300"
                      : ""
                  }`}
                >
                  <ArrowUpDown className="h-4 w-4" />
                  {sortField === "name"
                    ? sortDirection === "asc"
                      ? "A→Z"
                      : "Z→A"
                    : "A→Z"}
                </Button>
              </div>

              <div>
                <Label className="text-slate-700 dark:text-slate-300 font-medium">
                  Sort by CGPA
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSort("cgpa")}
                  className={`w-full mt-1 flex items-center gap-2 ${
                    sortField === "cgpa"
                      ? "bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-900/20 dark:border-blue-600 dark:text-blue-300"
                      : ""
                  }`}
                >
                  <ArrowUpDown className="h-4 w-4" />
                  {sortField === "cgpa"
                    ? sortDirection === "asc"
                      ? "Low→High"
                      : "High→Low"
                    : "High→Low"}
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleResetFilters}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 bg-transparent"
              >
                <RotateCcw className="h-4 w-4" />
                Reset All Filters
              </Button>
              <Button
                onClick={() => navigateToPage("add-student")}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                Add New Student
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-xl flex items-center gap-3">
              <Users className="h-6 w-6" />
              Students ({filteredAndSortedStudents.length}
              {students.length !== filteredAndSortedStudents.length &&
                ` of ${students.length}`}
              )
              {totalPages > 1 && (
                <span className="text-sm font-normal opacity-90 ml-2">
                  • Page {currentPage} of {totalPages}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {filteredAndSortedStudents.length === 0 ? (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-lg font-medium">
                  {students.length === 0
                    ? "No students added yet."
                    : "No students match your search criteria."}
                </p>
                <p className="text-sm mt-2">
                  {students.length === 0
                    ? "Add your first student to get started."
                    : "Try adjusting your search or filters."}
                </p>
                <Button
                  onClick={() => navigateToPage("add-student")}
                  className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  Add Student
                </Button>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200 dark:border-slate-700">
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                          Roll Number
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                          Name
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                          Department
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                          Year
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                          CGPA
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentStudents.map((student, index) => (
                        <TableRow
                          key={student.rollNumber}
                          className={`border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                            index % 2 === 0
                              ? "bg-slate-25 dark:bg-slate-800/30"
                              : ""
                          }`}
                        >
                          <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                            {student.rollNumber}
                          </TableCell>
                          <TableCell className="text-slate-700 dark:text-slate-300">
                            {student.name}
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                              {student.department}
                            </span>
                          </TableCell>
                          <TableCell className="text-slate-700 dark:text-slate-300">
                            Year {student.year}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                student.cgpa >= 8.5
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                  : student.cgpa >= 7.0
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                              }`}
                            >
                              {student.cgpa.toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(student)}
                                className="flex items-center gap-1 border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
                              >
                                <Edit className="h-3 w-3" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(student.rollNumber)}
                                className="flex items-center gap-1 border-red-300 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="h-3 w-3" />
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Showing {startIndex + 1} to{" "}
                      {Math.min(endIndex, filteredAndSortedStudents.length)} of{" "}
                      {filteredAndSortedStudents.length} students
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1 px-3"
                        aria-label="Go to previous page"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>

                      <div className="flex items-center gap-1">
                        {getVisiblePageNumbers().map((pageNum, index) => (
                          <div key={index}>
                            {pageNum === "..." ? (
                              <span className="px-3 py-1 text-slate-500 dark:text-slate-400">
                                ...
                              </span>
                            ) : (
                              <Button
                                variant={
                                  currentPage === pageNum
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => goToPage(pageNum as number)}
                                className={`min-w-[40px] ${
                                  currentPage === pageNum
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                    : "hover:bg-slate-50 dark:hover:bg-slate-700"
                                }`}
                                aria-label={`Go to page ${pageNum}`}
                                aria-current={
                                  currentPage === pageNum ? "page" : undefined
                                }
                              >
                                {pageNum}
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1 px-3"
                        aria-label="Go to next page"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
