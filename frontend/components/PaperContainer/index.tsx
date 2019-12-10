import { Paper, makeStyles, createStyles, Theme, Grid } from '@material-ui/core';

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      margin: '120px 0 100px 0'
      
    },
    paper: {
      // padding: '20px'
    }
  })
);

export const PaperContainer = props => {
  const classes = useStyles(props.theme);
  return (
    <Grid container alignItems="center" justify="center" className={classes.root}>
      <Grid item xs={5}>
        <Paper className={classes.paper}>{props.children}</Paper>
      </Grid>
    </Grid>
  );
};
