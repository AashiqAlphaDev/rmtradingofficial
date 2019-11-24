/**
 * Created by aashiq on 17/08/18.
 */
import React from "react"
import Layout from "../../components/layout";
import InputContainer from "../../components/input";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {Link} from "../../routes";
import {addListener, removeListener} from "./redux";
import {Router} from "../../routes"
import LoopContainer from "../../components/top-bar/index";
import {linksDetail, collectionsDetail} from "../../api/api";
import {
    Button,
    ListItem,
    List,
    Avatar,
    ListItemText,
    Chip,
    ListItemSecondaryAction,
    Snackbar,
    MySnackbarContentWrapper,
    Typography,
    Divider,
    TextField,
    Tabs,
    Tab,
    AppBar,
    Toolbar,
    DialogTitle,
    DialogContent,
    DialogContentText, DialogActions, Dialog
} from "@material-ui/core/index";
import {topicCommands, topicEvents} from "../../store/domain/topics";
import {bookmarkCommands, bookmarkEvents} from "../../store/domain/bookmark";
import uuidv1 from "uuid/v1";









let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {

        if(query.link_id){
            let linkdetails = await linksDetail(query.link_id)
            let playlist =[]
            playlist.push(linkdetails)
            return {playList:playlist}
        }

        if(query.collection_id){
           let collectiondetails = await collectionsDetail(query.collection_id)
            return {playList:collectiondetails.links,collectionID:collectiondetails._id}


        }


    }

	handleChange = (event, value) => {
		this.setState({ value });
	};
    handleClose=(event,value) =>{

    };




    componentWillMount = () => {
        console.log(this.props.playList);
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {

        if (type ===  bookmarkEvents.ADD_BOOKMARK_SUCCEEDED && payload.callbackId === this.state.addBookmarkCallbackId) {


            this.setState({showAddedState:true})
        }
    }


    state = {currentPlayingItem:this.props.playList[0],value:0,currentPlayingIndex:0,showAddedState:false};


    render() {
        const {classes} = this.props;
        return <Layout direction={"column"} style={{flex:1}}>
            <Layout className={classes.container}  direction={"column"}>
                <Layout className={classes.flex}>
                <iframe name="Framename" src={this.state.currentPlayingItem.url} sandbox className={classes.frameArea}>

                </iframe>
                <Layout direction={"column"} className={classes.paper}>
                    <Layout direction={"column"} className={classes.flex}>
                        <Layout direction={"column"}>
	                        <Tabs
		                        value={this.state.value}
		                        onChange={this.handleChange}
		                        indicatorColor="primary"
		                        textColor="primary"
	                        >
		                        <Tab label="Content List" />
		                        <Tab label="Discussion" />
		                        <Tab label="Notes" />
	                        </Tabs>
                            <Layout className={classes.searchBox}>
	                        <TextField placeholder={"Search"} fullWidth/>
                            </Layout>
                            {
                                this.state.value==0 &&
                                    <Layout className={classes.listContainer} direction={"column"}>
                                <List>
	                                {this.props.playList.map((item,index) => {
		                               return <Layout className={classes.flex}>
                                                <ListItem key={item._id} dense button className={classes.listItem} onClick={()=>{this.setState({currentPlayingItem:item} ); this.setState({currentPlayingIndex: index})}}>
				                                <Avatar alt="Remy Sharp" src={item.image} />
				                                <ListItemText primary={item.title} secondary={item.description}/>
			                                </ListItem>
			                                <Divider component="li"/>
		                                </Layout>
                                    })}
                                </List>
                                    </Layout>
                            }
                            {
                                this.state.value==1 &&
                            <Typography variant={"title"}>
	                            Discussion
                            </Typography>
                            }

                            {
                                this.state.value==2 &&
                                    <Layout direction={"column"}>
                                        <Layout className={classes.notes}>
                                <InputContainer label={"New Note"}>
                                <TextField style={{height:150}} placeholder={"New Note....."}/>
                                </InputContainer>
                                        </Layout>
                                        <Layout>
                                            <Button>Submit</Button>
                                        </Layout>
	                                    <Layout className={classes.listContainer} direction={"column"}>
                                        {[25].map(value => (
	                                        <Layout className={classes.notesContainer}>
		                                        <Typography variant={"body1"} className={classes.flex}>
			                                        This Video is amazing
		                                        </Typography>
		                                        <Typography variant={"caption"}>
			                                        12/01/2018
		                                        </Typography>
	                                        </Layout>

                                        ))}
                                            <Layout className={classes.notesContainer}>
                                                <Typography variant={"body1"} className={classes.flex}>
                                                    new note
                                                </Typography>
                                                <Typography variant={"caption"}>
                                                    26/03/2019
                                                </Typography>
                                            </Layout>
                                        </Layout>

                                    </Layout>
                            }


                        </Layout>
                    </Layout>
                </Layout>
                </Layout>

            </Layout>
	        <AppBar position="static" color="default">
		        <Toolbar>
                    <Layout justifyContent={"center"} className={classes.flex}>
                        <Layout style={{width:800}}>
                            <Layout direction={"column"} className={classes.toolbarMargin}>
                                <Typography variant={"title"}>
                                    {this.state.currentPlayingItem.title}
                                </Typography>
                                <Typography variant={"caption"}>
                                    {this.state.currentPlayingItem.url}
                                </Typography>
                            </Layout>
                            <Layout>
                                <Chip label="Design For Mobile and Web" className={classes.chip} />
                            </Layout>
                        </Layout>
                        {this.props.playList.length!=1 &&
                            <Layout alignItems={"center"} justifyContent={"flex-end"} className={classes.flex}>

                                <div className={classes.controls}>

                                    <Button size="small" color="primary" onClick={() => {
                                        if (this.state.currentPlayingIndex != 0) {
                                            this.setState({currentPlayingIndex: this.state.currentPlayingIndex - 1})
                                            this.setState({currentPlayingItem: this.props.playList[this.state.currentPlayingIndex]})
                                        }
                                    }}>
                                        Previous
                                    </Button>
                                    <Button size="small" color="primary"  onClick={() => {
                                        if (this.state.currentPlayingIndex < this.props.playList

                                            .length - 1) {
                                            this.setState({currentPlayingIndex: this.state.currentPlayingIndex + 1})
                                            this.setState({currentPlayingItem: this.props.playList[this.state.currentPlayingIndex]})
                                        }
                                    }}

                              >
                                        Next
                                    </Button>
                                </div>
                            </Layout>
                        }
                        {
                            this.props.playList.length==1 &&
                        <Layout className={classes.flex} direction={"column"}>
                        </Layout>
                        }
                        <Layout>
                            {this.props.playList.length!=1 &&
                            <Layout className={classes.toolbarMargin}>
                                <Button variant="outlined" className={classes.button} onClick={()=>{
                                    let uid = uuidv1();
                                    this.setState({addBookmarkCallbackId:uid});
                                    
                                    this.props.dispatch({type: bookmarkCommands.ADD_BOOKMARK, payload: {callbackId:uid,data:{type:"collection",data:this.props.collectionID}}});
                                }}>
                                    Add Collection To Library
                                </Button>
                            </Layout>}

                            <Layout className={classes.toolbarMargin}>
	                        <Button variant="contained" color="primary" className={classes.button} onClick={()=>{
                                let uid = uuidv1();
                                this.setState({addBookmarkCallbackId:uid});

                                this.props.dispatch({type: bookmarkCommands.ADD_BOOKMARK, payload: {callbackId:uid,data:{type:"link",data:this.state.currentPlayingItem._id}}});
                            }}>
		                        Add To Link To Library
	                        </Button>
                            </Layout>
                            <Layout>
	                        <Button variant="contained" color="secondary" className={classes.button} onClick={()=>{Router.pushRoute("/library")}}>
		                        Exit Learn Mode
	                        </Button>
                            </Layout>

                        </Layout>
                    </Layout>

                </Toolbar>

            </AppBar>
            <Dialog
                open={this.state.showAddedState}
                onClose={() => {
                    this.setState({showAddedState: false})
                }}
            >
                <DialogTitle id="alert-dialog-title">{"Your Library is Updated"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bookmark Successfully Updated
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{this.setState({showAddedState:false})}} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </Layout>
    }
};


const Index = withStyles((theme) => {
    return {
        notes:{
            height:200,
            width:"100%"
        },
        toolbarMargin:{
          marginRight:theme.spacing.unit*2
        },
	    chip: {
		    margin: theme.spacing.unit *0.5,
            fontSize:10
	    },
	    searchBox:{flex:1,
            padding:theme.spacing.unit*2
        },

        notesContainer:{
            padding:theme.spacing.unit*2
        },
        listContainer:{
         height:800,
            overflow:"scroll"
        },
        paper:{
          backgroundColor:"#fff",
            flex:1
        },
        frameArea :{
        display: "block",
        width: "100%",
        height: "100%",
        overflow: "auto",
        border: "#999999 1px solid",
        margin: "0px",
        padding: "0px"
        },
    body:{
            margin:theme.spacing.unit*2
        },
        container:{
            backgroundColor:"#F9F9FB",
            flex:1,
        },
        sidebar:{
            maxWidth:240,
            backgroundColor:"#fff",
            flexDirection:"column",
            flex:1,
            paddingTop:theme.spacing.unit
        },
        flex:{
            flex:1
        },
        menuItem:{
            height:40,
            paddingLeft:theme.spacing.unit*3,
            paddingRight:theme.spacing.unit*3
        },
        menuText:{
            paddingLeft:theme.spacing.unit*3,
            textOverflow: "ellipsis",
            overflow: "hidden",
            width:160,
            height: "1.4em",
            whiteSpace: "nowrap"
        },
        rightSection:{
            padding:theme.spacing.unit,
            flex:1
        },
        pageTitle:{
            paddingBottom:theme.spacing.unit
        },
        list:{
            overflow:"scroll",
            flex:1
        },
        card: {
            margin:theme.spacing.unit
        },
        media: {
            height:0,
            paddingTop: '56.25%',
        },
        urlLayout:{
            padding:theme.spacing.unit
        },
        urlText:{
            textOverflow: "ellipsis",
            overflow: "hidden",
            width:241,
            height: "1.4em",
            whiteSpace: "nowrap",
            color:"#bfbfbf"
        },
        navigationButton:{
            marginRight:theme.spacing.unit*2
        }

    }

})(connect(store => store)(_Index))
export default Index;