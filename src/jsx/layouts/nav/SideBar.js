/// Menu
import React, { Component, useContext, useEffect, useReducer, useState } from "react";
//import Metismenu from "metismenujs";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';

/// Link
import { Link, NavLink } from "react-router-dom";

import {MenuList} from './Menu';
import {useScrollPosition} from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import { AdminMenuList } from "./AdminMenu";
import { useSelector } from "react-redux";

//import medal from "../../../images/medal.png";


// class MM extends Component {
// 	componentDidMount() {
// 		this.$el = this.el;
// 		this.mm = new Metismenu(this.$el);
// 	}
//   componentWillUnmount() {
//   }
//   render() {
//     return (
//       <div className="mm-wrapper">
//         <ul className="metismenu " ref={(el) => (this.el = el)}>
//           {this.props.children}
//         </ul>
//       </div>
//     );
//   }
// }

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active : "",
  activeSubmenu : "",
}

const SideBar = () => {
	const {
		iconHover,
		sidebarposition,
		headerposition,
		sidebarLayout,
	} = useContext(ThemeContext);

  const state = useSelector(state => state);

  const [statex, setStatex] = useReducer(reducer, initialState);	

  // let handleheartBlast = document.querySelector('.heart');
  // function heartBlast(){
  //   return handleheartBlast.classList.toggle("heart-blast");
  // }

	useEffect(() => {
				
			
	}, []);
 //For scroll
 	const [hideOnScroll, setHideOnScroll] = useState(true)
	useScrollPosition(
		({ prevPos, currPos }) => {
		  const isShow = currPos.y > prevPos.y
		  if (isShow !== hideOnScroll) setHideOnScroll(isShow)
		},
		[hideOnScroll]
	)

	// Menu dropdown list 
	//const [active , setActive] = useState('');
	//const [activeSubmenu , setActiveSubmenu] = useState('');

 
  const handleMenuActive = status => {
		
    setStatex({active : status});
		
		if(statex.active === status){
			
      setStatex({active : ""});
    }
   
	}
	const handleSubmenuActive = (status) => {
		
    setStatex({activeSubmenu : status})
		if(statex.activeSubmenu === status){
      setStatex({activeSubmenu : ""})
			
		}
    
	}
	// Menu dropdown list End

  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  // let deshBoard = [
  //     "",
  //     "dashboard-dark",
  //     "food-order",
  //     "favorite-menu",
  //     "message",
  //     "order-history",
  //     "notification",
  //     "bill",
  //     "setting",
  //     "task",
  //   ],
	// restro=[
	// 	"restaurant",
	// 	"menu",
	// 	"orders",
	// 	"customer-reviews",
	// 	"restro-setting",
	// ],
	// drivers=[
	// 	"deliver-main",
	// 	"deliver-order",
	// 	"feedback",
	// ],
  //   app = [
  //     "app-profile",
  //     "post-details",
  //     "app-calender",
  //     "email-compose",
  //     "email-inbox",
  //     "email-read",
  //     "ecom-product-grid",
  //     "ecom-product-list",
  //     "ecom-product-order",
  //     "ecom-checkout",
  //     "ecom-invoice",
  //     "ecom-customers",
  //     "post-details",
  //     "ecom-product-detail",
  //   ],
  //   email = ["email-compose", "email-inbox", "email-read"],
  //   shop = [
  //     "ecom-product-grid",
  //     "ecom-product-list",
  //     "ecom-product-list",
  //     "ecom-product-order",
  //     "ecom-checkout",
  //     "ecom-invoice",
  //     "ecom-customers",
  //     "ecom-product-detail",
  //   ],
  //   charts = [
  //     "chart-rechart",
  //     "chart-flot",
  //     "chart-chartjs",
  //     //"chart-chartist",
  //     "chart-sparkline",
  //     "chart-apexchart",
  //   ],
  //   bootstrap = [
  //     "ui-accordion",
  //     "ui-badge",
  //     "ui-alert",
  //     "ui-button",
  //     "ui-modal",
  //     "ui-button-group",
  //     "ui-list-group",
  //     "ui-card",
  //     "ui-carousel",
  //     "ui-dropdown",
  //     "ui-popover",
  //     "ui-progressbar",
  //     "ui-tab",
  //     "ui-typography",
  //     "ui-pagination",
  //     "ui-grid",
  //   ],
  //   plugins = [
  //     "uc-select2",
  //     "uc-nestable",
  //     "uc-sweetalert",
  //     "uc-toastr",
  //     "uc-noui-slider",
  //     "map-jqvmap",
  //     "uc-lightgallery",
  //   ],
	// redux = [
  //      "redux-form",
	//    "redux-wizard",    
  //      "todo",
  //   ],
  //   widget = ["widget-basic"],
  //   forms = [
  //     "form-element",
  //     "form-wizard",
  //     "form-ckeditor",
  //     "form-pickers",
  //     "form-validation-jquery",
  //   ],
  //   table = ["table-bootstrap-basic", "table-datatable-basic"],
  //   pages = [
  //     "page-register",
  //     "page-login",
  //     "page-lock-screen",
  //     "page-error-400",
  //     "page-error-403",
  //     "page-error-404",
  //     "page-error-500",
  //     "page-error-503",
  //   ],
  //   error = [
  //     "page-error-400",
  //     "page-error-403",
  //     "page-error-404",
  //     "page-error-500",
  //     "page-error-503",
  //   ];

	
  return (
    <div
      className={`deznav  border-right ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
    
      <PerfectScrollbar className="deznav-scroll">         
          <ul className="metismenu" id="menu">
              {state.auth.auth.isAdmin === true ? (
                AdminMenuList.map((data, index)=>{
                  let menuClass = data.classsChange;
                    if(menuClass === "menu-title"){
                      return(
                          <li className={menuClass}  key={index} >{data.title}</li>
                      )
                    }else{
                      return(				
                        <li className={` ${ statex.active === data.title ? 'mm-active' : ''}`}
                          key={index} 
                        >
                          
                          {data.content && data.content.length > 0 ?
                              <Link to={"#"} 
                                className="has-arrow"
                                onClick={() => {handleMenuActive(data.title)}}
                              >								
                                  {data.iconStyle}
                                  <span className="nav-text">{data.title}</span>
                              </Link>
                          :
                            <NavLink  to={data.to} >
                                {data.iconStyle}
                                <span className="nav-text">{data.title}</span>
                            </NavLink>
                          }
                          <Collapse in={statex.active === data.title ? true :false}>
                            <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                              {data.content && data.content.map((data,index) => {									
                                return(	
                                    <li key={index}
                                      className={`${ statex.activeSubmenu === data.title ? "mm-active" : ""}`}                                    
                                    >
                                      {data.content && data.content.length > 0 ?
                                          <>
                                            <NavLink to={data.to} className={data.hasMenu ? 'has-arrow' : ''}
                                              onClick={() => { handleSubmenuActive(data.title)}}
                                            >
                                              {data.title}
                                            </NavLink>
                                            <Collapse in={statex.activeSubmenu === data.title ? true :false}>
                                                <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                                  {data.content && data.content.map((data,index) => {
                                                    return(	
                                                      <>
                                                        <li key={index}>
                                                          <Link className={`${path === data.to ? "mm-active" : ""}`} to={data.to}>{data.title}</Link>
                                                        </li>
                                                      </>
                                                    )
                                                  })}
                                                </ul>
                                            </Collapse>
                                          </>
                                        :
                                        <Link to={data.to}>
                                          {data.title}
                                        </Link>
                                      }
                                      
                                    </li>
                                  
                                )
                              })}
                            </ul>
                          </Collapse>
                        </li>	
                      )
                  }
                })
              ) : (
                MenuList.map((data, index)=>{
                  let menuClass = data.classsChange;
                    if(menuClass === "menu-title"){
                      return(
                          <li className={menuClass}  key={index} >{data.title}</li>
                      )
                    }else{
                      return(				
                        <li className={` ${ statex.active === data.title ? 'mm-active' : ''}`}
                          key={index} 
                        >
                          
                          {data.content && data.content.length > 0 ?
                              <Link to={"#"} 
                                className="has-arrow"
                                onClick={() => {handleMenuActive(data.title)}}
                              >								
                                  {data.iconStyle}
                                  <span className="nav-text">{data.title}</span>
                              </Link>
                          :
                            <NavLink  to={data.to} >
                                {data.iconStyle}
                                <span className="nav-text">{data.title}</span>
                            </NavLink>
                          }
                          <Collapse in={statex.active === data.title ? true :false}>
                            <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                              {data.content && data.content.map((data,index) => {									
                                return(	
                                    <li key={index}
                                      className={`${ statex.activeSubmenu === data.title ? "mm-active" : ""}`}                                    
                                    >
                                      {data.content && data.content.length > 0 ?
                                          <>
                                            <NavLink to={data.to} className={data.hasMenu ? 'has-arrow' : ''}
                                              onClick={() => { handleSubmenuActive(data.title)}}
                                            >
                                              {data.title}
                                            </NavLink>
                                            <Collapse in={statex.activeSubmenu === data.title ? true :false}>
                                                <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                                  {data.content && data.content.map((data,index) => {
                                                    return(	
                                                      <>
                                                        <li key={index}>
                                                          <Link className={`${path === data.to ? "mm-active" : ""}`} to={data.to}>{data.title}</Link>
                                                        </li>
                                                      </>
                                                    )
                                                  })}
                                                </ul>
                                            </Collapse>
                                          </>
                                        :
                                        <Link to={data.to}>
                                          {data.title}
                                        </Link>
                                      }
                                      
                                    </li>
                                  
                                )
                              })}
                            </ul>
                          </Collapse>
                        </li>	
                      )
                  }
                })
              )

          
              
       
              
              }          
          </ul>		  
        </PerfectScrollbar>
      </div>
    );
};

export default SideBar;
