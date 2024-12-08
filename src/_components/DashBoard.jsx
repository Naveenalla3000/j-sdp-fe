import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Users,
    BookOpen,
    GraduationCap,
    Settings,
    LogOut,
    Plus,
    Trash2,
    RefreshCw
} from 'lucide-react'

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState("Users");
    const [users, setUsers] = useState([]);
    const [students, setStudents] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [courses, setCourses] = useState([]);
    const [facultyCourses, setFacultyCourses] = useState({});


    // New Course State
    const [newCourse, setNewCourse] = useState({
        name: '',
        code: '',
        creditHours: 0
    });

    // Modals and Selection States
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAssignCourseModalOpen, setIsAssignCourseModalOpen] = useState(false);

    // Fetch Data Functions
    const fetchUsers = async () => {
        try {
            const response = await axios.get("https://sb-sdp.onrender.com/api/admin/allUsers", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await axios.get("https://sb-sdp.onrender.com/api/admin/allStudents", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const fetchFaculty = async () => {
        try {
            const response = await axios.get("https://sb-sdp.onrender.com/api/admin/allFaculty", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setFaculty(response.data);
        } catch (error) {
            console.error("Error fetching faculty:", error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get("https://sb-sdp.onrender.com/api/admin/allCourses", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    // Effect to load initial data
    useEffect(() => {
        fetchUsers();
        fetchStudents();
        fetchFaculty();
        fetchCourses();
    }, []);


    // Course Management Functions
    const handleCourseChange = (e) => {
        const { name, value } = e.target;
        setNewCourse({ ...newCourse, [name]: value });
    };

    const addCourse = async () => {
        try {
            const response = await axios.post(
                `https://sb-sdp.onrender.com/api/admin/createCourse`,
                newCourse,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setCourses([...courses, response.data]);
            setNewCourse({ name: '', code: '', creditHours: 0 });
            fetchCourses();
        } catch (error) {
            console.error("Error adding course:", error);
        }
    };

    const deleteCourse = async (courseId) => {
        try {
            await axios.delete(`https://sb-sdp.onrender.com/api/admin/deleteCourse/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            fetchCourses();
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    // Assignment Functions
    const assignCourseToStudent = async (studentId, courseId) => {
        try {
            await axios.post(
                `https://sb-sdp.onrender.com/api/admin/assignCourseToStudent`,
                null,
                {
                    params: { studentId, courseId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            alert("Course assigned to student successfully.");
            setIsAssignCourseModalOpen(false);
        } catch (error) {
            console.error("Error assigning course to student:", error);
        }
    };



    const assignCourseToFaculty = (facultyId, courseId) => {
        if (!courseId) return;

        // Make the API call to assign the course
        axios
            .post(
                `https://sb-sdp.onrender.com/api/admin/assignCourseToFaculty`,
                null, // No request body required
                {
                    params: { facultyId, courseId }, // Pass facultyId and courseId as query parameters
                }
            )
            .then((response) => {
                const course = courses.find((c) => c.id === parseInt(courseId));
                if (!course) return;

                // Update UI state with assigned course
                setFacultyCourses((prev) => {
                    const updated = { ...prev };
                    updated[facultyId] = [...(updated[facultyId] || []), course];
                    return updated;
                });

                alert(`Course "${course.name}" assigned to faculty successfully!`);
            })
            .catch((error) => {
                console.error("Error assigning course to faculty:", error);
                alert("Failed to assign course to faculty.");
            });
    };


    const changeUserRole = async (userId) => {
        try {
            await axios.put(`https://sb-sdp.onrender.com/api/admin/changeRole/${userId}`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            alert("User role changed successfully.");
            fetchUsers();
        } catch (error) {
            console.error("Error changing user role:", error);
        }
    };

    return (
        <div className="flex w-full text-black min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-600 text-white flex flex-col">
                <div className="p-4 text-center font-bold text-xl border-b border-blue-400">
                    Admin Dashboard
                </div>
                <nav className="flex-1 p-4">
                    <ul className="space-y-4">
                        {[
                            { name: "Users", icon: <Users /> },
                            { name: "Courses", icon: <BookOpen /> },
                            { name: "Students", icon: <GraduationCap /> },
                            { name: "Faculty", icon: <GraduationCap /> },
                            { name: "Settings", icon: <Settings /> }
                        ].map(({ name, icon }) => (
                            <li
                                key={name}
                                className={`flex items-center cursor-pointer p-2 rounded-lg ${activeSection === name ? "bg-blue-500" : ""}`}
                                onClick={() => setActiveSection(name)}
                            >
                                {icon}
                                <span className="ml-2">{name}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-blue-400">
                    <button
                        className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
                    >
                        <LogOut className="mr-2" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">
                    {activeSection} Management
                </h1>

                {/* Users Section */}
                {activeSection === "Users" && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">All Users</h2>
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="flex justify-between items-center border-b py-3"
                            >
                                <div>
                                    <p className="font-semibold">{user.username}</p>
                                    <p className="text-sm text-gray-500">{user.role}</p>
                                </div>
                                <button
                                    onClick={() => changeUserRole(user.id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    Change Role
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* faculty sesction */}
                {
                    activeSection === "Faculty" && (
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">All faculty</h2>
                            {faculty.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex justify-between items-center border-b py-3"
                                >
                                    <div>
                                        <p className="font-semibold">{user.username}</p>
                                        <p className="text-sm text-gray-500">{user.role}</p>
                                    </div>
                                    <button
                                        onClick={() => changeUserRole(user.id)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        view
                                    </button>
                                </div>
                            ))}
                        </div>
                    )
                }

                {/* Courses Section */}
                {activeSection === "Courses" && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Course Management</h2>
                            <button
                                onClick={addCourse}
                                className="flex items-center bg-green-500 text-white px-4 py-2 rounded"
                            >
                                <Plus className="mr-2" /> Add Course
                            </button>
                        </div>

                        <div className="grid gap-4">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={newCourse.name}
                                    onChange={handleCourseChange}
                                    placeholder="Course Name"
                                    className="w-full p-2 border rounded mb-2"
                                />
                                <input
                                    type="text"
                                    name="code"
                                    value={newCourse.code}
                                    onChange={handleCourseChange}
                                    placeholder="Course Code"
                                    className="w-full p-2 border rounded mb-2"
                                />
                                <input
                                    type="number"
                                    name="creditHours"
                                    value={newCourse.creditHours}
                                    onChange={handleCourseChange}
                                    placeholder="Credit Hours"
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            {courses.map((course) => (
                                <div
                                    key={course.id}
                                    className="flex justify-between items-center border-b pb-2"
                                >
                                    <div>
                                        <p className="font-semibold">{course.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {course.code} | {course.creditHours} Credits
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => deleteCourse(course.id)}
                                            className="text-red-500"
                                        >
                                            <Trash2 />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Students Section */}
                {activeSection === "Students" && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Students List</h2>
                        {students.map((student) => (
                            <div
                                key={student.id}
                                className="flex justify-between items-center border-b py-3"
                            >
                                <div>
                                    <p className="font-semibold">{student.username}</p>
                                    <p className="text-sm text-gray-500">{student.role}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedUser(student);
                                        setIsAssignCourseModalOpen(true);
                                    }}
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    Assign Course
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Course Assignment Modal */}
            {isAssignCourseModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Assign Course</h2>
                        <div className="space-y-4">
                            {courses.map((course) => (
                                <button
                                    key={course.id}
                                    onClick={() => {
                                        if (selectedUser.role === 'STUDENT') {
                                            assignCourseToStudent(selectedUser.id, course.id);
                                        } else {
                                            assignCourseToFaculty(selectedUser.id, course.id);
                                        }
                                    }}
                                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                                >
                                    {course.name} ({course.code})
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsAssignCourseModalOpen(false)}
                            className="w-full mt-4 bg-red-500 text-white py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard