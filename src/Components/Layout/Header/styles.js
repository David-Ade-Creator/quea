import { createStyles } from "@material-ui/core";

const styles = (theme) =>
  createStyles({
    headercontainer: {
      width:"100%",
      position: "fixed",
      padding: "0 10px",
      height:"10%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "3",
      color:"white",
      backgroundColor: "#001529"
    },
    header : {
      display:"flex",
      width:"70%",
      height:"100%",
      alignItems:"center",
      justifyContent:"space-between",
      [theme.breakpoints.down('md')]: {
        width:"100%",
      },
    },
    logo: {
      color:"white",
      fontWeight: "lighter",
      fontSize: "25px"
    },
    navbar: {
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
    },
    navlist: {
      display:"flex",
      listStyle:"none",
      padding:"5px",
      lineHeight:"15px",
      [theme.breakpoints.down('sm')]: {
        display: "none",
      },
    },
    navlist2: {
      display:"none",
      listStyle:"none",
      padding:"5px",
      lineHeight:"15px",
      [theme.breakpoints.down('sm')]: {
        display: "flex",
      },
    },
    navitems: {
      padding:"20px",
      margin:"14px 0 0 0",
      fontSize:"15px",
      cursor:"pointer",
    },
    menubuttons: {
      margin:'0 5px 0 5px',
      backgroundColor:"transparent",
      borderColor:"transparent",
    } ,
    drawerbutton: {
      marginRight:'5px',
      backgroundColor:"transparent",
      borderColor:"transparent",
      [theme.breakpoints.up('md')]: {
        display: "none",
      },
    },
    menus: {
      display:"flex",
      flexDirection: "row"
    },
  });

export default styles;
