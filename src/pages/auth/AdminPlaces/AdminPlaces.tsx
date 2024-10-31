import { cityData } from "@/assets/data/city";
import { placeAdminData } from "@/assets/data/place.data";
import Button from "@/components/Buttons/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import FilterSelects from "@/components/FilterSelects/FilterSelects";
import Input from "@/components/Input/Input";
import { PlaceAdmin } from "@/models/place.interface";
import React from "react";
import { Column, useTable } from "react-table";
import StatusChange from "./components/StatusChange";

function AdminPlaces() {
  const data = React.useMemo(() => placeAdminData, []);

  const columns = React.useMemo(
    (): Column<PlaceAdmin>[] => [
      {
        Header: "Cover",
        accessor: "cover",
        Cell: ({ value }: { value: string }) => (
          <img
            src={value}
            alt="Cover"
            className="h-16 w-full object-cover rounded"
          />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Owner",
        accessor: "ownerName",
        Cell: ({ row }: { row: any }) => (
          <div className="flex items-center space-x-2">
            <img
              src={row.original.ownerAvatar}
              alt="Owner Avatar"
              className="h-8 w-8 rounded-full"
            />
            <span>{row.original.ownerName}</span>
          </div>
        ),
      },
      {
        Header: "Status",
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
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<PlaceAdmin>({ columns, data });

  return (
    <>
      <div className="space-y-3">
        <FilterSelects
          label="Trạng thái"
          options={["Tất cả (90)", "Đang hoạt động (90)", "Bị khoá (90)"]}
        />
        <div className="grid grid-cols-2 gap-3">
          <Dropdown
            height="2.93rem"
            placeHolder="Chọn thành phố"
            options={cityData}
          />
          <div className="flex gap-2">
            <Input placeholder="Nhập tên hoặc email" className="h-full" />
            <Button variant="ghost">Tìm kiếm</Button>
          </div>
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

export default AdminPlaces;
