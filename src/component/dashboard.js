import React, { useEffect, useState } from 'react'
import Header from '../directives/header'
import Footer from '../directives/footer'
import Sidebar from '../directives/sidebar'
import { getDashboardStatisticsAction } from '../Action/action';

const Dashboard = () => {

  const [statistics, setStatistics] = useState({ totalUsers: 0, todayRegisteredUsers: 0, totalSubscribers: 0, totalNFTs: 0, totalCategory: 0});

  useEffect(() => {
    getDashboardStatistics();
  }, []);

  const getDashboardStatistics = async () => {
    let res = await getDashboardStatisticsAction();
    if (res.success) {
      let data = res.data;
      setStatistics((old) => {
        return {
          ...old,
          'totalUsers': data.totalUsers,
          'todayRegisteredUsers': data.todayRegisteredUsers,
          'totalSubscribers': data.totalSubscribers,
          'totalNFTs': data.totalNFTs,
          'totalCategory': data.totalCategory
        }
      })
    }
  }

  return (

    <>
      <div class="wrapper">
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-full">
            <div className="content-header">
              <div className="d-flex align-items-center">
                <div className="me-auto">
                  <h3 className="page-title mb-5 pb-2">Dashboard</h3>
                </div>
              </div>
            </div>
            {/* Content Header (Page header) */}
            {/* Main content */}
            <section className="content pt-0">
              <div className="row">
                <div className="col-xl-12 col-12">
                  <div className="row">
                    <div className="col-lg-4 col-12">
                      <div className="box">
                        <div className="box-body">
                          <div className="no-line-chart d-flex align-items-end justify-content-between">
                            <div>
                              <p className="mb-0"><h4>Total Users</h4></p>
                              <p className="mb-0">
                                <h5>{statistics.totalUsers}</h5>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-12">
                      <div className="box">
                        <div className="box-body">
                          <div className="no-line-chart d-flex align-items-end justify-content-between">
                            <div>
                              <p className="mb-0"><h4>Today Registered</h4></p>
                              <p className="mb-0">
                                <h5>{statistics.todayRegisteredUsers}</h5>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-12">
                      <div className="box">
                        <div className="box-body">
                          <div className="no-line-chart d-flex align-items-end justify-content-between">
                            <div>
                              <p className="mb-0"><h4>Total Subscribers</h4></p>
                              <p className="mb-0">
                                <h5>{statistics.totalSubscribers}</h5>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-12">
                      <div className="box">
                        <div className="box-body">
                          <div className="no-line-chart d-flex align-items-end justify-content-between">
                            <div>
                              <p className="mb-0"><h4>Total NFT</h4></p>
                              <p className="mb-0">
                                <h5>{statistics.totalNFTs} </h5> </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-12">
                      <div className="box">
                        <div className="box-body">
                          <div className="no-line-chart d-flex align-items-end justify-content-between">
                            <div>
                              <p className="mb-0"><h4>Total Category</h4></p>
                              <p className="mb-0">
                                <h5>{statistics.totalCategory}</h5>
                              </p>
                            </div>
                          </div>
                        </div>
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


  )

}
export default Dashboard;