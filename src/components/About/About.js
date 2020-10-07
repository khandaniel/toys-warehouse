import React from 'react'
import aboutMe from './about-me.jpg'

const About = () => {
    return (
        <div>
            <p>
                Contacts: <code><a href="mailto:samir.khan.w@gmail.com">samir.khan.w[at]gmail.com</a></code>
            </p>
            <h3>About Me:</h3>
            <div>
                <img src={aboutMe} alt="meme" />
            </div>
        </div>
    )
}

export default About