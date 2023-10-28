import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IoFingerPrintOutline } from "react-icons/io5";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [data, setData] = useState("");
    const [print, setPrint] = useState(false);

    const getPrint = async () => {
        try {
            const response = await fetch("http://localhost:3000/newReg");
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
    }, []);
    console.log(print)

    // Function to delete the newPrint data
    const deletePrint = async () => {
        try {
            const response = await fetch("http://localhost:3000/newReg", {
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
    const onSubmit = async (formData) => {
        try {
            // Include newPrint in formData
            formData.fingerprint = print;
            await  deletePrint();

            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);

                if (formData) {
                    // Show success notification using Swal
                    window.location.href = "/login";
                    setData(JSON.stringify(formData));
                    console.log(JSON.stringify(formData));
                    console.log(data, "user added successfully");

                } else {
                    console.error("Failed to save user");
                }
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
                        {...register("category", { required: true })}
                    >
                        <option value="">Select Category...</option>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Admin">Admin</option>
                    </select>
                    {errors.category && <p className="text-red-500">Category is required</p>}

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
                    <p className="mt-2">
                        Already have an account?{' '}
                        <a className="text-blue-700" href="/login">
                            Login
                        </a>
                    </p>
                </form>

                <Link className="text-red-400" to="/">Go Back to home</Link>
            </div>
        </div>
    );
};

export default Register;
