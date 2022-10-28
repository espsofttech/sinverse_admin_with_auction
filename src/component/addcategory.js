import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import toast, { Toaster } from "react-hot-toast";
import config from "../coreFIles/config";
import { insertcategoryAction } from "../Action/action";

const Addcategory = () => {
  const [form, setForm] = useState({ name: "" });
  const [validatioError, setvalidatioError] = useState({});

  const inputHandler = async (e) => {
    const { name, value } = e.target;
    setForm((old) => {
      return { ...old, [name]: value };
    });
  };

  function validate() {
    let nameError = "";

    if (form.name === "") {
      nameError = "Category Name is required.";
    }

    if (nameError) {
      setvalidatioError({
        nameError,
      });
      return false;
    } else {
      return true;
    }
  }
  const insertcategory = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
    } else {
      let res = await insertcategoryAction(form);
      if (res.success) {
        toast.success(res.msg);
        setTimeout(() => {
          window.location.href = `${config.baseUrl}Category`;
        }, 1200);
      } else {
        toast.error(res.msg);
      }
    }
  };

  return (
    <>
      <div className="wrapper">
        {/* <div id="loader"></div> */}
        <Header />
        <Toaster />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-full">
            {/* Main content */}
            <div className="content-header">
              <div className="d-flex align-items-center">
                <div className="me-auto">
                  <h3 className="page-title mb-5 pb-2">Category</h3>
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
                      <h4 className="box-title">Add Category</h4>
                    </div>
                    <div className="row mt-20 mb-50">
                      <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                          <div className="form-group row mb-1">
                            <label className="col-form-label col-md-12">
                              Category Name
                            </label>
                            <div className="col-md-12">
                              <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={inputHandler}
                                placeholder="Category Name"
                              />
                            </div>
                            <span className="validationErr">
                              {validatioError.nameError}
                            </span>
                          </div>

                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={insertcategory}
                            >
                              Save
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
export default Addcategory;
