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

import {categoriesList} from "../../api/api";
import {TextField,Button,Typography,Card} from "@material-ui/core/index";
import {ChevronDownIcon, MenuItemSample, SortIcon} from "../../components/icons";
import RmContainer from "../../components/navigation-bar-rm";


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
    }

    handlesChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };


    state = { checkedA: true, checkedB: true};


    render() {
        const {classes} = this.props;
        return <Layout alignItems={"center"} justifyContent={"center"} className={classes.adminContainer} direction={"column"}>
            <RmContainer className={classes.navigationBar} >

            </RmContainer>

        </Layout>
    }
};


const Index = withStyles((theme) => {
    return {
        adminContainer:{
            flex:1,
            backgroundColor:"#ffffff"
        },
        navigationBar:{
          flex:1
        },
        card:{
            height:200,
            width:200,
            margin:theme.spacing.unit*2,
            alignItems:"center",
            justifyContent:"center"
        },
        flex:{
            flex:1,
            height:"100%",
            width:"100%"
        }
    }

})(connect(store => store)(_Index))
export default Index;