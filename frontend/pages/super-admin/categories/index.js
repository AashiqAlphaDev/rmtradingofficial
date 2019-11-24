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
import LoopContainer from "../../../components/top-bar/index";
import {categoriesList, topicsList} from "../../../api/api";
import {
    TextField,
    Button,
    Typography,
    Card,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    DialogContentText,
    List, ListItem, Avatar, ListItemText, Divider
} from "@material-ui/core/index";
import {ChevronDownIcon, MenuItemSample, SortIcon} from "../../../components/icons";
import {categoriesCommands, categoriesEvents} from "../../../store/domain/categories";
import uuidv1 from "uuid/v1";
import {topicEvents} from "../../../store/domain/topics";


let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {

        let categorieslist = await categoriesList();
        return {categoriesList:categorieslist}

    }


    handleChange = (e) =>{
    }

    componentWillMount = () => {
        console.log(this.props.categoriesList.docs[1].topics);
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {

        if (type === categoriesEvents.ADD_CATEGORY_SUCCEEDED && payload.callbackId === this.state.addCategoryCallBackID) {
            this.setState({showAddedState: true});
        }
    }

    handlesChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };


    state = { checkedA: true, checkedB: true,categoryData:{},showAddedState:false};


    render() {
        const {classes} = this.props;
        return <Layout className={classes.flex}>
            <Layout className={classes.flex}>



                <List>
                    {this.props.categoriesList.docs.map((item,index) => {
                        return <Layout className={classes.flex}>
                            <ListItem key={item._id} dense button className={classes.listItem} onClick={()=>{this.setState({categoryData:item});}}>
                                <Avatar alt="Remy Sharp" src={item.image} />
                                <ListItemText primary={item.title} secondary={item.description}/>
                            </ListItem>
                            <Divider component="li"/>
                        </Layout>
                    })}
                </List>

            </Layout>

        <Layout alignItems={"center"} justifyContent={"center"} className={classes.adminContainer} direction={"column"}>
            <form  onSubmit={(e) => {
            }}>
            <Layout direction={"column"} className={classes.urlLayout}>
                <Typography variant={"title"}>
                Necessary Details for Categories
                </Typography>
            </Layout>
            <Layout direction={"column"}>
            <InputContainer label={"Title"}>
            <TextField value={this.state.categoryData.title||""}  onChange={(e)=>{
                let title = e.target.value
                this.setState((state) => (state.categoryData.title = title, state))
            }}>
            </TextField>
            </InputContainer>
                <InputContainer label={"Description"}>
                    <TextField  value={this.state.categoryData.description||""} onChange={(e)=>{
                        let description = e.target.value
                        this.setState((state) => (state.categoryData.description = description, state))
                    }}>
                    </TextField>
                </InputContainer>
                <InputContainer label={"Image"}>
                    <TextField value={this.state.categoryData.image||""} onChange={(e)=>{
                        let image = e.target.value
                        this.setState((state) => (state.categoryData.image = image, state))
                    }}>
                    </TextField>
                </InputContainer>
                <Layout className={classes.urlLayout} justifyContent={"center"}>
                    <Layout className={classes.sortContainer}>
                    <Button variant={"raised"} onClick={()=>{
                        let uid = uuidv1();
                        this.setState({addCategoryCallBackID:uid});
                        this.props.dispatch({
                            type: categoriesCommands.ADD_CATEGORY,
                            payload: {callbackId:uid,data: {...this.state.categoryData}}
                        });}}>ADD</Button>
                    </Layout>
                    <Layout className={classes.sortContainer}>
                        <Button variant={"raised"} onClick={()=>{
                            let uid = uuidv1();
                            this.setState({deleteCategoryCallBackID:uid});
                            this.props.dispatch({
                            type: categoriesCommands.DELETE_CATEGORY,
                            payload: {callbackId:uid,data: {...this.state.categoryData}}
                        });}}>DELETE</Button>
                    </Layout>

                    <Layout className={classes.sortContainer}>
                        <Button variant={"raised"} onClick={()=>{this.setState({categoryData:{}})}}>Clear</Button>
                    </Layout>
                    <Layout className={classes.sortContainer}>
                        <Button variant={"raised"} onClick={(e)=>{
                            let uid = uuidv1();
                            this.setState({updateCategoryCallBackID:uid});
                            this.props.dispatch({
                            type: categoriesCommands.UPDATE_CATEGORY,
                            payload: {callbackId:uid,data: {...this.state.categoryData}}
                        }); console.log("cat",this.state.categoryData)}}>Update</Button>
                    </Layout>
                </Layout>
            </Layout>


            </form>
        </Layout>
            <Dialog
                open={this.state.showAddedState}
                onClose={() => {
                    this.setState({showAddedState: false})
                }}
            >
                <DialogTitle id="alert-dialog-title">{"Wondering if Category Was Added?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Category Has Been Successfully Added
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
        }

    }

})(connect(store => store)(_Index))
export default Index;