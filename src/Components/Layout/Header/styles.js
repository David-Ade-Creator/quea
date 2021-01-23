import { createStyles } from "@material-ui/core";

const styles = (theme) =>
  createStyles({
    headercontainer: {
      width:"100vw",
      position: "fixed",
      padding: "0 10px",
      display: "flex",
      justifyContent: "center",
      zIndex: "1",
      backgroundColor: "#001529"
    },
    logo: {
      color:"white",
      fontWeight: "lighter",
      fontSize: "25px"
    },
    header : {
      display:"flex",
      paddingLeft: "0",
      width:"70%",
      justifyContent:"space-between",
      [theme.breakpoints.down('md')]: {
        width:"100%",
      },
    },
    navlist: {
      display:"flex",
      justifyContent:"center"
    },
    menuitems: {
      [theme.breakpoints.down('sm')]: {
        display: "none",
      },
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
