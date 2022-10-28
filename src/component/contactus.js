import React, { useEffect, useState } from 'react'
import Header from '../directives/header'
import Footer from '../directives/footer'
import Sidebar from '../directives/sidebar'
import ReactDatatable from '@ashvin27/react-datatable'
import { getcontactusListAction } from '../Action/action';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const Contactus = () => {

    const [contactus, setcontactus] = useState({});

    useEffect(() => {
        getcontactus();
    }, []);

    const getcontactus = async () => {
        let res = await getcontactusListAction();
        if (res.success) {
            setcontactus(res.data)
        }
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
            key: "name",
            text: "Name",
        },
        {
            key: "subject",
            text: "Subject",
        },
        {
            key: "email",
            text: "Email",
            cell: (item) => {
                return (
                    <>
                        {item.email}
                        &nbsp; <CopyToClipboard text={item.email}>
                            <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color: 'rgb(157 81 255)' }}>
                                <i class="fa fa-copy "></i></sapn></CopyToClipboard>
                    </>
                );
            }
        },
        {
            key: "message",
            text: "Message",
        },
        {
            key: "datetime",
            text: "Date",
            cell: (item) => {
                return (
                    `${moment(item.created_date).format('DD/MM/YYYY')}`
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
            excel: true,
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
                        <div className="content-header">
                            <div className="d-flex align-items-center">
                                <div className="me-auto">
                                    <h3 className="page-title mb-5 pb-2">Contact Us</h3>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <section className="content">
                            <div className="row">
                                <div className="col-lg-12 col-12">
                                    <div className="box">
                                        <div className="box-header with-border">
                                            <h4 className="box-title">Contact Us</h4>
                                        </div>
                                        <div className="box-body">
                                            <ReactDatatable
                                                config={configForTable}
                                                records={contactus}
                                                columns={columns}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default Contactus;