/* eslint-disable react/no-unescaped-entities */
import {  useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useUser } from "../Provider/UserProvider";



const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {setUser}= useUser();

    // function to match email password with db and sent to home
    const onSubmit = async (formData) => {
        try {
          const response = await fetch("http://localhost:3000/authenticate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            // Authentication successful, you can redirect the user or perform other actions here
            console.log("Authentication successful");
            const user = await response.json();
            setUser(user);
            window.location.href = "/";

          } else {
            // Authentication failed, handle the error
            console.error("Authentication failed");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
   
    return (
        <div className=" mx-auto flex justify-center items-center h-screen bg-gray-100">
            <div className="md:w-2/6 bg-white rounded-lg shadow-lg p-6 bg-opacity-20">
                <h3 className="text-2xl font-semibold mb-4">Please Login</h3>
                <form className="mx-auto form-control w-[400px]" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        placeholder="Enter email"
                        className={`border border-black p-1 rounded mb-4 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500">Valid email is required</p>}

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

                    <input
                        className="p-2 bg-blue-600 text-white rounded-lg mt-4"
                        value="Log In"
                        type="submit"
                    />
                    <p>Don't have an account? <a className="text-blue-600" href="/register">Register</a></p>
                </form>

                        <Link className="text-red-400" to="/">Go Back to home</Link>
            </div>
        </div>
    );
}


export default Login;

