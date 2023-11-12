import { useEffect, useState } from "react";
import { useUser } from "../Provider/UserProvider";

const TeacherDash = () => {
    const { user } = useUser();
    const teacherId = user?.fingerprint;
    const courseName = "VLSI"; // You can dynamically set this value based on your logic

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
            fetchAttendanceData();
            fetchStudentsData();
        }
    }, [teacherId, courseName]);

    return (
        <div className="w-[80%] mx-auto overflow-x-auto">
            <h1 className="text-5xl my-10">Attendance </h1>
            <p>Name: {user?.name}</p>
            <p>Taken Course: {user?.courses.length}</p>

            {/* Iterate over each course */}
            {attendanceData.uniqueCourses.map((course, index) => (
                <table key={index} className="w-4/5 border border-collapse border-gray-400">
                    <caption>Attendance for {course} course</caption>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Id</th>
                            {/* Iterate over the unique dates in the attendance data for the current course */}
                            {attendanceData.matchedData.map(data => (
                                <th key={data.Date}>{data.Date}</th>
                            ))}
                            <th>Total Present Days</th>
                            <th>Percentage</th>
                            <th>Total marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentsData?.map(student => (
                            <tr key={student?.id}>
                                <td>{student?.name}</td>
                                <td>{student?.id}</td>
                                {/* Iterate over the unique dates in the attendance data for the current course */}
                                {Array.from(new Set(attendanceData.matchedData.filter(data => data.course === course).map(data => data.Date))).map(date => (
                                    <td key={date}>
                                        {attendanceData.matchedData.find(data => data.Date === date && Object.values(data).includes(student.fingerprint)) ? 'P' : 'A'}
                                    </td>
                                ))}
                                {/* Add more table cells with total present days, percentage, and total marks */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ))}
        </div>
    );
};

export default TeacherDash;
