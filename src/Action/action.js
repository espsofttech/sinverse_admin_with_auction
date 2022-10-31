import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  postRequestFormData,
} from "../coreFIles/helper";

export const LoginAction = (data) => {
  return postRequest("adminLogin", data).then((res) => {
    return res.data;
  });
};

export const getDashboardStatisticsAction = (data) => {
  return postRequest("getDashboardStatistics", data).then((res) => {
    return res.data;
  });
};

export const getUsersListAction = (data) => {
  return getRequest("getAdminUsersList", data).then((res) => {
    return res.data;
  });
};
export const getNftListAction = (data) => {
  return getRequest("getNftList", data).then((res) => {
    return res.data;
  });
};

export const loginAsUserAction = (data) => {
  return postRequest("loginAsUser", data).then((res) => {
    return res.data;
  });
};

export const getTransactionHistoryAction = (data) => {
  return postRequest("getTransactionHistory", data).then((res) => {
    return res.data;
  });
};

export const changePasswordAction = (data) => {
  return postRequest("changePassword", data).then((res) => {
    return res.data;
  });
};

export const UserBlockAction = (data) => {
  return postRequest("usersblockunblock", data).then((res) => {
    return res.data;
  });
};
export const UserBlockUnBlockAction = (data) => {
  return postRequest("usersblockunblock", data).then((res) => {
    return res.data;
  });
};
export const UserUnBlockAction = (data) => {
  return postRequest("userUnblock", data).then((res) => {
    return res.data;
  });
};
export const insertcategoryAction = (data) => {
  return postRequest("insertcategorylist", data).then((res) => {
    return res.data;
  });
};

export const getcategoryAction = (data) => {
  return postRequest("getcategoryname", data).then((res) => {
    return res.data;
  });
};

export const getcategorylistAction = (data) => {
  return getRequest("getcategorylist", data).then((res) => {
    return res.data;
  });
};
export const deletecategoryAction = (data) => {
  return postRequest("deletecategory", data).then((res) => {
    return res.data;
  });
};
export const getcategoryidAction = (data) => {
  return postRequest("getcategoryidlist", data).then((res) => {
    return res.data;
  });
};
export const updatecategoryAction = (data) => {
  return postRequest("updatecategorylist", data).then((res) => {
    return res.data;
  });
};

export const getTransactionListAction = (data) => {
  return getRequest("getTransactionList", data).then((res) => {
    return res.data;
  });
};
export const getAdminProfiles = (data) => {
  return getRequest('getAdminProfiles', data).then(res => { return res.data })
}
export const updateAdminProfilesAction = (data) => {
  return postRequestFormData("updateAdminProfiles", data).then((res) => {
    return res.data;
  });
};

export const createNftAction = (data) => {
  return postRequest('createUserNFT', data).then(res => { return res.data })
}

export const createMetadataAction = (data) => {
  return postRequest('createMetadata', data).then(res => { return res.data })
}

export const getNftDetailsAction = (data) => {
  return postRequest('getNftDetailsById', data).then(res => {return res.data})
}

export const updateNftAction = (data) => {
  return postRequest('updateNft', data).then(res => {return res.data})
}

export const cancelOrderAction = (data) => {
  return postRequest('cancelOrderAction', data).then(res => { return res.data })
}

export const putOnSaleAction = (data) => {
  return postRequest('putOnSaleAction', data).then(res => { return res.data })
}

export const getAdminNftListAction = (data) => {
  return getRequest("getAdminNftList", data).then((res) => {
    return res.data;
  });
};

export const gettermsandconditionAction=(data)=>{
  return getRequest('getTermsAndConditions',data).then(res=>{return res.data})
}
export const updatetermsandconditionAction=(data)=>{
  return postRequest('updateTermandCondition',data).then(res=>{return res.data})
}
export const getFaqAction=(data)=>{
  return getRequest('getFaq',data).then(res=>{return res.data})
}
export const getfaqidAction = (data) => {
  return postRequest("getfaqidlist", data).then((res) => {
    return res.data;
  });
};
export const insertfaqAction = (data) => {
  return postRequest("insertfaqlist", data).then((res) => {
    return res.data;
  });
};
export const deletefaqAction = (data) => {
  return postRequest("faqdeletelist", data).then((res) => {
    return res.data;
  });
};
export const updatefaqAction = (data) => {
  return postRequest("updatefaqlist", data).then((res) => {
    return res.data;
  });
};
export const getPrivacyPolicyAction=(data)=>{
  return getRequest('getPrivacyPolicy',data).then(res=>{return res.data})
}
export const updatePrivacyPolicyAction=(data)=>{
  return postRequest('updatePrivacyPolicy',data).then(res=>{return res.data})
}

export const getSubscriberListAction = (data) => {
  return getRequest("getAdminSubscribeList", data).then((res) => {
    return res.data;
  });
};

export const getcontactusListAction = (data) => {
  return getRequest("getAdminContactUsList", data).then((res) => {
    return res.data;
  });
};

export const updatesociallinksAction = (data) => {
  return postRequest("updatesociallinks", data).then((res) => {
    return res.data;
  });
};

export const getSocialLinksAction = (data) => {
  return getRequest('getsociallinks', data).then(res => { return res.data })
}

export const getBidDetailAction = (data) => {
  return postRequest('getUserBidsForAdmin', data).then(res => { return res.data })
}

export const bidAcceptAction = (data) => {
  return postRequest('bidAcceptFromAdmin', data).then(res => { return res.data })
}