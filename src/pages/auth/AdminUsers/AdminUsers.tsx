import { userAdminData } from "@/assets/data/user.data";
import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Buttons/Button";
import FilterSelects from "@/components/FilterSelects/FilterSelects";
import Input from "@/components/Input/Input";
import { UserAdmin } from "@/models/user.interface";
import React from "react";
import { Column, useTable } from "react-table";
import StatusChange from "./components/StatusChange";
import PasswordChange from "./components/PasswordChange";

function AdminUsers() {
  const data = React.useMemo(() => userAdminData, []);

  const columns = React.useMemo(
    (): Column<UserAdmin>[] => [
      {
        Header: "Ảnh",
        accessor: "avatar",
        Cell: ({ value }: { value: string }) => (
          <Avatar src={value} alt="avatar" size="size-10" hasBorder={false} />
        ),
      },
      { Header: "Tên", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Thành phố", accessor: "city" },
      { Header: "Vai trò", accessor: "role" },
      {
        Header: "Trạng thái",
        accessor: "status",
        Cell: ({ value }: { value: string }) => (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              value === "ACTIVATED"
                ? "bg-primary-lighter text-primary"
                : "bg-red-100 text-red-700"
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Hành động",
        accessor: "action",
        Cell: () => (
          <div className="flex flex-col text-xs gap-2">
            <StatusChange />
            <PasswordChange />
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<UserAdmin>({ columns, data });

  return (
    <>
      <div className="space-y-3">
        <FilterSelects
          label="Trạng thái"
          options={["Tất cả (90)", "Đang hoạt động (90)", "Bị khoá (90)"]}
        />
        <FilterSelects
          label="Vai trò"
          options={["Tất cả (90)", "Người dùng (90)", "Dịch vụ (90)"]}
        />
        <div className="flex gap-2 w-1/2">
          <Input placeholder="Nhập tên hoặc email" className="text-xs" />
          <Button variant="ghost" className="text-xs">
            Tìm kiếm
          </Button>
        </div>
      </div>

      <div className="auth-container mt-5">
        <table
          {...getTableProps()}
          className="min-w-full bg-white rounded-lg overflow-hidden"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-gray-100 border-b"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="p-4 text-left font-semibold uppercase text-xs"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-b">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-4">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminUsers;
