/**
 * External dependencies
 */
import React, { ReactElement } from 'react';
import { useTranslate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Main from 'calypso/components/main';
import CardHeading from 'calypso/components/card-heading';
import DocumentHead from 'calypso/components/data/document-head';
import LicenseList from 'calypso/jetpack-cloud/sections/partner-portal/license-list';

export default function Licenses(): ReactElement {
	const translate = useTranslate();

	return (
		<Main wideLayout={ true } className="licenses">
			<DocumentHead title={ translate( 'Licenses' ) } />

			<CardHeading size={ 36 }>{ translate( 'Licenses' ) }</CardHeading>

			<LicenseList />
		</Main>
	);
}
