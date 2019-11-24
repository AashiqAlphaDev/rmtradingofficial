/**
 * Created by aashiq on 17/08/18.
 */
import React from "react"
import Layout from "../../../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {Link} from "../../../routes";
import {addListener, removeListener} from "./redux";
import {Router} from "../../../routes"
import LoopContainer from "../../../components/top-bar/index";
import InputContainer from "../../../components/input"
import {MenuItemSample} from "../../../components/icons";
import {Typography,Card,TextField,Button,Dialog, DialogContent} from "@material-ui/core/index";
import {authCommands, authEvents} from "../../../store/domain/auth";
import uuidv1 from 'uuid/v1';


let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {
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
        console.log(payload);
        if (type === authEvents.USER_LOGIN_SUCCEEDED && payload.callbackId === this.state.loginCallbackId) {
            if(payload.response._id){
               const user = {
                   userId : payload.response._id,
                   userEmail:payload.response.email
               };
                 localStorage.setItem('user',JSON.stringify(user));


                Router.pushRoute("/library");
            }

        }
    }


    state = {};


    render() {
        const {classes} = this.props;
        return <Layout direction={"column"} alignItems={"center"} className={classes.container}>
            <Layout className={classes.imageContainer}>
            <MenuItemSample size={70}/>
            </Layout>
            <Typography variant={"headline"} className={classes.imageContainer}>
                Sign in to Loop
            </Typography>
            <Card>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    let uid = uuidv1();
                    this.setState({loginCallbackId:uid});
                    this.props.dispatch({type: authCommands.USER_LOGIN, payload: {callbackId:uid,data:{email:this.state.email, password:this.state.password}}});
                }}>
                 <Layout direction={"column"} className={classes.form}>
                 <InputContainer label={"Username or email address"}>
                    <TextField  value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} placeholder={"Username"}></TextField>
                 </InputContainer>
                 <InputContainer label={"Password"}>
                     <TextField value={this.state.password} type={"password"} onChange={(e)=>{this.setState({password:e.target.value})}} placeholder={"Password"}></TextField>
                 </InputContainer>

                     <div onClick={()=>{
                        this.setState({showForgotPassword:true})
                     }}>
                     <Layout justifyContent={"flex-end"} style={{marginTop:5}}>
                     <Typography variant={"caption"}  className={classes.registerLabel}>
                             Forgot Password?
                     </Typography>
                     </Layout>
                     </div>
                    <InputContainer label={" "}>
                     <Button variant={"raised"} color={"primary"} type={"submit"} style={{fontSize:12}}>Sign In</Button>
                    </InputContainer>
                 </Layout>
                </form>
            </Card>

            <Layout className={classes.registerLayout} justifyContent={"center"}>
                <Typography variant={"body1"} >
                    New to loop?
                </Typography>

                <div onClick={()=>{
                    Router.pushRoute(`/auth/register`)
                }}>
                <Typography variant={"body1"}  className={classes.registerLabel}>
                    Create an account.
                </Typography>
                </div>
            </Layout>

            <Dialog
                open={this.state.showForgotPassword}
                onClose={() => {
                    this.setState({showForgotPassword: false})
                }}
            >
                <DialogContent>
                    <Typography variant={"title"} gutterBottom>
                        Reset Password
                    </Typography>
                    <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                        Provide necessary information to Reset Password such as Email or Username.
                    </Typography>
                    <InputContainer label={"Email"}>
                        <TextField value={this.state.resetEmail} onChange={(e)=>{this.setState({resetEmail:e.target.value})}} placeholder={"Email / Username"}></TextField>
                    </InputContainer>
                    <Layout justifyContent={"flex-end"} className={classes.formActions}>
                        <Button className={classes.formAction} onClick={()=>{this.setState({showForgotPassword:false})}}>Cancel</Button>
                        <Button className={classes.formAction} type={"submit"} variant={"raised"} color={"primary"}
                                onClick={()=>{this.setState({showForgotPassword:false})
                            this.setState({showEmailerConfimation:true}) }}>
                            Submit
                        </Button>
                    </Layout>
                </DialogContent>
            </Dialog>

            <Dialog
                open={this.state.showEmailerConfimation}
                onClose={() => {
                    this.setState({showEmailerConfimation: false})
                }}
            >
                <DialogContent>
                    <Typography variant={"title"} gutterBottom>
                       Emailer Confirmation
                    </Typography>
                    <Typography variant={"body1"} gutterBottom color={"textSecondary"}>
                        An Emailer has been sent to your Given Email Address Kindly follow the process to reset password
                    </Typography>
                    <Layout justifyContent={"flex-end"} className={classes.formActions}>
                        <Button className={classes.formAction} onClick={()=>{this.setState({showEmailerConfimation:false})}}>Cancel</Button>
                    </Layout>
                </DialogContent>
            </Dialog>



        </Layout>


    }
};


const Index = withStyles((theme) => {
    return {
        body:{
            margin:theme.spacing.unit*2
        },
        container:{
            paddingTop:theme.spacing.unit*4,
            backgroundColor:"#F9F9FB",
            flex:1
        },
        imageContainer:{
            paddingBottom:theme.spacing.unit*4
        },
        titleContainer:{
            marginBottom:theme.spacing.unit*2
        },
        form:{
            minWidth:300,
            padding:theme.spacing.unit*3
        },
        registerLayout:{
            marginTop:theme.spacing.unit*2,
            minWidth:300,
            padding:theme.spacing.unit,
            border: `2px solid #d1d1d1`,

        },
        registerLabel:{
        color:"#0000FF"
        },
        formActions: {
            paddingTop: theme.spacing.unit * 2
        },
        formAction: {
            marginLeft: theme.spacing.unit * 1
        }
    }

})(connect(store => store)(_Index))
export default Index;