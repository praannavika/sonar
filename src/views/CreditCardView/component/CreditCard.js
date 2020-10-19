import React from 'react';
import '../style/CreditCardStyle.css'
import amexLogo from '../../../assests/images/logos/amex.png'
import visaLogo from '../../../assests/images/logos/visa.png'
import masterCardLogo from '../../../assests/images/logos/mastercard.png'
import discoverLogo from '../../../assests/images/logos/discover.png'

const cardTypeToLogo = {
    'AMEX': amexLogo,
    'VISA': visaLogo,
    'MASTERCARD': masterCardLogo,
    'DISCOVER': discoverLogo
};

const CreditCard = ({ creditCard }) => (
    <div className='credit-card'>
        <div className='credit-card__logo'>
            <img className='logo' src={cardTypeToLogo[creditCard.type]} width="60"/>
        </div>

        <div className='credit-card__number'>{creditCard.creditCardNo}</div>

        <div className='credit-card__info'>
            <div className='credit-card__info_name'>
                <div className='credit-card__info_label'>CARDHOLDER'S NAME</div>
                <div>{creditCard.firstName} {creditCard.lastName}</div>
            </div>

            <div className='credit-card__info_expiry'>
                <div className='credit-card__info_label'>VALID UP TO</div>
                <div>{creditCard.expiry}</div>
            </div>
        </div>
    </div>
)

export default CreditCard