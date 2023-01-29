import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Nav, Tab } from "react-bootstrap";
import Select from "react-select";
import OrderForm from "../Dashboard/Dashboard/OrderForm";
import ExchangeLineChart from "./Exchange/ExchangeLineChart";
import ExchangeLineChart2 from "./Exchange/ExchangeLineChart2";
import LitecoinBarChart from "./Exchange/LitecoinBarChart";
import TicketSoldChart from "./Exchange/TicketSoldChart";
//import icon from src/icons/coin.png;
import bxgicon from "../../../icons/buy and sell/tokenbxg.png";
import usdicon from "../../../icons/buy and sell/usdtt.png";
import { useState } from "react";

const Stake = () => {
  const [startTime, setstartTime] = useState("2023-01-01T00:00:00");
  const [timeDifference, setTimeDifference] = useState(null);

  useEffect(() => {
    const startTimeObject = new Date(startTime);
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const difference = currentTime - startTimeObject;

      const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor(
        (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
      );
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeDifference({
        months,
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime]);

  // create a static value of 6.19931
  const [value, setValue] = React.useState(6.19931);
  const [bxgvalue, setBxgvalue] = React.useState(0);
  //total usdt value
  const [totalUsd, setTotalUsd] = React.useState(bxgvalue * value);

  const handleChange = (e) => {
    setBxgvalue(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    setTotalUsd(bxgvalue * value);
  }, [bxgvalue]);
  return (
    <>
      <div
        className="row "
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}>
        <div className="col-xl-6" style={{ height: "100%" }}>
          <div className="col-xl-12 col-sm-6">
            <div className="card h-auto">
              <div className="card-body px-0 pt-1">
                <Tab.Container defaultActiveKey="Navbuy">
                  <div className="">
                    <div className="buy-sell">
                      <Nav
                        className="nav nav-tabs"
                        eventKey="nav-tab2"
                        role="tablist">
                        <Nav.Link
                          as="button"
                          className="nav-link"
                          eventKey="Navbuy"
                          type="button">
                          Stake
                        </Nav.Link>
                        <Nav.Link
                          as="button"
                          className="nav-link"
                          eventKey="Navsell"
                          type="button">
                          Claim
                        </Nav.Link>
                      </Nav>
                    </div>
                    <Tab.Content>
                      <Tab.Pane eventKey="Navbuy">
                        <Tab.Container defaultActiveKey="Navbuymarket">
                          <Tab.Content id="nav-tabContent1">
                            <Tab.Pane eventKey="Navbuymarket"></Tab.Pane>
                            <Tab.Pane eventKey="Navbuylimit"></Tab.Pane>
                          </Tab.Content>
                          <div className="sell-element">
                            <div className="col-xl-12"><OrderForm /></div>
                            <div className="text-center">
                              <Link
                                //in the onclick function set start time to current time
                                onClick={() => setstartTime(new Date())}
                                //to={"/exchange"}
                                className="btn btn-success w-75">
                                Stake
                              </Link>
                            </div>
                          </div>
                        </Tab.Container>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Navsell">
                        <Tab.Container defaultActiveKey="Navsellmarket">
                          <Tab.Content id="nav-tabContent2">
                            <Tab.Pane id="Navsellmarket"></Tab.Pane>
                            <Tab.Pane id="Navselllimit"></Tab.Pane>
                          </Tab.Content>
                          <div className="sell-element">
                            <OrderForm />
                            <div className="text-center">
                              <Link
                                to={"/exchange"}
                                className="btn btn-danger w-75">
                                Claim
                              </Link>

							  
                            </div>

                          </div>
						  
                        </Tab.Container>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="col-xl-12" style={{ height: "100%" }}>
            <div className="card">
              <div className="card-wiget-info">
                {timeDifference ? (
                  <>
                    <br></br>
                    <div className="row justify-content-center">
                      <div className="col-xl-2" style={{ fontSize: "12px" }}>
                        <h4 className="count-num">{timeDifference.months}</h4>
                        <p>Months</p>
                      </div>
                      <div className="col-xl-2" style={{ fontSize: "12px" }}>
                        <h4 className="count-num">{timeDifference.days}</h4>
                        <p>Days</p>
                      </div>

                      <div className="col-xl-2" style={{ fontSize: "12px" }}>
                        <h4 className="count-num">{timeDifference.hours}</h4>
                        <p>Hours</p>
                      </div>

                      <div className="col-xl-2" style={{ fontSize: "12px" }}>
                        <h4 className="count-num">{timeDifference.minutes}</h4>
                        <p>Minutes</p>
                      </div>

                      <div className="col-xl-2" style={{ fontSize: "12px" }}>
                        <h4 className="count-num">{timeDifference.seconds}</h4>
                        <p>Seconds</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-12" style={{ height: "100%" }}>
            <div className="card">
              <div className="card-wiget-info"></div>
              <div className="card-body pb-2">
                <div className="card-wiget-info">
                  <br></br>
                  <h4 className="count-num">0.00 BXG</h4>
                  <p>Total Amount Staked</p>
                  <div>
                    {/* <svg className="me-1" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M19.6997 12.4191C18.364 17.7763 12.9382 21.0365 7.58042 19.7006C2.22486 18.365 -1.03543 12.9388 0.300792 7.582C1.63577 2.22424 7.06166 -1.03636 12.4179 0.299241C17.7753 1.63487 21.0353 7.06169 19.6997 12.4191Z" fill="#F7931A"/>
										<path d="M6.71062 11.684C6.65625 11.8191 6.51844 12.0215 6.20781 11.9447C6.21877 11.9606 5.41033 11.7456 5.41033 11.7456L4.86566 13.0015L6.29343 13.3575C6.55906 13.424 6.81938 13.4937 7.07563 13.5594L6.62155 15.3825L7.71748 15.6559L8.16716 13.8522C8.46655 13.9334 8.75716 14.0084 9.04153 14.079L8.5934 15.8743L9.6906 16.1477L10.1446 14.3281C12.0156 14.6821 13.4224 14.5393 14.0146 12.8472C14.4918 11.4847 13.9909 10.6987 13.0065 10.1862C13.7234 10.0209 14.2633 9.54937 14.4074 8.57532C14.6065 7.24471 13.5933 6.5294 12.208 6.05221L12.6574 4.24971L11.5602 3.97627L11.1227 5.73126C10.8343 5.65938 10.538 5.59157 10.2437 5.52437L10.6843 3.75781L9.58775 3.48438L9.13807 5.28623C8.89931 5.23186 8.66496 5.17808 8.43745 5.12154L8.43869 5.1159L6.92557 4.7381L6.63368 5.90996C6.63368 5.90996 7.44775 6.09653 7.43056 6.10808C7.87494 6.21902 7.95524 6.51307 7.94182 6.74622L6.71062 11.684ZM11.9006 12.0906C11.5615 13.4531 9.26747 12.7165 8.52372 12.5318L9.12622 10.1166C9.86995 10.3022 12.2549 10.6697 11.9006 12.0906ZM12.2399 8.55564C11.9306 9.79501 10.0212 9.16533 9.40183 9.01096L9.94808 6.82033C10.5674 6.97471 12.5621 7.26283 12.2399 8.55564Z" fill="white"/>
									</svg> */}
                    {/* <span>0.00</span> */}
                  </div>
                </div>
                <br></br>
                <hr></hr>

                <div className="card-wiget-info">
                  <br></br>
                  <h4 className="count-num">0.00 BXG</h4>
                  <p>Total Amount Claimed</p>
                  <div>
                    {/* <svg className="me-1" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M19.6997 12.4191C18.364 17.7763 12.9382 21.0365 7.58042 19.7006C2.22486 18.365 -1.03543 12.9388 0.300792 7.582C1.63577 2.22424 7.06166 -1.03636 12.4179 0.299241C17.7753 1.63487 21.0353 7.06169 19.6997 12.4191Z" fill="#F7931A"/>
										<path d="M6.71062 11.684C6.65625 11.8191 6.51844 12.0215 6.20781 11.9447C6.21877 11.9606 5.41033 11.7456 5.41033 11.7456L4.86566 13.0015L6.29343 13.3575C6.55906 13.424 6.81938 13.4937 7.07563 13.5594L6.62155 15.3825L7.71748 15.6559L8.16716 13.8522C8.46655 13.9334 8.75716 14.0084 9.04153 14.079L8.5934 15.8743L9.6906 16.1477L10.1446 14.3281C12.0156 14.6821 13.4224 14.5393 14.0146 12.8472C14.4918 11.4847 13.9909 10.6987 13.0065 10.1862C13.7234 10.0209 14.2633 9.54937 14.4074 8.57532C14.6065 7.24471 13.5933 6.5294 12.208 6.05221L12.6574 4.24971L11.5602 3.97627L11.1227 5.73126C10.8343 5.65938 10.538 5.59157 10.2437 5.52437L10.6843 3.75781L9.58775 3.48438L9.13807 5.28623C8.89931 5.23186 8.66496 5.17808 8.43745 5.12154L8.43869 5.1159L6.92557 4.7381L6.63368 5.90996C6.63368 5.90996 7.44775 6.09653 7.43056 6.10808C7.87494 6.21902 7.95524 6.51307 7.94182 6.74622L6.71062 11.684ZM11.9006 12.0906C11.5615 13.4531 9.26747 12.7165 8.52372 12.5318L9.12622 10.1166C9.86995 10.3022 12.2549 10.6697 11.9006 12.0906ZM12.2399 8.55564C11.9306 9.79501 10.0212 9.16533 9.40183 9.01096L9.94808 6.82033C10.5674 6.97471 12.5621 7.26283 12.2399 8.55564Z" fill="white"/>
									</svg> */}
                    {/* <span>0.00</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Stake;
