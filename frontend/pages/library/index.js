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
    categoriesInfoList,
    categoriesList,
    initialFetchCollectionAndLinksOfATopic,
    topicsList,
    userCollectionList, userList
} from "../../api/api";
import {
    Typography,
    TextField,
    Card,
    CardMedia,
    CardContent,
    GridList,
    GridListTile,
    Divider,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanel,
    Switch,
    CardActions,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions, Dialog, FormControl, InputLabel, Select, MenuItem, Input, Checkbox, ListItemText,Grid,
    List,
    ListItem,
    ListItemAvatar,
    Avatar
} from "@material-ui/core/index";
import {ChevronDownIcon, MenuItemSample, SortIcon} from "../../components/icons";
import _ from "underscore"
import {authCommands, authEvents} from "../../store/domain/auth";
import {topicCommands, topicEvents} from "../../store/domain/topics";
import uuidv1 from "uuid/v1";
import InputContainer from "../../components/input";
import {collectionCommands} from "../../store/domain/collections";
import {linkCommands} from "../../store/domain/links";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
        },
    },
};




let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {



        let userlist = await userList();
        let categorieslist = await categoriesInfoList();
        let initialList = await initialFetchCollectionAndLinksOfATopic();
        let topicslist = await topicsList();
        let collectionlist = await userCollectionList("5bc720c69a4df300125221c2");



        return {categoriesList:categorieslist,sampleList:initialList,topicsList:topicslist,collectionList:collectionlist,userList:userlist}
    }

    capitalize = (item)=> {
        return item.charAt(0).toUpperCase() + item.slice(1);
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

        if (type === topicEvents.FETCH_TOPIC_SUCCEEDED && payload.callbackId === this.state.fetchTopicCallbackId) {
            console.log("old list",this.state.list)
            console.log("new list",payload.response)

            this.setState({list:payload.response})
            console.log("updated list",this.state.list)
            Router.pushRoute(this.props.router.asPath);
        }


        authEvents.USER_LOGOUT_STARTED
    }


    handlesChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    state = {showShareDialouge:false,selectedCollection:[],selectedTopic:[],linkData:{user:"5bc720c69a4df300125221c2",topics:[],collections:[]},showAddCollection:false,collectionData:{user:"5bc720c69a4df300125221c2",topics:[]}, checkedA: true, checkedB: true,collectionList:[],linkList:[],selectedCategory:[],list:this.props.sampleList,showTopicDialog:false,topicData:{}}


    render() {
        const {classes} = this.props;
        return <LoopContainer>
            <Layout className={classes.container}>
                <Layout className={classes.sidebar} direction={"column"}>
                    <Layout className={classes.subTitleStyling} alignItems={"center"} >
                        <Typography variant={"subheading"} className={classes.menuItem}>
                            Topics
                        </Typography>
                    </Layout>
                    {
                        this.props.categoriesList.docs.map((item,index)=>{
                            return <div onClick={()=>{
                                let selectedItem=this.state.selectedCategory
                                selectedItem[index]=!selectedItem[index]
                                this.setState({selectedCategory:selectedItem})
                            }}>
                                <Divider/>
                                <ExpansionPanel expanded={this.state.selectedCategory[index]}>
                                    <ExpansionPanelSummary>
                                        {/*<ExpansionPanelSummary expandIcon={<ChevronDownIcon />}>*/}
                                        <Typography className={classes.heading}>{this.capitalize(item.title)}</Typography>
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
                                                                {this.capitalize(item.title)}
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
                    <Layout alignItems={"flex-end"}  justifyContent={"center"} className={classes.flex}>
                    <Button fullWidth onClick={()=>{console.log("before",JSON.parse(localStorage.getItem("user"))); localStorage.removeItem('user'); console.log("after",JSON.parse(localStorage.getItem("user")));Router.pushRoute("/auth/login")}}>LOGOUT</Button>
                    </Layout>
                </Layout>
                <Layout className={classes.rightSection} direction={"column"}>

                    <Layout direction={"column"}>
                        <Layout alignItems={"column"}>
                            <Typography variant={"title"} className={classes.mainTitle}>
                                Browse
                            </Typography>
                            <Layout alignItems={"center"} className={classes.sortContainer}>
                            </Layout>
                            <Layout>
                            <Button size="small" color="primary" onClick={()=>{this.setState({showAddTopic:true})

                            }}>
                                Add Topic
                            </Button>
                            <Button size="small" color="primary" onClick={()=>{
                                this.setState({showAddCollection:true})

                            }}>
                                Add Collection
                            </Button>
                                <Button size="small" color="primary" onClick={()=>{
                                    this.setState({showAddLink:true})
                                }}>
                                    Add Link
                                </Button>
                            </Layout>

                        </Layout>
                        {/*<Layout className={classes.searchContainer}>*/}
                            {/*<TextField placeholder="Search" className={classes.flex}/>*/}
                        {/*</Layout>*/}
                    </Layout>
                    <Layout className={classes.list} direction={"row"}>

                        <GridList cols={5} cellHeight={420} className={classes.flex}>

                            {
                                _.isEmpty(this.state.list.collections) && _.isEmpty(this.state.list.links) &&
                                <Layout>
                                    <Typography variant={"subheading"} className={classes.menuItem}>
                                        No collection Or Links Available
                                    </Typography>
                                </Layout>
                            }
                            {
                                _.isEmpty(this.state.collectionList) &&
                                this.state.list.collections.map((item) => {
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
                                _.isEmpty(this.state.linkList) &&
                                this.state.list.links.map((item) => {
                                    return<GridListTile key={item} cols={1}>
                                            <Layout className={classes.cardDiv}>

                                                <Card className={classes.card}>
                                                <div onClick={()=>{
                                                    Router.pushRoute(`/content-page/${item._id}/link`)
                                                }} >
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={item.image}
                                                        title={item.title}
                                                    />
                                                </div>
                                                    <Layout className={classes.flex} direction={"column"}>
                                                        <Layout direction={"column"} className={classes.linkInformationLayout}>
                                                            <div onClick={()=>{
                                                                Router.pushRoute(`/content-page/${item._id}/link`)
                                                            }} >
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
                                                            </div>
                                                        </Layout>

                                                        <CardActions>
                                                            <Button size="small" color="primary" onClick={(e)=>{
                                                                this.setState({showShareDialouge:true})}}>
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

                                    </GridListTile>
                                })
                            }
                        </GridList>
                    </Layout>
                </Layout>
                <Dialog
                    open={this.state.showAddTopic}
                    onClose={() => {
                        this.setState({showAddTopic: false})
                    }}
                >
                    <DialogTitle id="alert-dialog-title">{"Enter Details for A topic"}</DialogTitle>
                    <Layout alignItems={"center"} justifyContent={"center"} className={classes.adminContainer} direction={"column"}>
                        <Layout direction={"column"}>
                            <form  onSubmit={(e) => {
                                e.preventDefault();
                                let uid = uuidv1();
                                this.setState({addTopicCallbackId:uid});
                                this.props.dispatch({
                                    type: topicCommands.ADD_TOPIC,
                                    payload: {callbackId:uid,data: {...this.state.topicData}}
                                });
                            }}>
                                <InputContainer label={"Title"}>
                                    <TextField onChange={(e)=>{
                                        let title = e.target.value
                                        this.setState((state) => (state.topicData.title = title, state))
                                    }}>
                                    </TextField>
                                </InputContainer>
                                <InputContainer label={"Description"}>
                                    <TextField onChange={(e)=>{
                                        let description = e.target.value
                                        this.setState((state) => (state.topicData.description = description, state))
                                    }}>
                                    </TextField>
                                </InputContainer>
                                <InputContainer label={"Image"}>
                                    <TextField onChange={(e)=>{
                                        let image = e.target.value
                                        this.setState((state) => (state.topicData.image = image, state))
                                    }}>
                                    </TextField>
                                </InputContainer>



                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Category</InputLabel>
                                    <Select
                                        value={this.state.selectedCategory}
                                        onChange={(event)=>{
                                            let category = event.target.value;
                                            console.log(category);
                                            this.setState((state) => (state.topicData.category = category, state))
                                            this.setState((state) => (state.selectedCategory = category, state))
                                        }}
                                    >
                                        <MenuItem  value={0}>Select a Category</MenuItem>
                                        {this.props.categoriesList.docs.map((item)=>{
                                            return <MenuItem key={item._id} value={item._id}>{item.title}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <Layout className={classes.urlLayout}>
                                    <Layout className={classes.sortContainer}>

                                    </Layout>
                                </Layout>
                                <DialogActions>
                                    <Button onClick={()=>{this.setState({showAddTopic:false})}} color="primary" autoFocus>
                                        Close
                                    </Button>
                                    <Button color="primary" type={"submit"}>Submit</Button>
                                </DialogActions>
                            </form>
                        </Layout>
                    </Layout>

                </Dialog>
                <Dialog
                    open={this.state.showAddCollection}
                    onClose={() => {
                        this.setState({showAddCollection: false})
                    }}
                >
                    <DialogTitle id="alert-dialog-title">{"Enter Details for A Collection"}</DialogTitle>
                    <Layout alignItems={"center"} justifyContent={"center"} className={classes.adminContainer} direction={"column"}>
                        <Layout direction={"column"}>
                            <form  onSubmit={(e) => {
                                e.preventDefault();
                                let uid = uuidv1();
                                this.setState({addCollectionCallbackId:uid});

                                this.props.dispatch({
                                    type: collectionCommands.ADD_COLLECTION,
                                    payload: {callbackId:uid,data: {...this.state.collectionData}}
                                });
                            }}>
                                <InputContainer label={"Title"}>
                                    <TextField onChange={(e)=>{
                                        let title = e.target.value
                                        this.setState((state) => (state.collectionData.title = title, state))
                                    }}>
                                    </TextField>
                                </InputContainer>
                                <InputContainer label={"Description"}>
                                    <TextField onChange={(e)=>{
                                        let description = e.target.value
                                        this.setState((state) => (state.collectionData.description = description, state))
                                    }}>
                                    </TextField>
                                </InputContainer>
                                <InputContainer label={"Image"}>
                                    <TextField onChange={(e)=>{
                                        let image = e.target.value
                                        this.setState((state) => (state.collectionData.image = image, state))
                                    }}>
                                    </TextField>
                                </InputContainer>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
                                    <Select
                                        multiple
                                        value={this.state.selectedCategory}
                                        onChange={(e)=>{
                                            let topic = e.target.value;
                                            this.setState((state) => (state.selectedCategory = topic, state))
                                            this.setState((state) => (state.collectionData.topics = topic, state))

                                        }}
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {this.props.topicsList.docs.map((item)=>{
                                            return <MenuItem key={item._id} value={item._id}><Checkbox checked={this.state.selectedCategory.indexOf(item._id) > -1 } />
                                                <ListItemText primary={item.title} /></MenuItem>
                                        })}
                                    </Select>
                                </FormControl>

                                {/*<FormControl className={classes.formControl}>*/}
                                {/*<InputLabel htmlFor="age-simple">Category</InputLabel>*/}
                                {/*<Select*/}
                                {/*multiple*/}
                                {/*value={this.state.selectedCategory}*/}
                                {/*onChange={(event)=>{*/}
                                {/*let topic = event.target.value;*/}
                                {/*console.log("this is the category",topic);*/}
                                {/*this.setState((state) => (state.collectionData.category = topic, state))*/}
                                {/*let selectedCategory = this.state.selectedCategory*/}
                                {/*if(selectedCategory.indexOf(topic) == -1){*/}
                                {/*console.log("inside push",selectedCategory.indexOf(topic)==-1)*/}
                                {/*selectedCategory.push(topic)*/}
                                {/*}*/}
                                {/*else{*/}
                                {/*selectedCategory = _.reject(selectedCategory,function(item){*/}
                                {/*return item == topic*/}
                                {/*});*/}
                                {/*}*/}
                                {/*this.setState((state) => (state.selectedCategory = selectedCategory, state))*/}
                                {/*}}*/}
                                {/*>*/}
                                {/*<MenuItem  value={0}>Select a Topic</MenuItem>*/}
                                {/*{this.props.topicsList.docs.map((item)=>{*/}
                                {/*return <MenuItem key={item._id} value={item._id}>{item.title}</MenuItem>*/}
                                {/*})}*/}
                                {/*</Select>*/}
                                {/*</FormControl>*/}

                                <DialogActions>
                                    <Button onClick={()=>{this.setState({showAddCollection:false})}} color="primary" autoFocus>
                                        Close
                                    </Button>
                                    <Button color="primary" type={"submit"}>Submit</Button>
                                </DialogActions>
                            </form>
                        </Layout>
                    </Layout>


                </Dialog>









                <Dialog
                    open={this.state.showAddLink}
                    onClose={() => {
                        this.setState({showAddLink: false})
                    }}
                >
                    <DialogTitle id="alert-dialog-title">{"Enter Details for A Link"}</DialogTitle>
                    <Layout alignItems={"center"} justifyContent={"center"} className={classes.adminContainer} direction={"column"}>

                        <Layout direction={"column"}>
                            <form  onSubmit={(e) => {
                                e.preventDefault();
                                console.log(this.state);
                                let uid = uuidv1();
                                this.setState({addLinkCallbackId:uid});
                                this.props.dispatch({
                                    type: linkCommands.ADD_LINK,
                                    payload: {callbackId:uid,data: {...this.state.linkData}}
                                });
                            }}>
                                <InputContainer label={"Title"}>
                                    <TextField onChange={(e)=>{
                                        let title = e.target.value
                                        this.setState((state) => (state.linkData.title = title, state))
                                    }}>
                                    </TextField>
                                </InputContainer>
                                <InputContainer label={"Description"}>
                                    <TextField onChange={(e)=>{
                                        let description = e.target.value
                                        this.setState((state) => (state.linkData.description = description, state))
                                    }}>
                                    </TextField>
                                </InputContainer>
                                <InputContainer label={"url"}>
                                    <TextField onChange={(e)=>{
                                        let url = e.target.value
                                        this.setState((state) => (state.linkData.url = url, state))
                                    }}>
                                    </TextField>
                                </InputContainer>
                                <InputContainer label={"Image"}>
                                    <TextField onChange={(e)=>{
                                        let image = e.target.value
                                        this.setState((state) => (state.linkData.image = image, state))
                                    }}>
                                    </TextField>
                                </InputContainer>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Topics</InputLabel>
                                    <Select
                                        multiple
                                        value={this.state.selectedTopic}
                                        onChange={(e)=>{
                                            let topic = e.target.value;
                                            this.setState((state) => (state.selectedTopic = topic, state))
                                            this.setState((state) => (state.linkData.topics = topic, state))
                                        }}
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {this.props.topicsList.docs.map((item)=>{
                                            return <MenuItem key={item._id} value={item._id}><Checkbox checked={this.state.selectedTopic.indexOf(item._id) > -1 } />
                                                <ListItemText primary={item.title} /></MenuItem>
                                        })}
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Collections</InputLabel>
                                    <Select
                                        multiple
                                        value={this.state.selectedCollection}
                                        onChange={(e)=>{
                                            let collections = e.target.value
                                            this.setState((state) => (state.selectedCollection = collections, state))
                                            this.setState((state) => (state.linkData.collections = collections, state))

                                        }}
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {this.props.collectionList.map((item)=>{
                                            return <MenuItem key={item._id} value={item._id}><Checkbox checked={this.state.selectedCollection.indexOf(item._id) > -1 } />
                                                <ListItemText primary={item.title} /></MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <DialogActions>
                                    <Button onClick={()=>{this.setState({showAddLink:false})}} color="primary" autoFocus>
                                        Close
                                    </Button>
                                    <Button color="primary" type={"submit"}>Submit</Button>
                                </DialogActions>
                            </form>
                        </Layout>
                    </Layout>


                </Dialog>
                <Dialog
                    open={this.state.showShareDialouge}
                    onClose={() => {
                        this.setState({showShareDialouge: false})
                    }}
                >
                    <DialogTitle id="alert-dialog-title">{"Select A User"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please select a user to share content with
                        </DialogContentText>
                        <Grid container spacing={16}>
                            <Grid item xs={12} md={6}>
                                <div className={classes.demo}>
                                {/*    <List>

                                        {this.props.userList.docs.map((item,index)=>{
                                            return <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>

                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                >
                                                    {"user"+index}
                                                </ListItemText>
                                            </ListItem>
                                        })}


                                    </List>*/}
                                    <List>

                                        {[{name:"Aashiq",img:"https://i.pinimg.com/564x/8b/49/31/8b4931a219348946ce6e10ba650cfa3e.jpg"},{name:"Karthik",img:"https://www.bitdegree.org/tutorials/wp-content/uploads/2018/08/what-is-a-web-developer.jpg"}].map((item,index)=>{
                                            return <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar src={item.img}>

                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                >
                                                    {item.name}
                                                </ListItemText>
                                            </ListItem>
                                        })}


                                    </List>
                                </div>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{this.setState({showShareDialouge:false}); this.setState({showConfirmation:true})}} color="primary" autoFocus>
                            Confirm
                        </Button>
                        <Button onClick={()=>{this.setState({showShareDialouge:false})}} color="primary" autoFocus>
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
        sortContainer:{
            marginRight:theme.spacing.unit
        },
        subCategory:{
            padding:theme.spacing.unit *1,
            paddingLeft:theme.spacing.unit*2,
            flex:1
        },
        frameArea :{
            display: "block",
            width: "100%",
            height: "100%",
            overflow: "auto",
            border: "#999999 1px solid",
            margin: "0px",
            padding: "0px",
            flex:1
        },
        body:{
            margin:theme.spacing.unit*2
        },
        container:{
            backgroundColor:"#F9F9FB",
            flex:1
        },
        sidebar:{
            maxWidth:240,
            backgroundColor:"#fff",
            flexDirection:"column",
            flex:1,

            overflow:"scroll"
        },
        flex:{
            flex:1
        },
        menuItem:{
            paddingLeft:theme.spacing.unit,
            color:"#ffffff"
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
            paddingBottom:theme.spacing.unit,
            flex:1
        },

        mainTitle:{
            paddingTop:theme.spacing.unit,
            paddingLeft:theme.spacing.unit*2,
            flex:1
        },
        list:{
            overflow:"scroll",
            flex:1,
            margin:theme.spacing.unit*1
        },

        cardDiv:{
            minWidth:280,
            minHeight:400
        },
        card: {
            margin:theme.spacing.unit

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
        searchContainer:{
            marginRight:theme.spacing.unit*2,
            marginLeft:theme.spacing.unit*2,
            flex:1
        },
        subTitleStyling:{
            background:"#375d76",
            height:50
        }




    }

})(connect(store => store)(_Index))
export default Index;








