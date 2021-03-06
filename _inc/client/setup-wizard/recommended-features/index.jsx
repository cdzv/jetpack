/**
 * External dependencies
 */
import { translate as __ } from 'i18n-calypso';
import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { FeatureToggleGroup } from '../feature-toggle-group';
import Button from 'components/button';
import { imagePath } from 'constants/urls';
import analytics from 'lib/analytics';
import { fetchSettings, isFetchingSettingsList } from 'state/settings';
import { getRecommendedFeatureGroups } from 'state/setup-wizard';

import './style.scss';

class RecommendedFeatures extends Component {
	componentDidMount = () => {
		if ( ! this.props.isFetchingSettingsList ) {
			this.props.fetchSettings();
		}
		analytics.tracks.recordEvent( 'jetpack_wizard_page_view', { step: 'features-page' } );
	};

	onDoneButtonClick = () => {
		analytics.tracks.recordEvent( 'jetpack_wizard_features_done' );
	};

	onExploreMoreButtonClick = () => {
		analytics.tracks.recordEvent( 'jetpack_wizard_features_explore_more' );
	};

	render() {
		return (
			<div className="jp-setup-wizard-main jp-setup-wizard-recommended-features-main">
				<img
					src={ imagePath + 'jetpack-new-heights.svg' }
					alt={ __( 'A rocketship using Jetpack to reach new heights' ) }
				/>
				<h1>{ __( 'Get started with Jetpack’s powerful features' ) }</h1>
				<p className="jp-setup-wizard-recommended-features-p1">
					{ __(
						'Jetpack has a lot of features so we’ve made a few recommendations for you below.'
					) }
				</p>
				<p className="jp-setup-wizard-recommended-features-p2">
					{ __( 'You can change your feature settings at any time.' ) }
				</p>
				{ this.props.recommendedFeatureGroups.map( featureGroup => {
					return (
						<FeatureToggleGroup
							title={ featureGroup.title }
							details={ featureGroup.details }
							features={ featureGroup.features }
						/>
					);
				} ) }
				<div className="jp-setup-wizard-recommended-features-buttons-container">
					<Button primary href="#/dashboard" onClick={ this.onDoneButtonClick }>
						{ __( 'I’m done for now' ) }
					</Button>
					<Button href="#/settings" onClick={ this.onExploreMoreButtonClick }>
						{ __( 'Explore more features' ) }
					</Button>
				</div>
			</div>
		);
	}
}

RecommendedFeatures = connect(
	state => ( {
		isFetchingSettingsList: isFetchingSettingsList( state ),
		recommendedFeatureGroups: getRecommendedFeatureGroups( state ),
	} ),
	dispatch => ( {
		fetchSettings: () => dispatch( fetchSettings() ),
	} )
)( RecommendedFeatures );

export { RecommendedFeatures };
