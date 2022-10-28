import React, { useEffect, useState } from "react";
// import config from '../coreFIles/config'
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import config from "../coreFIles/config";
import ReactDatatable from "@ashvin27/react-datatable";
import { getTransactionListAction, getvediosAction } from "../Action/action";
import Swal from "sweetalert2";
import moment from "moment";
import { CSVLink } from 'react-csv';

const Transactionlist = () => {
  const [getTransactionLists, setgetTransactionLists] = useState({});
  const [CSVData, setCSVData] = useState([]);

  useEffect(() => {
    getTransactionList();
  }, []);

  const getTransactionList = async () => {
    let res = await getTransactionListAction();
    if (res.success) {
      setgetTransactionLists(res.data);
      if (res.data.length > 0) {
        let csvData = res.data;
        let csvAllData = [];
        for (let i = 0; i < csvData.length; i++) {
          if (i == 0) {
            csvAllData[i] = ['Name', 'User Name', 'Amoun  t(BNB)', 'Transaction Type', 'Date'];
          }
          csvAllData[i + 1] = [csvData[i].name, csvData[i].username, Math.abs(csvData[i].amount), csvData[i].transaction_type, moment(csvData[i].datetime).format('DD/MM/YYYY')];
        }
        setCSVData(csvAllData);
      }
    }
  };

  const columns = [
    {
      key: "Sno.",
      text: "Sno.",
      cell: (row, index) => index + 1,
    },
    {
      key: "itemname",
      text: "Itemname",
      cell: (item) => {
        return (
          <>
            <a target="_blank" href={`${config.transactionUrl}` + item.item_id}> {item.itemname} </a>
          </>
        );
      }
    },
    {
      key: "username",
      text: "Username",
    },
    {
      key: "amount",
      text: "Amount",
      cell: (item) => {
        return item.amount + ' BNB'
      }
    },
    {
      key: "transaction_type",
      text: "Transaction Type",
    },
    {
      key: "datetime",
      text: "Date",
      cell: (item) => {
        return `${moment(item.datetime).format("DD/MM/YYYY")}`;
      },
    },
    {
      key: "hash",
      text: "Status",
      cell: (item) => {
        return (
          <>
            <div class="btn-group mb-5">
              <a class="waves-effect waves-light btn btn-primary btn-sm " target="_blank" href={`${config.hashUrl + item.hash}`}><i className='fa fa-eye'></i>&nbsp;BlockChain View</a>
            </div>
          </>
        );
      }
    },
  ];

  const configForTable = {
    page_size: 10,
    length_menu: [10, 20, 50],
    show_filter: true,
    show_pagination: true,
    pagination: "advance",
    button: {
      excel: false,
      print: false,
    },
  };

  return (
    <>
      <div class="wrapper">
        {/* <div id="loader"></div> */}
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-full">
            {/* Main content */}
            <div className="content-header">
              <div className="d-flex align-items-center">
                <div className="me-auto">
                  <h3 className="page-title mb-5 pb-2">Transaction List</h3>
                </div>
              </div>
            </div>
            {/* Content Header (Page header) */}

            {/* Main content */}
            <section className="content">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="box">
                    <div className="box-header with-border">
                      <h4 className="box-title">Transaction List</h4>
                    </div>
                    <div className="box-body">
                      {CSVData.length > 0 ?
                        <CSVLink data={CSVData} > <button className="btn-sm btn-primary"> Excel <i class="fa fa-file-excel-o" aria-hidden="true"></i></button> <br /><br /></CSVLink>
                        : ""
                      }
                      <ReactDatatable
                        config={configForTable}
                        records={getTransactionLists}
                        columns={columns}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* /.content */}
            {/* /.content */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Transactionlist;
