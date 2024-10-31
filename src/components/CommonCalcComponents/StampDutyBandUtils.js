
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
  location,
  completion
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
    if (completion === 'bef31oct2024') {
      return {
        name: 'England Residential Before 31-Oct-2024',
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
    if (completion === '31oct2024to31mar2025') {
      return {
        name: 'England Residential 31-Oct-2024 - 31-Mar-2025',
        bands: [{
          from: 0,
          upto: 250000,
          rate: 0.05
        },
        {
          from: 250000,
          upto: 925000,
          rate: 0.10
        },
        {
          from: 925000,
          upto: 1500000,
          rate: 0.15
        },
        {
          from: 1500000,
          upto: undefined,
          rate: 0.17
        }]
      }
    }
    return {
      name: 'England Residential After 1 April 2025',
      bands: [{
        from: 0,
        upto: 125000,
        rate: 0.05
      },
      {
        from: 125000,
        upto: 250000,
        rate: 0.07
      },
      {
        from: 250000,
        upto: 925000,
        rate: 0.10
      },
      {
        from: 925000,
        upto: 1500000,
        rate: 0.15
      },
      {
        from: 1500000,
        upto: undefined,
        rate: 0.17
      }]
    }
  }
  return {
    name: 'Scotland Residential',
    // 0% on the portion up to £145,000
    // 2% on the portion from £145,001 to £250,000
    // 5% on the portion from £250,001 to £325,000
    // 10% on the portion from £325,001 to £750,000
    // 12% on the portion above £750,000
    bands: [{
      from: 0,
      upto: 145000,
      rate: 0
    },{
      from: 145000,
      upto: 250000,
      rate: 0.02
    },{
      from: 250000,
      upto: 325000,
      rate: 0.05
    },{
      from: 325000,
      upto: 750000,
      rate: 0.1
    },{
      from: 750000,
      upto: undefined,
      rate: 0.12
    }]
  }
}



export default {
  stampdutyforthisband: stampdutyforthisband,
  getstampdutyband: getstampdutyband
}
