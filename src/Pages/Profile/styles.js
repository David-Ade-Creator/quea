import { createStyles } from "@material-ui/core";

const styles = () =>
    createStyles({
        container:{
            minHeight:'70vh'
        },
        photodiv: {
            minHeight:"250px",
            textAlign:"center",
            marginTop: "8%",
        },
        editdiv : {
            minHeight: "250px",
            padding: "25px 10px"
        },
        backbtn: {
            marginBottom: "3%",
        },
    });

export default styles;