import Button from "@/components/Buttons/Button";
import FilterSelects from "@/components/FilterSelects/FilterSelects";
import Input from "@/components/Input/Input";
import { PlaceAdmin } from "@/models/place.interface";
import React, { useState } from "react";
import { Column, useTable } from "react-table";
import StatusChange from "./components/StatusChange";
import {
  ACTIVE_OPTION,
  ALL_OPTIONS,
  DELETE_OPTION,
  SUSPEND_OPTION,
} from "@/utils/constants";
import { useGetPlacesByAdmin } from "@/services/admin.service";
import { PlacesAdminParams } from "@/models/admin.interface";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pagination";
import getImageUrl from "@/utils/getImageUrl";
import { PlaceStatusEnum } from "@/models/app.interface";
import { Link } from "react-router-dom";

function AdminPlaces() {
  const [params, setParams] = useState<PlacesAdminParams>({
    pageNumber: 1,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, isLoading, isError } = useGetPlacesByAdmin(params);
  const pagination = data?.data.pagination;

  const updateParams = (newParams: PlacesAdminParams) => {
    setParams((prev) => ({ ...prev, ...newParams, pageNumber: 1 }));
  };

  // Handle status changes
  const handleStatusChange = (statusLabel: string) => {
    let status: PlaceStatusEnum | undefined = undefined;
    if (statusLabel === ACTIVE_OPTION) status = PlaceStatusEnum.ACTIVATED;
    else if (statusLabel === SUSPEND_OPTION) status = PlaceStatusEnum.SUSPENDED;

    updateParams({ Status: status });
  };

  const handleSearch = () => {
    updateParams({ searchTerm });
  };

  const handlePageChange = (pageNumber: number) => {
    setParams((prev) => ({ ...prev, pageNumber }));
  };

  const columns = React.useMemo(
    (): Column<PlaceAdmin>[] => [
      {
        Header: "Ảnh bìa",
        accessor: "cover",
        Cell: ({ value }: { value: string }) => (
          <img
            src={getImageUrl(value, "cover")}
            alt="Cover"
            className="h-16 w-full object-cover rounded"
          />
        ),
      },
      {
        Header: "Tên",
        accessor: "name",
        Cell: ({ row }: { row: any }) => (
          <Link
            to={`/place/${row.original.id}`}
            target="_blank"
            className="hover:underline"
          >
            {row.original.name}
          </Link>
        ),
      },
      {
        Header: "Thành phố",
        accessor: "city",
      },
      {
        Header: "Người đăng",
        accessor: "ownerName",
        Cell: ({ row }: { row: any }) => (
          <div className="flex items-center space-x-2">
            <img
              src={getImageUrl(row.original.ownerAvatar, "avatar")}
              alt="Owner Avatar"
              className="h-8 w-8 rounded-full object-cover flex-none"
            />
            <span>{row.original.ownerName}</span>
          </div>
        ),
      },
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
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<PlaceAdmin>({ columns, data: data?.data.places ?? [] });

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <p className="error">Lỗi, vui lòng thử lại {data?.message}</p>;
  } else if (data?.data.places?.length === 0) {
    content = <p className="mx-auto w-fit">Không có dữ liệu</p>;
  } else {
    content = (
      <table
        {...getTableProps()}
        className="min-w-full bg-white rounded-lg overflow-hidden"
      >
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...rest } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...rest} className="bg-gray-100 border-b">
                {headerGroup.headers.map((column) => {
                  const { key: columnKey, ...columnRest } =
                    column.getHeaderProps();
                  return (
                    <th
                      key={columnKey}
                      {...columnRest}
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
            const { key, ...rest } = row.getRowProps();
            return (
              <tr key={key} {...rest} className="border-b">
                {row.cells.map((cell) => {
                  const { key: cellKey, ...cellRest } = cell.getCellProps();
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
        <div className="grid grid-cols-2 gap-3">
          <div className="flex gap-2">
            <Input
              placeholder="Nhập tên hoặc email"
              className="h-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="ghost" onClick={handleSearch}>
              Tìm kiếm
            </Button>
          </div>
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

export default AdminPlaces;
