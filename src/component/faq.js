import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import config from "../coreFIles/config";
import ReactDatatable from "@ashvin27/react-datatable";
import { deletefaqAction, getFaqAction } from "../Action/action";
import Swal from "sweetalert2";
import moment from "moment";

const Faq = () => {
  const [getfaqlist, setFaqList] = useState({});

  useEffect(() => {
    getfaq();
  }, []);

  const getfaq = async () => {
    let res = await getFaqAction();
    if (res.success) {
      setFaqList(res.data);
    }
  };

  const columns = [
    {
      key: "Sno.",
      text: "Sno.",
      cell: (row, index) => index + 1,
    },

    {
      key: "question",
      text: "Question",
      cell: (item) => {
        return `${item.question}`;
      },
    },
    {
      key: "answer",
      text: "Answer",
      cell: (item) => {
        return `${item.answer}`;
      },
    },
    {
      key: "datetime",
      text: "Date",
      cell: (item) => {
        return `${moment(item.datetime).format("DD/MM/YYYY")}`;
      },
    },

    {
      key: "action",
      text: "Action",
      cell: (item) => {
        return (
          <>
            <a
              href={`${config.baseUrl}Updatefaq/${item.id}`}
              className="btn btn-sm btn-primary"
              id="editbtnid"
            >
              Edit
            </a>
            &nbsp;
            <button
              type="button"
              className="btn btn-sm btn-default"
              id="editbtnid"
              onClick={() => deletefaq(item.id)}
            >
              
              Delete
            </button>
            &nbsp;
          </>
        );
      },
    },
  ];

  const configForTable = {
    page_size: 10,
    length_menu: [10, 20, 50],
    show_filter: true,
    show_pagination: true,
    pagination: "advance",
    button: {
      excel: true,
      print: false,
    },
  };

  const deletefaq = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this FAQ!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deleted it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await deletefaqAction({ id: id });
        if (res.success) {
          getfaq();
          Swal.fire("Deleted!", res.msg, "success");
        } else {
          Swal.fire("Failed!", res.msg, "error");
        }
      }
    });
  };

  return (
    <>
      <div class="wrapper">
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-full">
            {/* Main content */}
            <div className="content-header">
              <div className="d-flex align-items-center">
                <div className="me-auto">
                  <h3 className="page-title mb-5 pb-2">FAQs</h3>
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
                      <h4 className="box-title">FAQs</h4>
                      <a
                        href={`${config.baseUrl}addfaq`}
                        className="btn btn-sm btn-primary add_btn"
                      >
                        Add
                      </a>
                    </div>
                    <div className="box-body">
                      <ReactDatatable
                        config={configForTable}
                        records={getfaqlist}
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
export default Faq;

