
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import { useMemo, Fragment, useCallback } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import {
  FaSearch,
  FaChevronDown,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import { Listbox, Transition } from "@headlessui/react";

const columnHelper = createColumnHelper()


function Avatar({ src, alt = "avatar" }) {
  return (
    <img src={src} alt={alt} className="w-8 h-8 rounded-full object-cover" />
  );
}
// const generateData = (numberOfRows = 25) =>
//   [...Array(numberOfRows)].map(() => ({
//     name: faker.name.fullName(),
//     image: faker.image.avatar(),
//     accountNumber: faker.finance.account(8),
//     accountName: faker.finance.accountName(),
//     amount: faker.finance.amount(500, 1e4, 2, "$"),
//   }));
const columns = [
  columnHelper.accessor("Product_name", {
    header: "Product Name",
    cell: ({ row, getValue }) => {
      return (
        <div className="flex gap-2 items-center">
          <Avatar src={row.original.product_image} alt={`${getValue()}'s Avatar`} />
          <div>{getValue()}</div>
        </div>
      );
    },
  }),
  columnHelper.accessor('sku', {
    header: 'SKU',
  }),
  columnHelper.accessor('short_description', {
    header: 'Short Description',
  }),
  columnHelper.accessor('price', {
    header: 'Price',
  }),
  columnHelper.accessor('discount_price', {
    header: 'Discount Price',
  }),
  columnHelper.accessor('options', {
    header: 'Options',
    cell: ({ row, getValue }) => {
      const value = getValue();
      return (
        <div className="relative">
          <select
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            defaultValue={value[0]}
          >
            {value.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <FaChevronDown
              size="0.80rem"
              className="text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor('active', {
    header: 'Active',
    cell: ({ getValue }) => {
      return getValue() ? 'Yes' : 'No';
    },
  }),
  columnHelper.accessor('actions', {
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button onClick={() => handleActionsProductClick(row)}>
          <FaTrash />
        </button>
        <button onClick={() => handleActionsProductClick(row)}>
          <FaEdit />
        </button>
      </div>
    ),
  }),
];

function InputGroup7({
  label,
  name,
  value,
  onChange,
  type = "text",
  decoration,
  className = "",
  inputClassName = "",
  decorationClassName = "",
  disabled,
}) {
  return (
    <div
      className={`flex flex-row-reverse items-stretch w-full rounded-xl overflow-hidden bg-white shadow-[0_4px_10px_rgba(0,0,0,0.03)] ${className}`}
    >
      <input
        id={name}
        name={name}
        value={value}
        type={type}
        placeholder={label}
        aria-label={label}
        onChange={onChange} nn
        className={`peer block w-full p-3 text-gray-600 focus:outline-none focus:ring-0 appearance-none ${disabled ? "bg-gray-200" : ""
          } ${inputClassName}`}
        disabled={disabled}
      />
      <div
        className={`flex items-center pl-3 py-3 text-gray-600 ${disabled ? "bg-gray-200" : ""
          } ${decorationClassName}`}
      >
        {decoration}
      </div>
    </div>
  );
}

function GlobalSearchFilter({
  globalFilter,
  setGlobalFilter,
  className = "",
}) {
  return (
    <InputGroup7
      name="search"
      value={globalFilter || ""}
      onChange={(e) => setGlobalFilter(e.target.value)}
      label="Search"
      decoration={<FaSearch size="1rem" className="text-gray-400" />}
      className={className}
    />
  );
}

function SelectMenu({ value, setValue, options, className = "", disabled }) {
  const selectedOption = useMemo(
    () => options.find((o) => o.id === value),
    [options, value]
  );
  return (
    <Listbox value={value} onChange={setValue} disabled={disabled}>
      <div className={`relative w-full ${className}`}>
        <Listbox.Button
          className={`relative w-full  rounded-xl py-3 pl-3 pr-10 text-base text-gray-700 text-left shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none
          ${disabled
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white cursor-default"
            }
        
        `}
        >
          <span className="block truncate">{selectedOption.caption}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <FaChevronDown
              size="0.80rem"
              className="text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white text-base shadow-[0_4px_10px_rgba(0,0,0,0.03)] focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-3 pl-10 pr-4 ${active ? "bg-red-100" : ""
                  }`
                }
                value={option.id}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${selected ? "font-medium" : "font-normal"
                        }`}
                    >
                      {option.caption}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-400">
                        <FaCheck size="0.5rem" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

function Button2({ content, onClick, active, disabled }) {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
      ${active ? "bg-red-500 text-white" : "text-red-500"}
      ${!disabled
          ? "bg-white hover:bg-red-500 hover:text-white"
          : "text-red-300 bg-white cursor-not-allowed"
        }
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

// function PaginationNav({
//   gotoPage,
//   canPreviousPage,
//   canNextPage,
//   pageCount,
//   pageIndex,
// }) {
//   const renderPageLinks = useCallback(() => {
//     if (pageCount === 0) return null;
//     const visiblePageButtonCount = 3;
//     let numberOfButtons =
//       pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount;
//     const pageIndices = [pageIndex];
//     numberOfButtons--;
//     [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
//       const pageNumberBefore = pageIndices[0] - 1;
//       const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
//       if (
//         pageNumberBefore >= 0 &&
//         (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
//       ) {
//         pageIndices.unshift(pageNumberBefore);
//       } else {
//         pageIndices.push(pageNumberAfter);
//       }
//     });
//     return pageIndices.map((pageIndexToMap) => (
//       <li key={pageIndexToMap}>
//         <Button2
//           content={pageIndexToMap + 1}
//           onClick={() => gotoPage(pageIndexToMap)}
//           active={pageIndex === pageIndexToMap}
//         />
//       </li>
//     ));
//   }, [pageCount, pageIndex]);
//   return (
//     <ul className="flex gap-2">
//       <li>
//         <Button2
//           content={
//             <div className="flex ml-1">
//               <FaChevronLeft size="0.6rem" />
//               <FaChevronLeft size="0.6rem" className="-translate-x-1/2" />
//             </div>
//           }
//           onClick={() => gotoPage(0)}
//           disabled={!canPreviousPage}
//         />
//       </li>
//       {renderPageLinks()}
//       <li>
//         <Button2
//           content={
//             <div className="flex ml-1">
//               <FaChevronRight size="0.6rem" />
//               <FaChevronRight size="0.6rem" className="-translate-x-1/2" />
//             </div>
//           }
//           onClick={() => gotoPage(pageCount - 1)}
//           disabled={!canNextPage}
//         />
//       </li>
//     </ul>
//   );
// }

function TableComponent({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  rows,
  prepareRow,
}) {
  return (
    <div className="w-full min-w-[30rem] p-4 bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-3 text-start text-xs font-light uppercase cursor-pointer"
                  style={{ width: column.width }}
                >
                  <div className="flex gap-2 items-center">
                    <div className="text-gray-600">
                      {column.render("Header")}
                    </div>
                    <div className="flex flex-col">
                      <FaSortUp
                        className={`text-sm translate-y-1/2 ${column.isSorted && !column.isSortedDesc
                          ? "text-red-400"
                          : "text-gray-300"
                          }`}
                      />
                      <FaSortDown
                        className={`text-sm -translate-y-1/2 ${column.isSortedDesc ? "text-red-400" : "text-gray-300"
                          }`}
                      />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-100">
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="p-3 text-sm font-normal text-gray-700 first:rounded-l-lg last:rounded-r-lg"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Filter({
  column,
  table,
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue)?.[0] ?? ''}
        onChange={e =>
          column.setFilterValue((old) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue)?.[1] ?? ''}
        onChange={e =>
          column.setFilterValue((old) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? '') }
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  )
}
function Table1({ data }) {
  console.log("data", data);

  const table = useReactTable(
    {
      data,
      columns,
      // Pipeline
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    }
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between">
        {/* <GlobalSearchFilter
          className="sm:w-64"
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <SelectMenu
          className="sm:w-44"
          value={pageSize}
          setValue={setPageSize}
          options={[
            { id: 5, caption: "5 items per page" },
            { id: 10, caption: "10 items per page" },
            { id: 20, caption: "20 items per page" },
          ]}
        /> */}
        {/* <button onClick={() => handleActionsProductClick()}>
          <FaPlus />
        </button>, */}
      </div>
      {/* <TableComponent
        // getTableProps={getTableProps}
        // headerGroups={headerGroups}
        // getTableBodyProps={getTableBodyProps}
        // rows={rows}
        // prepareRow={prepareRow}
        {...{
          data,
          columns,
        }}
      /> */}
      <div className="w-full min-w-[30rem] p-4 bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup._id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-3 text-start text-xs font-light uppercase cursor-pointer"
                  >
                    {/* <div className="flex gap-2 items-center">
                      <div className="text-gray-600">
                        {column.render("Header")}
                      </div>
                      <div className="flex flex-col">
                        <FaSortUp
                          className={`text-sm translate-y-1/2 ${column.isSorted && !column.isSortedDesc
                            ? "text-red-400"
                            : "text-gray-300"
                            }`}
                        />
                        <FaSortDown
                          className={`text-sm -translate-y-1/2 ${column.isSortedDesc ? "text-red-400" : "text-gray-300"
                            }`}
                        />
                      </div>
                    </div> */}
                    <div className="flex gap-2 items-center">

                      {header.isPlaceholder ? null : (
                        <div className="text-gray-600">                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                          {header.column.getCanFilter() ? (
                            <div className="flex flex-col">
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => {
              return (
                <tr key={row.id} className="hover:bg-gray-100">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="p-3 text-sm font-normal text-gray-700 first:rounded-l-lg last:rounded-r-lg"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        {/* <PaginationNav
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
        /> */}
      </div>
    </div>
  );
}
export { Table1 };


