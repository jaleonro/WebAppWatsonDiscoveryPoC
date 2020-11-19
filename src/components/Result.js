import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
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
    display: 'flex',
    align: 'center',
    justifyContent: 'center',
  },
  pos: {
    marginTop: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  chipsList: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0),
    margin: 0,
  },
  chip: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  link: {
    marginTop: 9,
  },
}));

function Result(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
        <CardContent>
            <Typography className={classes.title} gutterBottom >
                {props.title.replace('.pdf','')}
            </Typography>
          <Divider/>
          <Typography className={classes.subtitle} gutterBottom >
            Sugerencias de busqueda
          </Typography>
          <div className={classes.chipsList}>
            {props.enrichments.map((enrichment) => {
              return <Chip className={classes.chip} label={enrichment.text} variant="outlined"
              size="small" color='primary' clickable onClick={() => props.handleClick(enrichment.text)}/>
            })}           
          </div> 
        </CardContent>
        <Divider/> 
        <div className={classes.actions}>
            <Typography className={classes.link} gutterBottom color="primary">
                <Link href={props.url} target="_blank">
                    Ir a la pagina
                </Link>
            </Typography>

            <FormGroup row>
            <FormControlLabel label="¿Este resultado te fue útil? Si" labelPlacement='start' 
            control={<Checkbox icon={<ThumbUpOutlinedIcon color="primary"/>} 
            checkedIcon={<ThumbUpIcon color="primary"/>} name="checkedH" />}  />
            <FormControlLabel label="No" labelPlacement='start' 
            control={<Checkbox icon={<ThumbDownAltOutlinedIcon color="primary"/>} 
            checkedIcon={<ThumbDownIcon color="primary"/>} name="checkedH" />}  />
            </FormGroup>
        </div>
      </Card>
    );
}

export default Result;