import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import toast, { Toaster } from "react-hot-toast";
import config from "../coreFIles/config";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getNftDetailsAction, getcategorylistAction, updateNftAction } from "../Action/action";
import { useParams } from "react-router-dom";

const EditNFT = () => {
    const { id } = useParams();
    const [form, setForm] = useState({ name: "" });
    const [validatioError, setvalidatioError] = useState({});
    const [Category, setCategory] = useState([]);
    const [image_preview, setimage_preview] = useState('');
    const [image_file, setimage_file] = useState('');
    const [FileType, setFileType] = useState('');
    const [spinloader, setspinloader] = useState(0);
    const [NftDetails, setNftDetails] = useState({});
    const [currentDate, setcurrentDate] = useState(new Date());

    useEffect(() => {
        getCategoryAPI();
        getNFTDetailsAPI();
    }, [])

    const getCategoryAPI = async () => {
        let res = await getcategorylistAction();
        if (res.success) {
            setCategory(res.data)
        }
    }

    const getNFTDetailsAPI = async () => {
        let res = await getNftDetailsAction({ 'id': id });
        if (res.success) {
            setNftDetails(res.data)
        }
    }

    const imageUpload = async (e) => {
        e.preventDefault()
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];

        let file_type = '';
        if (image_as_files.type.indexOf('image') === 0) {
            file_type = 'image';
        } else {
            file_type = 'video';
        }

        setimage_file(image_as_files);
        setimage_preview(image_as_base64);
        setFileType(file_type);
        setvalidatioError((old) => {
            return { ...old, ['imageError']: '' }
        })
    }

    const inputHandler = (e) => {
        const { name, value, id } = e.target
        setNftDetails((old) => {
            return { ...old, [name]: value }
        })

        if (value != '') {
            setvalidatioError((old) => {
                return { ...old, [id]: '' }
            })
        }
    }

    function validate() {
        let titleError = "";
        let descriptionError = "";
        let categoryError = "";
        let priceError = "";
        let imageError = "";
        let startDateError = "";
        let expiryDateError = "";

        if (NftDetails?.title === '') {
            titleError = "Title field is required."
        }
        if (NftDetails?.description === '') {
            descriptionError = "Description field is required."
        }
        if (NftDetails?.category_id == 0) {
            categoryError = "Category field is required."
        }
        if (NftDetails?.price == 0) {
            priceError = "Price field is required."
        }
        if (image_file == '' && NftDetails?.image == "") {
            imageError = "Image field is required."
        }
        if (NftDetails.sell_type == 2) {
            if (NftDetails.start_date === '' || NftDetails.start_date === null) {
                startDateError = "Start date required."
            }
            if (NftDetails.expiry_date === '' || NftDetails.expiry_date === null) {
                expiryDateError = "Expiry date required."
            }
        }        
        if (titleError || descriptionError || categoryError || priceError || imageError) {
            setvalidatioError({
                titleError, descriptionError, categoryError, priceError, imageError
            })
            return false
        } else {
            return true
        }
    }

    const updateNFt = async (e) => {
        e.preventDefault()
        const isValid = validate();
        if (!isValid) {

        }
        else {
            setspinloader(1);

            let fileHash = "";
            if (image_file) {
                fileHash = await imageUploadOnPinata();
                NftDetails.file_type = FileType;
            } else {
                fileHash = NftDetails?.image;
                NftDetails.file_type = NftDetails?.file_type;
            }

            if (fileHash) {
                NftDetails.ipfsHash = fileHash;
                let res = await updateNftAction(NftDetails);
                if (res.success) {
                    toast.success(res.msg);
                    setTimeout(() => {
                        window.location.href = `${config.baseUrl}adminnftslist`;
                    }, 2000);
                } else {
                    toast.error(res.msg);
                }
            } else {
                setspinloader(0);
                toast.error('Something went wrong for uploading image on pinata.');
            }
        }
    }

    const imageUploadOnPinata = async () => {
        let formData = new FormData();
        formData.append('file', image_file);
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
        let resIPF = await axios.post(url,
            formData,
            {
                headers: {
                    'Content-Type': `multipart/form-data; boundary= ${formData._boundary}`,
                    'pinata_api_key': '976ff92971f1f1012e63',
                    'pinata_secret_api_key': '48358109db781a004b9f54514fc2f9c219e12df9b7deda384686c25e0a44ebd0'
                }
            }
        );
        if (resIPF.data.IpfsHash) {
            let ipfsImg = resIPF.data.IpfsHash;
            return ipfsImg;
        } else {
            toast.error('Something went wrong uploading image on IPFS.');
            setspinloader(0);
            return false;
        }
    }

    function formatDate(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    const handleChangeStartDate = e => {
        let startDate = formatDate(e);
        setNftDetails((old) => {
            return { ...old, ['start_date']: startDate }
        })
        setvalidatioError({ ...validatioError, ['startDateError']: '' });
    }

    const handleChangeExpiryDate = e => {
        let expiryDate = formatDate(e);
        setNftDetails((old) => {
            return { ...old, ['expiry_date']: expiryDate }
        })
        setvalidatioError({ ...validatioError, ['expiryDateError']: '' });
    }

    return (
        <>
            <div className="wrapper">
                <Header />
                <Toaster />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="container-full">
                        <div className="content-header">
                            <div className="d-flex align-items-center">
                                <div className="me-auto">
                                    <h3 className="page-title mb-5 pb-2">Edit NFT</h3>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <section className="content">
                            <div className="row">
                                <div className="col-lg-12 col-12">
                                    <div className="box">
                                        <div className="box-header with-border">
                                            <h4 className="box-title">Edit NFT</h4>
                                        </div>
                                        <div className="row mt-20 mb-50">
                                            <form onSubmit={updateNFt}>
                                                <div className="row">
                                                    <div className="col-md-2"></div>
                                                    <div className="col-md-8">
                                                        <div className="form-group row mb-1">
                                                            <label className="col-form-label col-md-12">
                                                                Title
                                                            </label>
                                                            <div className="col-md-12">
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="title"
                                                                    id='titleError'
                                                                    onChange={inputHandler} value={NftDetails?.title}
                                                                    placeholder="Enter title"
                                                                />
                                                            </div>
                                                            <span className="validationErr">
                                                                {validatioError.titleError}
                                                            </span>
                                                        </div>

                                                        <div className="form-group row mb-1">
                                                            <label className="col-form-label col-md-12">
                                                                Description
                                                            </label>
                                                            <div className="col-md-12">
                                                                <textarea
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="description"
                                                                    id='descriptionError'
                                                                    onChange={inputHandler} value={NftDetails?.description}
                                                                    placeholder="Enter description"
                                                                />
                                                            </div>
                                                            <span className="validationErr">
                                                                {validatioError.descriptionError}
                                                            </span>
                                                        </div>

                                                        <div className="form-group row mb-1">
                                                            <label className="col-form-label col-md-12">
                                                                Category
                                                            </label>
                                                            <div className="col-md-12">
                                                                <select name='category_id' className="form-control" id='categoryError' onChange={inputHandler} value={NftDetails?.category_id}>
                                                                    <option value="0">Select Category</option>
                                                                    {Category.map(cat => (
                                                                        <option value={cat.id}>{cat.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <span className="validationErr">
                                                                {validatioError.categoryError}
                                                            </span>
                                                        </div>

                                                        <div className="form-group row mb-1">
                                                            <label className="col-form-label col-md-12">
                                                                Royalties(%)
                                                            </label>
                                                            <div className="col-md-12">
                                                                <input name='royalty_percentage' className="form-control" onChange={inputHandler} value={NftDetails?.royalty_percentage} type="text" placeholder="Eg. 5%, 10%, 15%" onKeyPress={(event) => { if (!/^\d*[]?\d{0,1}$/.test(event.key)) { event.preventDefault(); } }} />
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-1">
                                                            <label className="col-form-label col-md-12">
                                                                Price(BNB)
                                                            </label>
                                                            <div className="col-md-12">
                                                                <input name='price' id='priceError' className="form-control" onChange={inputHandler} value={NftDetails?.price} type="text" placeholder="Enter Price (BNB)" onKeyPress={(event) => { if (!/^\d*[.]?\d{0,1}$/.test(event.key)) { event.preventDefault(); } }} />
                                                            </div>
                                                            <span className="validationErr">
                                                                {validatioError.priceError}
                                                            </span>
                                                        </div>

                                                        <div className="form-group row mb-1">
                                                            <label className="col-form-label col-md-12">
                                                                Sell Type
                                                            </label>
                                                            <div className="col-md-12">
                                                                <select value={NftDetails?.sell_type} name='sell_type' className="form-control" id='sellType' onChange={inputHandler}>
                                                                    <option value="1">Price</option>
                                                                    <option value="2">Auction</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        {NftDetails.sell_type == 2 ?
                                                            <>
                                                                <div className="form-group row mb-1">
                                                                    <label className="col-form-label col-md-12">
                                                                        Start Date
                                                                    </label>
                                                                    <DatePicker onChange={handleChangeStartDate} minDate={currentDate} autoComplete="off" name="start_date" id="startDateError" className="form-control" value={NftDetails.start_date} />
                                                                    <span className="validationErr">{validatioError.startDateError}</span>
                                                                </div>

                                                                <div className="form-group row mb-1">
                                                                    <label className="col-form-label col-md-12">
                                                                        Expiry Date
                                                                    </label>
                                                                    <DatePicker onChange={handleChangeExpiryDate} minDate={currentDate} value={NftDetails.expiry_date} autoComplete="off" id="expiryDateError" name="expiry_date" className="form-control" />
                                                                    <span className="validationErr">{validatioError.expiryDateError}</span>
                                                                </div></>
                                                            : ""}

                                                        <div className="form-group row mb-1">
                                                            <label className="col-form-label col-md-12">
                                                                Image
                                                            </label>
                                                            <div className="col-md-12">
                                                                {image_preview ?
                                                                    <>
                                                                        <img className='nftImg' src={image_preview} /> &nbsp;
                                                                    </>
                                                                    :
                                                                    NftDetails?.image ?
                                                                        <>
                                                                            <img className='nftImg' src={`${config.ipfsUrl + NftDetails?.image}`} /> &nbsp;
                                                                        </>
                                                                        : ""
                                                                }
                                                                <br /><br />
                                                                <span className="filename">PNG, JPG, GIF, WEBP</span>
                                                                <input onChange={imageUpload} type="file" className="inputfile form-control" name="file" />
                                                            </div>
                                                            <span className="validationErr">
                                                                {validatioError.imageError}
                                                            </span>
                                                        </div>

                                                        <br />
                                                        <div className="text-center pull-left">
                                                            {spinloader == '0' ?
                                                                <button className='btn btn-primary' >Submit</button>
                                                                :
                                                                <button disabled className='btn btn-primary' >Updating NFT <i className="fa fa-spinner fa-spin validat"></i></button>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2"></div>
                                                </div>
                                            </form>
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
export default EditNFT;
