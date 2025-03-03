/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

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
            "name": "Matching",
            "icon": "icon-paired",
            "children": [
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

