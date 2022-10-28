import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import { updatefaqAction, getfaqidAction } from "../Action/action";
import toast, { Toaster } from "react-hot-toast";
import config from "../coreFIles/config";

const Updatefaq = () => {
  const [getcategorylist, setFaqList] = useState({});
  const [form, setForm] = useState({ id: "", question: "" , answer : "" });
  useEffect(() => {
    getFaqid();
  }, []);

  const getFaqid = async () => {
    const id = window.location.href.split("/").pop();
    let res = await getfaqidAction({ id: id  });
    if (res.success) {
      setFaqList(res.data);
      let data = res.data[0];
      setForm((old) => {
        return { ...old, id: id, question: data.question, answer: data.answer };
      });
    }
  };
  const inputHandler = async (e) => {
    const { name, value } = e.target;
    setForm((old) => {
      return { ...old, [name]: value };
    });
  };

  const updatefaq = async (e) => {
    e.preventDefault();
    let res = await updatefaqAction(form);
    if (res.success) {
      toast.success(res.msg);
      setTimeout(() => {
        window.location.href = `${config.baseUrl}faq`;
      }, 1200);
    } else {
      toast.error(res.msg);
    }
  };

  return (
    <>
      <div class="wrapper">
        <Header />
        <Toaster />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-full">
            {/* Main content */}
            <div className="content-header">
              <div className="d-flex align-items-center">
                <div className="me-auto">
                  <h3 className="page-title mb-5 pb-2">Edit Faq</h3>
                </div>
              </div>
              <hr />
            </div>
            {/* Content Header (Page header) */}
            {/* Main content */}
            <section className="content">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="box">
                    <div className="box-header with-border">
                      <h4 className="box-title">Edit Faq</h4>
                    </div>
                    <div className="row mt-20 mb-50">
                      <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                          <div class="form-group row mb-1">
                            <label class="col-form-label col-md-12">
                              Question
                            </label>
                            <div class="col-md-12">
                              <input
                                class="form-control"
                                type="text"
                                name="question"
                                value={form.question}
                                onChange={inputHandler}
                                placeholder=""
                              />
                            </div>
                          </div>
                          <div class="form-group row mb-1">
                            <label class="col-form-label col-md-12">
                              Answer
                            </label>
                            <div class="col-md-12">
                              <input
                                class="form-control"
                                type="text"
                                name="answer"
                                value={form.answer}
                                onChange={inputHandler}
                                placeholder=""
                              />
                            </div>
                          </div>
                          <br />
                          <br />
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={updatefaq}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                        <div className="col-md-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* /.content */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Updatefaq;
