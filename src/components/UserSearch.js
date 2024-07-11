import { useState, useContext } from "react";
import UserContext from "./UserContext";
import AlertContext from "./AlertContext";
import { searchUsers } from "./UserAction";

function UserSearch() {
  // 1. Import the UserContext and AlertContext
  const { users, dispatch } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);

  const [text, setText] = useState("");
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "error");
    } else {
      dispatch({ type: "SET_LOADING" });
      const users = await searchUsers(text);
      console.log(users);
      dispatch({ type: "FETCH_USERS", payload: users });
      setText("");
    }
  };
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search Users"
                value={text}
                onChange={handleChange}
              ></input>
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-1-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* 如果有users才顯示clear button */}
      {users.length > 0 && (
        <div>
          <button
            onClick={() => {
              dispatch({ type: "CLEAR_USERS" });
            }}
            className="btn btn-ghost btn-lg"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
