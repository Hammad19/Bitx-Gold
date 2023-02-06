export const MenuList = [

    //DashBoard
    {   
        title:'Dashboard',
        //classsChange: 'mm-collapse',
        iconStyle: <i className="material-icons">grid_view</i>,
        to: 'dashboard',
    },

    //BUY
    {   
        title:'Buy',
        //classsChange: 'mm-collapse',
        iconStyle: <i className="material-icons">currency_bitcoin</i>,
        to: 'buy',
    },


    //SELL
    {   
        title:'Sell',
        //classsChange: 'mm-collapse',
        iconStyle: <i className="material-icons">currency_bitcoin</i>,
        to: 'sell',
    },

    //STAKE
    {   
        title:'Stake',
        //classsChange: 'mm-collapse',
        iconStyle: <i className="material-icons">currency_bitcoin</i>,
        to: 'stake',
    },



    {
        title:'Affiliate Awards',
        //classsChange: 'mm-collapse',
        iconStyle: <i className="material-icons">grid_view</i>,
        content: [
            {
                title: 'Bonus Referral',
                iconStyle: <i className="material-icons">grid_view</i>,
                to: 'bonus-referral',
            },
            {
                title: 'Staking Referral',
                iconStyle: <i className="material-icons">grid_view</i>,
                to: 'staking-referral',
            },
        ]
    },

    //Settings
    {   
        title:'Settings',
        //classsChange: 'mm-collapse',
        iconStyle: <i className="bi bi-gear-wide"></i>,
        to: 'dashboard',
    },
 
    
]