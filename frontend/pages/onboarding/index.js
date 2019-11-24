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
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails
} from "@material-ui/core/index";
import {ChevronDownIcon, NotificationIconPlain} from "../../components/icons";
import {categoriesInfoList} from "../../api/api";




let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {
        let categorieslist = await categoriesInfoList();
        console.log("hi",categorieslist)
        return {categoriesList:categorieslist}
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
            <Layout>
                <Layout className={classes.sidebar} direction={"column"}>
                    <div onClick={()=>{
                        this.setState({selectedCategory:0})
                    }}>
                    <Layout className={(this.state.selectedCategory==0)?classes.selectedItem:classes.unselectedItem}>

                    <Typography variant={"subheading"} className={(this.state.selectedCategory==0)?classes.selectedText:classes.unselectedText}>
                        Featured Topics
                    </Typography>

                    </Layout>
                    </div>
                    {
                        this.props.categoriesList.docs.map((item)=>{
                            return <div onClick={()=>{
                                this.setState({selectedCategory:item})
                            }}>
                            <Layout className={(this.state.selectedCategory==item)?classes.selectedItem:classes.unselectedItem}>
                                    <Typography variant={"subheading"} className={(this.state.selectedCategory==item)?classes.selectedText:classes.unselectedText}>{item.title}</Typography>
                            </Layout>
                            </div>
                        })


                    }
                </Layout>
            </Layout>


            <Layout className={classes.container} direction={"column"}>
                <Layout className={classes.title} alignItems={"center"}>
                <Typography variant={"title"} style={{flex:1}}>Choose  atleast 5 Topics</Typography>
                    <Typography className={classes.counterLabel}>
                        No Of Selected Topics:{this.state.selectedTopics.length}
                    </Typography>
                    {
                        this.state.selectedTopics.length > 4 &&
                        <Layout>
                            <Button variant={"raised"} color={"primary"}>Proceed</Button>
                        </Layout>
                    }
                    {
                        !(this.state.selectedTopics.length > 4) &&
                        <Layout>
                            <Button variant={"raised"} color={"primary"} disabled>Proceed</Button>
                        </Layout>
                    }
                </Layout>
                <TextField placeholder={"Search"}/>

                <Layout>
                    <GridList cols={2} cellHeight={140}>
                        {
                            !_.isObject(this.props.selectedCategory)&&
                            this.props.categoriesList.docs[0].topics.map((item) => {
                                return<GridListTile key={item} cols={1}>
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
                                        console.log("this is selected category",this.state.selectedCategory);
                                    }
                                    }>
                                        <Card className={classes.card}>
                                            <Layout  style={{height:"100%",width:"100%"}} className={(this.state.selectedTopics.indexOf(item)==-1)?classes.topicUnSelected:classes.topicSelected}>
                                                <Layout className={classes.imageContainer} alignItems={"center"} justifyContent={"center"}>
                                                    <Layout className={(this.state.selectedTopics.indexOf(item)==-1)?classes.unselectedImageContainer:classes.selectedImageContainer}>
                                                    </Layout>
                                                </Layout>
                                                <Layout className={classes.cardTextContainer}>
                                                <Typography variant={"subheading"} className={(this.state.selectedTopics.indexOf(item) == -1)?classes.topicUnselectedText:classes.topicSelectedText}>
                                                    {item.title}
                                                </Typography>
                                                </Layout>
                                            </Layout>
                                        </Card>
                                    </div>
                                </GridListTile>
                            })
                        }
                        {
                            _.isObject(this.props.selectedCategory) &&
                            this.state.selectedCategory.topics.map((item) => {
                                return<GridListTile key={item} cols={1}>
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
                                                <Layout className={classes.cardTextContainer}>
                                                    <Typography variant={"subheading"} className={(this.state.selectedTopics.indexOf(item) == -1)?classes.topicUnselectedText:classes.topicSelectedText}>
                                                        {item.title}
                                                    </Typography>
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
            marginLeft:0
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
            width:350
        },
        imageContainer:{
            backgroundImage:"url('http://yourdost-blog-images.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2016/04/05124930/Start-a-startup-compressor-1024x717.jpg')",
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

    }

})(connect(store => store)(_Index))
export default Index;