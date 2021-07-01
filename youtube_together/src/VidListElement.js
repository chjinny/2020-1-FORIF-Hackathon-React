import React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { Card, Typography, CardContent } from '@material-ui/core';
/*
// UTC = KTS - 9
// DB에서 최초 재생 시간과 url 받아오기
const date = '2020/07/15/19:09:00'
const url = "https://youtu.be/UwsrzCVZAb8"
// 필요한 형태로 파싱
const init =  (new Date(date)).getTime();
const id = url.split('/')[3]
*/

class VidListElement extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id, 
      url: this.props.url, 
      init: this.props.init, 
    };
  }
  
  delete = async(e) => {
    e.preventDefault();
    this.post_api_call('video/fin', {id : this.state.id})
    this.post_api_call('video/delete', {id : this.state.id})
    this.props.onCreate(this.state);
    this.forceUpdate();
  }

  post_api_call = async(str, post) => {
    await axios('/api/' + str, {
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
  // http://gdata.youtube.com/feeds/api/videos/[videoid]?v=2&alt=json
  render() {
    console.log(this.state.id)
    //https://img.youtube.com/vi/E8fO66BTY0w/default.jpg
    const id = this.state.url.split('/')[3];
    const src = "https://img.youtube.com/vi/" + id + "/hqdefault.jpg"
    return(
        <div>
          <Card>
            <CardContent>
            <img class="fit-picture"
              src={src}
              alt="Grapefruit slice atop a pile of other slices"
              width="250"
              >
            </img>
            <Typography variant="body2" component="p">
            {this.state.url}
            </Typography>
            <div> {this.state.init} </div>
            </CardContent>
            <form onSubmit={this.delete}>
            &nbsp;&nbsp;&nbsp;
                <Button type="submit" variant="outlined" size="small">삭제</Button>
            </form>
            <p></p>
          </Card>
        </div>
    )
  }
}

export default VidListElement;
