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
import {Divider,ExpansionPanel, ExpansionPanelSummary,ExpansionPanelDetails} from "@material-ui/core/index";


const pages = [
	{
		Icon: () => {
			return <HomeIconPlain size={30}/>
		},
		url: "/home",
		label:"Home"
	},
    {
        Icon: () => {
            return <LibraryIconPlain size={30}/>;
        },
        url: "/library",
        label:"Library"
    },
	{
		Icon: () => {
			return <GroupIconPlain size={30}/>;
		},
		url: "/groups",
		label:"Groups"

	},
	{
		Icon: () => {
			return <ChatIconPlain size={30}/>;
		},
		url: "/chats",
		label:"Chats"

	},
    {
        Icon: () => {
            return <NotificationIconPlain size={30}/>;
        },
        url: "/notifications",
		label:"Notifications"

    },
	{
        Icon: () => {
            return <NotificationIconPlain size={30}/>
        },
        url: "/login",
		label:"Login"

    },

];




let AppToolbar = ({path, classes, dispatch})=>{
	return <Layout className={classes.sidebar} direction={"column"}>
        {
            [{title:"ayaz",description:"Ayaz",image:"https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500%201x",topics:[{title:"aashiq",description:"aashiq",image:"https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500%201x"}]},{title:"ayaz",description:"Ayaz",image:"https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500%201x",topics:[{title:"aashiq",description:"aashiq",image:"https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500%201x"}]},{title:"ayaz",description:"Ayaz",image:"https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500%201x",topics:[{title:"aashiq",description:"aashiq",image:"https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500%201x"}]}].map((item,index)=>{
                return <div onClick={()=>{



                }}>
                    <Divider/>
                    <ExpansionPanel >
                        <ExpansionPanelSummary>
                            {/*<ExpansionPanelSummary expandIcon={<ChevronDownIcon />}>*/}
                            <Typography className={classes.heading}>{item.title}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>

                            <Layout direction={"column"} >
                                <Divider/>
                                {
                                    item.topics.length==0 &&
                                    <Layout className={classes.subCategory}>
                                        <Typography>
                                            No Topics In this Category Yet
                                        </Typography>
                                    </Layout>


                                }
                                {
                                    item.topics.map((item)=>{
                                        return <div onClick={()=>{
                                            let uid = uuidv1();
                                            this.setState({fetchTopicCallbackId:uid});
                                            this.props.dispatch({type: topicCommands.FETCH_TOPIC, payload: {callbackId:uid,topic_id:item._id}});
                                        }}>
                                            <Layout className={classes.subCategory}>
                                                <Typography>
													{item.title}
                                                </Typography>
                                            </Layout>
                                        </div>
                                    })
                                }
                                <Divider/>
                            </Layout>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <Divider/>

                </div>

            })

        }
    </Layout>
}

let _LoopContainer = (props) => {
	const {children, classes, router, dispatch} = props;
	return<Layout className={classes.subTitleStyling} alignItems={"center"} >
            <Typography variant={"subheading"} className={classes.menuItem}>
                Topics
            </Typography>
        <AppToolbar dispatch={dispatch} classes={classes} path={router.pathname} />
        {children}
        </Layout>




}

let SideBar = withStyles((theme)=>{
	return {
		body:{
			height:"100%"
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
			background:"#FFF"
		},
		navTitle:{
			flex:1
		},
        logo:{
            marginRight:theme.spacing.unit*3
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
            color:"#ffffff"
        },
        activeToolBarText:{
            color:"#1597e5"
		}
	}
})(withRouter(connect(store=>store)(_LoopContainer)));

export default SideBar;
