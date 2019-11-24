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
import {linkList, topicsList, userCollectionList} from "../../../api/api";
import {
    TextField, Button, Typography, Card, FormControl, InputLabel, Select, MenuItem, Input, Checkbox,
    ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem, Avatar, Divider
} from "@material-ui/core/index";
import {topicCommands, topicEvents} from "../../../store/domain/topics";
import _ from "underscore"
import {collectionCommands, collectionEvents} from "../../../store/domain/collections";
import {linkCommands, linkEvents} from "../../../store/domain/links";
import uuidv1 from "uuid/v1";

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

        let collectionlist = await userCollectionList("5bc720c69a4df300125221c2");
        let topicslist = await topicsList();
        let linklist = await linkList();



        return {topicsList:topicslist,collectionList:collectionlist,linkList:linklist}

    }

    componentWillMount = () => {
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {
        if (type === linkEvents.ADD_LINK_SUCCEEDED  && payload.callbackId === this.state.addLinkCallbackId) {
            this.setState({showAddedState: true});
        }
    }






    state = { linkData:{user:"5bc720c69a4df300125221c2",topics:[],collections:[]} ,selectedCollection:[],selectedTopic:[]}


    render() {
        const {classes} = this.props;
        return <Layout className={classes.flex}>
            <Layout>



                <List>
                    {this.props.linkList.docs.map((item,index) => {
                        return <Layout className={classes.flex}>
                            <ListItem key={item._id} dense button className={classes.listItem} onClick={()=>{this.setState({linkData:item}); this.setState({selectedCollection:item.collections}); this.setState({selectedTopic:item.topics});}}>
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
                Necessary Details for Link
                </Typography>
            </Layout>
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
            <TextField value={this.state.linkData.title||""} onChange={(e)=>{
                let title = e.target.value
                this.setState((state) => (state.linkData.title = title, state))
            }}>
            </TextField>
            </InputContainer>
                <InputContainer label={"Description"}>
                    <TextField value={this.state.linkData.description||""} onChange={(e)=>{
                        let description = e.target.value
                        this.setState((state) => (state.linkData.description = description, state))
                    }}>
                    </TextField>
                </InputContainer>
                    <InputContainer label={"url"}>
                        <TextField value={this.state.linkData.url||""} onChange={(e)=>{
                            let url = e.target.value
                            this.setState((state) => (state.linkData.url = url, state))
                        }}>
                        </TextField>
                    </InputContainer>
                    <InputContainer label={"Image"}>
                        <TextField value={this.state.linkData.image||""} onChange={(e)=>{
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



                    <Layout className={classes.urlLayout}>
                    <Layout className={classes.sortContainer}>
                    <Button variant={"raised"} type={"submit"}>Submit</Button>
                    </Layout>
                    <Layout className={classes.sortContainer}>
                        <Button variant={"raised"}>Upload CSV</Button>
                    </Layout>
                    <Layout className={classes.sortContainer}>
                        <Button variant={"raised"}>Update</Button>
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
                <DialogTitle id="alert-dialog-title">{"Wondering if Link Was Added?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Link Has Been Successfully Added
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
        formControl: {
            margin: theme.spacing.unit,
            minWidth: 120,
            maxWidth: 300,
        },

    }

})(connect(store => store)(_Index))
export default Index;