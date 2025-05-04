"use client";

import { useState } from "react";
import { Advocate } from "@/types";
import SolaceLogo from "./solace.svg";
import Image from "next/image";
import AdvocateTable from "./AdvocateTable";
import useDebounce from "./hooks/UseDebounce";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [sortedCol, setSortedCol] = useState("");
  const [order, setOrder] = useState("asc");

  useDebounce(
    () => {
      console.log("fetching advocates...");

      fetch(
        `/api/advocates?search=${searchTerm}&pageSize=${pageSize}&page=${page}&dir=${order}&col=${sortedCol}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          response.json().then((jsonResponse) => {
            setAdvocates(jsonResponse.data);
            setFilteredAdvocates(jsonResponse.data);
            setTotal(jsonResponse.total);
            setTotalPages(jsonResponse.numPages);
          });
        })
        .catch((e) => {
          console.error("Failed to fetch advocates", e);
        });
    },
    [page, pageSize, searchTerm, sortedCol, order],
    300
  );

  const searchTermChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setSearchTerm(e.target.value.toLowerCase());
  };

  const pageSizeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.target.value));
  };

  const nextPage = () => {
    setPage((old) => old + 1);
  };

  const prevPage = () => {
    setPage((old) => old - 1);
  };

  const onReset = () => {
    console.log(advocates);
    setSearchTerm("");
    setPage(1);
    setFilteredAdvocates(advocates);
  };

  const onHeaderClick = (key: keyof Advocate) => {
    console.log(sortedCol, key, order);
    if (sortedCol === key) {
      if (order === "asc") {
        setOrder("desc");
      } else if (order === "desc") {
        setOrder("");
      } else {
        setOrder("asc");
      }
    } else {
      setOrder("asc");
    }
    setSortedCol(key);
  };

  return (
    <main style={{ margin: "24px" }}>
      <Image src={SolaceLogo} alt="Solace Logo" />
      <h2 className="text-2xl font-semibold leading-tight">Advocates</h2>
      <div className="my-2 flex sm:flex-row flex-col">
        <div className="flex flex-row mb-1 sm:mb-0">
          <div className="flex items-center mr-2 text-gray-700">Per page:</div>
          <div className="relative">
            <select
              className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={pageSize}
              onChange={pageSizeChanged}
            >
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="block relative">
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current text-gray-500"
            >
              <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
            </svg>
          </span>
          <input
            placeholder="Search"
            className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            value={searchTerm}
            onChange={searchTermChanged}
          />
        </div>
        <div className="flex items-center ml-0 sm:ml-2 mt-1 sm:mt-0 text-gray-700">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={onReset}
          >
            Reset
          </button>
        </div>
      </div>

      {filteredAdvocates.length > 0 ? (
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <AdvocateTable
            advocates={filteredAdvocates}
            onHeaderClick={onHeaderClick}
          />

          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <span className="text-xs xs:text-sm text-gray-900">
              Showing {(page - 1) * pageSize + 1} to{" "}
              {Math.min(page * pageSize, total)} of {total} Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                className="text-sm bg-gray-300 hover:bg-gray-400 border text-gray-800 font-semibold py-2 px-4 rounded-l disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={page === 1}
                onClick={prevPage}
              >
                Prev
              </button>
              <button
                className="text-sm bg-gray-300 hover:bg-gray-400 border text-gray-800 font-semibold py-2 px-4 rounded-r disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={page === totalPages}
                onClick={nextPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading..</div>
      )}
    </main>
  );
}
