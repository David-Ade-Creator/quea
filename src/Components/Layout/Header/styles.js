import { createStyles } from "@material-ui/styles";

const styles = () =>
  createStyles({
    container: {
      position: "fixed",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      zIndex: "1",
    },
    menubuttons: {
        margin:'0 20px'
    } ,
    menus: {
      display:"flex",
      flexDirection: "row"
    },
    logo: {
      color:'white',
      fontWeight: 'Bold'
    }
  });

export default styles;
