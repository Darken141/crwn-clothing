import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import CartIcon from '../cart-icon/cart-icon.component'

import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

import './header.styles.scss'

const Header = ({ currentUser, hidden }) => {
    return (
        <header className='header'>
            <Link to='/'>
                <Logo className='logo-container' />
            </Link>

            <div className='options'>
                <Link to='/shop' className='option'>
                    SHOP
                </Link>
                <Link to='/shop' className='option'>
                    CONTACT
                </Link>

                {
                    currentUser ?
                        (<div className='option' onClick={() => auth.signOut()}>
                            SIGN OUT
                        </div>)
                        :
                        (<Link to='/signin' className='option'>
                            SIGN IN
                        </Link>)
                }

                <CartIcon />
            </div>
            {hidden && <CartDropdown />}
        </header>
    )
}


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)
