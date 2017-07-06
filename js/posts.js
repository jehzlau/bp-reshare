/* global bpReshare */
window.bpReshare = window.bpReshare || {};

( function( bpReshare, document ) {

	// Bail if not set
	if ( 'undefined' === typeof bpReshare.templates ) {
		return;
	}

	/**
	 * Posts Class.
	 * @type {Object}
	 */
	bpReshare.Posts = {
		start: function() {
			this.printButtons();

			this.scrollToBuddyPress();

			document.querySelector( '#buddypress .bp-reshare' ).addEventListener(
				'click',
				this.reshareActivity
			);
		},

		displayFeedback: function( container ) {
			// Remove all previous notices.
			if ( 'template-notices' === container.childNodes[0].getAttribute( 'id' ) ) {
				container.childNodes[0].remove();
			}

			if ( ! bpReshare.templates.notice ) {
				return;
			}

			container.innerHTML = bpReshare.templates.notice + container.innerHTML;

			window.setTimeout( function() {
				document.getElementById( 'template-notices' ).remove();
			}, 4000 );
		},

		printButtons: function() {
			var article = document.querySelector( bpReshare.commentsAreaID ).previousElementSibling,
			    className = 'add-reshare', link = bpReshare.strings.addLink.replace( '%i', bpReshare.activity.id ),
			    screenReaderText = bpReshare.strings.addReshare;

			if ( bpReshare.activity.isSelf ) {
				className = 'disabled';
			} else if ( -1 !== bpReshare.activity.reshares.indexOf( bpReshare.params.u.toString() ) ) {
				className = 'remove-reshare';
				link = bpReshare.strings.removeLink.replace( '%i', bpReshare.activity.id );
				screenReaderText = bpReshare.strings.removeReshare;
			}

			this.container = document.createElement( 'DIV' );
			this.container.setAttribute( 'id', 'buddypress' );
			this.container.setAttribute( 'class', 'buddyreshare activity' );
			this.container.setAttribute( 'data-activity-id', 'activity-' + bpReshare.activity.id );
			this.container.innerHTML = bpReshare.templates.reshareButton.replace( '%l', link )
			                                                            .replace( '%r', className )
			                                                            .replace( '%a', bpReshare.activity.id )
			                                                            .replace( '%u', bpReshare.activity.author )
			                                                            .replace( '%t', screenReaderText )
			                                                            .replace( '%c', bpReshare.activity.reshares.length );

			this.container.innerHTML += bpReshare.templates.favoritesButton;
			article.appendChild( this.container );

			this.displayFeedback( this.container );
		},

		scrollToBuddyPress: function() {
			if ( '#activity-' + bpReshare.activity.id !== window.location.hash ) {
				return;
			}

			location.href = '#buddypress';
		},

		reshareActivity: function( event ) {
			event.preventDefault();

			console.log( event );
		}
	};

	window.addEventListener( 'load', function() {
		var loaded = false;

		if ( loaded ) {
			return;
		}

		bpReshare.Posts.start();
		loaded = true;
	} );

} )( window.bpReshare, window.document );