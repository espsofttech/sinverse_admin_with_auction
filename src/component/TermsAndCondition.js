import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import {
  gettermsandconditionAction,
  updatetermsandconditionAction,
} from "../Action/action";
import toast, { Toaster } from "react-hot-toast";
import JoditEditor from "jodit-react";

const TermsAndCondition = () => {
  const [termsandcondition, settermsandcondition] = useState({});

  useEffect(() => {
    gettermsandcondition();
  }, []);

  const gettermsandcondition = async () => {
    let res = await gettermsandconditionAction();
    if (res) {
      settermsandcondition(res.data);
    }
  };

  const inputHandler1 = async (e) => {
    settermsandcondition((old) => {
      return { ...old, 'terms_conditions': e }
    })
  }

  const updatetermsandcondition = async (e) => {
    e.preventDefault();
    let res = await updatetermsandconditionAction(termsandcondition);
    if (res.success) {
      toast.success(res.msg);
    } else {
      toast.error(res.msg);
    }
  };

  return (
    <>
      <div class="wrapper">
        <Toaster />
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-full">
            {/* Main content */}
            <div className="content-header">
              <div className="d-flex align-items-center">
                <div className="me-auto">
                  <h3 className="page-title mb-5 pb-2">Terms And Conditions</h3>
                </div>
              </div>
            </div>
            {/* Content Header (Page header) */}

            {/* Main content */}

            {/*Edit Modal */}
            <div>
              <div className="content">
                <div className="col-lg-12 col-12">
                  <div className="box">
                    <div className="p-2">
                      <form onSubmit={updatetermsandcondition}>
                        <div className="modal-body">
                          <div className="container">
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                Terms and Conditions
                              </label>
                            </div>
                            <JoditEditor
                              onChange={inputHandler1}
                              value={termsandcondition?.terms_conditions}
                              name="terms_conditions"
                            />
                            <div className=" mx-10  mt-20">
                              <button type="submit" class="btn btn-primary mx-20 pull-right">
                                Submit
                              </button>

                            </div>
                          </div>
                        </div>
                      </form></div>
                  </div>
                </div>
              </div>
            </div>
            {/*Edit Modal Ends */}
            {/* /.content */}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default TermsAndCondition;
