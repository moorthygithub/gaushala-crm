import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import RequestFilter from "../../../components/RequestFilter";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../../base/BaseUrl";
import { MdEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { Spinner } from "@material-tailwind/react";
import {
  EditDonationReceipt,
  ViewDonationReceipt,
} from "../../../components/ButtonComponents";
import { useQuery } from "@tanstack/react-query";

const fetchCashRecepitData = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BaseUrl}/fetch-c-receipt-list`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data?.receipts ?? [];
};
const RecepitCashRecepit = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["fetchrecepitdata"],
    queryFn: fetchCashRecepitData,
  });
  const columns = [
    {
      name: "c_receipt_no",
      label: "Receipt No",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: false,
      },
    },
    {
      name: "donor_full_name",
      label: "Name",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: false,
      },
    },
    {
      name: "c_receipt_date",
      label: "Date",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: false,
        customBodyRender: (value) => {
          return moment(value).format("DD-MM-YYYY");
        },
      },
    },
    {
      name: "c_receipt_exemption_type",
      label: "Exemption Type",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: false,
      },
    },

    {
      name: "c_receipt_total_amount",
      label: "Amount",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: false,
      },
    },
    {
      name: "c_receipt_count",
      label: "No of Item",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: false,
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        sort: false,
        customBodyRender: (id) => {
          return (
            <div className="flex items-center space-x-2">
              <ViewDonationReceipt
                onClick={() => navigate(`/recepit-view/${id}`)}
                className="h-5 w-5 cursor-pointer text-blue-500"
              />

              <EditDonationReceipt
                onClick={() => navigate(`/recepit-edit/${id}`)}
                className="h-5 w-5 cursor-pointer text-blue-500"
              />
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    filter: false,
    responsive: "standard",
    download: false,
    print: false,
  };

  return (
    <Layout>
      <RequestFilter />

      <div className="mt-5">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner className="h-6 w-6" />
          </div>
        ) : (
          <MUIDataTable
            title={
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">
                  {" "}
                  Donation Receipts List
                </span>
              </div>
            }
            data={data || []}
            columns={columns}
            options={options}
          />
        )}
      </div>
    </Layout>
  );
};

export default RecepitCashRecepit;
