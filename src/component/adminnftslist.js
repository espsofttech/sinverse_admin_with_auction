import React, { Component, useEffect, useState } from 'react'
import config from '../coreFIles/config';
import Header from '../directives/header';
import Footer from '../directives/footer';
import Sidebar from '../directives/sidebar';
import ReactDatatable from '@ashvin27/react-datatable';
import { getAdminNftListAction, cancelOrderAction, putOnSaleAction } from '../Action/action';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';
import Web3 from 'web3';
import Modal from 'react-modal';
import Cookies from 'js-cookie';
import { CSVLink } from 'react-csv';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Adminnftslist = () => {
    let subtitle;
    const [form, setForm] = useState({});
    const [NftList, setNftList] = useState({});
    const [isPutonsale, setisPutonsale] = useState(0);
    const [itemDetails, setItemDetails] = useState([]);
    const [spinLoader, setSpinLoader] = useState(0);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [blockchainUpdationType, setblockchainUpdationType] = useState(0);
    const loginData = (!Cookies.get('loginSuccesssinverseAdmin')) ? [] : JSON.parse(Cookies.get('loginSuccesssinverseAdmin'));
    const [walletAddress, setwalletAddress] = useState('');
    const [CSVData, setCSVData] = useState([]);
    
    useEffect(() => {
        getAdminNftList();

        setInterval(async () => {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setwalletAddress(accounts[0])
            }
        }, 1000);
    }, [])

    const getAdminNftList = async () => {
        let res = await getAdminNftListAction(form);
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
            key: "price",
            text: "Price",
            cell: (item) => {
                return item.price + ' BNB'
            }
        },
        {
            key: "sell_type",
            text: "Sell Type",
            cell: (item) => {
                return (
                    <>
                        {item.sell_type == 1 ? 'Price' : 'Auction'}
                    </>
                );
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
            text: "Action",
            cell: (item) => {
                return (
                    <>
                        {item.is_on_sale == 1 ?
                            <button onClick={() => { cancelNftOrder(item, 1) }} className='btn-sm btn-primary' data-toggle="modal" data-target="#putOnSale">Cancel Listing</button>
                            :
                            <>
                                <Link to={`${config.baseUrl}editNFT/` + item.id}>
                                    <button className='btn-sm btn-primary'>Edit</button>
                                </Link> &nbsp;

                                <button onClick={() => { putOnSaleModelAPI(item) }} className='btn-sm btn-primary' data-toggle="modal" data-target="#putOnSale">Put On Sale</button>
                            </>
                        }

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

    const putOnSaleModelAPI = async (item) => {
        setisPutonsale(1);
        console.log(item);
        setItemDetails(item);
    }

    const cancelNftOrder = async (item) => {
        approveNFT(item, 1);
    }

    const approveNFT = async (itemDetails, cancelType = 0) => {
        if (!walletAddress) {
            toast.error('Please connect your metamask wallet.');
            return;
        } else if (itemDetails.owner_address && walletAddress.toUpperCase() != itemDetails.owner_address.toUpperCase()) {
            toast.error(`Please select (${itemDetails?.owner_address.substring(0, 8) + '...' + itemDetails?.owner_address.substr(itemDetails?.owner_address.length - 8)}) address to your metamask wallet.`);
            return;
        }

        if (window.ethereum) {
            let web3 = '';
            web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();

            let currentNetwork = await web3.currentProvider.chainId;
            web3.eth.defaultAccount = accounts[0];
            let chainId = config.chainId;
            console.log(currentNetwork, chainId);
            if (currentNetwork !== chainId) {
                toast.error('Please select BNB testnet smartchain!!');
                return false;
            }
            setSpinLoader(1);
            setisPutonsale(0);
            setDialogOpen(true);
            try {
                let mintFee = 0;
                let SalePrice;
                let start_date = 0;
                let expiry_date = 0;
                let tokenId = itemDetails.token_id;

                if (itemDetails.sell_type == 1) {
                    SalePrice = parseInt(parseFloat(itemDetails.price) * (10 ** 18)).toString()
                }

                else if (itemDetails.sell_type == 2) {
                    SalePrice = parseInt(parseFloat(itemDetails.price) * (10 ** 18)).toString();
                    start_date = Math.round(new Date(itemDetails.start_date).getTime() / 1000);
                    expiry_date = Math.round(new Date(itemDetails.expiry_date).getTime() / 1000);
                }

                let contractAddress = `${config.marketplaceContract}`
                let from_address = accounts[0];
                const contract = await new web3.eth.Contract(config.abiMarketplace, contractAddress);
                if (cancelType == 1) {
                    setblockchainUpdationType(2)
                    await contract.methods.cancelOrder(tokenId.toString()).call();
                    var tx_builder = await contract.methods.cancelOrder(tokenId.toString());
                } else {
                    setblockchainUpdationType(1)
                    if (itemDetails.is_minted == 1) {
                        await contract.methods.updateDetails(tokenId.toString(), SalePrice.toString(), itemDetails.sell_type.toString(), start_date.toString(), expiry_date.toString()).call();

                        var tx_builder = await contract.methods.updateDetails(tokenId.toString(), SalePrice.toString(), itemDetails.sell_type.toString(), start_date.toString(), expiry_date.toString());
                    } else {

                        await contract.methods._mint(tokenId.toString(), SalePrice.toString(), (itemDetails.royalty_percent * 100).toString(), itemDetails.sell_type.toString(), start_date.toString(), expiry_date.toString()).call();

                        var tx_builder = await contract.methods._mint(tokenId.toString(), SalePrice.toString(), (itemDetails.royalty_percent * 100).toString(), itemDetails.sell_type.toString(), start_date.toString(), expiry_date.toString());
                    }
                }

                let encoded_tx = tx_builder.encodeABI();
                let gasPrice = await web3.eth.getGasPrice();
                gasPrice = parseInt(gasPrice) + parseInt(10000000000);

                let gasLimit = await web3.eth.estimateGas({
                    gasPrice: web3.utils.toHex(gasPrice),
                    to: contractAddress,
                    from: from_address,
                    value: web3.utils.toHex(mintFee),
                    chainId: chainId,
                    data: encoded_tx
                });

                const txData = await web3.eth.sendTransaction({
                    gasPrice: web3.utils.toHex(gasPrice),
                    gas: web3.utils.toHex(gasLimit),
                    to: contractAddress,
                    from: from_address,
                    value: web3.utils.toHex(mintFee),
                    chainId: chainId,
                    data: encoded_tx
                });

                if (txData.transactionHash) {
                    let dataArr = {
                        "wallet_address": from_address,
                        "user_id": loginData.id,
                        "item_id": itemDetails.id,
                        "token_hash": txData.transactionHash
                    }

                    let res;
                    if (cancelType) {
                        res = await cancelOrderAction(dataArr);
                    } else {
                        res = await putOnSaleAction(dataArr);
                    }
                    if (res.success === true) {
                        setDialogOpen(false);
                        toast.success(res.msg);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } else {
                        toast.error(res.msg);
                    }
                } else {
                    toast.error('Something went wrong please try again.');
                    setSpinLoader(0);
                    setisPutonsale(0);
                    setDialogOpen(false);
                    return false;
                }

            } catch (err) {
                console.log(err);
                if (err.message.toString().split('insufficient funds')[1]) {
                    toast.error('Transaction reverted : ' + err.message)
                } else {
                    if (err.toString().split('execution reverted:')[1]) {
                        toast.error('Transaction reverted : ' + (err.toString().split('execution reverted:')[1]).toString().split('{')[0])

                    } else {
                        toast.error(err.message);
                    }
                }

                setSpinLoader(0);
                setisPutonsale(0);
                setDialogOpen(false);
                return false;
            }
        } else {
            toast.error('Please connect your metamask wallet.');
            setSpinLoader(0);
            setisPutonsale(0);
            setDialogOpen(false);
            return false;
        }
    }

    const closeModel = async () => {
        setisPutonsale(0);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    return (

        <>
            <div class="wrapper">
                <Toaster />

                <Modal
                    isOpen={isDialogOpen}
                    onAfterOpen={afterOpenModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="text-center pl-3 pr-3">
                        < br />
                        {blockchainUpdationType == 1 ?
                            <h4 style={{ color: '#d71e5b', fontSize: '16px' }}>
                                Put on sale in progress, once process completed NFT will be display on marketplace page.
                            </h4>
                            :
                            blockchainUpdationType == 2 ?
                                <h4 style={{ color: '#d71e5b', fontSize: '16px' }}>
                                    Canceling your listing will unpublish this sale from Sinverse and requires a transaction.
                                </h4>
                                :
                                <h4 style={{ color: '#d71e5b', fontSize: '16px' }}>
                                    Bid accepting in progress, Please wait for a while.
                                </h4>
                        }

                        <p style={{ color: '#091f3f' }}>
                            Please do not refresh page or close tab.
                        </p>
                        <div>
                            <img src="images/loader.gif" height={50} width={50} />
                        </div>
                    </div>
                </Modal>

                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="container-full">
                        <div className="content-header">
                            <div className="d-flex align-items-center">
                                <div className="me-auto">
                                    <h3 className="page-title mb-5 pb-2">Admin NFTs List</h3>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <section className="content">
                            <div className="row">
                                <div className="col-lg-12 col-12">
                                    <div className="box">
                                        <div className="box-body">
                                            <Link to={`${config.baseUrl}createNFT`}>
                                                <button className='btn btn-primary pull-right'>Add+</button>
                                            </Link>
                                            <br /><br />
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

            {/* Put on sale model */}
            <div className={isPutonsale === 0 ? "modal fade" : "modal fade show"} id="putOnSale" style={{ display: isPutonsale === 0 ? 'none' : 'block' }} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="false">
                <div className="modal-dialog" role="document">

                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"> Put On Sale </h5>
                            <a type="button" className="close" data-dismiss="modal" style={{
                                fontSize: '26px'
                            }} aria-label="Close" onClick={closeModel} >
                                <span aria-hidden="true">&times;</span>
                            </a>
                        </div>

                        <div className="modal-body">
                            <div className="de_tab tab_methods">
                                <div className="de_tab_content">
                                    <span style={{ color: 'red' }}>List price and listing schedule can not be edited once the item is listed. You will need to cancel your listing and relist the item with the updated price. </span><br /><br />
                                    {itemDetails?.sell_type === 1 ?
                                        <>
                                            <h5>Price (BNB)</h5>
                                            <input type="text" disabled value={itemDetails?.price} name="price" id="item_price_bid" className="form-control" placeholder="Enter Price" />
                                        </>
                                        :
                                        itemDetails?.sell_type === 2 ?
                                            <>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <h5>NFT Type</h5>
                                                        Auction
                                                    </div>

                                                    <div className="col-md-6">
                                                        <h5>Minimum bid</h5>
                                                        {itemDetails?.price} BNB
                                                    </div>
                                                </div>
                                                <br />

                                                <div className="spacer-10" />
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <h5>Starting date</h5>
                                                        {itemDetails?.start_date ? itemDetails?.start_date : ''}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <h5>Expiration date</h5>
                                                        {itemDetails?.expiry_date ? itemDetails?.expiry_date : ''}

                                                    </div>
                                                    <div className="spacer-single" />
                                                </div>
                                            </>
                                            :
                                            ""
                                    }
                                </div>
                            </div>
                            <div className="spacer-10 mt-10" />
                            {spinLoader == '0' ?
                                <input type="submit" onClick={() => { approveNFT(itemDetails) }} value="Approve" id="submit" className="btn-main btn btn-primary" defaultValue="Create Item" />
                                :
                                <button disabled className="btn-main" id="deposit-page" >Processing &nbsp; <i className="fa fa-spinner fa-spin validat"></i></button>
                            }
                            <div className="spacer-single" />
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
export default Adminnftslist;