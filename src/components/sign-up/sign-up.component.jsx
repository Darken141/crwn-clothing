import React from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

import './sign-up.styles.scss'

class SignUp extends React.Component {
    constructor() {
        super()

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange = e => {
        const { value, name } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async e => {
        e.preventDefault()
        const { displayName, email, password, confirmPassword } = this.state

        if (password !== confirmPassword) {
            alert("Password don't match")
            return
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)

            await createUserProfileDocument(user, { displayName })

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state

        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        label="Display namme"
                        type="text"
                        name='displayName'
                        value={displayName}
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        label="Email"
                        type="email"
                        name='email'
                        value={email}
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        name='password'
                        value={password}
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        label="Confirm password"
                        type="password"
                        name='confirmPassword'
                        value={confirmPassword}
                        handleChange={this.handleChange}
                        required
                    />

                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp