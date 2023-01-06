const nav = {
    "name": "Datasets",
    "tab": "Datasets",
    "buttons": [
        "./aggregate.js",
        "./expandDataByWeights",
        {
            "name": "Group By",
            "icon": "icon-group",
            "children": [
                "./setSplit.js",
                "./removeSplit"
            ]
        },
        {
            "name": "Merge",
            "icon": "icon-merge_right",
            "children": [
                "./mergeDatasets",
              "./mergeDatasetsNew",
                "./stackDatasets"
               ]
        },
        {
            "name": "ReShape",
            "icon": "icon-reshape",
            "children": [
                "./reshapeLongToWide",
                "./reshapeWideToLong"
            ]
        },
        {
            "name": "Sampling",
            "icon": "icon-sample",
            "children": [
                "./sample",
                "./randomSplit",
                "./stratifiedSample",
                "./upSample",
                "./downSample"
            ]
        },
        {
            "name": "Sort",
            "icon": "icon-sort_vertical",
            "children": [
                "./reorderDatasetVariables",
                "./sortDatasetsNew"
            ]
        },
        {
            "name": "Subset",
            "icon": "icon-funnel",
            "children": [
                "./subsetDataset"
               ]
        },  		
        {
            "name": "Transpose",
            "icon": "icon-transpose",
            "children": [
                "./transposeSelectVariables",
                "./transposeEntireDataset"
            ]
        }
    ]
}

module.exports.nav = nav

