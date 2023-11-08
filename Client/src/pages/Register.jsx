import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IoFingerPrintOutline } from "react-icons/io5";
import logo from "../assets/logo.jpeg"

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const [data, setData] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [print, setPrint] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]); // Track selected courses
    const getPrint = async () => {
        try {
            const response = await fetch("https://attserver.vercel.app/newReg");
            if (response.ok) {
                const data = await response.json();
                setPrint(data[0].newPrint);
            } else {
                console.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getPrint();
    }, [1000]);
    console.log(print)

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };
    // Function to delete the newPrint data
    const deletePrint = async () => {
        try {
            const response = await fetch("https://attserver.vercel.app/newReg", {
                method: "DELETE",
            });

            if (response.ok) {
                setPrint(false); // Update the print state to indicate deletion
            } else {
                console.error("Failed to delete newPrint data");
            }
        } catch (error) {
            console.error("Error in deletePrint:", error);
        }
    };

    // Function for post data to the db
    const handleCourseChange = (course, isChecked) => {
        setSelectedCourses((prevCourses) => {
            const updatedCourses = { ...prevCourses };
            if (isChecked) {
                updatedCourses[course] = course;
            } else {
                delete updatedCourses[course];
            }
            return updatedCourses;
        });
    };


    const onSubmit = async (formData) => {
        try {
            // Include newPrint and formatted courses in formData
            formData.fingerprint = print;
            if (selectedCategory === "Student") {
                formData.courses = "Student";
            } else {
                formData.courses = Object.values(selectedCourses).join(", ");
            }

            console.log(formData);
            alert("Registration successful. You can now log in with your new account.");
            reset(); // Reset the form
            deletePrint(); // Delete the newPrint data

            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Registration successful. You can now log in with your new account.");
            } else {
                console.error("Failed to save user");
            }
        } catch (error) {
            console.error("Error in onSubmit:", error);
        }
    };



    return (
        <div className=" mx-auto flex justify-center items-center h-screen bg-gray-100">
            <div className="md:w-2/6 bg-white rounded-lg shadow-lg p-6 bg-opacity-20">
                <img src={logo} alt="logo" className="w-30 h-20 mb-10" />

                <h3 className="text-2xl font-semibold mb-4">Please Register</h3>
                <form className="mx-auto form-control" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("name", { required: true })}
                        placeholder="Enter Name"
                        className={`border border-black p-1 rounded mb-4 ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500">Name is required</p>}

                    <input
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        placeholder="Enter email"
                        className={`border border-black p-1 rounded mb-4 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500">Valid email is required</p>}

                    <select
                        className={`border border-black p-1 rounded mb-4 ${errors.category ? 'border-red-500' : ''}`}
                        {...register("category", { required: true })} onChange={handleCategoryChange} 
                    >
                        <option value="">Select Category...</option>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                    </select>
                    {errors.category && <p className="text-red-500">Category is required</p>}
                    {
                        selectedCategory === "Teacher" && (
                            <>
                                <p>Select Courses:</p>
                                {["VLSI", "TDEP", "IPE", "DLD"].map((course) => (
                                    <label key={course}>
                                        <input
                                            type="checkbox"
                                            {...register(`courses[${course}]`)}
                                            value={course}
                                            onChange={(e) => handleCourseChange(course, e.target.checked)}
                                        />
                                        {course}
                                    </label>
                                )
                                )}
                            </>
                        )
                    }
                    <input
                        type="password"
                        {...register("password", {
                            required: true,
                            pattern: /^(?=.*[A-Z])(?=.*\d).+$/,
                        })}
                        placeholder="Password"
                        className={`border border-black p-1 rounded mb-4 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && (
                        <p className="text-red-500">
                            Password is required and must contain an uppercase letter and at least one number
                        </p>
                    )}

                    <IoFingerPrintOutline className={`text-6xl ${print ? 'text-green-600' : 'text-red-600'}`} />


                    <input
                        className="p-2 bg-blue-600 text-white rounded-lg mt-4"
                        value="Register"
                        type="submit"
                    />
                    
                </form>

                <Link className="text-red-400" to="/">Go Back to home</Link>
            </div>
        </div>
    );
};

export default Register;
