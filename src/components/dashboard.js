import '../App.css';
import React, { useState, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import StartTimer from "../components/startTimer";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default ()=> {
  const history = useHistory();
  const classes = useStyles();
  const exerciseRef = useRef(null);
  const restRef = useRef(null);
  const setRef = useRef(null);

  const [open, setOpen] = React.useState(false);
  const [showCard, setShowCard] = useState(false);
  const [numberOfCards, setNumberCards] = useState([]);

  const [initialValue, setInitialValue] = useState({
    title: '',
    exercise: '',
    rest: '',
    set: ''
  })
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
 
  const playHandler = () => {
    setNumberCards([...numberOfCards, { name: initialValue.title }])
    setShowCard(true);
    setOpen(false);
    // history.push('/startTimer',{initialValue});
  }
  const clickHandler = () => {
    history.push('/startTimer',{initialValue});
  }
  const titleHandler = (e) => {
      if(e.target.id === 'title') setInitialValue({ title: e.target.value })
      if(e.target.id === 'sets') setInitialValue({ ...initialValue, set: e.target.value })
      if(e.target.id === 'exercise') setInitialValue({  ...initialValue, exercise: e.target.value })
      if(e.target.id === 'rest') setInitialValue({  ...initialValue, rest: e.target.value })
  }
  return (
    <div className="App">
      <h3>Welcome</h3>
      <h3>Create your own Timer</h3>
      <div onClick={handleOpen}>
        <svg class="AddCircleTwoToneIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm5 9h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" opacity=".3"></path><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
      </div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <TextField
            id="title"
            className="text-field-short"
            hintText="00"
            onChange={titleHandler}
            label="Title"
          />
          <div className='container'>
            <form>
              <label className='filed-names'>Sets</label><br />
              <input ref={setRef} type="text" id="sets" name="fname" onChange = {titleHandler}/><br />
              <label className='filed-names'>Exercise</label><br />
              <input ref={exerciseRef} type="text" id="exercise" name="lname" onChange = {titleHandler}/>
              <label className='filed-names'>Rest</label><br />
              <input ref={restRef} type="text" id="rest" name="lname" onChange = {titleHandler}/>
            </form>
          </div>
        </DialogTitle>
        <DialogActions>
          <div onClick={playHandler}>
            <svg class="AddCircleTwoToneIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm5 9h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" opacity=".3"></path><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
          </div>

        </DialogActions>
      </Dialog>
      {
        showCard && numberOfCards.length && numberOfCards.map(item => (
          <div>
            <Card className={classes.root}>
              <div className='card-container'>
                <div>
                  <CardActionArea>
                    <CardContent>
                      <div className='card-withicon' onClick={clickHandler}>
                        <svg class="AddCircleTwoTone" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm5 9h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" opacity=".3"></path><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.name}
                        </Typography>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </div>
                <div className='card-fav-del'>
                  <CardActions>
                    <Button size="small" color="primary">
                      Fav
                    </Button>
                    <Button size="small" color="primary">
                      Delete
                    </Button>
                  </CardActions>
                </div>
              </div>
            </Card>
          </div>
        ))
      }
    </div>
  );
}
