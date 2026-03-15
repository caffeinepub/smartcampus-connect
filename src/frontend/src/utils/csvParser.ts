import type { Student, Teacher } from "../backend";

export interface ParsedRow<T> {
  data: T;
  rowIndex: number;
  errors: string[];
  isValid: boolean;
}

export interface ParseResult<T> {
  rows: ParsedRow<T>[];
  totalRows: number;
  validRows: number;
  errorRows: number;
}

function parseCSVText(text: string): string[][] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");
  return lines.map((line) => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    result.push(current.trim());
    return result;
  });
}

function normalizeHeader(h: string): string {
  return h.toLowerCase().replace(/[\s_\-]/g, "");
}

function mapStudentRow(
  headers: string[],
  values: string[],
): { data: Partial<Student>; errors: string[] } {
  const map: Record<string, string> = {};
  for (const [i, h] of headers.entries()) {
    map[normalizeHeader(h)] = (values[i] || "").trim();
  }
  const data: Partial<Student> = {
    name: map.name || map.studentname || map.fullname || "",
    rollNumber: map.rollnumber || map.roll || map.rollno || map.studentid || "",
    branch: map.branch || map.department || map.dept || "",
    semester: map.semester || map.sem || "",
    email: map.email || map.emailid || "",
    phone: map.phone || map.mobile || map.phonenumber || map.contact || "",
  };

  const errors: string[] = [];
  if (!data.name) errors.push("Name is required");
  if (!data.rollNumber) errors.push("Roll Number is required");
  if (!data.branch) errors.push("Branch is required");
  if (!data.semester) errors.push("Semester is required");
  if (!data.email) errors.push("Email is required");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.push("Invalid email format");
  if (!data.phone) errors.push("Phone is required");

  return { data, errors };
}

function mapTeacherRow(
  headers: string[],
  values: string[],
): { data: Partial<Teacher>; errors: string[] } {
  const map: Record<string, string> = {};
  for (const [i, h] of headers.entries()) {
    map[normalizeHeader(h)] = (values[i] || "").trim();
  }
  const data: Partial<Teacher> = {
    name: map.name || map.teachername || map.facultyname || map.fullname || "",
    department: map.department || map.dept || map.branch || "",
    subject: map.subject || map.subjectname || "",
    email: map.email || map.emailid || "",
    employeeId:
      map.employeeid || map.empid || map.employeeno || map.staffid || "",
  };

  const errors: string[] = [];
  if (!data.name) errors.push("Name is required");
  if (!data.department) errors.push("Department is required");
  if (!data.subject) errors.push("Subject is required");
  if (!data.email) errors.push("Email is required");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.push("Invalid email format");
  if (!data.employeeId) errors.push("Employee ID is required");

  return { data, errors };
}

async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}

export async function parseStudentFile(
  file: File,
): Promise<ParseResult<Student>> {
  const text = await readFileAsText(file);
  const rows = parseCSVText(text);

  if (rows.length < 2) {
    return { rows: [], totalRows: 0, validRows: 0, errorRows: 0 };
  }

  const headers = rows[0];
  const dataRows = rows.slice(1);

  const parsed: ParsedRow<Student>[] = dataRows.map((values, idx) => {
    const { data, errors } = mapStudentRow(headers, values);
    return {
      data: data as Student,
      rowIndex: idx + 2,
      errors,
      isValid: errors.length === 0,
    };
  });

  const rollNumbers = new Map<string, number[]>();
  for (const [idx, row] of parsed.entries()) {
    if (row.data.rollNumber) {
      const existing = rollNumbers.get(row.data.rollNumber) || [];
      existing.push(idx);
      rollNumbers.set(row.data.rollNumber, existing);
    }
  }
  for (const indices of rollNumbers.values()) {
    if (indices.length > 1) {
      for (const idx of indices) {
        parsed[idx].errors.push("Duplicate Roll Number in file");
        parsed[idx].isValid = false;
      }
    }
  }

  const validRows = parsed.filter((r) => r.isValid).length;
  return {
    rows: parsed,
    totalRows: parsed.length,
    validRows,
    errorRows: parsed.length - validRows,
  };
}

export async function parseTeacherFile(
  file: File,
): Promise<ParseResult<Teacher>> {
  const text = await readFileAsText(file);
  const rows = parseCSVText(text);

  if (rows.length < 2) {
    return { rows: [], totalRows: 0, validRows: 0, errorRows: 0 };
  }

  const headers = rows[0];
  const dataRows = rows.slice(1);

  const parsed: ParsedRow<Teacher>[] = dataRows.map((values, idx) => {
    const { data, errors } = mapTeacherRow(headers, values);
    return {
      data: data as Teacher,
      rowIndex: idx + 2,
      errors,
      isValid: errors.length === 0,
    };
  });

  const empIds = new Map<string, number[]>();
  for (const [idx, row] of parsed.entries()) {
    if (row.data.employeeId) {
      const existing = empIds.get(row.data.employeeId) || [];
      existing.push(idx);
      empIds.set(row.data.employeeId, existing);
    }
  }
  for (const indices of empIds.values()) {
    if (indices.length > 1) {
      for (const idx of indices) {
        parsed[idx].errors.push("Duplicate Employee ID in file");
        parsed[idx].isValid = false;
      }
    }
  }

  const validRows = parsed.filter((r) => r.isValid).length;
  return {
    rows: parsed,
    totalRows: parsed.length,
    validRows,
    errorRows: parsed.length - validRows,
  };
}
