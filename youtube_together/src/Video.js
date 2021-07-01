import React from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import vid_init from './vid_init.png';

/*
// UTC = KTS - 9
// DB에서 최초 재생 시간과 url 받아오기
const date = '2020/07/15/19:09:00'
const url = "https://youtu.be/UwsrzCVZAb8"
// 필요한 형태로 파싱
const init =  (new Date(date)).getTime();
const id = url.split('/')[3]
*/

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      init : "",
      id : -1,
      vid_id : "",
      state : 0,
      reload : props.reload,
    };
  }

  componentDidMount() {
    this.on_air();
    setInterval(this.reload, 1000);
  }
  reload = async() => {
    const top = (await this.get_api_call('video/top'))[0];
    if(this.state.id != top.id){
      this.on_air();
    }
  }

  on_air = async() => {
    let on_air = (await this.get_api_call('video/vid_on_air'))[0];
    while ( on_air === undefined){
      await this.next_vid();
      on_air = (await this.get_api_call('video/vid_on_air'))[0];
      const top = (await this.get_api_call('video/top'))[0];
      this.setState({
        state : 0,
        id : top.id
      })
    }
    const id = on_air.id
    const date = new Date(on_air.init)
    const url = String(on_air.url);
    this.setState({
      init : date.getTime(),
      vid_id : url.split('/')[3],
      id : id,
      state : 1
    })
  }

  next_vid = async() => {
    this.post_api_call('video/next', {id : this.state.id})
    this.props.onCreate(this.state);
    this.forceUpdate();
  }

  fin = async() => {
    this.post_api_call('video/fin', {id : this.state.id})
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
  render() {
    const opts = {
      //height: '50%',
      //width: '80%',
      height: '390',
      width: '640',
      //height: window.innerHeight*0.4,
      //width: window.innerWidth*0.65,
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 1,
        rel: 1,
      },
    };
    if(this.state.state === 0 ){
      return(<div>
        <img src={vid_init}>
        </img>
      </div>)
    }
    else{
      return(
        <YouTube 
          videoId = {this.state.vid_id} 
          opts={opts} 
          onReady={this.time_equal} 
          onPause={this.time_equal}
          onStateChange={this.time_equal_always}
          onPlaybackRateChange={this.speed_equal}
          onEnd={this.update}
          onError={this.on_air}
        />
      )
    }
  }

  speed_equal = (event) => {
    event.target.setPlaybackRate(1);
  }

  time_equal_always = (event) => {
    var timestamp = (new Date()).getTime();
    var sec = (timestamp - this.state.init)/1000;
    var time = event.target.getCurrentTime();
    if (Math.abs(time-sec) >= 5){
      event.target.seekTo(sec);
      event.target.playVideo();
    }
  }

  time_equal = (event) => {
    // access to player in all event handlers via event.target
    // const date = new Date();
    var timestamp = (new Date()).getTime();
    var sec = (timestamp - this.state.init)/1000;
    var duration = event.target.getDuration();
    console.log(duration)
    duration = 1000000
    if (duration < sec ){
      this.setState({
        state : 0
      })
    }
    else{
      event.target.seekTo(sec);
      event.target.playVideo();
    }
  }

  update = (event) =>{
    this.fin();
    this.next_vid();
    this.on_air();
  }
}

export default Video;
