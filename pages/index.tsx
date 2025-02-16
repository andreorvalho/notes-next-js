import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => {
        const a = res.json();
        console.log(a);
        return a;

      })
      .then(setUsers);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}
