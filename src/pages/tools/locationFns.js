import axios from 'axios'

function getLocation ({
  attemptsRemaining,
  bestAttemptSoFar,
  callback,
  allowLowAccuracy
}) {
  // console.log('Start of get location ', allowLowAccuracy)
  var timeout = 8000
  var enableHighAccuracy = true
  var maximumAge = 0
  if (typeof (allowLowAccuracy) === 'undefined') {
    allowLowAccuracy = false
  }
  if (allowLowAccuracy) {
    // don't worry about retries only do once
    attemptsRemaining = 1
    timeout = undefined
    enableHighAccuracy = false
    maximumAge = undefined
  }
  if (bestAttemptSoFar.coords.accuracy < 11) {
    // We have accurate result, no reason to keep trying
    attemptsRemaining = 0
  }
  if (attemptsRemaining === 0) {
    var evidence = {
      coords: {
        latitude: bestAttemptSoFar.coords.latitude,
        longitude: bestAttemptSoFar.coords.longitude,
        speed: bestAttemptSoFar.coords.speed,
        heading: bestAttemptSoFar.coords.heading,
        altitude: bestAttemptSoFar.coords.altitude,
        accuracy: bestAttemptSoFar.coords.accuracy,
        altitudeAccuracy: bestAttemptSoFar.coords.altitudeAccuracy
      },
      timestamp: bestAttemptSoFar.timestamp
    }
    callback.ok(evidence)
    return
  }
  // get position
  navigator.geolocation.getCurrentPosition(pos => {
    // console.log('Got Gelocation with accuracy:', pos.coords.accuracy)
    if (pos.coords.accuracy < bestAttemptSoFar.coords.accuracy) {
      bestAttemptSoFar = pos
    }
    getLocation({
      attemptsRemaining: attemptsRemaining - 1,
      bestAttemptSoFar: bestAttemptSoFar,
      callback: callback
    })
  }, err => {
    callback.error(err)
  },
  { maximumAge: maximumAge, timeout: timeout, enableHighAccuracy: enableHighAccuracy })
}

function getPostcode (callback, lat, long) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.postcodes.io/postcodes?longitude=' + lat + '&latitude=' + long + '',
    headers: {
      'Accept': 'application/json'
    }
  };


  axios.request(config)
  .then((response) => {
    callback.ok(response)
  })
  .catch((error) => {
    callback.error(err)
  });

}

function getRightmoveLocationCode (callback, outcode, incode) {
  console.log('TODO getRightmoveLocationCode', outcode, incode)

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://los.rightmove.co.uk/typeahead?query=SE6+2du&limit=10&exclude=STREET',
  };


  axios.request(config)
  .then((response) => {
    console.log('DDDD', response)
    // callback.ok(response)
  })
  .catch((error) => {
    console.log('RRR', error)
    // callback.error(err)
  });

}

export default {
  getLocation: getLocation,
  getPostcode: getPostcode,
  getRightmoveLocationCode: getRightmoveLocationCode
}
