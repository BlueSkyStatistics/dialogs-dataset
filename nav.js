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
                "./removeSplit",
                "./setSplit.js"
                
            ]
        },
        {
            "name": "Merge",
            "icon": "icon-merge_right",
            "children": [
                "./mergeDatasetsNew",
                "./mergeDatasets",
                "./stackDatasets"
               ]
        },
        {
            "name": "ReShape",
            "icon": "icon-reshape",
            "children": [
                "./reshapeWideToLong",
                "./reshapeLongToWide"
                
            ]
        },
        {
            "name": "Sampling",
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
                "./transposeEntireDataset",
                "./transposeSelectVariables"
                
            ]
        }
    ]
}

module.exports.nav = nav

