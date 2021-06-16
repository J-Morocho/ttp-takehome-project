import React from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { TableContainer } from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid transparent",
    borderRadius: 8,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: 10
  },
  buttonContainer: {
    marginTop: 50,
    display: "flex",
    justifyContent: "flex-end" 
  },
  btn: {
    margin: 10
  }
}));

const CountButton = ({ text }) => {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const parseText = (editorText) => {

    // editor encloses new lines in <p> tags
    const doc = new DOMParser().parseFromString(editorText, "text/html")
    const paragraphCount = doc.body.children.length

    // replace <p> tags in editor to obtain text only
    let text = editorText.replace(/(<([^>]+)>)/ig, '')

    // perform counting operations on text
    const characterCount = text.split("").length;
    const wordCount = text.split(" ").length - 1;
    const sentenceCount = text.split(".").length - 1;

    const words = text.split(' ')
    
    const bigramStore = {}

    for (let i = 0; i < words.length; i++) {
      // concatenate i and i+1 and add to store
      const w1 = words[i]
      const w2 = words[i+1] ? words[i+1] : ''

      const bigram = w1.toLowerCase() + ' ' + w2.toLowerCase()

      if (bigram in bigramStore) {
        bigramStore[bigram] += 1
      } else {
        bigramStore[bigram] = 1
      }

    }

    const bigramCount = Object.keys(bigramStore).length

    return {
      characterCount,
      wordCount,
      sentenceCount,
      paragraphCount,
      bigramCount,
    };

  };

  const parsedText = parseText(text);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Word count</h2>
      <TableContainer>
        <Table>
          <TableRow>
            <TableCell align="left">Characters</TableCell>
            <TableCell align="right">{parsedText.characterCount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Words</TableCell>
            <TableCell align="right">{parsedText.wordCount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Sentences </TableCell>
            <TableCell align="right">{parsedText.sentenceCount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Paragraphs </TableCell>
            <TableCell align="right">{parsedText.paragraphCount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Bigrams </TableCell>
            <TableCell align="right">{parsedText.bigramCount} </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
      <div className={classes.buttonContainer}>
        <Button variant="outlined" color="primary" onClick={handleClose} className={classes.btn}> Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleClose} className={classes.btn}> OK</Button>
      </div>
    </div>
  );

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Word Count
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default CountButton;
