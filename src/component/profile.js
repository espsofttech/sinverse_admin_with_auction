import React, { useEffect, useState } from 'react'
import Header from '../directives/header';
import Sidebar from '../directives/sidebar';
import { getAdminProfiles, updateAdminProfilesAction } from '../Action/action';
import Cookies from 'js-cookie'
import config from '../coreFIles/config';
import toast, { Toaster } from 'react-hot-toast';
const loginData = (!Cookies.get('loginSuccesssinverseAdmin')) ? [] : JSON.parse(Cookies.get('loginSuccesssinverseAdmin'));

const Profile = () => {
    const [usersList, setusersList] = useState('');
    const [image_file, setimage_file] = useState('');
    const [image_preview, setimage_preview] = useState('');
    useEffect(() => {
        if (!loginData?.email) {
            window.location.href = `${config.baseUrl}login`
        }
        getProfileAPI()
    }, []);


    const getProfileAPI = async () => {
        let res = await getAdminProfiles({
            id: loginData?.id,
            email: loginData?.email,
        });
        if (res.success) {
            setusersList(res.data);
        }
    };

    const inputHandler = (e) => {
        const { name, value } = e.target
        setusersList((old) => {
            return { ...old, [name]: value }
        })
    }
    const imageChange = async (e) => {
        e.preventDefault()
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
        setimage_file(image_as_files);
        setimage_preview(image_as_base64);
        setusersList((old) => {
            return { ...old, ['profile_pic']: image_as_files }
        })
    }

    const updateAdminProfiles = async (e) => {
        e.preventDefault()
        if (!image_file) {
            usersList.old_profile_pic = usersList.profile_pic;
        }
        let res = await updateAdminProfilesAction(usersList);
        if (res.success) {
            toast.success(res.msg);
            setTimeout(() => {
                window.location.href = `${config.baseUrl}profile`;
            }, 2000);
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
                                    <h3 className="page-title mb-5 pb-2">{usersList.first_name} </h3>
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
                                            <div className="form-group ">
                                                <label>Profile</label><br />
                                                {image_preview == "" ? (
                                                    usersList?.profile_pic === null ||
                                                        usersList?.profile_pic === "null" ||
                                                        usersList?.profile_pic == "" ? (
                                                        <img
                                                            style={{ height: "50px", width: "50px" }}
                                                            className="object-cover w-full h-32"
                                                            src="images/dummy.jpg"
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <img
                                                            style={{ height: "50px", width: "50px" }}
                                                            className="object-cover w-full h-32"
                                                            src={`${config.imageUrl}${usersList?.profile_pic}`}
                                                            alt=""
                                                        />
                                                    )
                                                ) : (
                                                    <img
                                                        style={{ height: "50px", width: "50px" }}
                                                        id="image"
                                                        className="object-cover w-full h-32"
                                                        src={image_preview}
                                                    />
                                                )}
                                                <br />
                                                <br />
                                                <label class="upload-btn">
                                                    <input type="file" id="input-file" accept="image/*" name='profile_pic' class="form-control" onChange={imageChange} />
                                                </label>
                                            </div>
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input type="text" name="first_name" onChange={inputHandler} value={usersList.first_name} className="form-control input-profile p-1" id="exampleInputEmail1" />
                                            </div>
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input type="text" onChange={inputHandler} value={usersList.last_name} name="last_name" className="form-control input-profile p-1" id="exampleInputEmail1" />
                                            </div>
                                            <div className="form-group ">
                                                <label>Email</label>
                                                <input type="text" onChange={inputHandler} value={usersList.email} name="email" disabld readOnly className="form-control input-profile p-1" />
                                            </div>
                                            <div className="form-group ">
                                                <label>Bio</label>
                                                <textarea onChange={inputHandler} value={usersList.bio} name="bio" className="form-control input-profile p-1" style={{ "width": "100%", "height": "20vh" }}></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label>Facebook</label>
                                                <input type="text" onChange={inputHandler} value={usersList.facebook} name="facebook" className="form-control input-profile p-1" id="exampleInputEmail1" />
                                            </div>
                                            <div className="form-group">
                                                <label>Telegram</label>
                                                <input type="text" onChange={inputHandler} value={usersList.telegram} name="telegram" className="form-control input-profile p-1" id="exampleInputEmail1" />
                                            </div>
                                            <div className="form-group">
                                                <label>Discord</label>
                                                <input type="text" onChange={inputHandler} value={usersList.discord} name="discord" className="form-control input-profile p-1" id="exampleInputEmail1" />
                                            </div>
                                            <div className="mt-3">
                                                <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn pull-left" onClick={updateAdminProfiles} >Update Profile</a>
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