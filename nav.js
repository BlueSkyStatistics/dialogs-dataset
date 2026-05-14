const nav = {
    "id": "menu-datasets",
    "buttons": [
        "./aggregate.js",
        "./expandDataByWeights",
        {
            "id": "menu-datasets-group-by",
            "icon": "icon-group",
            "children": [
                "./removeSplit",
                "./setSplit.js"
                
            ]
        },
        {
            "id": "menu-datasets-matching",
            "icon": "icon-paired",
            "children": [
               ]
        },        
        {
            "id": "menu-datasets-merge",
            "icon": "icon-merge_right",
            "children": [
                "./mergeDatasetsNew",
                "./mergeDatasets",
                "./stackDatasets"
               ]
        },
        {
            "id": "menu-datasets-reshape",
            "icon": "icon-reshape",
            "children": [
                "./reshapeWideToLong",
                "./reshapeLongToWide"
                
            ]
        },
        {
            "id": "menu-datasets-sampling",
            "icon": "icon-sample",
            "children": [
                "./randomSplit",
                "./sample",
                "./downSample",
                "./upSample",
                "./stratifiedSample",
                
            ]
        },
        {
            "id": "menu-datasets-sort",
            "icon": "icon-sort_vertical",
            "children": [
                "./reorderDatasetVariables",
                "./sortDatasetsNew"
            ]
        },
        {
            "id": "menu-datasets-subset",
            "icon": "icon-funnel",
            "children": [
                "./subsetDataset"
               ]
        },  		
        {
            "id": "menu-datasets-transpose",
            "icon": "icon-transpose",
            "children": [
                "./transposeEntireDataset",
                "./transposeSelectVariables"
                
            ]
        }
    ]
}

module.exports.nav = nav

