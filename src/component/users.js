import React, { useEffect, useState } from 'react'
import config from '../coreFIles/config';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../directives/header';
import Footer from '../directives/footer';
import Sidebar from '../directives/sidebar';
import ReactDatatable from '@ashvin27/react-datatable';
import { getUsersListAction, UserBlockUnBlockAction } from '../Action/action';
import moment from 'moment';
import Swal from 'sweetalert2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CSVLink } from 'react-csv';

const Users = () => {
    const [usersList, setusersList] = useState({});
    const [CSVData, setCSVData] = useState([]);

    useEffect(() => {
        getUsersList();
    }, [])


    const getUsersList = async () => {
        let res = await getUsersListAction();
        if (res.success) {
            setusersList(res.data);

            if (res.data.length > 0) {
                let csvData = res.data;
                let csvAllData = [];
                for (let i = 0; i < csvData.length; i++) {
                    if (i == 0) {
                        csvAllData[i] = ['First Name', 'Last Name', 'Email', 'Joining Date'];
                    }
                    csvAllData[i + 1] = [csvData[i].first_name, csvData[i].last_name, csvData[i].email, moment(csvData[i].datetime).format('DD/MM/YYYY')];
                }
                setCSVData(csvAllData);
            }

        }
    }

    const UserBlockUnBlock = async (id, is_active) => {
        Swal.fire({
            title: 'Are you sure?',
            text: is_active == 0 ? "You want to Block this User!" : "You want to Unblock this User!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: is_active == 0 ? 'Yes, Block it!' : 'Yes, Unblock it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await await UserBlockUnBlockAction({ 'id': id, 'is_active': is_active });
                if (res.success) {
                    getUsersList();
                    Swal.fire(
                        is_active == 0 ? 'Blocked!' : 'Unblocked',
                        res.msg,
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Failed!',
                        res.msg,
                        'error'
                    )
                }
            }
        })
    }

    const copieBtn = async () => {
        toast.success(`Coppied!!`);
    }

    const columns = [
        {
            key: "Sno.",
            text: "Sno.",
            cell: (row, index) => index + 1
        },
        {
            key: "profile_pic",
            text: "Image",
            cell: (item) => {
                return (
                    <>
                        {item.profile_pic != null ?
                            <img src={`${config.imageUrl + item.profile_pic}`} width="50px" height="50px" />
                            :
                            <img src={`${config.baseUrl + '/images/dummy.jpg'}`} width="50px" height="50px" />
                        }
                    </>
                );
            }
        },
        {
            key: "first_name",
            text: "First Name",
        },
        {
            key: "last_name",
            text: "Last Name",
        },
        {
            key: "email",
            text: "Email",
            cell: (item) => {
                return (
                    <>
                        <a href="#"
                        // {`${config.baseUrl}userdetails/` + item.id} 
                        > {item.email} </a>
                        &nbsp; <CopyToClipboard text={item.email}>
                            <span title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color: 'rgb(157 81 255)' }}>
                                <i class="fa fa-copy "></i></span></CopyToClipboard>
                    </>

                );
            }
        },
        {
            key: "datetime",
            text: "Joining Date",
            cell: (item) => {
                return (
                    `${moment(item.datetime).format('DD/MM/YYYY')}`
                );
            }
        },
        {
            key: "is_active",
            text: "Status",
            cell: (item) => {
                return (
                    <>
                        <div class="btn-group mb-5">
                            {item.is_active === 0 ?
                                <button type="button" class="waves-effect waves-light btn btn-primary btn-sm " onClick={() => UserBlockUnBlock(item.id, 1)}><i className='fa fa-unlock'></i> Unblock</button>
                                : item.is_active === 1 ?
                                    <button type="button" class="waves-effect waves-light btn btn-primary btn-sm " onClick={() => UserBlockUnBlock(item.id, 0)}><i className='fa fa-ban'></i> Block</button>
                                    :
                                    ''
                            }
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
        pagination: 'advance',
        button: {
            excel: false,
            print: false

        }
    }

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
                                    <h3 className="page-title mb-5 pb-2">Users List</h3>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <section className="content">
                            <div className="row">
                                <div className="col-lg-12 col-12">
                                    <div className="box">
                                        <div className="box-header with-border">
                                            <h4 className="box-title">Users ({usersList.length})</h4>
                                        </div>
                                        <div className="box-body">
                                            {CSVData.length > 0 ?
                                                <CSVLink data={CSVData} > <button className="btn-sm btn-primary"> Excel <i class="fa fa-file-excel-o" aria-hidden="true"></i></button> <br /><br /></CSVLink>
                                                : ""
                                            }
                                            <ReactDatatable
                                                config={configForTable}
                                                records={usersList}
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


    )

}
export default Users;