"use client";

import type React from "react";

import { useState } from "react";
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
import { ArrowLeft, UserPlus, Moon, Sun, Save, RotateCcw } from "lucide-react";

interface Student {
  rollNumber: string;
  name: string;
  department: string;
  year: number;
  cgpa: number;
}

interface AddStudentPageProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  navigateToPage: (page: "dashboard" | "add-student" | "list-students") => void;
}

const DEPARTMENTS = ["CSE", "ECE", "ME", "CE", "EE"];
const YEARS = [1, 2, 3, 4];

export default function AddStudentPage({
  students,
  setStudents,
  isDarkMode,
  toggleDarkMode,
  navigateToPage,
}: AddStudentPageProps) {
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
    department: "",
    year: "",
    cgpa: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll Number is required";
    } else {
      const isDuplicate = students.some(
        (student) =>
          student.rollNumber === formData.rollNumber &&
          (!editingStudent || student.rollNumber !== editingStudent.rollNumber)
      );
      if (isDuplicate) {
        newErrors.rollNumber = "Roll Number must be unique";
      }
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    if (!formData.year) {
      newErrors.year = "Year is required";
    }

    if (!formData.cgpa) {
      newErrors.cgpa = "CGPA is required";
    } else {
      const cgpaValue = Number.parseFloat(formData.cgpa);
      if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10) {
        newErrors.cgpa = "CGPA must be between 0 and 10";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const studentData: Student = {
      rollNumber: formData.rollNumber,
      name: formData.name,
      department: formData.department,
      year: Number.parseInt(formData.year),
      cgpa: Number.parseFloat(formData.cgpa),
    };

    if (editingStudent) {
      setStudents((prev) =>
        prev.map((student) =>
          student.rollNumber === editingStudent.rollNumber
            ? studentData
            : student
        )
      );
      setEditingStudent(null);
    } else {
      setStudents((prev) => [...prev, studentData]);
    }

    handleClear();
  };

  const handleClear = () => {
    setFormData({
      rollNumber: "",
      name: "",
      department: "",
      year: "",
      cgpa: "",
    });
    setErrors({});
    setEditingStudent(null);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "dark bg-slate-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <div className="container mx-auto p-6 max-w-4xl">
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
                {editingStudent ? "Edit Student" : "Add New Student"}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {editingStudent
                  ? "Update student information"
                  : "Enter student details to add to the database"}
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

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-xl flex items-center gap-3">
              <UserPlus className="h-6 w-6" />
              Student Information Form
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="rollNumber"
                  className="text-slate-700 dark:text-slate-300 font-medium"
                >
                  Roll Number *
                </Label>
                <Input
                  id="rollNumber"
                  value={formData.rollNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      rollNumber: e.target.value,
                    }))
                  }
                  placeholder="Enter roll number (e.g., CSE2025-001)"
                  className={`mt-1 ${
                    errors.rollNumber
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 focus:border-blue-500"
                  } transition-colors`}
                />
                {errors.rollNumber && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.rollNumber}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="name"
                  className="text-slate-700 dark:text-slate-300 font-medium"
                >
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter student's full name"
                  className={`mt-1 ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 focus:border-blue-500"
                  } transition-colors`}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="department"
                  className="text-slate-700 dark:text-slate-300 font-medium"
                >
                  Department *
                </Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, department: value }))
                  }
                >
                  <SelectTrigger
                    className={`mt-1 ${
                      errors.department ? "border-red-500" : "border-slate-300"
                    } transition-colors`}
                  >
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept} -{" "}
                        {dept === "CSE"
                          ? "Computer Science"
                          : dept === "ECE"
                          ? "Electronics & Communication"
                          : dept === "ME"
                          ? "Mechanical Engineering"
                          : dept === "CE"
                          ? "Civil Engineering"
                          : "Electrical Engineering"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.department}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="year"
                  className="text-slate-700 dark:text-slate-300 font-medium"
                >
                  Academic Year *
                </Label>
                <Select
                  value={formData.year}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, year: value }))
                  }
                >
                  <SelectTrigger
                    className={`mt-1 ${
                      errors.year ? "border-red-500" : "border-slate-300"
                    } transition-colors`}
                  >
                    <SelectValue placeholder="Select academic year" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        Year {year} -{" "}
                        {year === 1
                          ? "First Year"
                          : year === 2
                          ? "Second Year"
                          : year === 3
                          ? "Third Year"
                          : "Final Year"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.year && (
                  <p className="text-sm text-red-500 mt-1">{errors.year}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label
                  htmlFor="cgpa"
                  className="text-slate-700 dark:text-slate-300 font-medium"
                >
                  CGPA (0.00 - 10.00) *
                </Label>
                <Input
                  id="cgpa"
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  value={formData.cgpa}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, cgpa: e.target.value }))
                  }
                  placeholder="Enter CGPA (e.g., 8.75)"
                  className={`mt-1 ${
                    errors.cgpa
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 focus:border-blue-500"
                  } transition-colors`}
                />
                {errors.cgpa && (
                  <p className="text-sm text-red-500 mt-1">{errors.cgpa}</p>
                )}
                <p className="text-xs text-slate-500 mt-1">
                  Enter CGPA on a scale of 0 to 10
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
              <Button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {editingStudent ? "Update Student" : "Save Student"}
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="flex-1 border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 bg-transparent flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Clear Form
              </Button>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => navigateToPage("list-students")}
                variant="outline"
                className="flex items-center gap-2"
              >
                View All Students
              </Button>
              <Button
                onClick={() => navigateToPage("dashboard")}
                variant="outline"
                className="flex items-center gap-2"
              >
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
