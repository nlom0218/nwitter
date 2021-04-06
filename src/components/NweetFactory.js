import React, { useState } from 'react';
import { connect } from 'react-redux';
import { dbService, storageSevice } from '../fbase';
import { v4 as uuidv4 } from "uuid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const NweetFactory = ({ user }) => {
    const [nweet, setNweet] = useState("")
    const [img, setImg] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        let imgUrl = ""
        if (img !== "") {
            const imgRef = storageSevice.ref().child(`${user.id}/${uuidv4()}`)
            const response = await imgRef.putString(img, "data_url")
            imgUrl = await response.ref.getDownloadURL();
        }
        const dbNweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: user.id,
            imgUrl
        }
        await dbService.collection("nweets").add(dbNweetObj)
        onClearImg()
        setNweet("")
    }
    const onChange = (e) => {
        const { target: { value } } = e
        setNweet(value)
    }
    const onFileChange = (e) => {
        const { target: { files } } = e
        const theFile = files[0]
        const reader = new FileReader()
        reader.readAsDataURL(theFile)
        reader.onload = (finishEvent) => {
            const { target: { result: img } } = finishEvent
            setImg(img);
        }
    }
    const onClearImg = () => {
        setImg("")
        document.getElementById("uploadImg").value = null
    }
    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />
            {img && (
                <div className="factoryForm__attachment">
                    <img
                        src={img}
                        style={{
                            backgroundImage: img,
                        }}
                    />
                    <div id="uploadImg" className="factoryForm__clear" onClick={onClearImg}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>)}
        </form>
    );
}

export default connect(mapStateToProps)(NweetFactory);