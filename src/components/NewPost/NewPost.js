import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import {Link} from 'react-router-dom';
import './NewPost.css';

export default class NewPost extends Component {
    constructor() {
        super();

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var d = new Date();
        var month = d.getMonth();
        var date = d.getDate();
        let postDate = `${months[month]} ${date}, 2018`;

        this.state = {
            post: "",
            date: postDate,
            status: "All",
            anonymous: false,
            image: false,
            url: "",
            publicId: ""
        }

        this.onDrop = this.onDrop.bind(this);
    }

    addImage() {
        this.setState({
            image: !this.state.image
        })
    }

    updatePost(e) {
        this.setState({
            post: e.target.value
        })
    }

    setStatus(e) {
        this.setState({
            status: e.target.value
        })
    }

    post() {
        axios.post('/api/newpost', {date: this.state.date, post: this.state.post, status: this.state.status, image: this.state.publicId})
    }

    onDrop = files => {
        // Push all the axios request promise into a single array
        let {REACT_APP_UPLOAD_PRESET, CLOUDINARY_API_KEY, REACT_APP_CLOUD_NAME} = process.env;
        const uploaders = files.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", REACT_APP_UPLOAD_PRESET); // Replace the preset name with your own
          formData.append("api_key", CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
          formData.append("timestamp", (Date.now() / 1000) | 0);
          
          // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
          return axios.post(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`, formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }).then(response => {
            const data = response.data;
            const fileURL = data.secure_url // You should store this URL for future references in your app
            console.log(file);
            this.setState({
                publicId: data.public_id,
                url: fileURL
            })
            console.log(data);
          })
        });
        axios.all(uploaders).then(() => {
            // ... perform after upload is successful operation
            
          });
        }

    render() {
        return (
            <div className="newPost">
                <div className="postContainer">
                    <div className="newPostHeader">
                        <Link to="/forum"><button onClick={() => this.post()}>Post</button></Link>
                        <select className="status" onChange={(e) => this.setStatus(e)}>
                            <option value="All">All</option>
                            <option value="Just Moms">Just Moms</option>
                            <option value="Just Dads">Just Dads</option>
                            <option value="Expecting">Expecting</option>
                            <option value="Babies">Babies</option>
                            <option value="Toddlers">Toddlers</option>
                            <option value="Elementary">Elementary</option>
                            <option value="Pre-Teen">Pre-Teen</option>
                            <option value="Teen">Teen</option>
                            <option value="All Grown Up">All Grown Up</option>
                        </select>
                    </div>
                    <div>
                        <textarea type="text" placeholder="type here" className="postText" onChange={(e) => this.updatePost(e)}></textarea>
                        {this.state.image ? <Dropzone onDrop={this.onDrop} className='dropzone'  multiple={false}>
                        <img src={this.state.url ? this.state.url : "http://i67.tinypic.com/29w7a83.jpg"} alt="upload" className="postImg"/></Dropzone> : null}
                        <div className="anonymousBox">
                            <input type="checkbox" />
                            <h3>Ask Anonymously</h3>
                        </div>
                        <div className="icons">
                            <img src="http://i63.tinypic.com/2n1b05y.jpg" alt="camera" className="camera" onClick={() => this.addImage()} />
                            <img src="http://i68.tinypic.com/15cofhi.jpg" alt="menu" className="menu" />
                        </div>
                    </div>
                </div>
                <Link to="/forum">
                    <div className="backButtonContainer">
                        <button>Back to Forum</button>
                    </div>
                </Link>
            </div>
        )
    }
}