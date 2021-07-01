import React from 'react';
import axios from 'axios'; 
//import VidInsert from './VidInsert';
import VidListElement from './VidListElement';
/*
// UTC = KTS - 9
// DB에서 최초 재생 시간과 url 받아오기
const date = '2020/07/15/19:09:00'
const url = "https://youtu.be/UwsrzCVZAb8"
// 필요한 형태로 파싱
const init =  (new Date(date)).getTime();
const id = url.split('/')[3]
*/

class VidList extends React.Component {
  handleCreate = (data) => {
    this.list()
    this.setState({
      list : [],
      dimmy : data
    })
    this.list()
  }
  constructor(props) {
    super(props);
    this.state = {
      list:'',
      state:1,
    };
  }
  componentDidMount() {
    setInterval(this.list, 1000);
  }

  list = async() => {
    const list = (await this.get_api_call('video/list'));
    if (list[0] === undefined){
      this.setState({
        list : [],
      })
    }
    else{
      this.setState({
        list : list,
      })
    }
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
    return(
      <div>
        
        <div>
          { this.state.list.length !== 0
            ? this.state.list.map( (el, key) => {
              return(
                <div>
                  <VidListElement id={el.id} url={el.url} init={el.init} onCreate={this.handleCreate}/>
                </div>
              )
            })
          : null}
        </div>
      </div>
    )
  }
}

export default VidList;
