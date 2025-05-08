import { useEffect, useState, useTransition } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchUsers, type UserWithoutPassword } from "../../services/api";
import Card from "../Card";
import Button from "../Button";
import { Link } from "react-router";

const UsersGrid = () => {
  const { token } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [users, setUsers] = useState<UserWithoutPassword[]>();
  const skeletonArray = Array(3).fill(null);

  useEffect(() => {
    if (token) {
      startTransition(async () => {
        const response = await fetchUsers(token);
        if (response?.status === 0) {
          setUsers(response?.users);
        } else {
          console.log(response?.msg);
        }
      });
    }
  }, [token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isPending
        ? skeletonArray.map((_, index) => (
            <Card key={`skeleton_user_${index}`}>
              <div className="animate-pulse">
                <div className="h-7 bg-gray-200 rounded w-full mb-6"></div>
                <div className="h-5 bg-gray-200 rounded w-46 mb-3"></div>
                <div className="h-[25.5px] bg-gray-200 rounded w-24 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded-md w-full"></div>
              </div>
            </Card>
          ))
        : users?.map(({ id, firstName, lastName, role, email }) => (
            <Card key={`user_card_${id}`}>
              <div className="flex flex-col h-full">
                <span className="text-2xl font-bold mb-4">
                  {firstName} {lastName}
                </span>
                <span className="text-md text-white/60">{email}</span>
                <span className="text-sm font-semibold border border-gray-400 rounded-4xl py-1 px-3 mt-2 max-w-fit">
                  {role === "admin" ? "Administrador" : "Usuario"}
                </span>
                <Link to={`/user/${id}`} className="w-full mt-4">
                  <Button className="w-full">Ver usuario</Button>
                </Link>
              </div>
            </Card>
          ))}
    </div>
  );
};

export default UsersGrid;
