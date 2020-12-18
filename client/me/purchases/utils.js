/**
 * Internal dependencies
 */
import { addCreditCard, addPaymentMethod, changePaymentMethod, addNewPaymentMethod } from './paths';
import {
	isExpired,
	isIncludedWithPlan,
	isOneTimePurchase,
	isPaidWithCreditCard,
} from 'calypso/lib/purchases';
import { isDomainTransfer } from 'calypso/lib/products-values';

function isDataLoading( props ) {
	return ! props.hasLoadedSites || ! props.hasLoadedUserPurchasesFromServer;
}

function canEditPaymentDetails( purchase ) {
	return (
		! isExpired( purchase ) &&
		! isOneTimePurchase( purchase ) &&
		! isIncludedWithPlan( purchase ) &&
		! isDomainTransfer( purchase )
	);
}

function getChangePaymentMethodPath( siteSlug, purchase ) {
	if ( isPaidWithCreditCard( purchase ) ) {
		const {
			payment: { creditCard },
		} = purchase;

		return changePaymentMethod( siteSlug, purchase.id, creditCard.id );
	}

	return addPaymentMethod( siteSlug, purchase.id );
}

function getAddNewPaymentMethodPath() {
	return isEnabled( 'purchases/new-payment-methods' ) ? addNewPaymentMethod : addCreditCard;
}

export {
	canEditPaymentDetails,
	getChangePaymentMethodPath,
	getAddNewPaymentMethodPath,
	isDataLoading,
};
