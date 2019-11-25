/**
 * Created by aashiq on 17/08/18.
 */
import React from "react"
import Layout from "../components/layout";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"

import {addListener, removeListener} from "./redux";

import {Router} from "../routes"



let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {
        return{

        }
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
        return <Layout alignItems={"center"}  className={classes.adminContainer} direction={"column"}>

        </Layout>
    }
};


const Index = withStyles((theme) => {
    return {

        outerContainer:{
            flex:1,
            padding:theme.spacing.unit*2,
            backgroundColor:"#222022"

        },
        contentText:{
            color:"#efedef"
        },
        titleText:{
            color:"#6ead3a"
        },

        leftSection:{flex:2,
            padding:theme.spacing.unit},
        rightSection:{flex:1,
            padding:theme.spacing.unit},
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
            backgroundColor:"#222022"
        },
        title: {
            color: "#efedef",
        },
        titleBar: {
            background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        adminContainer:{
            flex:1,
            backgroundColor:"#222022"
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
        },
        textColor:{
            textColor:"#000000"
        },
        paragraphStyle:{
            paddingBottom:theme.spacing.unit*2
        }
    }

})(connect(store => store)(_Index))
export default Index;






