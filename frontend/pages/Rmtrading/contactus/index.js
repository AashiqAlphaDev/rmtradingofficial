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
import {
    GridList, GridListTile, GridListTileBar, Typography, List,
    ListItem,
    ListItemAvatar,
    ListItemText, Avatar, Divider, Button
} from "@material-ui/core/index";
import InputContainer from "../../../components/input";
import {TextField} from "@material-ui/core";
import uuidv1 from "uuid/v1";
import {topicCommands} from "../../../store/domain/topics";


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

                title:"CCTV installation & testing",
                subtitle:"top of the range scalable, IP based CCTV solution.",
                subtext:"Experts in security At Your Service",
                img:"https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_555/https://www.puffinsolutions.com/wp-content/uploads/2019/03/cctv-installation.jpg"
            },
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
        let dummytext="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Integer malesuada nunc vel risus commodo viverra. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. In cursus turpis massa tincidunt dui ut ornare. Vel facilisis volutpat est velit. Imperdiet massa tincidunt nunc pulvinar sapien et. Pellentesque elit eget gravida cum sociis natoque penatibus et. Egestas sed tempus urna et. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Enim tortor at auctor urna nunc. Neque vitae tempus quam pellentesque nec. Sit amet est placerat in egestas. Id ornare arcu odio ut sem nulla. Fames ac turpis egestas integer eget. Eu volutpat odio facilisis mauris sit amet.\n" +
            "\n" +
            "Tempus egestas sed sed risus pretium quam. Feugiat in ante metus dictum at tempor commodo. Consectetur a erat nam at lectus urna duis. Neque convallis a cras semper auctor neque vitae tempus quam. Varius quam quisque id diam vel quam elementum pulvinar. Lorem ipsum dolor sit amet. A pellentesque sit amet porttitor. Viverra accumsan in nisl nisi. Tortor at risus viverra adipiscing at in tellus integer feugiat. Varius duis at consectetur lorem donec massa sapien faucibus et. Cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo. Ornare aenean euismod elementum nisi quis. Vitae suscipit tellus mauris a diam maecenas sed enim ut.\n" +
            "\n" +
            "Risus pretium quam vulputate dignissim suspendisse in est ante in. Diam quis enim lobortis scelerisque fermentum dui. Nisl nisi scelerisque eu ultrices vitae auctor. Egestas purus viverra accumsan in nisl nisi scelerisque. Dui ut ornare lectus sit amet est placerat in egestas. Lacus vestibulum sed arcu non. Mauris augue neque gravida in fermentum et. Volutpat diam ut venenatis tellus in. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Ac ut consequat semper viverra nam. Mauris pellentesque pulvinar pellentesque habitant morbi tristique. Semper auctor neque vitae tempus. Malesuada fames ac turpis egestas maecenas pharetra convallis. Phasellus vestibulum lorem sed risus. Urna molestie at elementum eu facilisis sed odio morbi. Facilisis gravida neque convallis a cras."

        return {tileData: tiledata,dummyText:dummytext,dummylistScope:dummylistscope,dummyListSupply:dummylistsupply};
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
            <Layout className={classes.tileLayout}>
                <GridList cellHeight={250} className={classes.gridList} cols={5}>
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
            <Layout alignItems={"center"}  className={classes.innerContainer} direction={"column"}>
                <Typography variant={"subtitle"} className={classes.contactTitle}>
                    Contact Us On
                </Typography>
                    {/*<Layout justifyContent={"center"} className={classes.flex}>*/}
                        {/*<form  onSubmit={(e) => {*/}
                            {/*e.preventDefault();*/}

                        {/*}} className={classes.flexBox}>*/}
                            {/*<InputContainer label={"Name"}>*/}
                                {/*<TextField >*/}
                                {/*</TextField>*/}
                            {/*</InputContainer>*/}
                            {/*<InputContainer label={"Address"}>*/}
                                {/*<TextField >*/}
                                {/*</TextField>*/}
                            {/*</InputContainer>*/}
                            {/*<InputContainer label={"Phone No"}>*/}
                                {/*<TextField >*/}
                                {/*</TextField>*/}
                            {/*</InputContainer>*/}
                            {/*<InputContainer label={"Email ID"}>*/}
                                {/*<TextField >*/}
                                {/*</TextField>*/}
                            {/*</InputContainer>*/}
                            {/*<InputContainer label={"Query"}>*/}
                                {/*<TextField >*/}
                                {/*</TextField>*/}
                            {/*</InputContainer>*/}
                            {/*<Layout className={classes.buttonLayout}>*/}
                                {/*<Button variant={"raised"} >Submit</Button>*/}
                            {/*</Layout>*/}
                        {/*</form>*/}
                    {/*</Layout>*/}

            </Layout>

            <Layout direction={"column"} alignItems={"center"} className={classes.innerContainer}>
                <Layout>
                <Divider/>
                </Layout>
                <Typography variant={"subheading"} className={classes.contactTitle}>
                   Contact Us:
                </Typography><
                Typography variant={"subheading"} className={classes.contactTitle}>
                ROOHI MOHAMMED
                </Typography>
                <Typography variant={"subheading"} className={classes.contactTitle}>
                    General Manager
                </Typography>
                <Typography variant={"subheading"} className={classes.contactTitle}>
                    Mobile:+974 30896169 / +974 30499847
                    Whatsapp:+974 30896169 / +974 30499847

                </Typography>

                <Typography variant={"subheading"} className={classes.contactTitle}>
                    ROOHI MOHAMMED TRADING & CONSTRUCTION W.L.L
                </Typography>
                <Typography variant={"subheading"} className={classes.contactTitle}>
                    Office Number 41,Building no 4 , Zone 53, Street 690 ,Doha-Qatar
                </Typography>

                <Layout>
                <Typography variant={"subheading"} className={classes.contactTitle}>
                    roohi@rmtrading.co,
                </Typography>
                    <Typography variant={"subheading"} className={classes.contactTitleAlt}>
                        ali@rmtrading.co
                    </Typography>

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
        flexBox:{
          flex:1,
            width:400
        },
        contactTitle:{
          color:"#efedef"
        },
        contactTitleAlt:{
            color:"#efedef",
            paddingLeft:theme.spacing.unit

        },
        outerContainer:{
            flex:1,
            padding:theme.spacing.unit*2

        },
        buttonLayout:{
          paddingTop:theme.spacing.unit*2,
            justifyContent:"flex-end"
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
        innerContainer:{
            padding:theme.spacing.unit*2
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
        }
    }

})(connect(store => store)(_Index))
export default Index;










