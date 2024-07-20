import { useState } from "react";

const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-300 bg-no-repeat">
      <form
        action="submit"
        onSubmit={() => handleSubmit()}
        className="bg-white p-10 rounded-3xl h-98 w-auto flex justify-center items-center"
      >
        <div>
          <h1 className="text-3xl text-red-700 text-center mb-3">Sign In</h1>
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
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
