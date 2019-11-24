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
    ListItemText, ListSubheader, Divider, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog
} from "@material-ui/core/index";


let _Index = class extends React.Component {

    static async getInitialProps({query, sessionID}) {
    let titledata=[


        {
            title:"Travertine",
            img:"../../../static/images/marble/IMG-20191113-WA0036.jpg"

        },
        {
            title:"Travertine Noche",
            img:"../../../static/images/marble/IMG-20191113-WA0037.jpg/"

        },
        {
            title:"Beige",
            img:"../../../static/images/marble/IMG-20191113-WA0038.jpg"

        },

        {
            title:"Elicanty",
            img:"../../../static/images/marble/IMG-20191113-WA0040.jpg"

        },

        {
            title:"Red Dragon",
            img:"../../../static/images/marble/IMG-20191113-WA0041.jpg"

        },

        {
            title:"Grey",
            img:"../../../static/images/marble/IMG-20191113-WA0042.jpg"

        },
        {
            title:"Blue",
            img:"../../../static/images/marble/IMG-20191113-WA0043.jpg"

        },
        {
            title:"Beige",
            img:"../../../static/images/marble/IMG-20191113-WA0044.jpg"

        },
        {
            title:"Bidasar Brown",
            img:"../../../static/images/granites/bidasarbrown.jpg"
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
            title:"Bidasar Pink",
            img:"../../../static/images/granites/bidasarpink.jpg"
        },
        {
            title:"Green Marble",
            img:"../../../static/images/granites/greenmarble.jpg"
        },
        {
            title:"Green Marble",
            img:"../../../static/images/granites/greenmarble1.jpg"
        },
        {
            title:"Jaisalmer Pink",
            img:"../../../static/images/granites/jaisalmerpink.jpg"
        },
        {
            title:"Jaisalmer Yellow",
            img:"../../../static/images/granites/jaisalmeryellow.jpg"
        },




    ]
        let granitetiledata=[

            {
                title:"Arun Gold",
                img:"../../../static/images/granites/arungold.jpg"
            },
            {
                title:"Astoria",
                img:"../../../static/images/granites/astoria.jpg"
            },
            {
                title:"Bala flower",
                img:"../../../static/images/granites/balaflower.jpg"
            },

            {
                title:"Black Galaxy",
                img:"../../../static/images/granites/blackgalaxy.jpg"
            },
            {
                title:"Cats eye",
                img:"../../../static/images/granites/catseye.jpg"
            },
            {
                title:"Cats Eye Brown",
                img:"../../../static/images/granites/catseyebrown.jpg"
            },
            {
                title:"Colombo Juprana",
                img:"../../../static/images/granites/colombo juprana.jpg"
            },
            {
                title:"Colombo Juprana Wavy",
                img:"../../../static/images/granites/colombojupranawavy.jpg"
            },
            {
                title:"Colonial White",
                img:"../../../static/images/granites/colonialwhite.jpg"
            },
            {
                title:"Crystal Yellow",
                img:"../../../static/images/granites/crystalyellow.jpg"
            },
            {
                title:"Desert Brown",
                img:"../../../static/images/granites/desertbrown.jpg"
            },
            {
                title:"Fantastic Green",
                img:"../../../static/images/granites/fantasticgreen.jpg"
            },
            {
                title:"French White",
                img:"../../../static/images/granites/frenchwhite.jpg"
            },
            {
                title:"G20 Black",
                img:"../../../static/images/granites/G20black.jpg"
            },

            {
                title:"Hassan Green",
                img:"../../../static/images/granites/hassangreen.jpg"
            },
            {
                title:"Indian Juparana",
                img:"../../../static/images/granites/indianjuprana.jpg"
            },

            {
                title:"Jalore Green",
                img:"../../../static/images/granites/jaloregreen.jpg"
            },
            {
                title:"Jet black",
                img:"../../../static/images/granites/jetblack.jpg"
            },
            {
                title:"Kangeyam Gold",
                img:"../../../static/images/granites/kangeyamgold.jpg"
            },
            {
                title:"Kangeyam Ivory",
                img:"../../../static/images/granites/kangeyamivory.jpg"
            },
            {
                title:"Kashmir White",
                img:"../../../static/images/granites/kashmirwhite.jpg"
            },
            {
                title:"Kodur Red",
                img:"../../../static/images/granites/kodurred.jpg"
            },
            {
                title:"Koduvai Ivory",
                img:"../../../static/images/granites/koduvaiivory.jpg"
            },
            {
                title:"KP White",
                img:"../../../static/images/granites/kpwhite.jpg"
            },
            {
                title:"Lakha Red",
                img:"../../../static/images/granites/lakhared.jpg"
            },
            {
                title:"Majestic Brown",
                img:"../../../static/images/granites/majesticbrown.jpg"
            },
            {
                title:"Makrana Dungeon White",
                img:"../../../static/images/granites/makranadungeon white.jpg"
            },
            {
                title:"Makrana Grey",
                img:"../../../static/images/granites/makranagrey.jpg"
            },
            {
                title:"Makrana White",
                img:"../../../static/images/granites/makranawhite.jpg"
            },
            {
                title:"NH Red",
                img:"../../../static/images/granites/nhred.jpg"
            },
            {
                title:"Orissa Blue",
                img:"../../../static/images/granites/orrisablue.jpg"
            },
            {
                title:"P white",
                img:"../../../static/images/granites/pwhite.jpg"
            },
            {
                title:"Rajasthan Pink",
                img:"../../../static/images/granites/rajasthanpink.jpg"
            },
            {
                title:"Red multicolor",
                img:"../../../static/images/granites/redmulticolor1.jpg"
            },
            {
                title:"Red multicolor",
                img:"../../../static/images/granites/redmulticolor2.jpg"
            },
            {
                title:"Romantic Pink",
                img:"../../../static/images/granites/romanticpink.jpg"
            },
            {
                title:"Ruby red",
                img:"../../../static/images/granites/rubyred.jpg"
            },
            {
                title:"Silver Grey",
                img:"../../../static/images/granites/silvergrey.jpg"
            },
            {
                title:"Silver Pearl",
                img:"../../../static/images/granites/silverpearl.jpg"
            },
            {
                title:"Siva Gold",
                img:"../../../static/images/granites/sivagold.jpg"
            },
            {
                title:"Siva gold",
                img:"../../../static/images/granites/sivagold2.jpg"
            },
            {
                title:"Sparkle Brown",
                img:"../../../static/images/granites/sparklebrown.jpg"
            },
            {
                title:"Tiger Black",
                img:"../../../static/images/granites/tigerblack.jpg"
            },
            {
                title:"Tiger Skin",
                img:"../../../static/images/granites/tigerskin.jpg"
            },
            {
                title:"Tumkur Phopery",
                img:"../../../static/images/granites/tumkurphopery.light.jpg"
            },
            {
                title:"Tumkur Phophery",
                img:"../../../static/images/granites/tumkurphophery.jpg"
            },
            {
                title:"Vizag Blue",
                img:"../../../static/images/granites/vizagblue.jpg"
            },




        ]
        let introtext="Our team of highly motivated, professionally trained project managers, Group of Engineers and\n" +
            "\n" +
            "Technical Staff has many years of working knowledge of Middle East Services.\n" +
            "\n" +
            "We offer a fully comprehensive from Consolation, Design of Civil & MEP works. Procurement of equipment, Spare parts, Installation through to upkeep and maintenance ensuring the highest standards at all times.\n" +
            "\n" +
            " \n" +
            "\n" +
            "Perfect coordination between biding and purchasing department makes us cost efficient and reliable at the same time as we have adopted relational approach not only with employees but also with our Vendors and suppliers, we have the capacity to supply and install all kinds of Civil & MEP equipment and material.\n" +
            "\n" +
            " \n" +
            "\n" +
            "We have executed successfully many private and Government Civil & MEP Projects, Completed projects with Supply & Install Chillers, Air handlers, DX Split system, Package units, Fan coil units, Split A/C, Windows, Central HVAC control system, BMS control system, Low current system, FireFighting and Fire Alarm Systems, Lighting Generator, Transformer, Safety & Security system, Irrigation, Sanitary, Swimming Pool and Plumbing works.\n" +
            "\n" +
            " \n" +
            "\n" +
            "We believe that quality excellence is inseparable from health, Safety and Environmental protection and with that belief; the Establishment is certified for ISO 9001:2008-Quality’ OHSAS 18001:2007- occupational Health and Safety.\n" +
            "\n" +
            " \n" +
            "\n" +
            "Our highly reliable operation and Maintenance division offers annual maintenance contract, which will ensure a trouble free performance of all your equipment throughout the year.\n" +
            "\n" +
            " \n" +
            "\n" +
            "As a part of Expansion, our company has set up Trading Division and Duct Factory and our\n" +
            "\n" +
            "Trading division is engaged in Stocking, Supply, Logistics of all kinds of Electro mechanical materials to the construction industry .Duct factory is equipped with advanced duct fabrication machines and capable of manufacturing 130 Tons of ducts per month ."
      let projectdata=[{
          projectName: "Palm Tower",
          mainContractor: "Arabian Construction Company",
          consultant:"Mohammed Harasani Architects",
          location:"Riyadh",
          scopeOfWork:"Supply and Installation of HVAC, Installation of BMS Sysytem",
          yearOfCompletion:"2016"
      },
          {
          projectName: "Head Quarter for MOE",
            mainContractor: "Saudi Oger",
            consultant:"Projacs",
            location:"Riyadh",
            scopeOfWork:"Supply and Installation of HVAC",
            yearOfCompletion:"2018"
    },
          {
              projectName: "King Khalid Hospital",
              mainContractor: "HACE  Company",
              consultant:"Ministry Of Health",
              location:"Al Kharj",
              scopeOfWork:"Supply and Installation of HVAC, Installation of BMS, Steam and Boiler Systems",
              yearOfCompletion:"2010"
          },{
              projectName: "Princes Noura University(PNU)",
              mainContractor: "Saudi Oger",
              consultant:"Dar Al Handasa",
              location:"Riyadh",
              scopeOfWork:"Supply and Installation of HVAC in Central Library, Administration and 25 Villas",
              yearOfCompletion:"2013"
          },

          {
              projectName: "Al Imam Saud University",
              mainContractor: "AL Fouzan Trading And Contracting Co",
              consultant:"Typsa",
              location:"Riyadh",
              scopeOfWork:"HVAC, Chilled Water Network for 7 colleges and 13 housing tower  building including all Mechanical infrastructure works",
              yearOfCompletion:"2008-2016"
          },
          {
              projectName: "King Abdullah Residential Complex-Rowdah.",
              mainContractor: "Saudi Oger",
              consultant:"Al Rasheed Engineering",
              location:"Riyadh",
              scopeOfWork:"HVAC-Family Villas-3&5 , Villa E-Bldg 9&100.",
              yearOfCompletion:"2007"
          },
          {
              projectName: "Taibah University",
              mainContractor: "Saudi BinLaden Group RPD.",
              consultant:"Zuhar &Fayez",
              location:"Madinah AL Munawwarah",
              scopeOfWork:"Chilled Water Network for B-011, 13,16C,21,23 &601.",
              yearOfCompletion:"2012"
          },

          {
              projectName: "National Hospital",
              mainContractor: "Abdullah Sayed Contracting",
              consultant:"Ministry Of Health",
              location:"Kamees Mushaat",
              scopeOfWork:"HVAC Net Works",
              yearOfCompletion:"2003"
          }


          ]

        return {tileData:titledata,introText:introtext,projectData:projectdata,graniteTileData:granitetiledata}
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


    state = { checkedA: true, checkedB: true,selectedItem:"marble",showAddedState:false,selectedTile:{}};


    render() {
        const {classes} = this.props;
        return <Layout alignItems={"center"}  className={classes.adminContainer} direction={"column"}>
            <RmContainer/>
            <Layout justifyContent={"center"}  className={classes.flexs} >
            <Layout className={classes.leftSection} direction={"column"}>
                {/*<ListItem button >*/}
                    {/*{*/}
                        {/*[1,2,3,4,5,6,7,8,9,10].map((item)=>{*/}
                            {/*return   <ListItemText primary={item} />*/}

                        {/*})*/}
                    {/*}*/}
                {/*</ListItem>*/}
                <List component="nav"
                      aria-labelledby="nested-list-subheader"
                      subheader={
                          <ListSubheader component="div" id="nested-list-subheader" color={"primary"}>
                              Categories
                          </ListSubheader>
                      }
                      className={classes.root}>
                    <ListItem button >

                        <Layout>
                            <div onClick={(e)=>{e.preventDefault(); this.setState({selectedItem:"marble"})}}>
                            <Typography variant={"caption"} className={classes.listText}>
                            Marbles
                            </Typography>
                            </div>

                        </Layout>
                    </ListItem>
                    <ListItem button >

                        <Layout>
                            <div onClick={(e)=>{e.preventDefault(); this.setState({selectedItem:"granite"})}}>
                                <Typography variant={"caption"} className={classes.listText}>
                                    Granite
                                </Typography>
                            </div>

                        </Layout>
                    </ListItem>
                    <ListItem  >

                        <Layout diretion={"column"}>

                                <Typography variant={"caption"} className={classes.listText}>
                                    Vetrified Tiles
                                </Typography>


                        </Layout>
                    </ListItem>
                    <ListItem button >
                    <Layout className={classes.subheadingline}>
                        <div onClick={(e)=>{e.preventDefault(); this.setState({selectedItem:"catalouge1"})}}>
                            <Typography variant={"caption"} className={classes.listText}>
                                Catalouge 1
                            </Typography>
                        </div>
                    </Layout>
                    </ListItem>
                    <ListItem button >
                    <Layout className={classes.subheadingline}>
                        <div onClick={(e)=>{e.preventDefault(); this.setState({selectedItem:"catalouge2"})}}>
                            <Typography variant={"caption"} className={classes.listText}>
                                Catalouge 2
                            </Typography>
                        </div>
                    </Layout>
                    </ListItem>
                    <ListItem button >

                    <Layout className={classes.subheadingline}>
                        <div onClick={(e)=>{e.preventDefault(); this.setState({selectedItem:"catalouge3"})}}>
                            <Typography variant={"caption"} className={classes.listText}>
                                Catalouge 3
                            </Typography>
                        </div>
                    </Layout>
                    </ListItem>
                    <ListItem button >

                    <Layout className={classes.subheadingline}>
                        <div onClick={(e)=>{e.preventDefault(); this.setState({selectedItem:"catalouge4"})}}>
                            <Typography variant={"caption"} className={classes.listText}>
                                Catalouge 4
                            </Typography>
                        </div>
                    </Layout>
                    </ListItem>
                    <ListItem button >
                    <Layout className={classes.subheadingline}>
                        <div onClick={(e)=>{e.preventDefault(); this.setState({selectedItem:"catalouge5"})}}>
                            <Typography variant={"caption"} className={classes.listText}>
                                Catalouge 5
                            </Typography>
                        </div>
                    </Layout>
                    </ListItem>
                    <ListItem button >

                    <Layout className={classes.subheadingline}>
                        <div onClick={(e)=>{e.preventDefault(); this.setState({selectedItem:"catalouge6"})}}>
                            <Typography variant={"caption"} className={classes.listText}>
                                Catalouge 6
                            </Typography>
                        </div>
                    </Layout>
                    </ListItem>














                    <ListItem button >

                        <Layout>
                            <div onClick={(e)=>{e.preventDefault(); this.setState({selectedItem:"mepworks"})}}>
                                <Typography variant={"caption"} className={classes.listText}>
                                    Mep works
                                </Typography>
                            </div>

                        </Layout>
                    </ListItem>


                </List>

            </Layout>
                {
                    this.state.selectedItem=="granite" &&
                    <Layout className={classes.rightSection}>
                        <div className={classes.roots}>
                            <GridList cellHeight={370} cols={4} >
                                {this.props.graniteTileData.map(tile => (
                                    <GridListTile key={tile.img}>
                                        <div onClick={(e)=>{e.preventDefault(); this.setState({selectedTile:tile}); this.setState({showAddedState:true})}}>
                                            <img src={tile.img} alt={tile.title} />
                                            <GridListTileBar
                                                title={tile.title}
                                            />
                                        </div>
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>

                    </Layout>

                }
                {
                    this.state.selectedItem=="marble" &&
                    <Layout className={classes.rightSection}>
                        <div className={classes.roots}>
                            <GridList cellHeight={370} cols={4} >
                                {this.props.tileData.map(tile => (
                                    <GridListTile key={tile.img}>
                                        <div onClick={(e)=>{e.preventDefault(); this.setState({selectedTile:tile}); this.setState({showAddedState:true})}}>
                                        <img src={tile.img} alt={tile.title} />
                                        <GridListTileBar
                                            title={tile.title}
                                        />
                                        </div>
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>

                    </Layout>

                }

                {
                    this.state.selectedItem=="catalouge1" &&
                    <Layout className={classes.rightSection}>
                        <iframe name="holder" src={"../../../static/pdf/30X60 KITCHEN.pdf"} sandbox className={classes.frameArea}>

                        </iframe>
                    </Layout>

                }
                {
                    this.state.selectedItem=="catalouge2" &&
                    <Layout className={classes.rightSection}>
                        <iframe name="holder" src={"../../../static/pdf/30x30 Wall body floor.pdf"} sandbox className={classes.frameArea}>

                        </iframe>
                    </Layout>

                }
                {
                    this.state.selectedItem=="catalouge3" &&
                    <Layout className={classes.rightSection}>
                        <iframe name="holder" src={"../../../static/pdf/30x45 WHITE SERIES.pdf"} sandbox className={classes.frameArea}>

                        </iframe>
                    </Layout>

                }
                {
                    this.state.selectedItem=="catalouge4" &&
                    <Layout className={classes.rightSection}>
                        <iframe name="holder" src={"../../../static/pdf/30x60 GLOSSY SERIES.pdf"} sandbox className={classes.frameArea}>

                        </iframe>
                    </Layout>

                }
                {
                    this.state.selectedItem=="catalouge5" &&
                    <Layout className={classes.rightSection}>
                        <iframe name="holder" src={"../../../static/pdf/600x600 Booklet Series - Copy.pdf"} sandbox className={classes.frameArea}>

                        </iframe>
                    </Layout>

                }
                {
                    this.state.selectedItem=="catalouge6" &&
                    <Layout className={classes.rightSection}>
                        <iframe name="holder" src={"../../../static/pdf/600x600 Glossy - Copy.pdf"} sandbox className={classes.frameArea}>

                        </iframe>
                    </Layout>

                }
                {
                    this.state.selectedItem=="mepworks" &&
                    <Layout className={classes.rightSection} direction={"column"}>

                        <Layout direction={"column"}>
                            <Layout className={classes.themeSpacing}>
                            <Typography variant={"title"} className={classes.mepTitle}>
                                Introduction

                            </Typography>
                            </Layout>
                            <Layout className={classes.themeSpacing}>


                            <Typography variant={"subtitle"} className={classes.mepText}>
                                {this.props.introText}
                            </Typography>
                            </Layout>
                        </Layout>
                        <Layout className={classes.themeSpacing} direction={"column"}>
                            <Typography variant={"title"} className={classes.mepTitle}>
                                We have assosiated with Alamco In the following projects
                            </Typography>
                        </Layout>
                        <Layout>
                            <div className={classes.roots}>
                            <GridList cellHeight={180} cols={2} >
                                {this.props.projectData.map(tile => (
                                    <GridListTile key={tile.projectName}>
                                        <Layout direction={"column"}>


                                            <Layout>
                                                <Typography variant={"subtitle"} className={classes.projectTitle}>
                                                    Project Name :
                                                </Typography>
                                                <Typography variant={"subtitle"} className={classes.listText}>
                                                    {tile.projectName}
                                                </Typography>
                                            </Layout>

                                            <Layout>
                                            <Typography variant={"subtitle"} className={classes.projectTitle}>
                                                Main Contractor :
                                            </Typography>
                                            <Typography variant={"subtitle"} className={classes.listText}>
                                                {tile.mainContractor}
                                            </Typography>
                                            </Layout>


                                            <Layout>
                                                <Typography variant={"subtitle"} className={classes.projectTitle}>
                                                    Consultant :
                                                </Typography>
                                            <Typography variant={"subtitle"} className={classes.listText}>
                                                {tile.consultant}
                                            </Typography>
                                            </Layout>

                                            <Layout>
                                                <Typography variant={"subtitle"} className={classes.projectTitle}>
                                                    Location :
                                                </Typography>
                                            <Typography variant={"subtitle"} className={classes.listText}>
                                                {tile.location}
                                            </Typography>
                                            </Layout>

                                            <Layout>
                                                <Typography variant={"subtitle"} className={classes.projectTitle}>
                                                  Work Scope :
                                                </Typography>
                                            <Typography variant={"subtitle"} className={classes.listText}>
                                                {tile.scopeOfWork}
                                            </Typography>
                                            </Layout>
                                            <Layout>
                                                <Typography variant={"subtitle"} className={classes.projectTitle}>
                                                    Year Of Completion :
                                                </Typography>
                                            <Typography variant={"subtitle"} className={classes.listText}>
                                                {tile.yearOfCompletion}
                                            </Typography>
                                            </Layout>
                                        </Layout>

                                    </GridListTile>
                                ))}
                            </GridList>
                            </div>

                        </Layout>
                    </Layout>

                }



            </Layout>
            <Dialog
                open={this.state.showAddedState}
                onClose={() => {
                    this.setState({showAddedState: false})
                }}
            >

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.state.selectedTile.title}
                    </DialogContentText>
                <img src={this.state.selectedTile.img}/>

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
        listText:{
           color:"#efedef"
        },
        frameArea :{
            display: "block",
            width: "100%",
            height: "100%",
            overflow: "auto",
            border: "#999999 1px solid",
            margin: "0px",
            padding: "0px"
        },
        themeSpacing:{
          paddingBottom:theme.spacing.unit*4
        },
        mepTitle:{
            color:"#6ead3a"

        },
        projectTitle:{
            color:"#6ead3a"

        },
        mepText:{
            color:"#efedef"
        },

        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: "#222022",
        },
        leftSection:{
            flex:1,
            backgroundColor:"#222022",
            textColor:"#6ead3a"
        },
        flexs:{
            flex:1,
            width:"100%"
        },
        rightSection:{flex:5,padding:theme.spacing.unit},
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
        roots: {
            width:"100%",
            height:"100%",
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: "#222022",
        },
        gridList: {
            width: 500,
            height: 450,
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
        subheadingline:{
            paddingLeft:theme.spacing.unit*2
        }
    }

})(connect(store => store)(_Index))
export default Index;








