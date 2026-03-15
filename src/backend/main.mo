import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type Student = {
    name : Text;
    rollNumber : Text;
    branch : Text;
    semester : Text;
    email : Text;
    phone : Text;
  };

  type Teacher = {
    name : Text;
    department : Text;
    subject : Text;
    email : Text;
    employeeId : Text;
  };

  let students = Map.empty<Text, Student>();
  let teachers = Map.empty<Text, Teacher>();

  public shared ({ caller }) func addStudent(student : Student) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add students");
    };
    students.add(student.rollNumber, student);
  };

  public shared ({ caller }) func addTeacher(teacher : Teacher) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add teachers");
    };
    teachers.add(teacher.employeeId, teacher);
  };

  public shared ({ caller }) func bulkAddStudents(newStudents : [Student]) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can bulk add students");
    };
    for (student in newStudents.values()) {
      students.add(student.rollNumber, student);
    };
  };

  public shared ({ caller }) func bulkAddTeachers(newTeachers : [Teacher]) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can bulk add teachers");
    };
    for (teacher in newTeachers.values()) {
      teachers.add(teacher.employeeId, teacher);
    };
  };

  public query ({ caller }) func getStudent(rollNumber : Text) : async ?Student {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view student records");
    };
    students.get(rollNumber);
  };

  public query ({ caller }) func getTeacher(employeeId : Text) : async ?Teacher {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view teacher records");
    };
    teachers.get(employeeId);
  };

  public query ({ caller }) func listAllStudents() : async [Student] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view student records");
    };
    students.values().toArray();
  };

  public query ({ caller }) func listAllTeachers() : async [Teacher] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view teacher records");
    };
    teachers.values().toArray();
  };
};
