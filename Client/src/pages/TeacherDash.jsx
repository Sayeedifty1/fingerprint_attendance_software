import { useEffect, useState } from "react";
import { useUser } from "../Provider/UserProvider";

const TeacherDash = () => {
    const { user } = useUser();
    const [courseName, setCourseName] = useState(user?.courses[0]);
    const teacherId = user?.fingerprint;
    // const courseName = "VLSI"; // You can dynamically set this value based on your logic
    console.log(courseName)
    const [studentsData, setStudentsData] = useState([]);
    const [attendanceData, setAttendanceData] = useState({ matchedData: [], uniqueCourses: [] });

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/attendance/${courseName}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch attendance data');
                }

                const data = await response.json();
                setAttendanceData(data);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        const fetchStudentsData = async () => {
            try {
                const response = await fetch('http://localhost:5000/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch student data');
                }

                const data = await response.json();
                // Filter only students
                const students = data.filter(student => student.category === 'Student');
                setStudentsData(students);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        if (teacherId) {
            setAttendanceData({ matchedData: [], uniqueCourses: [] }); // Reset attendance data when course name changes
            fetchAttendanceData();
            fetchStudentsData();
        }
    }, [courseName]);

    // ...

    return (
        <div className="w-[80%] mx-auto overflow-x-auto">
            <h1 className="text-5xl my-10">Attendance </h1>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Profession:{user?.category}</p>
            <p>Mobile:{user?.mobile}</p>
            <p>Taken Course: {user?.courses.length}</p>
            <div className="flex gap-2 mt-1">
                <p>Select Course: </p>
                <select
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                >
                    {user?.courses.map((course, index) => (
                        <option key={index} value={course}>
                            {course}
                        </option>
                    ))}
                </select>
            </div>
            {/* Iterate over each course */}
            {attendanceData.matchedData.length === 0 ? (
                <p>No data in the server</p>
            ) : (
                attendanceData.uniqueCourses.map((course, index) => (
                    <><table key={index} className="w-4/5 text-center border border-collapse border-gray-400">
                        <caption>Attendance for {course} course</caption>
                        <thead>
                            <tr>
                                <th className="border">Name</th>
                                <th className="border">Id</th>
                                {/* Iterate over the unique dates in the attendance data for the current course */}
                                {attendanceData.matchedData.map(data => (
                                    <th className="border" key={data.Date}>{data.Date}</th>
                                ))}
                                <th className="border">Total Present Days</th>
                                <th className="border">Percentage</th>
                                <th className="border">Total marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsData?.map(student => {
                                const dates = Array.from(new Set(attendanceData.matchedData.filter(data => data.course === course).map(data => data.Date)));
                                const presentDays = dates.filter(date => attendanceData.matchedData.find(data => data.Date === date && Object.values(data).includes(student.fingerprint))).length;
                                const percentage = (presentDays / dates.length) * 100;
                                return (
                                    <tr key={student?.id}>
                                        <td className="border">{student?.name}</td>
                                        <td className="border">{student?.id}</td>
                                        {/* Iterate over the unique dates in the attendance data for the current course */}
                                        {dates.map(date => (
                                            <td className="border" key={date}>
                                                {attendanceData.matchedData.find(data => data.Date === date && Object.values(data).includes(student.fingerprint)) ? 'P' : 'A'}
                                            </td>
                                        ))}
                                        <td className="border">{presentDays}</td>
                                        <td className="border">{percentage.toFixed(1)}%</td>
                                        <td className="border">{percentage / 10}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                        <button className="mt-8 p-1 bg-green-700 rounded-lg text-white">Submit</button>
                    </>
                ))
            )}
        </div>
    );
};

export default TeacherDash;
