/**
 * Created by aashiq on 17/08/18.
 */
import React from "react"
import Layout from "../../components/layout";
import InputContainer from "../../components/input";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
import {Link} from "../../routes";
import {addListener, removeListener} from "./redux";
import {Router} from "../../routes"
import LoopContainer from "../../components/top-bar/index";
import {Typography,Card,TextField,Checkbox,FormControlLabel,Divider,Button} from "@material-ui/core/index";


let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {
    }


    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    componentWillMount = () => {
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {
    }


    state = {selectedSetting:0, checkedA: true};


    render() {
        const {classes} = this.props;
        return <LoopContainer>
            <Layout className={classes.body} justifyContent={"center"}>
                <Layout className={classes.container}>
                    <Layout direction={"column"} className={classes.menuContainer}>
                        <div onClick={()=>{this.setState({selectedSetting:0})}}>
                            <Layout className={(this.state.selectedSetting==0)? classes.menuItemSelected : classes.menuItemUnselected}>
                        <Typography variant={"subheading"} className={(this.state.selectedSetting==0)? classes.menuItemTextSelected:classes.menuItemTextUnselected}>
                                Personal Information
                        </Typography>
                            </Layout>
                        </div>
                        <div onClick={()=>{this.setState({selectedSetting:1})}}>
                            <Layout className={(this.state.selectedSetting==1)? classes.menuItemSelected : classes.menuItemUnselected}>
                                <Typography variant={"subheading"} className={(this.state.selectedSetting==1)? classes.menuItemTextSelected:classes.menuItemTextUnselected}>
                                    Password
                                </Typography>
                            </Layout>
                        </div>
                        <div onClick={()=>{this.setState({selectedSetting:2})}}>
                            <Layout className={(this.state.selectedSetting==2)? classes.menuItemSelected : classes.menuItemUnselected}>
                                <Typography variant={"subheading"} className={(this.state.selectedSetting==2)? classes.menuItemTextSelected:classes.menuItemTextUnselected}>
                                    Notifications
                                </Typography>
                            </Layout>
                        </div>
                        <div onClick={()=>{this.setState({selectedSetting:3})}}>
                            <Layout className={(this.state.selectedSetting==3)? classes.menuItemSelected : classes.menuItemUnselected}>
                                <Typography variant={"subheading"} className={(this.state.selectedSetting==3)? classes.menuItemTextSelected:classes.menuItemTextUnselected}>
                                    Linked Accounts
                                </Typography>
                            </Layout>
                        </div>
                        <div onClick={()=>{this.setState({selectedSetting:4})}}>
                            <Layout className={(this.state.selectedSetting==4)? classes.menuItemSelected : classes.menuItemUnselected}>
                                <Typography variant={"subheading"} className={(this.state.selectedSetting==4)? classes.menuItemTextSelected:classes.menuItemTextUnselected}>
                                    Language Preference
                                </Typography>
                            </Layout>
                        </div>


                    </Layout>
                    <Layout direction={"column"} className>
                        {
                            this.state.selectedSetting==0&&
                                <Layout direction={"column"}>
                                    <Card className={classes.card}>
                                <Typography variant={"title"}>
                                    Basic Information
                                </Typography>
                                        <InputContainer label={"First Name"}>
                                            <TextField placeholder={"First Name"}/>
                                        </InputContainer>
                                        <InputContainer label={"Last Name"}>
                                            <TextField placeholder={"Last Name"}/>
                                        </InputContainer>
                                        <InputContainer label={"Email"}>
                                            <TextField placeholder={"Email"}/>
                                        </InputContainer>
                                    </Card>
                                </Layout>
                        }
                        {
                            this.state.selectedSetting==1&&
                            <Layout direction={"column"}>
                                <Card className={classes.card}>
                               <Typography variant={"title"}>
                                   Change Password
                               </Typography>
                                    <InputContainer label={"Current Password"}>
                                        <TextField placeholder={"Current Password"}/>
                                    </InputContainer>
                                    <InputContainer label={"New Password"}>
                                        <TextField placeholder={"New Password"}/>
                                    </InputContainer>
                                    <InputContainer label={"Verify Password"}>
                                        <TextField placeholder={"Verify Password"}/>
                                    </InputContainer>
                                </Card>
                            </Layout>
                        }
                        {
                            this.state.selectedSetting==2&&
                            <Layout direction={"column"}>
                                <Card className={classes.card}>
                              <Typography variant={"title"} className={classes.title}>
                                  Notification Preferences
                              </Typography>
                                    <Typography variant={"subheading"} className={classes.notificationsText}>
                                        Receive Promotional Emails from Loop
                                    </Typography>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.checkedA}
                                                onChange={this.handleChange('checkedA')}
                                                value="checkedA"
                                            />
                                        }
                                        label="Receive updates about new programs, promotions, and events"
                                    />
                                </Card>
                            </Layout>
                        }
                        {
                            this.state.selectedSetting==3&&
                            <Layout direction={"column"}>
                                <Card className={classes.card}>
                               <Typography variant={"title"} className={classes.title}>
                                   Linked Accounts
                               </Typography>
                                    <Divider/>
                                    <Layout className={classes.socialContainer} alignItems={"center"}>
                                    <Typography variant={"subheading"} className={classes.flex}>
                                        Facebook
                                    </Typography>
                                        <Typography variant={"subheading"} className={classes.flex2}>
                                            (Aashiq Ali Mohammed)
                                        </Typography>



                                        <Button color="secondary" className={classes.button}>
                                            Disconnect
                                        </Button>
                                    </Layout>

                                    <Divider/>
                                    <Layout className={classes.socialContainer} alignItems={"center"}>

                                    <Typography variant={"subheading"} className={classes.flex}>
                                        Google
                                    </Typography>
                                        <Button color="secondary" className={classes.button}>
                                            Connect
                                        </Button>


                                    </Layout>

                                    <Divider/>



                                </Card>
                            </Layout>
                        }
                        {
                            this.state.selectedSetting==4&&
                            <Layout direction={"column"}>
                                <Card className={classes.card}>
                               <Typography variant={"title"}>
                                   Our Developers are working day and nights .please cooperate .It's Coming Soon ! ! !  ( hopefully :P )
                               </Typography>
                                </Card>
                            </Layout>
                        }

                    </Layout>
                </Layout>

            </Layout>

        </LoopContainer>
    }
};


const Index = withStyles((theme) => {
    return {
        socialContainer:{
            padding:theme.spacing.unit
        },
        body:{
            margin:theme.spacing.unit*2
        },
        container:{
            width:1024,

        },
        menuContainer:{
            width:256
        },
        settingsContainer:{
            width:768
        },
        menuItemUnselected:{
            marginRight:theme.spacing.unit*2,
            padding:theme.spacing.unit
        },
        menuItemSelected:{
            marginRight:theme.spacing.unit*2,
            padding:theme.spacing.unit,
            backgroundColor:theme.palette.primary.dark,
        },
        menuItemTextSelected:{
            color:"#fff"

        },
        menuItemTextUnselected:{


        },
        flex:{flex:1},
        flex2:{flex:4},
        card:{
            width:768,
            padding:theme.spacing.unit*5,
            flex:1
        },
        notificationsText:{
            color:"#7d97ad"
        },
        title:{
            marginBottom:theme.spacing.unit*2
        }

    }

})(connect(store => store)(_Index))
export default Index;