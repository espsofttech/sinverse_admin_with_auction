import React, { Component, useEffect, useState } from 'react'
import config from '../coreFIles/config';
import { Toaster } from 'react-hot-toast';
import Header from '../directives/header';
import Footer from '../directives/footer';
import Sidebar from '../directives/sidebar';
import ReactDatatable from '@ashvin27/react-datatable';
import { getNftListAction } from '../Action/action';
import moment from 'moment';
import { CSVLink } from 'react-csv';

const Nftlist = () => {
    const [form, setForm] = useState({});
    const [NftList, setNftList] = useState({});
    const [CSVData, setCSVData] = useState([]);

    useEffect(() => {
        getNftList();
    }, [])

    const getNftList = async () => {
        let res = await getNftListAction(form);
        if (res.success) {
            setNftList(res.data);
            if (res.data.length > 0) {
                let csvData = res.data;
                let csvAllData = [];
                for (let i = 0; i < csvData.length; i++) {
                    if (i == 0) {
                        csvAllData[i] = ['Name', 'Owner Name', 'Creator Name', 'Price(BNB)', 'Date'];
                    }
                    csvAllData[i + 1] = [csvData[i].name, csvData[i].ownername, csvData[i].creatorname, csvData[i].price,  moment(csvData[i].datetime).format('DD/MM/YYYY')];
                }
                setCSVData(csvAllData);
            }
        }
    }

    const columns = [
        {
            key: "Sno.",
            text: "Sno.",
            cell: (row, index) => index + 1
        },
        {
            key: "image",
            text: "Image",
            cell: (item) => {
                return (
                    <>
                        {item.image != null ?
                            <img src={`${config.imageUrl1 + item.image}`} width="50px" height="50px" />
                            :

                            <img src={`${config.baseUrl + '/images/noimage.png'}`} width="50px" height="50px" />
                        }
                    </>
                );
            }

        },
        {
            key: "name",
            text: "Name",
            cell: (item) => {
                return (
                    <>
                        <a target="_blank" href={`${config.transactionUrl}` + item.id}> {item.name} </a>
                    </>
                );
            }
        },
        {
            key: "ownername",
            text: "Owner Name",
        },
        {
            key: "creatorname",
            text: "Creator Name",
        },
        {
            key: "price",
            text: "Price",
            cell: (item) => {
                return item.price + ' BNB'
            }
        },
        {
            key: "datetime",
            text: "Date",
            cell: (item) => {
                return (
                    `${moment(item.datetime).format('DD/MM/YYYY')}`
                );
            }
        },
        {
            key: "is_on_sale",
            text: "Status",
            cell: (item) => {
                return (
                    <>
                        <div class="btn-group mb-5">
                            {item.is_on_sale === 0 ?
                                <a class="dropdown-item" href='javascript:;' > Not on Sale</a>
                                : item.is_on_sale === 1 ?
                                    <a class="dropdown-item" href='javascript:;'> On Sale</a>
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
                        <div className="content-header">
                            <div className="d-flex align-items-center">
                                <div className="me-auto">
                                    <h3 className="page-title mb-5 pb-2">NFT List</h3>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <section className="content">
                            <div className="row">
                                <div className="col-lg-12 col-12">
                                    <div className="box">
                                        <div className="box-body">
                                            {CSVData.length > 0 ?
                                                <CSVLink data={CSVData} > <button className="btn-sm btn-primary"> Excel <i class="fa fa-file-excel-o" aria-hidden="true"></i></button> <br /><br /></CSVLink>
                                                : ""
                                            }
                                            <ReactDatatable
                                                config={configForTable}
                                                records={NftList}
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
export default Nftlist;