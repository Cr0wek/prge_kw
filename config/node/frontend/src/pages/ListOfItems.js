import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

function ListOfItems(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log("działa");
    fetch("http://localhost:10000/app/get_users")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUsers(res.users);
      });
    console.log("działa", users);
  }, []);
  useEffect(() => {
    console.log("Stan users zaktualizowany:", users);
  }, [users]);

  console.log("To jest users i jego zawartość", users.data);
  return (
    <div>
      ListOfItems
      <div>
        {users?.map((user) => (
          <UserCard key={user.id || Math.random()} user={user} />
        ))}
      </div>
    </div>
  );
}

export default ListOfItems;
