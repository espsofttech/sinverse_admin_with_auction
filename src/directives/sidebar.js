/* eslint-disable eqeqeq */
import React, { useState } from "react";
import config from "../coreFIles/config";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [pageUrl, setPageUrl] = useState(window.location.href);

  const logout = async () => {
    Cookies.remove("loginSuccesssinverseAdmin");
    window.location.href = config.baseUrl;
  };

  return (
    <>
      <aside className="main-sidebar">
        {/* sidebar*/}
        <section className="sidebar position-relative">
          <div className="multinav">
            <div className="multinav-scroll" style={{ height: "100%" }}>
              {/* sidebar menu*/}
              <ul className="sidebar-menu" data-widget="tree">
                <li className={pageUrl.match("/dashboard") ? "active" : ""}>
                  <a href={`${config.baseUrl}dashboard`}>
                    <i data-feather="home" />
                    <span>Dashboard</span>
                  </a>
                </li>
                <li
                  className={pageUrl.match("/users") ? "active" : ""}
                >
                  <a href={`${config.baseUrl}users`}>
                    <i data-feather="user" />
                    <span>Users</span>
                  </a>
                </li>
                <li className={pageUrl.match("/Category") ? "active" : ""}>
                  <a href={`${config.baseUrl}Category`}>
                    <i data-feather="lock" />
                    <span>Category</span>
                  </a>
                </li>
                <li className={pageUrl.match("/nftlist") ? "active" : ""}>
                  <a href={`${config.baseUrl}nftlist`}>
                    <i data-feather="user" />
                    <span>User NFTs List</span>
                  </a>
                </li>

                <li className={pageUrl.match("/adminnftslist") ? "active" : ""}>
                  <a href={`${config.baseUrl}adminnftslist`}>
                    <i data-feather="user" />
                    <span>Admin NFTs List</span>
                  </a>
                </li>

                <li className={pageUrl.match("/transactionlist") ? "active" : ""}>
                  <a href={`${config.baseUrl}transactionlist`}>
                    <i class="fa fa-history" aria-hidden="true"></i>
                    <span>Transaction History</span>
                  </a>
                </li>
                <li className={pageUrl.match("/changepassword") ? "active" : ""}>
                  <a href={`${config.baseUrl}changepassword`}>
                    <i data-feather="lock" />
                    <span>Change Password</span>
                  </a>
                </li>
                <li className={pageUrl.match('/Blog') || pageUrl.match('/Blogslider') || pageUrl.match('/addblog') ? 'treeview active' : 'treeview'}>
                  <a href="#">
                    <i data-feather="list" />
                    <span>CMS </span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right" />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li>
                      <a href={`${config.baseUrl}subscribers`}>
                        <i className="ti-more" />
                        <span>Subscriber List</span>
                      </a>
                    </li>
                    <li>
                      <a href={`${config.baseUrl}faq`}>
                        <i className="ti-more" />
                        <span>Faqs</span>
                      </a>
                    </li>
                    <li>
                      <a href={`${config.baseUrl}Contactus`}>
                        <i className="ti-more" />
                        <span>Contact Us</span>
                      </a>
                    </li>
                    <li>
                      <a href={`${config.baseUrl}sociallink`}>
                        <i className="ti-more" />
                        <span>Social Link</span>
                      </a>
                    </li>
                    <li>
                      <a href={`${config.baseUrl}termsandcondition`}>
                        <i className="ti-more" />
                        <span>Terms And Condition</span>
                      </a>
                    </li>
                    <li>
                      <a href={`${config.baseUrl}PrivacyPolicy`}>
                        <i className="ti-more" />
                        <span>Privacy Policy</span>
                      </a>
                    </li>

                  </ul>

                </li>
                <li className="">
                  <a href="javascript:;" onClick={logout}>
                    <i data-feather="log-out" />
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </aside>
    </>
  );
};
export default Sidebar;
