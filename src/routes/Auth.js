import React from 'react';
import { connect } from 'react-redux';
import AuthForm from '../components/AuthForm';
import { authService, firebaseInstance } from '../fbase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
    const onClickSocialBtn = async (e) => {
        const { target: { name } } = e
        let provider = ""
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider()
        }
        try {
            await authService.signInWithPopup(provider)
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button onClick={onClickSocialBtn} name="google" className="authBtn">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button onClick={onClickSocialBtn} name="github" className="authBtn">
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
}

export default connect()(Auth);