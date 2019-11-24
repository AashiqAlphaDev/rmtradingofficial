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
import {categoriesList} from "../../../api/api";
import {Typography,TextField,Card,CardMedia,CardContent,GridList,GridListTile,Divider} from "@material-ui/core/index";
import {MenuItemSample} from "../../../components/icons";


let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {
    }


    handleChange = (e) =>{
    }

    componentWillMount = () => {
        console.log(this.props.categoriesList);
        addListener(this)
    }

    componentWillUnmount = () => {
        removeListener(this)
    }

    onAction({type, payload}) {
    }


    state = {};


    render() {
        const {classes} = this.props;
        return <LoopContainer>
            <Layout className={classes.container} direction={"column"}>
                <Typography gutterBottom variant="headline"className={classes.pageTitle} component="h2">
                    Top Categories
                </Typography>
            <Layout>

                <GridList cols={6} cellHeight={300}>
                    {
                        [1,2,3,4,5,6,7,8].map((item) => {
                            return<GridListTile key={item} cols={1}>
                                <Layout >
                                    <Card className={classes.card}>
                                        <Layout className={classes.labelContainer}>
                                            <Layout className={classes.titleContainer}>
                                            <Typography gutterBottom variant="title" className={classes.cardTitle} component="h2">
                                                hello
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
        </LoopContainer>
    }
};


const Index = withStyles((theme) => {
    return {
        container:{
            padding:theme.spacing.unit,
            backgroundColor:"#F9F9FB",
            flex:1,

        },
        card: {
            margin:theme.spacing.unit,
            flex:1,
            backgroundImage:"url('http://yourdost-blog-images.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2016/04/05124930/Start-a-startup-compressor-1024x717.jpg')",
            height:280,
            width:200,
            backgroundPosition: "center"
        },
        media: {
            height:0,
            paddingTop: '56.25%',
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
        pageTitle:{
            paddingLeft:theme.spacing.unit
        },
        cardTitle:{
            padding:theme.spacing.unit,
            textAlign:"center",
            color:"#fff"
        },
        labelContainer:{
            height:"100%",
            justifyContent:"center",
            alignItems:"flex-end",
            flex:1,

        },
        titleContainer:{
            background: "rgba(0, 0, 0, 0.6  )",
            height:100          ,
            flex:1,
            padding:theme.spacing.unit,


        },

    }

})(connect(store => store)(_Index))
export default Index;