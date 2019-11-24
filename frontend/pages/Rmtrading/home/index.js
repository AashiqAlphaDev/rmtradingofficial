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
import RmContainer from "../../../components/navigation-bar-rm";
import {GridList, GridListTile,GridListTileBar,Typography,List,
    ListItem,
    ListItemAvatar,
    ListItemText,Avatar,Divider} from "@material-ui/core/index";


let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {
    let tiledata=[
        {
            title:"Vitrified tiles Wood",
            img:"../../../static/images/vetrifiedtiles/tile1.png"
        },
        {
            title:"Vitrified Tiles Beige",
            img:"../../../static/images/vetrifiedtiles/tile2.png"
        },
        {
            title:"Bidasar Gold",
            img:"../../../static/images/granites/bidasargold.jpg"
        },
        {
            title:"Bidasar Green",
            img:"../../../static/images/granites/bidasargreen.jpg"
        },
        {
            title:"Black Galaxy",
            img:"../../../static/images/granites/blackgalaxy.jpg"
        },
        {
            title:"Ruby red",
            img:"../../../static/images/granites/rubyred.jpg"
        },
        {
            title:"Kashmir White",
            img:"../../../static/images/granites/kashmirwhite.jpg"
        },{
        img : "../../../static/images/slider/slider1.jpg",
        title :"Access Control Systems"
        },

        {
            img:"../../../static/images/slider/slider2.jpg",
            title:"Structured Cabling Systems"
        },
        {
            img:"../../../static/images/slider/slider3.jpg",
            title:"Telecom Systems"
        },
        {
            img:"../../../static/images/slider/slider4.jpg",
            title:"Ip Telephonic"
        },
        {
            img:"../../../static/images/slider/slider5.jpg",
            title:"Electric Wiring Ac Installation"
        },
        ]


        let dummylistscope=[


            {
                title:"Access Control systems",
                subtitle:"Enterprise security solutions",
                subtext:"Experts in security At Your Service",
                img:"http://www.sostechgroup.com/wp-content/uploads/2017/07/ThinkstockPhotos-507071956-1-1-300x200.jpg"
            },
            {
                title:"Cable Designing and structure",
                subtitle:"Enterprise Cable Designing and structuring solutions",
                subtext:"Experts At Your Disposal",
                img:"https://blog.watsonfurniture.com/hs-fs/hubfs/Images/Blog%20Images/cables-mess-83268-717175-edited.jpg?width=1000&height=491&name=cables-mess-83268-717175-edited.jpg"

            },
            {
                title:"Fire Fighting Alarm systems",
                subtitle:"Great Care into Integrity Of the system",
                subtext:"We build future!",
                img:"http://www.mumtechnologies.com/wp-content/uploads/2019/05/A.jpg"
            },
            {
                title:"Security/Wifi systems",
                subtitle:"Great Care into Integrity Of the system",
                subtext:"We build a secure future!",
                img:"https://cmtecnologia.com.br/wp-content/uploads/2017/01/CLOUD.jpg"

            },
            {
                title:"MEP Works",
                subtitle:"One Stop solution",
                subtext:"Experts in MEP and a verified task force",
                img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnkY7L5myd6s968ANnoz-0nlZXiNwPi7OPvZdcUwohl1Qus-v2&s\"src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnkY7L5myd6s968ANnoz-0nlZXiNwPi7OPvZdcUwohl1Qus-v2&s"

            }


    ]

        let dummylistsupply=[

            {

                title:"Vitrified Tiles",
                subtext:"Top Quality Products",
                img:"https://www.sentosa.in/wp-content/uploads/2018/03/virtified-floor-titles.jpg"
            },
            {
                title:"Granite & Marble Slabs (with Laying works)",
                subtext:"Top Quality Products and excellent service",
                img:"https://www.remodelingexpense.com/rewp/wp-content/uploads/2018/02/granite-countertop-cost.jpg"
            },
            {
                title:"Civil Work and Construction",
                subtext:"Verified Professionals at your disposal",
                img:"https://5.imimg.com/data5/UC/CE/MY-30198268/civil-construction-work-500x500.jpg"

            },
            {
                title:"All electrical Systems Supply",
                subtext:"High Quality Promised",
                img:"https://www.agenor.hr/wp-content/uploads/2014/06/page-rjesenja-projektiranje-el-teh-sustava.jpg"
            }
        ]

        let Paragh1="We Roohi Mohammed Trading & Contracting W.L.L are one of the most accomplished And rapidly growing Contracting and trading Company In Doha-Qatar with reputed operations in a rapidly expanding and competitive market. We aim to be sought after by potential clients and employees for our track record in reliable execution, cost effectiveness, and world class technical sophistication. Our Team consists of Highly Motivated , qualified ,professionally trained project managers, engineers and technical staff with years of experience "
        let Paragh2="We offer fully comprehensive services like : Suppy of granite,marbles and vitrified tiles ( including laying work ) .Dealers In Qatar For Millenium tiles and Magnum Polymer Pvt Ltd products .We Provide End to end service from Seamless installations to highest quality assured maintenance .We also supply all high quality electrical systems and can Deliver high standard civil works  For Projects.Procure equipment of your need ,and provide spare Parts "
        let Paragh3="We have successfully executed many private and government MEP projects and always ensure customer satisfaction as our priority.We also have completed projects with supply & installation of chillers , Air handlers , DX split system ,Package units , Fan coil units ,Split A/C , Windows , central HVAC control system , BMS control system , Low current system , Fire Fighting systems and Fire Alarm Systems,Lightning Generator, Transformer, Safety & Security systems. Also executed irrigation, Sanitary and swimming pool projects "
        return {tileData: tiledata,dummylistScope:dummylistscope,dummyListSupply:dummylistsupply,paragrah1:Paragh1,paragrah2:Paragh2,paragrah3:Paragh3};
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
            <RmContainer/>
            {/*<Layout>*/}
                {/*<Typography gutterBottom variant="headline" component="h2" className={classes.textColor}>*/}
                    {/*{"HIIIIIIIIIIIIII"}*/}
                {/*</Typography>*/}
            {/*</Layout>*/}


<Layout className={classes.tileLayout}>
    <GridList cellHeight={250}  className={classes.gridList} cols={5}>
        {this.props.tileData.map(tile => (
            <GridListTile key={tile.img}>
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                    title={tile.title}
                    classes={{
                        root: classes.titleBar,
                        title: classes.title,
                    }}
                />
            </GridListTile>
        ))}
    </GridList>
</Layout>
            <Layout justifyContent={"center"}  className={classes.outerContainer}>
                <Layout className={classes.leftSection} direction={"column"}>
                    <Layout direction={"column"} className={classes.flex}>
                        <Layout className={classes.paragraphStyle}>
                        <Typography variant={"headline"} className={classes.titleText}>
                            About Us
                        </Typography>
                        </Layout>
                        <Layout className={classes.paragraphStyle}>
                        <Typography variant={"subtitle"} className={classes.contentText}>
                            {this.props.paragrah1}


                        </Typography>
                        </Layout>
                        <Layout className={classes.paragraphStyle}>
                        <Typography variant={"subtitle"} className={classes.contentText}>
                            {this.props.paragrah2}

                        </Typography>
                        </Layout>
                        <Layout className={classes.paragraphStyle}>
                            <Typography variant={"subtitle"} className={classes.contentText}>
                                {this.props.paragrah3}

                            </Typography>
                        </Layout>

                    </Layout>
                    {/*<Layout justifyContent={"center"}>*/}
                        {/*<Layout direction={"column"} alignItems={"center"} className={classes.innerContainer}>*/}
                            {/*<Layout>*/}
                                {/*<Divider/>*/}
                            {/*</Layout>*/}
                            {/*<Typography variant={"subheading"}>*/}
                                {/*Contact Us:*/}
                            {/*</Typography><*/}
                            {/*Typography variant={"subheading"}>*/}
                            {/*ROOHI MOHAMMED*/}
                        {/*</Typography>*/}
                            {/*<Typography variant={"subheading"}>*/}
                                {/*General Manager*/}
                            {/*</Typography>*/}
                            {/*<Typography variant={"subheading"}>*/}
                                {/*Mobile:+974 30896169*/}
                                {/*Whatsapp:+91 7353181568*/}
                            {/*</Typography>*/}
                            {/*<Typography variant={"subheading"}>*/}
                                {/*Authorized Dealers in Qatar*/}
                            {/*</Typography>*/}
                            {/*<Typography variant={"subheading"}>*/}
                                {/*ROOHI MOHAMMED TRADING & CONSTRUCTION W.L.L*/}
                            {/*</Typography>*/}
                            {/*<Typography variant={"subheading"}>*/}
                                {/*Tel:+974 30499847,P.O.Box:8516, Maither Al Qanar Street,Doha-Qatar*/}
                            {/*</Typography>*/}
                            {/*<Typography variant={"subheading"}>*/}
                                {/*roohi@rmtrading.co,ali@rmtrading.co*/}
                            {/*</Typography>*/}
                        {/*</Layout>*/}
                    {/*</Layout>*/}

                </Layout>
                <Layout className={classes.rightSection} direction={"column"}>

                    <Divider/>
                    <Typography variant={"headline"} className={classes.titleText}>
                        Supply of Materials
                    </Typography>

                    <List className={classes.root}>
                        {
                            this.props.dummyListSupply.map((item)=>{
                                return<ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="loading" src={item.img} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                <Typography className={classes.contentText} variant="body2" >
                                                {item.title}
                                                </Typography>
                                            </React.Fragment>
                                                }
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.contentText}
                                                    color="textPrimary"
                                                >
                                                    {item.subtitle}
                                                </Typography>
                                                <Typography className={classes.contentText} variant="body2" >
                                                {item.subtext}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            })
                        }

                    </List>
                    <Typography variant={"headline"} className={classes.titleText}>
                        Scope of Our services
                    </Typography>

                    <List className={classes.root}>
                        {
                            this.props.dummylistScope.map((item)=>{
                                return<ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="loading" src={item.img} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<React.Fragment>
                                            <Typography className={classes.contentText} variant="body2" >
                                                {item.title}
                                            </Typography>
                                        </React.Fragment>}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.contentText}
                                                    color="textPrimary"
                                                >
                                                    {item.subtitle}
                                                </Typography>
                                                <Typography className={classes.contentText} variant="body2" >
                                                    {item.subtext}
                                                </Typography>


                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            })
                        }

                    </List>


                </Layout>
            </Layout>



        </Layout>
    }
};


const Index = withStyles((theme) => {
    return {
        flex:{
            flex:1
        },
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






