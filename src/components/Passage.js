import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'GhostWhite',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    display: 'flex',
    align: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 14,
  },
  pos: {
    marginTop: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    marginTop: 9,
  },
}));

function Passage(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
        <CardContent>
            <Typography className={classes.title} gutterBottom >
                {props.title}
            </Typography>
            <Divider/>
            <Typography className={classes.pos} gutterBottom color="textSecondary">
                {'..."'+props.text+'"...'}
            </Typography>
        </CardContent>
        <Divider/> 
        <div className={classes.actions}>
            <Typography className={classes.link} gutterBottom color="primary">
                <Link href={props.url} target="_blank">
                    Ir a la pagina en donde se encuentra esta respuesta
                </Link>
            </Typography>
        </div>
      </Card>
    );
}

export default Passage;