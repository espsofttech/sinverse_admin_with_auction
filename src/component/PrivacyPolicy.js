import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import {
  getPrivacyPolicyAction,
  updatePrivacyPolicyAction,
} from "../Action/action";
import toast, { Toaster } from "react-hot-toast";
import JoditEditor from "jodit-react";

const PrivacyPolicy = () => {
  const [PrivacyPolicy, setPrivacyPolicy] = useState({});

  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  const getPrivacyPolicy = async () => {
    let res = await getPrivacyPolicyAction();
    if (res) {
      setPrivacyPolicy(res.data);
    }
  };

  const inputHandler1 = async (e) => {
    setPrivacyPolicy((old) => {
      return { ...old, 'privacy_policy': e }
    })
  }

  const updatePrivacyPolicy = async (e) => {
    e.preventDefault();
    let res = await updatePrivacyPolicyAction(PrivacyPolicy);
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
                  <h3 className="page-title mb-5 pb-2">Privacy Policy</h3>
                </div>
              </div>
            </div>

            {/* Main content */}

            {/*Edit Modal */}
            <div>
              <div className="content">
                <div className="col-lg-12 col-12">
                  <div className="box">
                    <div className="p-2">
                      <form onSubmit={updatePrivacyPolicy}>
                        <div className="modal-body">
                          <div className="container">
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                Privacy Policy
                              </label>
                            </div>
                            <JoditEditor
                              onChange={inputHandler1}
                              value={PrivacyPolicy?.privacy_policy}
                              name="privacy_policy"
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
export default PrivacyPolicy;
