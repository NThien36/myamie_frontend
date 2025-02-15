import Avatar from "@/components/Avatar/Avatar";
import Button from "@/components/Buttons/Button";
import FilterSelects from "@/components/FilterSelects/FilterSelects";
import Input from "@/components/Input/Input";
import { UserAdmin } from "@/models/user.interface";
import React, { useState } from "react";
import { Column, useTable } from "react-table";
import StatusChange from "./components/StatusChange";
import PasswordChange from "./components/PasswordChange";
import { UsersAdminParams } from "@/models/admin.interface";
import { AccountRoleEnum, AccountStatusEnum } from "@/models/app.interface";
import {
  ACTIVE_OPTION,
  ALL_OPTIONS,
  BUSINESS_ROLE_OPTION,
  SUSPEND_OPTION,
  USER_ROLE_OPTION,
} from "@/utils/constants";
import { useGetUsersByAdmin } from "@/services/admin.service";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import { Link } from "react-router-dom";

function AdminUsers() {
  const [params, setParams] = useState<UsersAdminParams>({
    pageNumber: 1,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isLoading, isError } = useGetUsersByAdmin(params);
  const pagination = data?.data.pagination;

  const updateParams = (newParams: UsersAdminParams) => {
    setParams((prev) => ({ ...prev, ...newParams, pageNumber: 1 }));
  };

  const handleSearch = () => {
    updateParams({ searchTerm });
  };

  const handlePageChange = (pageNumber: number) => {
    setParams((prev) => ({ ...prev, pageNumber }));
  };

  // Handle status changes
  const handleStatusChange = (statusLabel: string) => {
    let status: AccountStatusEnum | undefined = undefined;
    if (statusLabel === ACTIVE_OPTION) status = AccountStatusEnum.ACTIVATED;
    else if (statusLabel === SUSPEND_OPTION)
      status = AccountStatusEnum.SUSPENDED;

    updateParams({ Status: status });
  };

  // Handle role changes
  const handleRoleChange = (roleLabel: string) => {
    let role: AccountRoleEnum | undefined = undefined;
    if (roleLabel === USER_ROLE_OPTION) role = AccountRoleEnum.USER;
    else if (roleLabel === BUSINESS_ROLE_OPTION)
      role = AccountRoleEnum.BUSINESS;

    updateParams({ Role: role });
  };

  const columns = React.useMemo(
    (): Column<UserAdmin>[] => [
      {
        Header: "Ảnh",
        accessor: "avatar",
        Cell: ({ value }: { value: string }) => (
          <Avatar src={value} alt="avatar" size="size-10" hasBorder={false} />
        ),
      },
      {
        Header: "Tên",
        accessor: "name",
        Cell: ({ row }: { row: any }) => (
          <Link
            to={`/user/${row.original.id}`}
            className="hover:underline"
            target="_blank"
          >
            {row.original.name}
          </Link>
        ),
      },
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
        Cell: ({ row }: { row: any }) => (
          <div className="flex flex-col text-xs gap-2">
            <StatusChange id={row.original.id} />
            <PasswordChange id={row.original.id} />
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<UserAdmin>({ columns, data: data?.data.users ?? [] });

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <p className="error">Lỗi, vui lòng thử lại {data?.message}</p>;
  } else if (data?.data.users?.length === 0) {
    content = <p className="mx-auto w-fit">Không có dữ liệu</p>;
  } else {
    content = (
      <table
        {...getTableProps()}
        className="min-w-full bg-white rounded-lg overflow-hidden"
      >
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...rest } = headerGroup.getHeaderGroupProps(); // Extract key
            return (
              <tr
                key={key} // Pass key explicitly
                {...rest} // Spread the rest of the props
                className="bg-gray-100 border-b"
              >
                {headerGroup.headers.map((column) => {
                  const { key: columnKey, ...columnRest } =
                    column.getHeaderProps(); // Extract key for column
                  return (
                    <th
                      key={columnKey} // Pass column key explicitly
                      {...columnRest} // Spread the rest of the column props
                      className="p-4 text-left font-semibold uppercase text-xs whitespace-nowrap"
                    >
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...rest } = row.getRowProps(); // Extract key for row
            return (
              <tr key={key} {...rest} className="border-b">
                {row.cells.map((cell) => {
                  const { key: cellKey, ...cellRest } = cell.getCellProps(); // Extract key for cell
                  return (
                    <td key={cellKey} {...cellRest} className="p-4">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <>
      <div className="space-y-3">
        <FilterSelects
          label="Trạng thái"
          options={[ALL_OPTIONS, ACTIVE_OPTION, SUSPEND_OPTION]}
          onFilterChange={handleStatusChange}
        />
        <FilterSelects
          label="Vai trò"
          options={[ALL_OPTIONS, USER_ROLE_OPTION, BUSINESS_ROLE_OPTION]}
          onFilterChange={handleRoleChange}
        />
        <div className="flex gap-2 w-1/2">
          <Input
            placeholder="Nhập tên hoặc email"
            className="text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="ghost" onClick={handleSearch} className="text-xs">
            Tìm kiếm
          </Button>
        </div>
      </div>

      <div className="auth-container overflow-x-auto mt-5">
        {content}
        <Pagination
          className="mt-10"
          currentPage={pagination?.currentPage ?? 1}
          totalPage={pagination?.totalPages ?? 1}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default AdminUsers;
