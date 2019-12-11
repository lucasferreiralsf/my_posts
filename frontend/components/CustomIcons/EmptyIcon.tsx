import { SvgIcon, Typography, makeStyles } from "@material-ui/core";
import { borderRight } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    fontSize: "60px",
    marginRight: "4px"
  }
}))

const EmptyIcon = () => {
  const classes = useStyles({});
  
  return (
  <div className={classes.container}>
    <SvgIcon viewBox="0 -59 496 495" fontSize="small" className={classes.icon} >
      <path
        d="m248 288.5c-61.855469 0-112-50.144531-112-112h-128v192h480v-192h-128c0 61.855469-50.144531 112-112 112zm-160 48"
        fill="#57a4ff"
      />
      <g fill="#004fac">
        <path d="m495.480469 173.652344-64-168c-1.183594-3.105469-4.160157-5.152344-7.480469-5.152344h-352c-3.320312 0-6.296875 2.046875-7.480469 5.152344l-64 168c-.292969.824218-.4492185 1.6875-.4648435 2.558594 0 .105468-.0546875.183593-.0546875.289062v192c0 4.417969 3.582031 8 8 8h480c4.417969 0 8-3.582031 8-8v-192c0-.105469-.054688-.183594-.054688-.289062-.015624-.871094-.171874-1.734376-.464843-2.558594zm-417.96875-157.152344h340.976562l57.902344 152h-116.390625c-4.417969 0-8 3.582031-8 8 0 57.4375-46.5625 104-104 104s-104-46.5625-104-104c0-4.417969-3.582031-8-8-8h-116.390625zm402.488281 344h-464v-176h112.265625c4.1875 63.046875 56.546875 112.042969 119.734375 112.042969s115.546875-48.996094 119.734375-112.042969h112.265625zm0 0" />
        <path d="m56 328.5h-8v-24c0-4.417969-3.582031-8-8-8s-8 3.582031-8 8v32c0 4.417969 3.582031 8 8 8h16c4.417969 0 8-3.582031 8-8s-3.582031-8-8-8zm0 0" />
        <path d="m104 328.5h-16c-4.417969 0-8 3.582031-8 8s3.582031 8 8 8h16c4.417969 0 8-3.582031 8-8s-3.582031-8-8-8zm0 0" />
      </g>
    </SvgIcon>
    <Typography variant="body1">Sem posts.</Typography>
  </div>
  )
};

export default EmptyIcon;
