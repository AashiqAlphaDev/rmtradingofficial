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
import {categoriesList, collectionsList, linkList, topicsList} from "../../../api/api";
import {
    TextField, Button, Typography, Card, FormControl, InputLabel, Select, MenuItem, Input, Checkbox,
    ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem, Avatar, Divider
} from "@material-ui/core/index";
import {topicCommands} from "../../../store/domain/topics";
import _ from "underscore"
import {collectionCommands, collectionEvents} from "../../../store/domain/collections";
import {categoriesEvents} from "../../../store/domain/categories";
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

        let topicslist = await collectionsList();
        let dropdown = await topicsList()



        return {topicsList:topicslist,dropDown:dropdown}

    }

    componentWillMount = () => {

        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {

        if (type === collectionEvents.ADD_COLLECTION_SUCCEEDED  && payload.callbackId === this.state.addCollectionCallbackId) {
            this.setState({showAddedState: true});
        }
    }






    state = { collectionData:{user:"5bc720c69a4df300125221c2",topics:[]} ,selectedCategory:[]};


    render() {
        const {classes} = this.props;
        return <Layout className={classes.flex}>
            <Layout>
                <List>
                    {this.props.topicsList.docs.map((item,index) => {
                        return <Layout className={classes.flex}>
                            <ListItem key={item._id} dense button className={classes.listItem} onClick={()=>{this.setState({collectionData:item}); this.setState({selectedCategory:item.topics}) ; console.log("this is the collectionData",this.state.collectionData)}}>
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
                Necessary Details for Collections
                </Typography>
            </Layout>
            <Layout direction={"column"}>
                <form>
            <InputContainer  label={"Title"}>
            <TextField value={this.state.collectionData.title||""} onChange={(e)=>{
                let title = e.target.value
                this.setState((state) => (state.collectionData.title = title, state))
            }}>
            </TextField>
            </InputContainer>
                <InputContainer label={"Description"}>
                    <TextField value={this.state.collectionData.description||""} onChange={(e)=>{
                        let description = e.target.value
                        this.setState((state) => (state.collectionData.description = description, state))
                    }}>
                    </TextField>
                </InputContainer>
                    <InputContainer label={"Image"}>
                        <TextField value={this.state.collectionData.image||""} onChange={(e)=>{
                            let image = e.target.value
                            this.setState((state) => (state.collectionData.image = image, state))
                        }}>
                        </TextField>
                    </InputContainer>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple-checkbox">Category</InputLabel>
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
                            {this.props.dropDown.docs.map((item)=>{
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
                <Layout className={classes.urlLayout}>
                    <Layout className={classes.sortContainer}>
                    <Button variant={"raised"} onClick={()=>{
                        let uid = uuidv1();
                        this.setState({addCollectionCallbackId:uid});

                        this.props.dispatch({
                            type: collectionCommands.ADD_COLLECTION,
                            payload: {callbackId:uid,data: {...this.state.collectionData}}
                        });
                    }}>Add</Button>
                    </Layout>
                    <Layout className={classes.sortContainer}>
                    <Button variant={"raised"} onClick={()=>{
                        let uid = uuidv1();
                        this.setState({addCollectionCallbackId:uid});
                        console.log("ssssss",this.state.collectionData);
                        this.props.dispatch({
                            type: collectionCommands.UPDATE_COLLECTION,
                            payload: {callbackId:uid,data: {...this.state.collectionData}}
                        });

                    }}>Update</Button>
                    </Layout>
                    <Layout className={classes.sortContainer}>
                        <Button variant={"raised"}onClick={()=>{
                            this.setState({collectionData:{user:"5bc720c69a4df300125221c2"}})
                        }}>Clear</Button>
                    </Layout>
                    <Layout className={classes.sortContainer}>
                        <Button variant={"raised"} onClick={()=>{
                            let uid = uuidv1();
                            this.setState({addCollectionCallbackId:uid});

                            this.props.dispatch({
                                type: collectionCommands.DELETE_COLLECTION,

                            });

                        }}>Delete</Button>
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
                <DialogTitle id="alert-dialog-title">{"Wondering if Collection Was Added?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Collection Has Been Successfully Added
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