const TeacherDash = () => {
    const data = [
        {
            id: 1,
            name: "John Doe",
            attendance: [
                true, false, true, true, false, true, true, true, true, false, true, true, true, false, true, true, false, true, true, true, true, false, true, true, true, false
            ],
            totalPresent: 18,
        },
        {
            id: 2,
            name: "Jane Smith",
            attendance: [
                true, true, false, true, true, true, false, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, false, true, true, false
            ],
            totalPresent: 21,
        },
        {
            id: 3,
            name: "Alice Johnson",
            attendance: [
                true, true, false, true, true, true, false, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, false, true, true, false
            ],
            totalPresent: 21,
        },
    ];

    const formatAttendance = (isPresent) => (isPresent ? 'P' : 'A');

    return (
        <div className="w-[80%] mx-auto overflow-x-auto">
            <h1 className="text-5xl my-10">Attendance </h1>
            <p>Name: Teacher Name</p>
            <table className="w-4/5 border border-collapse border-gray-400">
                <thead>
                    <tr>
                        <th className="p-4 border border-gray-400">Name</th>
                        <th className="p-4 border border-gray-400">ID</th>
                        {Array.from({ length: 26 }, (_, index) => (
                            <th key={index} className="p-4 border border-gray-400">
                                Day {index + 1}
                            </th>
                        ))}
                        <th className="p-4 border border-gray-400">Total Days Present</th>
                        <th className="p-4 border border-gray-400">Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className="p-4 border border-gray-400">{item.name}</td>
                            <td className="p-4 border border-gray-400">{item.id}</td>
                            {item.attendance.map((isPresent, index) => (
                                <td key={index} className="p-4 border border-gray-400">
                                    {formatAttendance(isPresent)}
                                </td>
                            ))}
                            <td className="p-4 border border-gray-400">{item.totalPresent}</td>
                            <td className="p-4 border border-gray-400">
                                {((item.totalPresent / 26) * 100).toFixed(2)}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherDash;
