import { createStyles } from "@material-ui/core";

const styles = (theme) =>
  createStyles({
    container: {
      position: "fixed",
      width: "100%",
      lineHeight: "50px",
      padding: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "1",
    },
    logo: {
      color:"white",
      fontWeight: "lighter",
      fontSize: "25px"
    },
    header : {
      display:"flex",
      paddingLeft: "10px",
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
      height:"100%",
      backgroundColor:"transparent",
      borderColor:"transparent",
    } ,
    drawerbutton: {
      marginRight:'5px',
      height:"100%",
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
