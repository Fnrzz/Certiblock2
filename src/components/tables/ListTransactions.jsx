"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge";
import Pagination from "./Pagination";
import { Modal } from "../ui/modal";
import { useModal } from "@/hooks/useModal";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { shortenHash } from "@/utils/common/shortenHash";
import { formatDate } from "@/utils/common/formatDate";
import { DownloadJson } from "@/services/certificate/downloadJson";
import CopyButton from "../ui/button/CopyButton";
import SyncTransactionsButton from "../ui/button/SyncTransactionsButton";

export default function ListTransactions() {
  const modal = useModal();
  const [dataModal, setDataModal] = useState([]);

  const [apiResponse, setApiResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [syncList, setSyncList] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: "10",
          search: searchInput,
        });

        const response = await fetch(
          `/api/get-transactions?${params.toString()}`
        );
        const data = await response.json();
        setApiResponse(data);

        if (!response.ok) {
          setError(data.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [currentPage, searchInput, syncList]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.search.value);
    setCurrentPage(1);
  };

  const handlerModal = (data) => {
    setDataModal(data);
    modal.openModal();
  };

  const handleDownload = async (txHash) => {
    if (!txHash) return;
    await DownloadJson(txHash);
  };

  const transactions = apiResponse?.transactions || [];

  return (
    <div className="overflow-hidden">
      <div className="w-full flex flex-col sm:flex-row items-center gap-4 mb-4">
        <SyncTransactionsButton onComplete={() => setSyncList(!syncList)} />
        <form
          onSubmit={handleSearch}
          className="w-auto ml-auto flex items-center gap-2"
        >
          <Input
            type="text"
            placeholder="Search By Certificate Hash"
            required={false}
            className="dark:bg-dark-900"
            name="search"
          />
          <Button size="sm" type="submit" variant="outline">
            Search
          </Button>
        </form>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-100 p-4 text-center text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          <strong>Error:</strong> {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-brand-500 border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div className=" mb-4 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <div className="w-full">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="whitespace-nowrap px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Txn Hash
                      </TableCell>
                      <TableCell
                        isHeader
                        className="whitespace-nowrap px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Txn Type
                      </TableCell>
                      <TableCell
                        isHeader
                        className="whitespace-nowrap px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Date Time
                      </TableCell>
                      <TableCell
                        isHeader
                        className="whitespace-nowrap px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Txn Fee
                      </TableCell>
                      <TableCell
                        isHeader
                        className="whitespace-nowrap px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {transactions.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell className="whitespace-nowrap px-4 py-3 text-blue-500 text-start text-theme-sm dark:text-blue-400">
                          <button onClick={() => handlerModal(order)}>
                            {shortenHash(order.transaction_hash, 10, 4)}
                          </button>
                        </TableCell>
                        <TableCell className="whitespace-nowrap px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {order.type}
                        </TableCell>
                        <TableCell className="whitespace-nowrap px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {formatDate(order.confirmed_at)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {parseFloat(order.transaction_fee).toFixed(8)} POL
                        </TableCell>
                        <TableCell className="whitespace-nowrap px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <Badge
                            size="sm"
                            color={
                              order.status === "CONFIRMED" ? "success" : "error"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {apiResponse && apiResponse.totalPages > 1 && (
            <div className="mt-4 flex flex-col  justify-center">
              <Pagination
                currentPage={apiResponse.currentPage}
                totalPages={apiResponse.totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
              <p className="mt-2 text-gray-500 text-sm text-center">
                Total Page: {apiResponse.totalPages}
              </p>
            </div>
          )}

          <Modal isOpen={modal.isOpen} className="max-w-3xl p-5 lg:p-10">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Transaction Details
              </h3>
              <button
                onClick={modal.closeModal}
                className="text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 p-1.5"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            {dataModal && (
              <div className="mt-5 space-y-4 text-sm">
                <div className="pb-4 space-y-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row">
                    <span className="w-full font-medium text-gray-700 sm:w-32 dark:text-gray-300 mb-1 sm:mb-0">
                      Txn Hash
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-gray-600 break-all dark:text-gray-400">
                        {dataModal.transaction_hash}
                      </span>
                      <CopyButton textToCopy={dataModal.transaction_hash} />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row">
                    <span className="w-full font-medium text-gray-700 sm:w-32 dark:text-gray-300 mb-1 sm:mb-0">
                      Txn Type
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-gray-600 break-all dark:text-gray-400">
                        {dataModal.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row">
                    <span className="w-full font-medium text-gray-700 sm:w-32 dark:text-gray-300 mb-1 sm:mb-0">
                      Result
                    </span>
                    <Badge
                      size="sm"
                      color={
                        dataModal.status === "CONFIRMED" ? "success" : "error"
                      }
                    >
                      {dataModal.status}
                    </Badge>
                  </div>

                  <div className="flex flex-col sm:flex-row">
                    <span className="w-full font-medium text-gray-700 sm:w-32 dark:text-gray-300 mb-1 sm:mb-0">
                      Block
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {dataModal.block_number}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row">
                    <span className="w-full font-medium text-gray-700 sm:w-32 dark:text-gray-300 mb-1 sm:mb-0">
                      Date time
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {formatDate(dataModal.confirmed_at)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row">
                    <span className="w-full font-medium text-gray-700 sm:w-32 dark:text-gray-300">
                      Certificate Hash
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-gray-600 break-all dark:text-gray-400">
                        {dataModal.certificate_hash}
                      </span>
                      <CopyButton textToCopy={dataModal.certificate_hash} />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <span className="w-full font-medium text-gray-700 sm:w-32 dark:text-gray-300">
                      Txn fee
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {parseFloat(dataModal.transaction_fee).toFixed(8)} POL
                    </span>
                  </div>
                  {dataModal.status === "CONFIRMED" &&
                    dataModal.type === "ISSUE" && (
                      <div className="flex flex-col sm:flex-row">
                        <span className="w-full font-medium text-gray-700 sm:w-32 dark:text-gray-300">
                          Download JSON
                        </span>
                        <button
                          onClick={() =>
                            handleDownload(dataModal.transaction_hash)
                          }
                          className="text-blue-500 dark:text-blue-400"
                        >
                          <span className="hidden sm:inline">Download</span>
                        </button>
                      </div>
                    )}
                </div>
              </div>
            )}
          </Modal>
        </>
      )}
    </div>
  );
}
