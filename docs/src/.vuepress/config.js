const { description } = require('../../package');
const { auto } = require("async");

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'JavaScript High Level Functions',
  base: '/Dlubal_JavaScript_Library/',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    // ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  plugins: [
    '@vuepress/back-to-top',

  ],
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: true,
    docsDir: '',
    sidebarDepth: 4,
    editLinkText: '',
    lastUpdated: true,
    searchPlaceholder: 'Search...',
    searchMaxSuggestions: 10,
    smoothScroll: true,
    logo: '/images/dev_docs.png',
    nav: [
      {
        text: 'Blocks',
        link: '/blocks/introblocks',
      },
      {
        text: 'Articles',
        link: '/Articles/NotesToScripts'
      },
      {
        text: 'JavaScript HLF',
        link: '/code/'
      },
      { text: 'About', link: 'https://www.dlubal.com/en' },
      { text: 'Github', link: 'https://github.com/Dlubal-Software/RFEM_Python_Client' }
    ],
    sidebar: {
      '/blocks/': [
        {
          title: 'Blocks',
          collapsable: true,
          children: [
            'introblocks','functionsForBlocks',
          ]
        }
      ],
      '/Articles/': [
        {
          title: 'Articles',
          collapsable: true,
          children: [
           'NotesToScripts',
          ]
        }
      ],
      '/code/': [
        {
          title: 'JavaScript High Level Functions',
          collapsable: false,
          children: [
            '', 'block', "dlubal", "table_shortcuts",
            {
              "title": "AnalysisSettings",
              "collapsable": false,
              "children":
                ["AnalysisSettings/ModalAnalysisSettings", "AnalysisSettings/SpectralAnalysisSettings", "AnalysisSettings/StabilityAnalysisSettings", "AnalysisSettings/StaticAnalysisSettings", "AnalysisSettings/WindSimulationSettings"]
            },
            { "title": "BasicObjects", "collapsable": false, "children": ["BasicObjects/Line", "BasicObjects/LineSet", "BasicObjects/Material", "BasicObjects/Member", "BasicObjects/MemberSet", "BasicObjects/Node", "BasicObjects/Opening", "BasicObjects/RsectionControlPoint", "BasicObjects/RsectionElement", "BasicObjects/RsectionLine", "BasicObjects/RsectionOpening", "BasicObjects/RsectionPart", "BasicObjects/RsectionPoint", "BasicObjects/RsectionStiffener", "BasicObjects/RsectionStressPoint", "BasicObjects/RsectionSubpanel", "BasicObjects/rsection_control_point", "BasicObjects/rsection_dimension", "BasicObjects/rsection_element", "BasicObjects/rsection_line", "BasicObjects/rsection_opening", "BasicObjects/rsection_part", "BasicObjects/rsection_point", "BasicObjects/rsection_stiffener", "BasicObjects/rsection_stress_point", "BasicObjects/rsection_subpanel", "BasicObjects/Section", "BasicObjects/Solid", "BasicObjects/SolidSet", "BasicObjects/Surface", "BasicObjects/SurfaceSet", "BasicObjects/Thickness"] },
            { "title": "Dimensions", "collapsable": false, "children": ["Dimensions/AngularDimension", "Dimensions/ArcLengthDimension", "Dimensions/DiameterDimension", "Dimensions/LinearDimension", "Dimensions/RadiusDimension", "Dimensions/SlopeDimension"] },
            { "title": "GlobalParameters", "collapsable": false, "children": ["GlobalParameters/FormulaGlobalParameter", "GlobalParameters/OptimizationAscendingGlobalParameter", "GlobalParameters/OptimizationDescendingGlobalParameter", "GlobalParameters/OptimizationGlobalParameter", "GlobalParameters/ValueGlobalParameter"] },
            { "title": "GuideObjects", "collapsable": false, "children": ["GuideObjects/CoordinateSystem"] },
            { "title": "Imperfections", "collapsable": false, "children": ["Imperfections/ImperfectionCase", "Imperfections/ImperfectionSupport", "Imperfections/MemberImperfection", "Imperfections/MemberSetImperfection", "Imperfections/SurfaceImperfection", "Imperfections/SurfaceSetImperfection"] },
            { "title": "includes", "collapsable": false, "children": [] },
            { "title": "InternalForces", "collapsable": false, "children": ["InternalForces/RsectionInternalForces"] },
            { "title": "Loading", "collapsable": false, "children": ["Loading/DesignSituation", "Loading/LoadCase", "Loading/LoadCombination", "Loading/RsectionLoadCase", "Loading/RsectionLoadCombination"] },
            { "title": "Loads", "collapsable": false, "children": ["Loads/BaseLoad", "Loads/FreeCircularLoad", "Loads/FreeConcentratedLoad", "Loads/FreeLineLoad", "Loads/FreePolygonLoad", "Loads/FreeRectangularLoad", "Loads/ImposedLineDeformation", "Loads/ImposedNodalDeformation", "Loads/LineLoad", "Loads/LineSetLoad", "Loads/LoadImpl", "Loads/MemberLoad", "Loads/MemberSetLoad", "Loads/NodalLoad", "Loads/OpeningLoad", "Loads/SolidLoad", "Loads/SolidSetLoad", "Loads/SurfaceLoad", "Loads/SurfaceSetLoad"] },
            { "title": "LoadWizards", "collapsable": false, "children": ["LoadWizards/MemberLoadFromAreaLoadWizard", "LoadWizards/MemberLoadFromFreeLineLoadWizard", "LoadWizards/SnowLoadWizard", "LoadWizards/WindLoadWizard"] },
            { "title": "SpecialObjects", "collapsable": false, "children": ["SpecialObjects/StructureModification"] },
            { "title": "Supports", "collapsable": false, "children": ["Supports/Functions", "Supports/Nonlinearities/nonlinearities", "Supports/Nonlinearities/NonlinearitiesRx", "Supports/Nonlinearities/NonlinearitiesRy", "Supports/Nonlinearities/NonlinearitiesRz", "Supports/Nonlinearities/NonlinearitiesX", "Supports/Nonlinearities/NonlinearitiesY", "Supports/Nonlinearities/NonlinearitiesZ"] },
            { "title": "Tools", "collapsable": false, "children": ["Tools/clearAll", "Tools/global", "Tools/high_level_functions_support", "Tools/joints"] },
            { "title": "TypesForLines", "collapsable": false, "children": ["TypesForLines/LineHinge", "TypesForLines/LineMeshRefinement", "TypesForLines/LineSupport"] },
            { "title": "TypesForMembers", "collapsable": false, "children": ["TypesForMembers/MemberDefinableStiffness", "TypesForMembers/MemberEccentricity", "TypesForMembers/MemberHinge", "TypesForMembers/MemberNonlinearity", "TypesForMembers/MemberResultIntermediatePoint", "TypesForMembers/MemberStiffnessModification", "TypesForMembers/MemberSupport", "TypesForMembers/MemberTransverseStiffener"] },
            { "title": "TypesForNodes", "collapsable": false, "children": ["TypesForNodes/NodalMeshRefinement", "TypesForNodes/NodalSupport"] },
            { "title": "TypesForSolids", "collapsable": false, "children": ["TypesForSolids/ContactSolids", "TypesForSolids/GasSolids", "TypesForSolids/SolidMeshRefinement"] },
          ]
        }

      ],
    },
  }
}