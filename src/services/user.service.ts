import { getUserById, getUsers } from "@/apis/user.api";
import { UsersParams } from "@/models/user.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = (params: UsersParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
};

export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });
};
