import React from "react"
import Layout from "../layout";
import {withStyles} from "@material-ui/core/styles";
import {TextField, AppBar,Toolbar} from "@material-ui/core/index";
import {
    ChatIconPlain,
    GroupIconPlain, HomeIconPlain, LibraryIconPlain, NotificationIconPlain,

} from "../icons";
import Link from "next/link"
import {Typography} from "@material-ui/core/index";
import {withRouter} from 'next/router'
import {connect} from "react-redux"
import {addListener} from "../../pages/library/redux";


const pages = [
    {
        Icon: () => {
            return <HomeIconPlain size={30}/>
        },
        url: "/Rmtrading/home",
        label:"Home"
    },
    {
        Icon: () => {
            return <GroupIconPlain size={30}/>;
        },
        url: "/Rmtrading/categories",
        label:"Categories"

    },
    {
        Icon: () => {
            return <ChatIconPlain size={30}/>;
        },
        url: "/Rmtrading/contactus",
        label:"Contact Us"

    },


];




let AppToolbar = ({path, classes, dispatch})=>{
    return <AppBar position="static" color="secondary">
        <Toolbar>
            <Layout className={classes.leftSectionToolBar} alignItems={"center"}>
                <Typography variant="title" color="inherit" className={classes.logo}>
                    RmTrading
                </Typography>

            </Layout>
            <Layout>
                {
                    pages.map((page)=>{
                        let isActive = path == page.url;
                        return <Link href={page.url} key={page.url}>
                            <div onClick={()=>{isActive=page.url}}>
                                <Layout direction={"column"} alignItems={"center"} className={classes.tabs}>
                                    <page.Icon/>
                                    <Typography variant="body1" className={(isActive==page.url)? classes.activeToolBarText:classes.toolBarText}>
                                        {page.label}
                                    </Typography>
                                </Layout>
                            </div>
                        </Link>
                    })
                }
            </Layout>

        </Toolbar>
    </AppBar>
}




let _LoopContainer = (props) => {


    const {children, classes, router, dispatch} = props;

    return <Layout className={classes.body}>
        <Layout flex={1} direction={"column"}>
            <AppToolbar dispatch={dispatch} classes={classes} path={router.pathname} />
            {children}
        </Layout>
    </Layout>
}

let     RmContainer = withStyles((theme)=>{
    return {
        body:{

            width:"100%"
        },
        sidebar:{
            minWidth:300,
            background:theme.palette.primary.dark,

        },
        sideBarItemTitle:{
            color:"#FFF"
        },
        sideBarActiveItemTitle:{
            color:theme.palette.primary.dark
        },
        sideBarItem:{
            opacity:0.5,
        },
        sideBarActiveItem:{
            background:"#6ead3a"
        },
        navTitle:{
            flex:1
        },
        logo:{
            marginRight:theme.spacing.unit*3,
            color:"#6ead3a"
        },
        leftSectionToolBar:{
            flex:1
        },
        tabs:{
            padding:theme.spacing.unit,
            marginRight:theme.spacing.unit *3
        },
        loginLayout:{
            marginLeft:theme.spacing.unit *5

        },
        toolBarText:{
            color:"#6ead3a"
        },
        activeToolBarText:{
            color:"accent"
        }
    }
})(withRouter(connect(store=>store)(_LoopContainer)));

export default RmContainer;
