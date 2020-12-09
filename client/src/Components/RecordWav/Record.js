import React from 'react';
import { ReactMic } from 'react-mic';
import Upload from './Upload'
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import "./Record.css"



export class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      data: null
    }

  }

  startRecording = () => {
    this.setState({
      record: true,
      data: null
    });
  }

  stopRecording = () => {
    this.setState({
      record: false
    });
  }


  onStop = (recordedBlob) => {
    this.setState({data: recordedBlob})
    console.log(recordedBlob)
  }
 

  render() {
    return (
      <div style={{marginRight: "2rem"}}>

        <Typography variant="h4" align="center"><b>Record</b></Typography>

       <Grid container justify="center" align="center" style={{margin: "2rem"}} spacing={2}>

         <Grid item xs={12}>
          <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            strokeColor="#000000"
            backgroundColor="#FF4081"
            mimeType={"audio/wav"} 
            />
         </Grid>

        <Grid item xs={6} >
          <Button variant="outlined" onClick={this.startRecording} type="button" style={{marginRight: "1rem"}}>Start</Button>
          <Button variant="outlined" onClick={this.stopRecording} type="button">Stop</Button>
        </Grid>

        <Grid item xs={12}>
          {this.state.record?<SettingsVoiceIcon className={"record"} style={{color: "red"}}/>: null}
          {this.state.data?<Upload record={this.state.data}/>: null}
        </Grid>

       </Grid>

        {/* {this.state.data? <audio controls>
            <source src={this.state.data.blobURL} type="audio/wav"></source>
        </audio>: null} */}

         
      </div>
    );
  }
}