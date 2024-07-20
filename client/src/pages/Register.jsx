import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const Register = () => {
  const [userInfo, setUserInfo] = useState({});
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { data } = await axios.post("/register", userInfo);
  //   toast.success(data);
  // };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-300 bg-no-repeat">
      <form
        action="submit"
        onSubmit={() => handleSubmit()}
        className="bg-white p-10 rounded-3xl h-98 w-auto flex justify-center items-center"
      >
        <div>
          <h1 className="text-3xl text-red-700 mb-3">Create New Account</h1>
          <div className="ml-4">
            <label className="block ml-3" htmlFor="username">
              Name
            </label>
            <input
              type="text"
              name="username"
              placeholder="johnDoe"
              onChange={(e) =>
                setUserInfo({ ...userInfo, username: e.target.value })
              }
              className="bg-gray-300 h-9 rounded-3xl w-60 outline-none p-3 text-gray-600 my-2"
            />

            <label className="block ml-3" htmlFor="email">
              Email
            </label>
            <input
              placeholder="joneDoe@gmail.com"
              type="text"
              name="email"
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              className="bg-gray-300 h-9 rounded-3xl w-60 outline-none p-3 text-gray-600 my-3"
            />

            <label className="block ml-3" htmlFor="Password">
              Password
            </label>
            <input
              type="text"
              name="Password"
              placeholder="**********"
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              className="bg-gray-300 h-9 rounded-3xl w-60 outline-none p-3 block text-gray-600 my-2"
            />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-3 ml-16 py-2 px-4 rounded-full"
            >
              Sign Up
            </button>
          </div>

          <div className="mt-3 text-center text-red-700">
            Already Registered?{" "}
            <span className="text-blue-500 cursor-pointer">Login</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
