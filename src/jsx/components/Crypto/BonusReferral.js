import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Badge, Card, Col, Dropdown, Table } from "react-bootstrap";


//import icon from src/icons/coin.png;
import bxgicon from "../../../icons/buy and sell/tokenbxg.png";
import usdicon from "../../../icons/buy and sell/usdtt.png";
import bitX from "../../../contractAbis/BitX.json";
import bitXSwap from "../../../contractAbis/BitXGoldSwap.json";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import axiosInstance from "../../../services/AxiosInstance";
import { ThemeContext } from "../../../context/ThemeContext";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
const BonusReferral = () => {



  const state = useSelector((state) => state);


  const { changeBackground } = useContext(ThemeContext);	
	useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });
	}, []);
	
  

  const [loader , setLoader] = useState(false);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const [addresses, setaddresses] = useState([]);
  const [address, setaddress] = useState();
  const [swap, setswap] = useState();
  const [bitXGold, setbitXGold] = useState();

  //total usdt value

  //create handlesell

  const getSellData = async () => {
    setaddresses(await provider.send("eth_requestAccounts", []));
    setaddress(addresses[0]);
    setswap(new ethers.Contract(bitXSwap.address, bitXSwap.abi, signer));
    setbitXGold(new ethers.Contract(bitX.address, bitX.abi, signer));
  };


  const FetchData = async () => 
	
	{
		setLoader(true);
    try
    {

    }
    catch(err)
    {
      toast.error("Error Occured", {
        position: "top-center",
        style: { minWidth: 180 },
      });
      
    }
    
		
		setLoader(false);
	}

	useEffect(() => {
		FetchData();

	} , []);



  useEffect(() => {
    getSellData();
    FetchData();
  }, []);


  function myFunction() {
    // Get the text field
    var copyText = document.getElementById("myInput");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  
    // Alert the copied text
    toast.success("Copied Referral Code: " + copyText.value, {
      position: "top-center",
      style: { minWidth: 180 },
    });
  }


  return (
    <>
      <Toaster />
      <div
        className="row "
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <div className="col-xl-12" style={{ height: "100%" }}>
          <div className="card">
            <div className="card-body pb-2">
              <br></br>
              <h1 className="no-border font-w600 fs-60 mt-2">
                Invite Your Contacts
              </h1>
              <p className="font-w600 fs-60 mt-2" >Share this with Your Contacts and Get Referral Bonus when you Buy or Sell. Note that Refer Code can Only be Redeemed Once</p>
              <br></br>
              
              <div className="row">
                <div className="col-xl-12">
                  <div className=" mt-3 row ">
                    <div className="col-xl-10">
                      <div className="row">
                      <label>Your Referral Code</label>
                      <div class="input-group mb-3">
                       
                        <input id="myInput" disabled={true} value={state.auth.auth.walletaddress} style={{height: 60}} type="text" className="form-control"/><button onClick={myFunction} className="btn btn-success" type="button">Copy Code</button></div>
                       
                      </div>
                    </div>

                
                  </div>

                  <br></br>

                  
                </div>


              </div>
            </div>
          </div>
        </div>

        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>You are Currently Referred By</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Your Wallet</th>
                    <th>Referred Wallet</th>
            
                  </tr>
                </thead>
                <tbody>

                  {/* {idhr map lgega} */}
                  
            
                  <tr>
                    <th>1</th>
                    <td>0xEAC3ce292F95d779732e7a26c95c57A742cf5119</td>
                    <td>0xEAC3ce292F95d779732e7a26c95c57A742cf5119</td>
                  
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>


        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Referred Transactions</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Wallet Address</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>BXG</th>
                  </tr>
                </thead>
                <tbody>

                  {/* {idhr map lgega} */}
                  <tr>
                    <th>1</th>
                    <td>0x4fad12ed6776b85e56125f06742787a494a8370e</td>
                    <td>
                      <Badge bg="" className="badge-primary light">Sale</Badge>
                    </td>
                    <td>January 22</td>
                    <td className="color-primary">21.56 BXG</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>0x4fad12ed6776b85e56125f06742787a494a8370e</td>
                    <td>
                      <Badge bg="success">Tax</Badge>
                    </td>
                    <td>January 30</td>
                    <td className="color-success">55.32 BXG</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>0x4fad12ed6776b85e56125f06742787a494a8370e</td>
                    <td>
                      <Badge bg="danger">Extended</Badge>

                      
                    </td>
                    <td>January 25</td>
                    <td className="color-danger">14.85 BXG</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  );
};
export default BonusReferral;
