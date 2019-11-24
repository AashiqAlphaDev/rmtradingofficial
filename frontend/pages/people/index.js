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
import _ from "underscore"
import LoopContainer from "../../components/top-bar/index";
import {
    Typography,
    TextField,
    Card,
    Button,
    CardMedia,
    CardContent,
    GridList,
    GridListTile,
    Divider,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText
} from "@material-ui/core/index";
import {ChevronDownIcon, NotificationIconPlain} from "../../components/icons";
import {topicsList, userList} from "../../api/api";



let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {


            let userlist = await userList();

        return {userList:userlist}
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
    }


    state = {selectedCategory:0,selectedTopics:[]};


    render() {
        const {classes} = this.props;
        return <Layout direction={"column"} alignItems={"center"} style={{flex:1}}>
        <Layout className={classes.pageContainer} direction={"row"}>



            <Layout className={classes.container} direction={"column"}>
                <Layout className={classes.title} alignItems={"center"}>
                <Typography variant={"title"} style={{flex:1}}>People</Typography>
                </Layout>
                <Layout>
                    <GridList cols={2} cellHeight={140}>
                        {
                            this.props.userList.docs.map((item) => {
                                return<GridListTile key={item} cols={2}>
                                    <div>
                                        <Card className={classes.card}>
                                            <Layout  style={{height:"100%",width:"100%"}} className={(this.state.selectedTopics.indexOf(item)==-1)?classes.topicUnSelected:classes.topicSelected}>
                                                <Layout className={classes.imageContainer} alignItems={"center"} justifyContent={"center"}>
                                                    <Layout className={(this.state.selectedTopics.indexOf(item)==-1)?classes.unselectedImageContainer:classes.selectedImageContainer}>
                                                    </Layout>
                                                </Layout>
                                                <Layout  direction={"column"} className={classes.cardTextContainer}>
                                                <Typography variant={"subheading"} className={(this.state.selectedTopics.indexOf(item) == -1)?classes.topicUnselectedText:classes.topicSelectedText}>
                                                    {item.email}
                                                </Typography>

                                                        <Layout className={classes.flex} alignItems={"flex-end"}>
                                                        <Button onClick={()=>{this.setState({showAddedState:true})}} color="primary" autoFocus>
                                                            + Follow
                                                        </Button>

                                                        </Layout>
                                                </Layout>
                                            </Layout>
                                        </Card>
                                    </div>
                                </GridListTile>
                            })
                        }
                    </GridList>

                </Layout>
            </Layout>
        </Layout>
            <Dialog
                open={this.state.showAddedState}
                onClose={() => {
                    this.setState({showAddedState: false})
                }}
            >
                <DialogTitle id="alert-dialog-title">{"Follow User"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are You sure you want to add this user as a friend ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{this.setState({showAddedState:false}); this.setState({showConfirmation:true})}} color="primary" autoFocus>
                        Confirm
                    </Button>
                    <Button onClick={()=>{this.setState({showAddedState:false})}} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={this.state.showConfirmation}
                onClose={() => {
                    this.setState({showConfirmation: false})
                }}
            >
                <DialogTitle id="alert-dialog-title">{"User Successfully Added"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Now You can View your Friends Activity
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
        container:{
            padding:theme.spacing.unit,
            backgroundColor:"#F9F9FB",
            flex:1,

        },
        counterLabel:{
            marginRight:theme.spacing.unit
        },
        title:{
            margin:theme.spacing.unit*2,
            height:30
        },
        pageContainer:{
            flex:1,
            width:980
        },
        cardTextContainer:{
          margin:theme.spacing.unit*2,
            marginLeft:0,

        },
        selectedItem:{
            padding:theme.spacing.unit,
            paddingLeft:theme.spacing.unit*2,
            backgroundColor:"#063554"
        },
        unselectedItem:{
            padding:theme.spacing.unit,
            paddingLeft:theme.spacing.unit*2,
        },
        selectedText:{
            marginLeft:theme.spacing.unit*2,
            color:"#fff"
        },
        unselectedText:{
            marginLeft:theme.spacing.unit*2,
        },
        sidebar:{
            maxWidth:240,
            backgroundColor:"#fff",
            flexDirection:"column",
            flex:1,
            paddingTop:theme.spacing.unit,
            overflow:"scroll",

        },
        card: {
            margin:theme.spacing.unit,
            flex:1,
            height:130,
            width:"100%"
        },
        imageContainer:{
            backgroundImage:"url('https://www.avert.org/sites/default/files/styles/article_scale_style_780/public/PLHIV%20Young%20person%20female_0.jpg?itok=5LjeRm4q&timestamp=1529415642')",
            backgroundPosition: "center",
            height:100,
            width:120,
            margin:theme.spacing.unit*2,
            backgroundSize: "120px 100px",
            backgroundRepeat: "no-repeat"
        },

        selectedImageContainer:{
            backgroundImage:"url('https://cdn1.iconfinder.com/data/icons/interface-elements/32/accept-circle-512.png')",
            backgroundPosition: "center",
            height:50,
            width:50,
            backgroundSize: "50px 50px",
            backgroundRepeat: "no-repeat"
        },
        unselectedImageContainer:{
            height:50,
            width:50
        },


        topicSelected:{
            backgroundColor:"#dadada"
        },
        topicUnselected:{

        },
        topicSelectedText:{
            color:"#fff"
        },
        topicUnselectedText:{

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
        pageTitle:{
            paddingLeft:theme.spacing.unit
        },
        cardTitle:{
            padding:theme.spacing.unit,
            textAlign:"center",
            color:"#fff"
        },
        labelContainer:{
            height:"100%",
            justifyContent:"center",
            alignItems:"flex-end",
            flex:1,

        },
        titleContainer:{
            background: "rgba(0, 0, 0, 0.6  )",
            height:60          ,
            flex:1,
            padding:theme.spacing.unit,


        },
                            flex:{flex:1}

    }

})(connect(store => store)(_Index))
export default Index;