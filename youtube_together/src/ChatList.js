import React from 'react';
import axios from 'axios'; 
import ChatInsert from './ChatInsert';
import { Card, Typography, CardContent, styled, GridList, Box } from '@material-ui/core';

/*
// UTC = KTS - 9
// DB에서 최초 재생 시간과 url 받아오기
const date = '2020/07/15/19:09:00'
const url = "https://youtu.be/UwsrzCVZAb8"
// 필요한 형태로 파싱
const init =  (new Date(date)).getTime();
const id = url.split('/')[3]
*/

const NameTypo = styled(Typography)({
  fontSize: 10,
})

const ContentTypo = styled(Typography)({
  fontSize: 15,
})

const CharCard = styled(Card)({
  width:200,
  height:70,
  padding: 0,
})

const ChatListBox = styled(Box)({
  display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
})

const ChatListGridList = styled(GridList)({
  height: '100%',
})

class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list:'',
    };
  }

  componentDidMount() {
    setInterval(this.list, 1000);
  }

  list = async() => {
    const list = (await this.get_api_call('chat/list'));
    if (list[0] === undefined){
      this.setState({
        list : [{id:"리스트가 비어 있어요", name:"", content:"", date : ""}],
      })
    }
    else{
      this.setState({
        list : list,
      })
    }
  }

  post_api_call = async(str, post) => {
    return await axios('/api/' + str, {
      method : 'POST',
      data : post,
      headers: new Headers()
    })
  }

  get_api_call = async(str) =>{
    const res = await axios.get('/api/' + str)
    console.log(res.data)
    return(res.data);
  }

  // https://www.hashbangcode.com/article/convert-date-timestamp-javascript
  render() {
    return(
      <div>
        
        <div>
        
          { this.state.list.length !== 0
            ? this.state.list.map( (el, key) => {
              return(
                <CharCard key={key}>
                  <CardContent>
                    <NameTypo>
                    {el.name}
                    </NameTypo>
                    <ContentTypo variant="h5" component="h2">
                    {el.content}
                    </ContentTypo>
                  </CardContent>
                </CharCard>
              )
            })
          : null}
        
        </div>
      </div>
    )
  }
}

export default ChatList;
