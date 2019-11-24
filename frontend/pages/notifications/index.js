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
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, DialogActions
} from "@material-ui/core/index";
import {ChevronDownIcon, NotificationIconPlain} from "../../components/icons";



let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {
    }


    handleChange = (e) =>{
    }

    componentWillMount = () => {
        console.log(this.props.categoriesList);
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
                <Layout className={classes.sidebar} direction={"column"}>

                    {
                        [{name:"Groups"},{name:"People"},{name:"Mark all read"}].map((item)=>{
                            return <div onClick={()=>{
                                this.setState({selectedCategory:item})
                            }}>
                            <Layout className={(this.state.selectedCategory==item)?classes.selectedItem:classes.unselectedItem}>
                                    <Typography variant={"subheading"} className={(this.state.selectedCategory==item)?classes.selectedText:classes.unselectedText}>{item.name}</Typography>
                            </Layout>
                            </div>
                        })
                    }
                </Layout>


            <Layout className={classes.container} direction={"column"}>
                <Layout className={classes.title} alignItems={"center"}>
                <Typography variant={"title"} style={{flex:1}}>Notifications</Typography>
                </Layout>
                <Layout>
                    <GridList cols={2} cellHeight={140}>
                        {
                            [1].map((item) => {
                                return<GridListTile key={item} cols={2}>
                                    <div onClick={(e)=>{
                                        console.log("start",this.state.selectedTopics)
                                        let topics = this.state.selectedTopics;
                                        if(topics.indexOf(item)==-1){
                                            topics.push(item)
                                        }
                                        else{
                                            console.log("inside else",topics);
                                           topics = _.reject(topics,function(items){
                                               return item==items
                                           });
                                           console.log("topics inside else",topics)
                                        }
                                        console.log("topics 1",topics)
                                        this.setState({selectedTopics:topics})
                                        console.log("topics 2",this.state.selectedTopics);
                                    }
                                    }>
                                        <Card className={classes.card}>
                                            <Layout  style={{height:"100%",width:"100%"}} className={(this.state.selectedTopics.indexOf(item)==-1)?classes.topicUnSelected:classes.topicSelected}>
                                                <Layout className={classes.imageContainer} alignItems={"center"} justifyContent={"center"}>
                                                    <Layout className={(this.state.selectedTopics.indexOf(item)==-1)?classes.unselectedImageContainer:classes.selectedImageContainer}>
                                                    </Layout>
                                                </Layout>
                                                <Layout  direction={"column"} className={classes.cardTextContainer}>
                                                <Typography variant={"subheading"} className={(this.state.selectedTopics.indexOf(item) == -1)?classes.topicUnselectedText:classes.topicSelectedText}>
                                                    SlaYeR Shared This post with you
                                                </Typography>

                                                        <Layout className={classes.flex} alignItems={"flex-end"}>
                                                        <Button onClick={()=>{this.setState({showAddedState:false})}} color="primary" autoFocus>
                                                            View
                                                        </Button>
                                                    <Button onClick={()=>{this.setState({showAddedState:false})}} color="primary" autoFocus>
                                                        Bookmark
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
            width:725
        },
        imageContainer:{
            backgroundImage:"url('//images.backstreetmerch.com/storeimages/slayer/logo.png')",
            backgroundPosition: "center",
            height:100,
            width:120,
            margin:theme.spacing.unit*2,
            backgroundSize: "120px 100px",
            backgroundRepeat: "no-repeat",

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