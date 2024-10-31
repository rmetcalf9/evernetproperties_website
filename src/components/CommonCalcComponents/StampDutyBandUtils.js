
function stampdutyforthisband (band, amount) {
  if (amount < band.from) {
    return 0
  }
  if (typeof (band.upto) === 'undefined') {
    return (amount - band.from) * band.rate
  }
  if (amount > band.upto) {
    return (band.upto - band.from) * band.rate
  }
  return (amount - band.from) * band.rate
}



function getstampdutyband (
  exempt,
  commercial,
  location
) {
  if (exempt) {
    return {
      name: 'Exempt',
      bands: [{
        from: 0,
        upto: undefined,
        rate: 0
      }]
    }
  }
  if (commercial) {
    if (location === 'england') {
      return {
        name: 'England Commercial',
        bands: [{
          from: 0,
          upto: 150000,
          rate: 0
        },
        {
          from: 150000,
          upto: 250000,
          rate: 0.02
        },
        {
          from: 250000,
          upto: undefined,
          rate: 0.05
        }]
      }
    }
    return {
      name: 'Scotland Commercial',
      bands: [{
        from: 0,
        upto: 150000,
        rate: 0
      },
      {
        from: 150000,
        upto: 250000,
        rate: 0.01
      },
      {
        from: 250000,
        upto: undefined,
        rate: 0.05
      }]
    }
  }
  if (location === 'england') {
    return {
      name: 'England Residential',
      bands: [{
        from: 0,
        upto: 250000,
        rate: 0.03
      },
      {
        from: 250000,
        upto: 925000,
        rate: 0.08
      },
      {
        from: 925000,
        upto: 1500000,
        rate: 0.13
      },
      {
        from: 1500000,
        upto: undefined,
        rate: 0.15
      }]
    }
  }
  return {
    name: 'Scotland Residential',
    // 0% between £0 - £40,000
    // 3% between £40,000 - £145,000
    // 5% between £145,000 - £250,000
    // 8% between £250,000 - £325,000
    // 13% between £325,000 - £750,000
    // 15% above £750,000
    bands: [{
      from: 0,
      upto: 40000,
      rate: 0
    },{
      from: 40000,
      upto: 145000,
      rate: 0.03
    },{
      from: 145000,
      upto: 250000,
      rate: 0.05
    },{
      from: 250000,
      upto: 325000,
      rate: 0.08
    },{
      from: 325000,
      upto: 750000,
      rate: 0.13
    },{
      from: 750000,
      upto: undefined,
      rate: 0.15
    }]
  }
}



export default {
  stampdutyforthisband: stampdutyforthisband,
  getstampdutyband: getstampdutyband
}
