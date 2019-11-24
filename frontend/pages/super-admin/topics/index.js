/**
 * Created by aashiq on 17/08/18.
 */
import React from "react"
import Layout from "../../../components/layout";
import InputContainer from "../../../components/input";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {Link} from "../../../routes";
import {addListener, removeListener} from "./redux";
import {Router} from "../../../routes"
import {categoriesList, linkList, topicsList} from "../../../api/api";
import {
    TextField,
    Button,
    Typography,
    Card,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem, Avatar, ListItemText, Divider
} from "@material-ui/core/index";
import {topicCommands, topicEvents} from "../../../store/domain/topics";
import {collectionEvents} from "../../../store/domain/collections";
import uuidv1 from "uuid/v1";
import _ from "underscore";




let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {

        let topicslist = await topicsList();
        let categorieslist = await categoriesList();
        return {topicsList:topicslist,categoriesList:categorieslist}

    }

    componentWillMount = () => {
        console.log(this.props.topicsList);
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {
        if (type === topicEvents.ADD_TOPIC_SUCCEEDED  && payload.callbackId === this.state.addTopicCallbackId) {
            this.setState({showAddedState: true});
        }
    }

    handlesChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };


    state = { topicData:{} ,selectedCategory:0,showCategory:true};


    render() {
        const {classes} = this.props;
        return <Layout className={classes.flex}>
            <Layout className={classes.flex}>
                <List>
                    {this.props.topicsList.docs.map((item,index) => {
                        return <Layout className={classes.flex}>
                            <ListItem key={item._id} dense button className={classes.listItem} onClick={()=>{console.log("this is the item",item); this.setState({showCategory:false}); this.setState({topicData:item})}} >
                                <Avatar alt="Remy Sharp" src={item.image} />
                                <ListItemText primary={item.title} secondary={item.description}/>
                            </ListItem>
                            <Divider component="li"/>
                        </Layout>
                    })}
                </List>
            </Layout>
            <Layout alignItems={"center"} justifyContent={"center"} className={classes.adminContainer} direction={"column"}>
                <Layout direction={"column"} className={classes.urlLayout}>
                    <Typography variant={"title"}>
                        Necessary Details for Topics
                    </Typography>
                </Layout>
                <Layout direction={"column"}>
                    <form  onSubmit={(e) => {
                        e.preventDefault();

                    }}>
                        <InputContainer label={"Title"}>
                            <TextField value={this.state.topicData.title||""} onChange={(e)=>{
                                let title = e.target.value
                                this.setState((state) => (state.topicData.title = title, state))
                            }} >
                            </TextField>
                        </InputContainer>
                        <InputContainer label={"Description"}>
                            <TextField value={this.state.topicData.description||""} onChange={(e)=>{
                                let description = e.target.value
                                this.setState((state) => (state.topicData.description = description, state))
                            }}>
                            </TextField>
                        </InputContainer>
                        <InputContainer label={"Image"}>
                            <TextField value={this.state.topicData.image||""} onChange={(e)=>{
                                let image = e.target.value
                                this.setState((state) => (state.topicData.image = image, state))
                            }}>
                            </TextField>
                        </InputContainer>



                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Category</InputLabel>
                            { this.state.showCategory==true &&
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
                            }
                        </FormControl>
                        <Layout className={classes.urlLayout}>
                            <Layout className={classes.sortContainer}>
                                <Button variant={"raised"} onClick={()=>{
                                    let uid = uuidv1();
                                    this.setState({addTopicCallbackId:uid});
                                    this.props.dispatch({
                                        type: topicCommands.ADD_TOPIC,
                                        payload: {callbackId:uid,data: {...this.state.topicData}}
                                    });
                                }}>Add</Button>
                            </Layout>
                            <Layout className={classes.sortContainer}>
                                <Button variant={"raised"} onClick={()=>{
                                    this.setState({topicData:{}})
                                    this.setState({showCategory:true})
                                }}>Clear</Button>
                            </Layout>
                            <Layout className={classes.sortContainer}>
                                <Button variant={"raised"}>Update</Button>
                            </Layout>
                            <Layout className={classes.sortContainer} >
                                <Button onClick={()=>{
                                    console.log("topic data before being sent",this.state.topicData);


                                    let uid = uuidv1();
                                    this.setState({deleteTopicCallbackId:uid});
                                    this.props.dispatch({
                                        type: topicCommands.DELETE_TOPIC,
                                        payload: {callbackId:uid,data: {...this.state.topicData}}
                                    });}} variant={"raised"}>Delete</Button>
                            </Layout>
                        </Layout>
                    </form>
                </Layout>
            </Layout>
            <Dialog
                open={this.state.showAddedState}
                onClose={() => {
                    this.setState({showAddedState: false})
                }}
            >
                <DialogTitle id="alert-dialog-title">{"Wondering if Topic Was Added?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Topic Has Been Successfully Added
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
        sortContainer:{
            marginRight:theme.spacing.unit
        },
        subCategory:{
            padding:theme.spacing.unit *0.5,
            paddingLeft:theme.spacing.unit
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
            padding:theme.spacing.unit,
            overflow:"scroll"
        },
        adminContainer:{
            flex:1,
            backgroundColor:"#fff"
        },
        flex:{flex:1},
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
            paddingBottom:theme.spacing.unit,
            flex:1
        },
        list:{
            overflow:"scroll",
            flex:1
        },
        card: {
            margin:theme.spacing.unit,
            padding:theme.spacing.unit
        },
        media: {
            height:0,
            paddingTop: '56.25%',
        },
        urlLayout:{
            padding:theme.spacing.unit*2
        },
        urlText:{
            textOverflow: "ellipsis",
            overflow: "hidden",
            width:241,
            height: "1.4em",
            whiteSpace: "nowrap",
            color:"#bfbfbf"
        },
        formControl:{
            margin:theme.spacing.unit,
            flex:1

        }
    }

})(connect(store => store)(_Index))
export default Index;