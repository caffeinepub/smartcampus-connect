import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Teacher {
    subject: string;
    name: string;
    email: string;
    employeeId: string;
    department: string;
}
export interface UserProfile {
    name: string;
}
export interface Student {
    branch: string;
    semester: string;
    name: string;
    email: string;
    rollNumber: string;
    phone: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addStudent(student: Student): Promise<void>;
    addTeacher(teacher: Teacher): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bulkAddStudents(newStudents: Array<Student>): Promise<void>;
    bulkAddTeachers(newTeachers: Array<Teacher>): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getStudent(rollNumber: string): Promise<Student | null>;
    getTeacher(employeeId: string): Promise<Teacher | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllStudents(): Promise<Array<Student>>;
    listAllTeachers(): Promise<Array<Teacher>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
