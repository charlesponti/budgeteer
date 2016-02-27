import categories from '../categories'

export default [
  'Transaction',
  '$state',
  '$stateParams',
  '$element',
  function (Transaction, $state, $stateParams, $element) {

    this.initialize = () => {
      var mapOptions = {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        scrollwheel: false
      };

      var map = new google.maps.Map($element.find('#map')[0],
        mapOptions)

      /** @type {HTMLInputElement} */
      var input = $element.find('#pac-input')[0]

      $element.find('#pac-input').keyup(function(event) {
        event.stopPropagation()
      })

      // Create the autocomplete helper, and associate it with
      // an HTML text input box.
      var autocomplete = new google.maps.places.Autocomplete(input)
      autocomplete.bindTo('bounds', map)

      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)

      var infowindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
        map: map
      })

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker)
      })

      this.onPlaceChange = () => {
        var place = autocomplete.getPlace()

        if (!place.geometry) return

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location)
          map.setZoom(17)
        }

        // Set the position of the marker using the place ID and location.
        marker.setPlace(/** @type {!google.maps.Place} */ ({
          placeId: place.place_id,
          location: place.geometry.location
        }))
        marker.setVisible(true)

        this.record.payee = place.name
        this.record.location = {
          address: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng()
        }
        //infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        //  'Place ID: ' + place.place_id + '<br>' +
        //  place.formatted_address + '</div>')
        //infowindow.open(map, marker)
      }

      // Get the full place details when the user selects a place from the
      // list of suggestions.
      google.maps.event.addListener(autocomplete, 'place_changed', this.onPlaceChange)
    }

    // Run the initialize function when the window has finished loading.
    google.maps.event.addDomListener(window, 'load', this.initialize)

    if (angular.isObject($stateParams.record)) {
      this.record = new Transaction($stateParams.record)
    } else {
      this.record = new Transaction({ date: new Date() })
    }

    this.categories = categories

    this.getLocation = function () {
      if (this.locationActivated === true) {
        this.loadingLocation = true
        navigator.geolocation.getCurrentPosition(({coords}) => {
          this.record.coords = {
            latitude: coords.latitude,
            longitude: coords.longitude
          }
          this.loadingLocation = false
        })
      } else {
        this.record.coords = null
      }
    }

    this.onSubmit = function () {
      if (this.record._id) {
        return Transaction.update({}, this.record.format(), (data) => {
          $state.go('transactions')
        })
      }

      Transaction.save({}, this.record.format(), (data) => {
        $state.go('transactions')
      })
    }
  }
]
