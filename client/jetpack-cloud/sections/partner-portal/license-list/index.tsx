/**
 * External dependencies
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Main from 'calypso/components/main';
import CardHeading from 'calypso/components/card-heading';
import DocumentHead from 'calypso/components/data/document-head';
import LicenseListItem from 'calypso/jetpack-cloud/sections/partner-portal/license-list-item';
import LicensePreview, {
	LicensePreviewPlaceholder,
} from 'calypso/jetpack-cloud/sections/partner-portal/license-preview';
import QueryJetpackPartnerPortalLicenses from 'calypso/components/data/query-jetpack-partner-portal-licenses';
import {
	getLicenses,
	hasFetchedLicenses,
	isFetchingLicenses,
} from 'calypso/state/partner-portal/licenses/selectors';

export default function LicenseList() {
	const translate = useTranslate();
	const hasFetched = useSelector( hasFetchedLicenses );
	const isFetching = useSelector( isFetchingLicenses );
	const licenses = useSelector( getLicenses );

	return (
		<Main wideLayout={ true } className="license-list">
			<QueryJetpackPartnerPortalLicenses />

			<DocumentHead title={ translate( 'Licenses' ) } />

			<CardHeading size={ 36 }>{ translate( 'Licenses' ) }</CardHeading>

			<LicenseListItem header>
				<h2>{ translate( 'License state' ) }</h2>
				<h2>{ translate( 'Issued on' ) }</h2>
				<h2>{ translate( 'Attached on' ) }</h2>
				<h2>{ translate( 'Revoked on' ) }</h2>
				<div>{ /* Intentionally empty header. */ }</div>
				<div>{ /* Intentionally empty header. */ }</div>
			</LicenseListItem>

			{ ! hasFetched && isFetching && (
				<>
					<LicensePreviewPlaceholder />
					<LicensePreviewPlaceholder />
					<LicensePreviewPlaceholder />
				</>
			) }

			{ hasFetched &&
				licenses &&
				licenses.map( ( license ) => (
					<LicensePreview
						key={ license.licenseKey }
						licenseKey={ license.licenseKey }
						domain={ license.domain }
						product={ license.product }
						issuedAt={ license.issuedAt }
						attachedAt={ license.attachedAt }
						revokedAt={ license.revokedAt }
						username={ license.username }
						blogId={ license.blogId }
					/>
				) ) }
		</Main>
	);
}
