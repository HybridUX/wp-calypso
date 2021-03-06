/**
 * External dependencies
 */
import React, { ReactElement } from 'react';
import { useTranslate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { getLicenseState } from 'calypso/jetpack-cloud/sections/partner-portal/utils';
import { LicenseState } from 'calypso/jetpack-cloud/sections/partner-portal/types';
import { Button, Card } from '@automattic/components';
import ClipboardButton from 'calypso/components/forms/clipboard-button';
import Gridicon from 'calypso/components/gridicon';
import FormattedDate from 'calypso/components/formatted-date';

/**
 * Style dependencies
 */
import './style.scss';

interface Props {
	licenseKey: string;
	username: string | null;
	blogId: number | null;
	issuedAt: string;
	attachedAt: string | null;
	revokedAt: string | null;
}

export default function LicenseDetails( {
	licenseKey,
	username,
	blogId,
	issuedAt,
	attachedAt,
	revokedAt,
}: Props ): ReactElement {
	const translate = useTranslate();
	const licenseState = getLicenseState( attachedAt, revokedAt );

	return (
		<Card className="license-details">
			<ul className="license-details__list">
				<li className="license-details__list-item license-details__list-item--wide">
					<h4 className="license-details__label">{ translate( 'License code' ) }</h4>

					<div className="license-details__license-key-row">
						<code className="license-details__license-key">{ licenseKey }</code>

						<ClipboardButton
							text={ licenseKey }
							className="license-details__clipboard-button"
							borderless
							compact
						>
							<Gridicon icon="clipboard" />
						</ClipboardButton>
					</div>
				</li>

				<li className="license-details__list-item">
					<h4 className="license-details__label">{ translate( 'Issued on' ) }</h4>
					<FormattedDate date={ issuedAt } format="LLL" />
				</li>

				{ licenseState === LicenseState.Attached && (
					<li className="license-details__list-item">
						<h4 className="license-details__label">{ translate( 'Attached on' ) }</h4>
						<FormattedDate date={ attachedAt } format="LLL" />
					</li>
				) }

				{ licenseState === LicenseState.Detached && (
					<li className="license-details__list-item">
						<h4 className="license-details__label">{ translate( 'Attached on' ) }</h4>
						<Gridicon icon="minus" />
					</li>
				) }

				{ licenseState === LicenseState.Revoked && (
					<li className="license-details__list-item">
						<h4 className="license-details__label">{ translate( 'Revoked on' ) }</h4>
						<FormattedDate date={ revokedAt } format="LLL" />
					</li>
				) }

				<li className="license-details__list-item">
					<h4 className="license-details__label">{ translate( "Owner's User ID" ) }</h4>
					<span>{ username }</span>
				</li>

				<li className="license-details__list-item">
					<h4 className="license-details__label">{ translate( 'Blog ID' ) }</h4>
					<span>{ blogId }</span>
				</li>
			</ul>
			<div className="license-details__actions">
				<Button scary>{ translate( 'Revoke License' ) }</Button>
			</div>
		</Card>
	);
}
