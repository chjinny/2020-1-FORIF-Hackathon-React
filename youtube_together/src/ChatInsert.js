import React from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';

/*
// UTC = KTS - 9
// DB에서 최초 재생 시간과 url 받아오기
const date = '2020/07/15/19:09:00'
const url = "https://youtu.be/UwsrzCVZAb8"
// 필요한 형태로 파싱
const init =  (new Date(date)).getTime();
const id = url.split('/')[3]
*/

class ChatInsert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          content:'' 
        };
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

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
    // 페이지 리로딩 방지
        e.preventDefault();
        // 상태값을 onCreate 를 통하여 부모에게 전달
        this.post_api_call('chat/insert', {name : this.state.name, content : this.state.content})
        // 상태 초기화
        this.setState({
            content: '',
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            
            <TextField placeholder="name"
                value={this.state.name}
                onChange={this.handleChange}
                name="name" />
            &nbsp;&nbsp;
            <TextField placeholder="content"
                value={this.state.content}
                onChange={this.handleChange}
                name="content" />
            &nbsp;&nbsp;&nbsp;
            <Button type="submit" variant="outlined" color="primary">등록</Button>
            </form>
        );
    }
}

export default ChatInsert;
