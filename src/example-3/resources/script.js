// this is the config object used to connect to an app on a Qlik Sense server
var config = {
  host: 'playground-sense.qlik.com',
  prefix: '/showcase/',
  port: '443',
  isSecure: true,
  rejectUnauthorized: false,
  appname: '0b0fc6d5-05ce-44d7-95aa-80d0680b3559'
}


var app

function main () {
  require.config({
    baseUrl: (config.isSecure ? 'https://' : 'http://') + config.host + (config.port ? ':' + config.port : '') + config.prefix + 'resources'
  })

  /**
   * Load the entry point for the Capabilities API family
   * See full documention: http://help.qlik.com/en-US/sense-developer/Subsystems/APIs/Content/MashupAPI/qlik-interface-interface.htm
   */
  require(['js/qlik'], function (qlik) {
    // We're now connected

    // Suppress Qlik error dialogs and handle errors how you like.
    qlik.setOnError(function (error) {
      console.log(error)
    })

    // Open a dataset on the server
    console.log('Connecting to appname: ' + config.appname)
    app = qlik.openApp(config.appname, config)
    console.log(app)

    createTitleList()
    createPartnersList()
    createGoalIdList()
    createOceanBasinsPieChart()
    createLeadEntityTypePieChart()
    createCommitmentsCountKpi()
    createPartnersKpi()
    createGoalCountKpi()
  })
}
function createGoalIdList () {
  var listCols = [
    {
      qDef: { qFieldDefs: ['Goal ID'] }
    },
    {
      qDef: { qFieldDefs: ['Goal Description'] }
    }
  ]

  app.visualization.create('table', listCols, {title: 'Goal List'}).then(function (list) {
    list.show('goal-id-list')
  })
}

function createTitleList () {
  var listCols = [
    {
      qDef: { qFieldDefs: ['Commitment Title'] }
    }
  ]

  app.visualization.create('table', listCols, {title: 'Ocean Commitments Title List'}).then(function (list) {
    list.show('title-list')
  })
}

function createPartnersList () {
  var listCols = [
    {
      qDef: { qFieldDefs: ['Partners'] }
    }
  ]

  app.visualization.create('table', listCols, {title: 'Partners List'}).then(function (list) {
    list.show('partners-list')
  })
}

function createOceanBasinsPieChart () {
  var listCols = [
    // {'qDef': {'qDef': 'Sum( [Commitment ID] )', 'qLabel': 'Open Cases'}}
    {
      qDef: {qFieldDefs: ['Ocean Basins']}
    },
    '=Count([Commitment ID])'
  ]

  app.visualization.create('piechart', listCols, {title: 'Ocean Basins Pie Chart'}).then(function (piechart) {
    piechart.show('ocean-basins-pie-chart')
  })
}

function createLeadEntityTypePieChart () {
  var listCols = [
    {
      qDef: {qFieldDefs: ['Lead entity type']}
    },
    '=Count([Commitment ID])'
  ]

  app.visualization.create('piechart', listCols, {title: 'Lead Entity Type Pie Chart'}).then(function (piechart) {
    piechart.show('lead-entity-type-pie-chart')
  })
}

function createPartnersKpi () {
  var listCols = ['=Count([Partners])']

  app.visualization.create('kpi', listCols, {
    title: 'Partners Involved',
    showTitles: true,
    showMeasureTitle: false
  }).then(function (kpi) {
    kpi.show('partners-kpi')
  })
}

function createGoalCountKpi () {
  var listCols = ['=Count([Goal ID])']

  app.visualization.create('kpi', listCols, {
    title: 'Goals Impacted',
    showTitles: true,
    showMeasureTitle: false
  }).then(function (kpi) {
    kpi.show('goals-count-kpi')
  })
}

function createCommitmentsCountKpi () {
  var listCols = ['=Count([Commitment Title])']

  app.visualization.create('kpi', listCols, {
    title: 'Commitments Count',
    showTitles: true,
    showMeasureTitle: false
  }).then(function (kpi) {
    kpi.show('commitments-count-kpi')
  })
}

function clearState (state) {
  state = state || '$'
  app.clearAll(false, state)
  console.log('State Cleared:', state)
}
