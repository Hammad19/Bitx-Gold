import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Link,
  NavLink,
  useNavigate,
  useHistory,
  Navigate,
} from "react-router-dom";
import {
  connectToMetaMask,
  loadingToggleAction,
  loginAction,
  navigateToDashboard,
} from "../../store/actions/AuthActions";
import logo from "../../images/logo/logo-full.png";
import bg6 from "../../images/background/bg6.jpg";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import axiosInstance from "../../services/AxiosInstance";
import { ethers } from "ethers";
function Login(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [data, setdata] = useState({
    address: "", // Stores address
    Balance: null, // Stores balance
  });

  const [token, setToken] = useState("");
  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: "dark", label: "Dark" });
  }, []);

  const handleSubmit = () => {
    login();
  };

  const login = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const signedMessage = await signer.signMessage(
        `Welcome to BITXGOLD  ${Date.now().toString()}`
      );

      console.log(signedMessage, "signedMessage");
      if (signedMessage) {
        const dt = {
          hash: signedMessage,
        };

        const { data } = await axiosInstance.post("/user/login/", dt);
        console.log(data, "data[1]");
        if (data.status) {
          setToken(data.access);
          connectToMetamask();
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };

  //Create Connect to metamask function
  const connectToMetamask = () => {
    //Check if metamask is installed
    if (window.ethereum) {
      //Request account access if needed
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          //Connect to the blockchain
          // window.web3 = new Web3(window.ethereum);

          //Get the account address
          const account = accounts[0];
          console.log(account);
          //Set the account address

          //Get the account balance
          window.ethereum
            .request({
              method: "eth_getBalance",
              params: [account, "latest"],
            })
            .then((balance) => {
              //Set the account balance
              //print balance
              //console.log(balance);

              setdata({
                address: account,
                Balance: balance,
              });
            })
            .catch((err) => {
              //Handle error
              alert(err.message);
            });

          console.log(account, "account");
        })
        .catch((err) => {
          //User denied account access...
          alert(err.message);
        });
    } else {
      alert("Please install MetaMask!");
    }
  };
  //useeffect for data to redirect it to dashboard
  useEffect(() => {
    if (data.address !== "") {
      console.log(token, "token");
      dispatch(connectToMetaMask(navigate, token));
    }
  }, [data]);

  return (
    <div className="page-wraper">
      <div className="browse-job login-style3">
        <div
          className="bg-img-fix overflow-hidden "
          style={{
            background: "#fff url(" + bg6 + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",
          }}>
          <div className="row gx-0">
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 vh-100 bg-white ">
              <div
                id="mCSB_1"
                className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside"
                style={{ maxHeight: "653px" }}>
                <div
                  id="mCSB_1_container"
                  className="mCSB_container"
                  style={{
                    position: "relative",
                    top: "0",
                    left: "0",
                    dir: "ltr",
                  }}>
                  <div className="login-form style-2">
                    <div className="card-body">
                      <div className="logo-header">
                        <Link to={"#"} className="logo">
                          <img
                            src={logo}
                            alt=""
                            className="width-230 mCS_img_loaded"
                          />
                        </Link>
                      </div>
                      <div className="nav nav-tabs border-bottom-0">
                        <div className="tab-content w-100" id="nav-tabContent">
                          <div
                            className="tab-pane fade active show"
                            id="nav-personal">
                            {props.errorMessage && (
                              <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                                {props.errorMessage}
                              </div>
                            )}
                            {props.successMessage && (
                              <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                                {props.successMessage}
                              </div>
                            )}

                            <div className="text-center bottom">
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <Button
                                className="btn btn-primary button-md btn-block"
                                onClick={handleSubmit}>
                                Connect with
                                <img
                                  src="https://logosarchive.com/wp-content/uploads/2022/02/Metamask-logo.svg"
                                  width="100"
                                  height="20"
                                  alt="metamask logo"
                                  className="mr-2 mx-2"
                                />
                              </Button>

                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
