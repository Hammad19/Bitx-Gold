import React,{useContext, useEffect, useReducer,  useState} from 'react';
import {Link} from 'react-router-dom';
//import {NavLink} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import {Button, Dropdown, Form, Modal, Nav, Tab} from 'react-bootstrap';
import { Swiper, SwiperSlide,  } from "swiper/react";
//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import BalanceCardSlider from './Dashboard/BalanceCardSlider';
//import MorrisDonught from './Dashboard/MorrisDonught';
import OrderForm from './Dashboard/OrderForm';
//import ServerStatusBar from './Dashboard/ServerStatusBar';
import {LtcIcon, BtcIcon, XtzIcon, EthIcon} from './SvgIcon';

//images
import coin from './../../../images/coin.png';
import metaverse from './../../../images/metaverse.png';
import axiosInstance from '../../../services/AxiosInstance';
import { ethers } from "ethers";
import { useSelector } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";
import bitXSwap from "../../../contractAbis/BitXGoldSwap.json";
import Loader from '../Loader/Loader';
const Home = () => {

	const[isreferred,setisreferred] = useState(false);
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const [addresses, setaddresses] = useState([]);
	const [fetch,setfetch] = useState(false);
	const [bxgavailable, setbxgavailable] = useState(0);
	const [bxgstacked, setbxgstacked] = useState(0.00);
	const [referralBonus, setreferralBonus] = useState(0);
	const [totalEarning, settotalEarning] = useState(0);
	const [loader,setLoader] = useState(false);
	const state = useSelector(state => state);

	const FetchData = async () => 
	
	{
		setLoader(true);
		try
		{
			const requestBody = {
				wallet_address:state.auth.auth.walletaddress
			};
			const {data} = await axiosInstance.get('/api/bxg/'+requestBody.wallet_address);
			const data1 = await axiosInstance.get('/api/stake/'+requestBody.wallet_address);
			const data3 = await axiosInstance.get('/api/bonusrefer/'+requestBody.wallet_address);
			
			console.log(data, "data");
			console.log(data1.data, "data1");
			console.log(data3.data, "data3");
			
			if(!data.wallet_address && !data1.data.wallet_address && !data3.data.wallet_address)
			{

				toast.error("Network Error Try Again Later", {
					style: { minWidth: 180 },
					position: "top-center",
					});
				
			}
			else
			{
				setbxgavailable(data.bxg);
				setbxgstacked(data1.data.bxg);
			//setisreferred(data3.data.isRefered);
				if(data3.data.isRefered == false)
				{
					handleShow();
				}
			}

		}

		catch(err)
		{
			toast.error("Network Error Try Again Later", {
				style: { minWidth: 180 },
				position: "top-center",
				});

		}
		setLoader(false);
	}

	useEffect(() => {
		FetchData();

	} , []);



	const [referalAddress, setreferalAddress] = useState("");

	const getBonus = async () => {

		if(referalAddress == "")
		{
			toast.error("Please Enter Referal Code", {
				style: { minWidth: 180 },
				position: "top-center",
				});
		}
		else
		{
		console.log(referalAddress);
		setLoader(true);
		try {
		  const provider = new ethers.providers.Web3Provider(window.ethereum);
		  const signer = provider.getSigner();
		  const addresses = await provider.send("eth_requestAccounts", []);
		  const swap = new ethers.Contract(bitXSwap.address, bitXSwap.abi, signer);
	
		  const tx = await (await swap.addReferral(referalAddress)).wait();
		  if (tx.events) {
			console.log(tx.blockHash, "success");
			const requestBody = {
			  wallet_address: state.auth.auth.walletaddress,
			  refer_code: referalAddress,
			};
			const { data } = await axiosInstance
			  .post("/api/bonusrefer/", requestBody)
			  .catch((err) => {
				toast.error(err.response.data.message, {
				  position: "top-center",
				});
			  });
	
			console.log(data);
	
			if (data === "Refered Successfully.") {
			  toast.success(data);
			  setisreferred(true);
			  handleClose();
			} else {
			  toast.error(data.message);
			}
		  }
		} catch (error) {
		  toast.error("Already Referred", {
			position: "top-center",
			style: { minWidth: 180 },
		  });
		}
	}
		setLoader(false);
	  };

		


	const { changeBackground } = useContext(ThemeContext);	
	useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });
	}, []);
	
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	return(
		<>
		<Toaster/>	

		{loader === true ? (
			<Loader/>
		):
		(<>
			
			<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
			  <Modal.Title>Referal Code</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			  <Form>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
				  <Form.Label>Refered By Someone ? Please Enter Referral Address</Form.Label>
				  <input
					  className='form-control form-control-lg mb-3'
					  value = {referalAddress}
					type="text"
					placeholder="0x00000000000000000000"
					autoFocus
					onChange={(e) => setreferalAddress(e.target.value)}
				  />
				</Form.Group>
			  </Form>
			</Modal.Body>
			<Modal.Footer>
			  <Button variant="secondary" onClick={handleClose}>
				Close
			  </Button>
			  <Button variant="primary" onClick={getBonus}>
				 Get Referral Bonus
			  </Button>
			</Modal.Footer>
		  </Modal>
				<div className="row">
					<div className="col-xl-12">
						<div className="row">
							<div className="col-xl-12">
								<div className="card bubles">
									<div className="card-body">
										<div className="buy-coin  bubles-down">
											<div>
												<h2>Buy & Sell BXG Instantly</h2>
												{/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p> */}
												<Link to={"/buy"} className="btn btn-primary">Buy Coin</Link>
											</div>
											<div className="coin-img">
												<img src={coin} className="img-fluid" alt="" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-12">
							<Swiper className="mySwiper"						
					speed= {1500}
					slidesPerView= {4}
					spaceBetween= {20}
					loop={false}
					//autoplay= {{
					   //delay: 1200,
					//}}
					//modules={[ Autoplay ]}
					breakpoints = {{
						  300: {
							slidesPerView: 1,
							spaceBetween: 30,
						  },
						  416: {
							slidesPerView: 2,
							spaceBetween: 30,
						  },
						   768: {
							slidesPerView: 2,
							spaceBetween: 30,
						  },
						   1200: {
							slidesPerView: 3,
							spaceBetween: 30,
						  },
						  1788: {
							slidesPerView: 4,
							spaceBetween: 30,
						  },
					}}
				>	
					
					<SwiperSlide>
						<div className="card card-wiget" style={{height:'150px'}}>
							<div className="card-body">
								<div className="card-wiget-info">
									<h4 className="count-num">{bxgavailable} BXG</h4>
									<p>Available</p>
									<div>
										{/* <svg className="me-1" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M19.6997 12.4191C18.364 17.7763 12.9382 21.0365 7.58042 19.7006C2.22486 18.365 -1.03543 12.9388 0.300792 7.582C1.63577 2.22424 7.06166 -1.03636 12.4179 0.299241C17.7753 1.63487 21.0353 7.06169 19.6997 12.4191Z" fill="#F7931A"/>
											<path d="M6.71062 11.684C6.65625 11.8191 6.51844 12.0215 6.20781 11.9447C6.21877 11.9606 5.41033 11.7456 5.41033 11.7456L4.86566 13.0015L6.29343 13.3575C6.55906 13.424 6.81938 13.4937 7.07563 13.5594L6.62155 15.3825L7.71748 15.6559L8.16716 13.8522C8.46655 13.9334 8.75716 14.0084 9.04153 14.079L8.5934 15.8743L9.6906 16.1477L10.1446 14.3281C12.0156 14.6821 13.4224 14.5393 14.0146 12.8472C14.4918 11.4847 13.9909 10.6987 13.0065 10.1862C13.7234 10.0209 14.2633 9.54937 14.4074 8.57532C14.6065 7.24471 13.5933 6.5294 12.208 6.05221L12.6574 4.24971L11.5602 3.97627L11.1227 5.73126C10.8343 5.65938 10.538 5.59157 10.2437 5.52437L10.6843 3.75781L9.58775 3.48438L9.13807 5.28623C8.89931 5.23186 8.66496 5.17808 8.43745 5.12154L8.43869 5.1159L6.92557 4.7381L6.63368 5.90996C6.63368 5.90996 7.44775 6.09653 7.43056 6.10808C7.87494 6.21902 7.95524 6.51307 7.94182 6.74622L6.71062 11.684ZM11.9006 12.0906C11.5615 13.4531 9.26747 12.7165 8.52372 12.5318L9.12622 10.1166C9.86995 10.3022 12.2549 10.6697 11.9006 12.0906ZM12.2399 8.55564C11.9306 9.79501 10.0212 9.16533 9.40183 9.01096L9.94808 6.82033C10.5674 6.97471 12.5621 7.26283 12.2399 8.55564Z" fill="white"/>
										</svg> */}
										{/* <span>0.00</span> */}
									</div>
								</div>	
								{/* <TotalBalanceArea /> */}
							</div>
							<div className="back-icon">
								<svg width="64" height="127" viewBox="0 0 64 127" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g opacity="0.05">
									<path d="M70.1991 32.0409C63.3711 28.2675 56.1119 25.3926 48.9246 22.4098C44.7559 20.6849 40.7669 18.6724 37.2451 15.8694C30.3093 10.3351 31.639 1.3509 39.7607 -2.20684C42.0606 -3.21307 44.4684 -3.5365 46.9121 -3.68024C56.3275 -4.18336 65.2758 -2.4584 73.7928 1.63839C78.0333 3.68679 79.4349 3.03993 80.8723 -1.38029C82.3817 -6.05207 83.6395 -10.7957 85.041 -15.5034C85.9753 -18.6659 84.8254 -20.7502 81.8426 -22.0799C76.3802 -24.4876 70.7741 -26.2126 64.8805 -27.1469C57.19 -28.3329 57.19 -28.3688 57.1541 -36.0952C57.1181 -46.984 57.1181 -46.984 46.1934 -46.984C44.6122 -46.984 43.0309 -47.02 41.4497 -46.984C36.3467 -46.8403 35.4842 -45.9419 35.3405 -40.8029C35.2686 -38.503 35.3405 -36.203 35.3045 -33.8671C35.2686 -27.0391 35.2327 -27.1469 28.6922 -24.7751C12.88 -19.0252 3.1052 -8.24421 2.06304 9.00543C1.12868 24.2785 9.10664 34.5924 21.6486 42.1032C29.375 46.739 37.9279 49.4702 46.1215 53.0998C49.3199 54.5014 52.3745 56.1185 55.0338 58.3466C62.904 64.8512 61.4665 75.6681 52.1229 79.7649C47.1277 81.957 41.845 82.4961 36.4186 81.8133C28.0453 80.7711 20.0314 78.579 12.4847 74.6619C8.06447 72.3619 6.77075 72.9729 5.2614 77.7524C3.96768 81.8852 2.81771 86.0538 1.66773 90.2225C0.122451 95.8286 0.697435 97.1583 6.05201 99.7817C12.88 103.088 20.1752 104.777 27.6141 105.963C33.4358 106.897 33.6155 107.149 33.6874 113.186C33.7233 115.917 33.7233 118.684 33.7593 121.416C33.7952 124.866 35.4483 126.878 39.006 126.95C43.0309 127.022 47.0918 127.022 51.1167 126.914C54.4229 126.842 56.1119 125.045 56.1119 121.703C56.1119 117.966 56.2916 114.192 56.1478 110.455C55.9682 106.646 57.6213 104.705 61.2868 103.699C69.7319 101.399 76.9193 96.8708 82.4535 90.1147C97.8345 71.4276 91.9768 44.0797 70.1991 32.0409Z" fill="#9568FF"/>
									</g>
								</svg>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="card card-wiget" style={{height:'150px'}}>
							<div className="card-body">
								<div className="card-wiget-info">
									<h4 className="count-num">{bxgstacked} BXG</h4>
									<p>Staked</p>
									{/* <div>
										<span className="text-normal">+0%</span>
									</div>  */}
								</div>	
								
								{/* <ProfitLossArea /> */}
							</div>
							<div className="back-icon">
								<svg width="157" height="114" viewBox="0 0 157 114" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g opacity="0.05">
										<path d="M12.1584 84.1906V110.157C12.1584 111.737 13.5953 113.053 15.4007 113.053H37.8751C39.6436 113.053 41.1173 111.77 41.1173 110.157V64.4771L24.7957 79.0565C21.3324 82.1172 16.9112 83.8944 12.1584 84.1906Z" fill="#9568FF"/>
										<path d="M52.3177 64.1484V110.158C52.3177 111.737 53.7546 113.054 55.56 113.054H78.0344C79.8029 113.054 81.2766 111.77 81.2766 110.158V83.0721C76.1554 82.9734 71.3657 81.1633 67.7551 77.938L52.3177 64.1484Z" fill="#9568FF"/>
										<path d="M92.4769 80.2078V110.157C92.4769 111.736 93.9138 113.053 95.7191 113.053H118.194C119.962 113.053 121.436 111.769 121.436 110.157V54.8994L95.6823 77.904C94.6875 78.7926 93.6191 79.5496 92.4769 80.2078Z" fill="#9568FF"/>
										<path d="M159.421 20.9355L132.636 44.8617V110.157C132.636 111.736 134.073 113.053 135.878 113.053H158.353C160.121 113.053 161.595 111.769 161.595 110.157V22.7456C160.858 22.1862 160.306 21.6925 159.9 21.3634L159.421 20.9355Z" fill="#9568FF"/>
										<path d="M177.806 -21.4532C176.737 -22.4734 175.116 -23 173.053 -23C172.869 -23 172.648 -23 172.464 -23C162 -22.5722 151.573 -22.1114 141.11 -21.6836C139.71 -21.6177 137.794 -21.5519 136.283 -20.2026C135.804 -19.7747 135.436 -19.2811 135.141 -18.6887C133.594 -15.6938 135.768 -13.7521 136.799 -12.8306L139.415 -10.461C141.22 -8.81546 143.063 -7.16992 144.905 -5.55729L81.6816 50.9505L53.2754 25.5763C51.5806 24.0624 49.2964 23.2067 46.8647 23.2067C44.433 23.2067 42.1856 24.0624 40.4908 25.5763L2.65272 59.3427C-0.88424 62.5022 -0.88424 67.6033 2.65272 70.7628L4.34751 72.2767C6.0423 73.7906 8.32659 74.6462 10.7582 74.6462C13.1899 74.6462 15.4374 73.7906 17.1321 72.2767L46.8647 45.7177L75.2709 71.0919C76.9657 72.6058 79.25 73.4615 81.6816 73.4615C84.1133 73.4615 86.3607 72.6058 88.0924 71.0919L159.421 7.37663L167.49 14.5512C168.448 15.4069 169.774 16.5916 171.8 16.5916C172.648 16.5916 173.495 16.3942 174.379 15.9663C174.969 15.6702 175.485 15.341 175.927 14.9461C177.511 13.5309 177.806 11.7209 177.88 10.3057C178.174 4.25011 178.506 -1.80547 178.837 -7.89396L179.316 -17.0102C179.427 -18.9191 178.948 -20.4001 177.806 -21.4532Z" fill="#9568FF"/>
										</g>
								</svg>
	
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="card card-wiget" style={{height:'150px'}}>
							<div className="card-body">
								<div className="card-wiget-info">
									<h4 className="count-num">0.00 USDT</h4>
									<p className="sm-chart">Refferal Bonus</p>
								</div>
								

							</div>
							<div className="back-icon">
								<svg width="138" height="113" viewBox="0 0 138 113" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g opacity="0.05">
									<path d="M119.285 -15.4771H113.59V4.77299H133.524V-1.23874C133.524 -9.08974 127.136 -15.4771 119.285 -15.4771Z" fill="#9568FF"/>
									<path d="M99.3521 -49.0015H42.3988C39.7777 -49.0015 37.6527 -46.8765 37.6527 -44.2554V4.77188H104.098V-44.2554C104.098 -46.8765 101.973 -49.0015 99.3521 -49.0015Z" fill="#9568FF"/>
									<path d="M28.1602 -15.4771H14.8711C10.898 -15.4771 7.16314 -13.9305 4.35502 -11.122C1.5466 -8.31391 0 -4.57905 0 -0.605927V4.77299H28.1602V-15.4771Z" fill="#9568FF"/>
									<path d="M108.211 59.8423C108.211 66.8647 113.998 75.3463 121.183 75.3463H157.254C159.875 75.3463 162 73.2213 162 70.6002V49.0845C162 46.4634 159.875 44.3384 157.254 44.3384H121.183C113.998 44.3384 108.211 52.82 108.211 59.8423ZM128.777 59.8414C128.777 62.4628 126.652 64.5875 124.031 64.5875C121.41 64.5875 119.285 62.4628 119.285 59.8414C119.285 57.2203 121.41 55.0953 124.031 55.0953C126.652 55.0953 128.777 57.2203 128.777 59.8414Z" fill="#9568FF"/>
									<path d="M105.012 76.6807C101.013 71.8922 98.719 65.7555 98.719 59.8437C98.719 53.932 101.013 47.7953 105.012 43.0068C109.406 37.7452 115.15 34.8476 121.184 34.8476H153.774V20.6093C153.774 19.8236 153.719 19.0516 153.615 18.2966C153.293 15.9761 151.277 14.2656 148.935 14.2656H0V96.7621C0 105.716 6.38731 113 14.2383 113H139.535C147.386 113 153.774 105.716 153.774 96.7621V84.8399H121.184C115.15 84.8399 109.406 81.9422 105.012 76.6807Z" fill="#9568FF"/>
									</g>
								</svg>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="card card-wiget" style={{height:'150px'}}>
							<div className="card-body">
								<div className="card-wiget-info rewards">
									<h4 className="count-num">0.00 BXG </h4>
									<p>Total Earnings</p>
							
								</div>
							</div>
							<div className="back-icon">
								<svg width="115" height="123" viewBox="0 0 115 123" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g opacity="0.05">
									<path d="M15.3627 66.1299L0.487194 95.8762C-0.228022 97.3054 -0.151221 99.0034 0.687599 100.362C1.52882 101.719 3.00965 102.546 4.60689 102.546H26.9838L40.4097 120.447C41.2821 121.614 42.6514 122.29 44.0926 122.29C46.0066 122.29 47.5151 121.148 48.2159 119.744L62.2334 91.7073C43.2814 89.8952 26.5722 80.2854 15.3627 66.1299Z" fill="#9568FF"/>
									<path d="M137.06 95.8762L122.184 66.1299C110.975 80.2854 94.2658 89.8952 75.3137 91.7073L89.3324 119.744C90.0321 121.148 91.5405 122.29 93.4545 122.29C94.8958 122.29 96.2662 121.614 97.1386 120.447L110.563 102.546H132.94C134.537 102.546 136.018 101.719 136.86 100.362C137.698 99.0034 137.775 97.3054 137.06 95.8762Z" fill="#9568FF"/>
									<path d="M76.4862 10.3573L68.7736 -1.96338L61.0634 10.3573C60.431 11.3677 59.4314 12.0937 58.2758 12.383L44.1766 15.9098L53.5105 27.0509C54.2761 27.9641 54.6577 29.1389 54.5749 30.3282L53.5705 44.8269L67.0504 39.3932C67.6912 39.1352 69.0016 38.7908 70.4956 39.3932L83.9768 44.8269L82.9735 30.3282C82.8919 29.1389 83.2735 27.9641 84.0392 27.0509L93.373 15.9098L79.2738 12.383C78.1182 12.0937 77.1186 11.3677 76.4862 10.3573Z" fill="#9568FF"/>
									<path d="M127.676 23.9022C127.676 -8.57659 101.252 -35 68.7736 -35C36.2949 -35 9.87146 -8.57659 9.87146 23.9022C9.87146 56.3797 36.2949 82.8043 68.7736 82.8043C101.252 82.8043 127.676 56.3809 127.676 23.9022ZM105.166 16.1848L92.2966 31.5451L93.679 51.5352C93.7882 53.1192 93.0754 54.6481 91.7914 55.5817C90.5061 56.5141 88.8321 56.7205 87.3596 56.1277L68.7736 48.6359L50.1876 56.1277C49.6896 56.3281 47.7059 56.9977 45.7559 55.5817C44.4719 54.6481 43.759 53.1192 43.8682 51.5352L45.2531 31.5451L32.384 16.186C31.364 14.968 31.0424 13.3119 31.5332 11.8023C32.024 10.2926 33.2576 9.14062 34.7984 8.75541L54.2365 3.8929L64.8675 -13.0935C65.71 -14.4387 67.186 -15.2559 68.7736 -15.2559C70.3613 -15.2559 71.8373 -14.4387 72.6797 -13.0935L83.3132 3.8929L102.751 8.75541C104.292 9.14062 105.526 10.2926 106.016 11.8023C106.507 13.3119 106.186 14.968 105.166 16.1848Z" fill="#9568FF"/>
									</g>
								</svg>
							</div>
						</div>	
					</SwiperSlide>
										
					
				</Swiper>
							</div>
				
						</div>
					</div>
					
				</div>		
			</>)}
			</>

	)
}
export default Home;