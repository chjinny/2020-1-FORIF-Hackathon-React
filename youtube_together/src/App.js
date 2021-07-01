import React from 'react';
import Video from './Video';
import VidList from './VidList';
import ChatList from './ChatList';
import { styled } from '@material-ui/core/styles'
import { Grid, Container, Box, AppBar, Typography, GridList } from '@material-ui/core';
import ChatInsert from './ChatInsert';
import VidInsert from './VidInsert';

const MyAppBar = styled(AppBar)({
  flexGrow: 1,
  backgroundColor: '#ff8080',
})

const MyTitle = styled(Typography)({
  flexGrow: 1,
  margin: 5,
  marginLeft: 30,
})

const VideoBox = styled(Box)({
  position: 'absolute',
  top: 50,
  margin: 20,
})


const ChatListBox = styled(Box)({
  height: '80%',
  width: 300,
  margin: 20,
  position: 'absolute',
  left: 630,
  top: 100,
  display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
})

const ChatListGridList = styled(GridList)({
  height: '100%',
})

const ChatInsertBox = styled(Box)({
  position: 'absolute',
  left: 700,
  top: 50,
  width: 300,
})


const VidListBox = styled(Box)({
  height: '83%',
  width: 300,
  margin: 20,
  position: 'absolute',
  left: 1010,
  top: 70,
  display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
})

const VidListGridList = styled(GridList)({
  height: '100%',
})

const VidInsertBox = styled(Box)({
  position: 'absolute',
  left: 1050,
  top: 50,
  width: 300,
})


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state:1,
    };
  }
  handleCreate = (data) => {
    this.setState({
      state : -this.state,
    })
  }
  render(){
    return (
      <React.Fragment>
      <MyAppBar>
        <MyTitle variant="h6">
          본방사수 - 다 같이 영상 보실래요?
        </MyTitle>
      </MyAppBar>
      <Box>
        <VideoBox>
          <Video  onCreate={this.handleCreate} stt = {this.state.state}/>
        </VideoBox>
        <ChatInsertBox>
          <ChatInsert>
        </ChatInsert>
        </ChatInsertBox>
        
          <ChatListBox>
            <ChatListGridList>
          <ChatList />
          </ChatListGridList>
          
          </ChatListBox>
          <VidInsertBox>
          <VidInsert>
        </VidInsert>
        </VidInsertBox>

        <VidListBox>
          <VidListGridList>
          <VidList onCreate={this.handleCreate} stt = {this.state.state}/>
          </VidListGridList>
        </VidListBox>
      </Box>
      </React.Fragment>
    )
  }
}

export default App;