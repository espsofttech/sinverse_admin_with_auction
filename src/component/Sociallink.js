import React, { useEffect, useState } from 'react'
import Header from '../directives/header';
import Sidebar from '../directives/sidebar';
import { getSocialLinksAction, updatesociallinksAction } from '../Action/action';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
    const [socialLinkList, setSocialLinkList] = useState('');

    useEffect(() => {
        getSocialLinkAPI()
    }, []);


    const getSocialLinkAPI = async () => {
        let res = await getSocialLinksAction({});
        if (res.success) {
            setSocialLinkList(res.data);
        }
    };

    const inputHandler = (e) => {
        const { name, value } = e.target
        setSocialLinkList((old) => {
            return { ...old, [name]: value }
        })
    }

    const updateSocialLinks = async (e) => {
        e.preventDefault()

        let res = await updatesociallinksAction(socialLinkList);
        if (res.success) {
            toast.success(res.msg);
        } else {
            toast.error(res.msg);
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
                            <div className="align-items-center">
                                <div className="me-auto">
                                    <h3 className="page-title mb-5 pb-2">Social Links </h3>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <section className="content">
                            <div className='box profile' >
                                <div className="row">
                                    <div className='col-lg-2'></div>
                                    <div className="col-lg-8  col-12">
                                        <form className="pt-3 profile">
                                            <div className="form-group">
                                                <label>Twitter</label>
                                                <input type="text" onChange={inputHandler} value={socialLinkList.twitter} name="twitter" className="form-control input-profile p-1" id="exampleInputEmail1" />
                                            </div>

                                            <div className="form-group">
                                                <label>Discord</label>
                                                <input type="text" onChange={inputHandler} value={socialLinkList.discord} name="discord" className="form-control input-profile p-1" id="exampleInputEmail1" />
                                            </div>

                                            {/* <div className="form-group">
                                                <label>Facebook</label>
                                                <input type="text" onChange={inputHandler} value={socialLinkList.facebook} name="facebook" className="form-control input-profile p-1" id="exampleInputEmail1" />
                                            </div>
                                            <div className="form-group">
                                                <label>Telegram</label>
                                                <input type="text" onChange={inputHandler} value={socialLinkList.telegram} name="telegram" className="form-control input-profile p-1" id="exampleInputEmail1" />
                                            </div>
                                            <div className="form-group">
                                                <label>Instagram</label>
                                                <input type="text" onChange={inputHandler} value={socialLinkList.insta} name="insta" className="form-control input-profile p-1" id="exampleInputEmail1" />
                                            </div> */}
                                            <div className="mt-3">
                                                <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn pull-left" onClick={updateSocialLinks} >Update</a>
                                            </div>
                                        </form>
                                    </div>
                                    <div className='col-lg-2'></div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Profile;