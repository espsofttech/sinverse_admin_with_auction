import "./App.css";
import React, { components } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import config from "./coreFIles/config";
import Login from "./component/login";
import Dashboard from "./component/dashboard";
import Users from "./component/users";
import Changepassword from "./component/changepassword";
import Category from "./component/category";
import Addcategory from "./component/addcategory";
import Categoryupdate from "./component/updatecategory";
import Transactionlist from "./component/transactionlist";
import Nftlist from "./component/nftlist";
import Profile from "./component/profile";
import CreateNFT from "./component/createNFT";
import EditNFT from "./component/editNFT";
import Adminnftslist from "./component/adminnftslist";
import TermsAndCondition from "./component/TermsAndCondition";
import PrivacyPolicy from "./component/PrivacyPolicy";
import Faq from "./component/faq";
import Addfaq from "./component/addfaq";
import Contactus from "./component/contactus";
import Updatefaq from "./component/Updatefaq";
import Sociallink from './component/Sociallink'
import Subscribers from "./component/subscribers";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path={`${config.baseUrl}`} element={<Login />} />
          <Route path={`${config.baseUrl}dashboard`} element={<Dashboard />} />
          <Route path={`${config.baseUrl}users`} element={<Users />} />

          <Route path={`${config.baseUrl}Category`} element={<Category />} />
          <Route
            path={`${config.baseUrl}Addcategory`}
            element={<Addcategory />}
          />
          <Route
            path={`${config.baseUrl}Categoryupdate/:id`}
            element={<Categoryupdate />}
          />

          <Route
            path={`${config.baseUrl}profile`}
            element={<Profile />}
          />

          <Route
            path={`${config.baseUrl}changepassword`}
            element={<Changepassword />}
          />

          <Route
            path={`${config.baseUrl}nftlist`}
            element={<Nftlist />}
          />

          <Route
            path={`${config.baseUrl}createNFT`}
            element={<CreateNFT />}
          />

          <Route
            path={`${config.baseUrl}editNFT/:id`}
            element={<EditNFT />}
          />

          <Route
            path={`${config.baseUrl}transactionlist`}
            element={<Transactionlist />}
          />

          <Route
            path={`${config.baseUrl}adminnftslist`}
            element={<Adminnftslist />}
          />

          <Route
            path={`${config.baseUrl}TermsAndCondition`}
            element={<TermsAndCondition />}
          />

          <Route
            path={`${config.baseUrl}PrivacyPolicy`}
            element={<PrivacyPolicy />}
          />
          <Route
            path={`${config.baseUrl}Faq`}
            element={<Faq />}
          />
          <Route
            path={`${config.baseUrl}addfaq`}
            element={<Addfaq />}
          />
          <Route
            path={`${config.baseUrl}subscribers`}
            element={<Subscribers />}
          />
          <Route
            path={`${config.baseUrl}Contactus`}
            element={<Contactus />}
          />
          <Route
            path={`${config.baseUrl}Sociallink`}
            element={<Sociallink />}
          />
          <Route
            path={`${config.baseUrl}Updatefaq/:id`}
            element={<Updatefaq />}
          />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
