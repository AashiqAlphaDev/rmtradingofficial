/**
 * Created by aashiq on 17/08/18.
 */
import React from "react"
import Layout from "../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {Link} from "../../routes";
import {addListener, removeListener} from "./redux";
import {Router} from "../../routes"
import LoopContainer from "../../components/navigation-bar/index";
import {
    Typography,
    Avatar,
    Card,
    GridList,
    GridListTile,
    CardMedia,
    CardContent,
    Divider,
    CardActions, Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText
} from "@material-ui/core/index";
import {ShareIcon} from "../../components/icons";
import {collectionsDetail} from "../../api/api";
import {bookmarkCommands, bookmarkEvents} from "../../store/domain/bookmark";
import uuidv1 from "uuid/v1";


let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {

        let collectiondetails = await collectionsDetail(query.collection_id)
        return {collectionDetails:collectiondetails}

    }


    handleChange = (e) =>{
    }

    componentWillMount = () => {
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



    state = {};


    render() {
        const {classes} = this.props;
        return <LoopContainer>
            <Layout className={classes.body}>



                <Layout  alignItems={"center"}>

                    <Layout className={classes.paper} alignItems={"center"}>

                        <Layout className={classes.topCard} direction={"column"} alignItems={"center"}>
                            <Typography variant={"headline"} className={classes.titleSpacing}>
                                {this.props.collectionDetails.title}
                            </Typography>
                            <Typography variant={"body1"} className={classes.titleSpacing}>
                                {this.props.collectionDetails.description}
                            </Typography>
                            <Layout className={classes.titleSpacing}>
                                <Avatar
                                    alt="Adelle Charles"
                                    src={this.props.collectionDetails.image}
                                    className={classes.bigAvatar}
                                />
                            </Layout>
                            <Layout className={classes.titleSpacing} direction={"column"} alignItems={"center"}>
                                <Typography variant={"caption"} >
                                    Created by Loop
                                </Typography>
                                <Typography variant={"caption"} >
                                    Updated Dec 4th ,2018
                                </Typography>
                            </Layout>
                            <Layout className={classes.shareIconLayout} alignItem={"center"}>
                                <ShareIcon size={15}/>
                                <Layout alignItems={"center"}>
                                    <Typography variant={"caption"} className={classes.shareIconText}>
                                        Share
                                    </Typography>
                                </Layout>
                            </Layout>
                            <div className={classes.controls}>

                                <Button size="small" color="primary" onClick={()=>{
                                    let uid = uuidv1();
                                    this.setState({addBookmarkCallbackId:uid});
                                    this.props.dispatch({type: bookmarkCommands.ADD_BOOKMARK, payload: {callbackId:uid,data:{type:"collection",data:this.props.collectionDetails._id}}});
                                }}>
                                    Add To Library
                                </Button>
                                <Button size="small" color="primary" onClick={()=>{
                                    Router.pushRoute(`/content-page/${this.props.collectionDetails._id}/collection`)
                                }}>
                                    View in Player
                                </Button>
                            </div>
                        </Layout>
                    </Layout>
                </Layout>
                <Layout direction={"column"} className={classes.flex}>
                    {
                        this.props.collectionDetails.links.map((item) => {
                            return<Layout key={item} >
                                <div onClick={()=>{
                                    Router.pushRoute(`/content-page/${item._id}/link`)
                                }} >
                                    <Layout className={classes.cardDiv}>
                                        <Card className={classes.card}>

                                            <Layout>

                                                <Layout className={classes.flex}>
                                                <div className={classes.details}>
                                                    <CardContent className={classes.content}>
                                                        <Typography component="h5" variant="h5">
                                                            {item.title}
                                                        </Typography>
                                                        <Typography variant="subtitle1" color="textSecondary">
                                                            {item.description}
                                                        </Typography>
                                                    </CardContent>
                                                    <div className={classes.controls}>

                                                        <Button size="small" color="primary" onClick={(e)=>{


                                                        }}>
                                                            Share
                                                        </Button>
                                                        <Button size="small" color="primary">
                                                            View in Player
                                                        </Button>
                                                    </div>
                                                </div>
                                                </Layout>
                                                <CardMedia
                                                    className={classes.cover}
                                                    image={item.image}
                                                    title={item.title}
                                                />

                                            </Layout>

                                        </Card>

                                    </Layout>
                                </div>
                            </Layout>
                        })
                    }

                </Layout>

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


        </LoopContainer>
    }
};


const Index = withStyles((theme) => {
    return {
        body:{
            overflow:"scroll",
            padding:theme.spacing.unit*2,
            backgroundColor:"#F9F9FB",
            flex:1
        },
        flex:{
            flex:1
        },
        titleSpacing:{
            marginTop:theme.spacing.unit*2
        },
        topCard:{
            padding:theme.spacing.unit*2
        },
        bigAvatar: {
            width: 100,
            height: 100,
        },
        shareIconLayout:{
            backgroundColor:"#fff",
            marginTop:theme.spacing.unit*2,
            padding:theme.spacing.unit
        },
        shareIconText:{
            marginLeft:theme.spacing.unit,
            borderRadius:5
        },
        paper:{
            backgroundColor:"#fff",
            padding:theme.spacing.unit,
            margin:theme.spacing.unit,
            height:"100%"
        },
        card: {
            margin:theme.spacing.unit,
            width:"100%"
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
        cover: {
            width: 180,
        },

        cardDiv:{

            minWidth:1280,

        },
        informationLayout:{
            minHeight:218
        },
        linkInformationLayout:{
            minHeight:170
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        }
    }

})(connect(store => store)(_Index))
export default Index;