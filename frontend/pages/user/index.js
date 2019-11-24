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
    Typography, Avatar, Card, GridList, GridListTile, CardMedia, CardContent, Divider, Paper,
    Tabs,
    Tab, Button, CardActions
} from "@material-ui/core/index";
import {PlusIcon, ShareIcon} from "../../components/icons";
import {userInfo, userCollectionList, userLinkList, userLibraryList} from "../../api/api";


let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {
        let userinfo = await userInfo("5bc720c69a4df300125221c2");
        let usercollections = await userCollectionList("5bc720c69a4df300125221c2")
        let userlinks = await userLinkList("5bc720c69a4df300125221c2")
        let userlibrary = await userLibraryList("5bc720c69a4df300125221c2")
        console.log(userlibrary);
        return {userInfo:userinfo,userCollections:usercollections,userLinks:userlinks,userLibrary:userlibrary}
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

    handleChange = (event, value) => {
        this.setState({ value });
    };

    state = {value: 0,};


    render() {
        const {classes} = this.props;
        return <LoopContainer>
            <Layout className={classes.userContainer}>
                <Avatar
                    alt="Adelle Charles"
                    src={this.props.userInfo.image || "https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png"}
                    className={classes.bigAvatar}
                />
                <Layout direction={"column"} className={classes.infoLayout}>
                    <Layout className={classes.userInfo} alignItems={"center"}>

                            {this.props.userInfo.profile &&
                            <Typography variant={"headline"} className={classes.userInfoText}>
                                {this.props.userInfo.profile.name||this.props.userInfo.email}
                            </Typography>
                            }
                        {!this.props.userInfo.profile &&
                        <Typography variant={"headline"} className={classes.userInfoText}>
                            {this.props.userInfo.email}
                        </Typography>
                        }
                    </Layout>
                    <Layout className={classes.userInfo} alignItems={"center"}>
                        {this.props.userInfo.profile &&
                        <Typography variant={"body1"} className={classes.userInfoText}>
                            {this.props.userInfo.email}
                        </Typography>
                        }
                        {!this.props.userInfo.profile &&
                        <Typography variant={"body1"} className={classes.userInfoText}>
                            "(Please Update your Name in your user profile)"
                        </Typography>
                        }
                    </Layout>

                    <Layout className={classes.userInfo} alignItems={"center"}>
                        {this.props.userInfo.location &&
                        <Typography variant={"body1"} className={classes.userInfoText}>
                            {(this.props.userInfo.location.city)?this.props.userInfo.location.city+",":"" +(this.props.userInfo.location.country)?this.props.userInfo.location.country:""}
                        </Typography>
                        }
                        {!this.props.userInfo.location &&
                        <Typography variant={"body1"} className={classes.userInfoText}>
                        "(Please update your location in your user profile)"
                        </Typography>
                        }
                    </Layout>
                </Layout>



            </Layout>


            <Layout className={classes.body}>
                <Layout direction={"column"} className={classes.flex} >
                    <Paper className={classes.root}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Timeline" />
                            <Tab label="Library" />
                            <Tab label="Connections" />
                        </Tabs>


                        {this.state.value==0&& <Layout className={classes.tabLayout} direction={"column"}>
                            <Layout direction={"column"} className={classes.flex}>
                                {
                                    this.props.userCollections.map((item) => {
                                        return<Layout key={item} >
                                            <div onClick={()=>{
                                                Router.pushRoute(`/content-page/${item._id}/collections `)
                                            }} >
                                                <Layout className={classes.cardHorizontalDiv}>
                                                    <Card className={classes.horizontalCard}>
                                                        <Layout>
                                                            <Layout className={classes.flex}>
                                                                <CardMedia
                                                                    className={classes.cover}
                                                                    image={item.image}
                                                                    title={item.title}
                                                                />
                                                                <div className={classes.details}>
                                                                    <CardContent className={classes.content}>
                                                                        <Typography component="h5" variant="h5">
                                                                            {item.title}
                                                                        </Typography>
                                                                        <Typography variant="subtitle1" color="textSecondary">
                                                                            {item.description}
                                                                        </Typography>
                                                                        <Typography variant="subtitle1" color="textSecondary">
                                                                            {(item.created_at)?"Created on" + item.created_at:""}
                                                                        </Typography>
                                                                        <Typography variant="subtitle1" color="textSecondary">
                                                                            {item.links.length + " links"}
                                                                        </Typography>

                                                                    </CardContent>
                                                                    <div className={classes.controls}>

                                                                        <Button size="small" color="primary">
                                                                            Delete
                                                                        </Button>
                                                                        <Button size="small" color="primary">
                                                                            View Collection
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </Layout>
                                                        </Layout>

                                                    </Card>

                                                </Layout>
                                            </div>
                                        </Layout>
                                    })
                                }
                                {
                                    this.props.userLinks.map((item) => {
                                        return<Layout key={item} >
                                            <div onClick={()=>{
                                                Router.pushRoute(`/content-page/${item._id}/link`)
                                            }} >
                                                <Layout className={classes.cardHorizontalDiv}>
                                                    <Card className={classes.horizontalCard}>

                                                        <Layout>

                                                            <Layout className={classes.flex}>
                                                                <CardMedia
                                                                    className={classes.cover}
                                                                    image={item.image}
                                                                    title={item.title}
                                                                />
                                                                <div className={classes.details}>

                                                                    <CardContent className={classes.content}>

                                                                        <Typography component="h5" variant="h5">
                                                                            {item.title}
                                                                        </Typography>
                                                                        <Typography variant="subtitle1" color="textSecondary">
                                                                            {item.description}
                                                                        </Typography>
                                                                        <Typography variant="subtitle1" color="textSecondary">
                                                                            {(item.created_at)?"Created on" + item.created_at:""}
                                                                        </Typography>
                                                                    </CardContent>
                                                                    <div className={classes.controls}>

                                                                        <Button size="small" color="primary">
                                                                            Delete
                                                                        </Button>
                                                                        <Button size="small" color="primary">
                                                                            View in Player
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </Layout>


                                                        </Layout>

                                                    </Card>

                                                </Layout>
                                            </div>
                                        </Layout>
                                    })
                                }


                            </Layout>

                        </Layout>}



















                        {this.state.value==1&& <Layout className={classes.tabLayout} direction={"column"}>
                            <GridList cols={5} cellHeight={450}>
                                {
                                    this.props.userLibrary.collections.map((item) => {
                                        return<GridListTile key={item} cols={1}>
                                            <div onClick={()=>{
                                                Router.pushRoute(`/content-page/${item._id}/collections`)
                                            }} >
                                                <Layout className={classes.cardDiv}>
                                                    <Card className={classes.card}>
                                                        <CardMedia
                                                            className={classes.media}
                                                            image={item.image}
                                                            title={item.title}
                                                        />
                                                        <Layout className={classes.flex} direction={"column"}>
                                                            <Layout direction={"column"} className={classes.informationLayout}>
                                                                <CardContent>
                                                                    <Typography gutterBottom variant="headline" component="h2">
                                                                        { item.title}
                                                                    </Typography>
                                                                    <Typography component="p">
                                                                        {item.description}
                                                                    </Typography>
                                                                </CardContent>
                                                            </Layout>
                                                            <Divider/>
                                                            <Layout className={classes.urlLayout}>
                                                                <Typography variant={"body2"} className={classes.urlText}>
                                                                    {item.links.length} Links
                                                                </Typography>
                                                            </Layout>
                                                        </Layout>
                                                    </Card>
                                                </Layout>
                                            </div>
                                        </GridListTile>
                                    })
                                }
                                {
                                    this.props.userLibrary.links.map((item) => {
                                        return<GridListTile key={item} cols={1}>
                                            <div onClick={()=>{
                                                Router.pushRoute(`/content-page/${item._id}/link`)
                                            }} >
                                                <Layout className={classes.cardDiv}>
                                                    <Card className={classes.card}>
                                                        <CardMedia
                                                            className={classes.media}
                                                            image={item.image}
                                                            title={item.title}
                                                        />
                                                        <Layout className={classes.flex} direction={"column"}>
                                                            <Layout direction={"column"} className={classes.linkInformationLayout}>
                                                                <CardContent>
                                                                    <Typography gutterBottom variant="headline" component="h2">
                                                                        {item.title}
                                                                    </Typography>
                                                                    <Layout className={classes.descriptionLayout}>
                                                                        <Typography component="p">
                                                                            {item.title}
                                                                        </Typography>
                                                                    </Layout>

                                                                </CardContent>
                                                            </Layout>

                                                            <CardActions>
                                                                <Button size="small" color="primary">
                                                                    Share
                                                                </Button>
                                                                <Button size="small" color="primary">
                                                                    Learn More
                                                                </Button>
                                                            </CardActions>

                                                            <Divider/>
                                                            <Layout className={classes.urlLayout}>
                                                                <Typography variant={"body2"} className={classes.urlText}>
                                                                    {item.url}
                                                                </Typography>
                                                            </Layout>
                                                        </Layout>
                                                    </Card>

                                                </Layout>
                                            </div>
                                        </GridListTile>
                                    })
                                }
                            </GridList>

                        </Layout>}
                        {this.state.value==2&& <Layout className={classes.tabLayout} direction={"column"}>
                            <GridList cols={8} cellHeight={350}>
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13].map((item) => {
                                        return<GridListTile key={item} cols={1}>
                                            <Layout>
                                                <Card className={classes.card}>
                                                    <Layout alignItems={"center"}  direction={"column"} className={classes.topicPictureContainer}>
                                                        <Layout className={classes.avatarLayout}>
                                                        <Avatar
                                                            alt="Adelle Charles"
                                                            src="https://i.pinimg.com/236x/d3/38/a8/d338a83a27fe3b09d2b9efac0b3a891d.jpg"
                                                            className={classes.avatar}
                                                        />
                                                        </Layout>
                                                        <Typography variant={"title"} className={classes.topicLabelContainer}>
                                                            Chu
                                                        </Typography>
                                                        <CardContent>
                                                        <Typography   variant={"caption"} component="p" className={classes.topicLabelContainer}>
                                                            #Adobe, #Photoshop, #Music, #Instrumentals, #Riding, #Dancing, #Reading, #Python, #Clothing, #Science, #Politics
                                                        </Typography>
                                                        </CardContent>

                                                    </Layout>
                                                    <Layout alignItem={"center"} className={classes.userCardFooterLayout}>
                                                        <PlusIcon size={15}/>
                                                        <Typography variant={"body1"} className={classes.userCardFooterText}>
                                                            Follow
                                                        </Typography>
                                                    </Layout>
                                                </Card>
                                            </Layout>
                                        </GridListTile>
                                    })
                                }
                            </GridList>

                        </Layout>}

                    </Paper>

            </Layout>
            </Layout>

        </LoopContainer>

    }
};


const Index = withStyles((theme) => {
    return {
        userCardFooterLayout:{
            marginLeft:theme.spacing.unit*1,
            paddingBottom:theme.spacing.unit*1
        },
        userCardFooterText:{
            marginLeft:theme.spacing.unit*1
        },
        avatarLayout:{
            marginTop:theme.spacing.unit*2
        },
        topicLabelContainer:{
            paddingTop:theme.spacing.unit,
        },
        topicPictureContainer:{
            height:310
        },
        userInfo:{

            margin:theme.spacing.unit,
            height:32
        },
        tabLayout:{
            flex:1,

            padding:theme.spacing.unit*2
        },
        userInfoText:{

            padding:theme.spacing.unit
        },
        userContainer:{
            backgroundColor:"#fff",
            padding:theme.spacing.unit*2
        },
        infoLayout:{
          marginLeft:theme.spacing.unit,
            marginTop:theme.spacing.unit

        },
        body:{
            padding:theme.spacing.unit*2,
            backgroundColor:"#F9F9FB",
            flex:1,

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
            width: 150,
            height: 150,
        },
        avatar: {
            width: 75,
            height: 75,
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
        cover: {
            width: 180,
        },

        paper:{
            backgroundColor:"#fff",
            padding:theme.spacing.unit,
            margin:theme.spacing.unit,
            flex:1,
            width:"100%",
            height:"100%",
            overflow:"scroll"


        },
        horizontalCard:{
            margin:theme.spacing.unit,
            width:"100%"
        },

        cardHorizontalDiv:{

            minWidth:1550,

        },
        cardDiv:{
            minWidth:304,
            minHeight:400
        },
        card: {
            margin:theme.spacing.unit,
            minWidth:304,
        },
        media: {
            height:0,
            paddingTop: '56.25%',
        },
        informationLayout:{
            minHeight:218
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
        linkInformationLayout:{
            minHeight:170
        },



    }

})(connect(store => store)(_Index))
export default Index;