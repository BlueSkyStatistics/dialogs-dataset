let t = getT('menutoolbar')

const nav = () => ({
    "name": t('datasets_top_level_title'),// {ns: 'menutoolbar'}),
    "tab": "Datasets",
    "buttons": [
        "./aggregate.js",
        "./expandDataByWeights",
        {
            "name": t('datasets_group_by'),// {ns: 'menutoolbar'}),
            "icon": "icon-group",
            "children": [
                "./removeSplit",
                "./setSplit.js"
                
            ]
        },
        {
            "name": t('datasets_Matching'),// {ns: 'menutoolbar'}),
            "icon": "icon-paired",
            "children": [
               ]
        },        
        {
            "name": t('datasets_Merge'),//{ns: 'menutoolbar'}),
            "icon": "icon-merge_right",
            "children": [
                "./mergeDatasetsNew",
                "./mergeDatasets",
                "./stackDatasets"
               ]
        },
        {
            "name": t('datasets_ReShape'),// {ns: 'menutoolbar'}),
            "icon": "icon-reshape",
            "children": [
                "./reshapeWideToLong",
                "./reshapeLongToWide"
                
            ]
        },
        {
            "name": t('datasets_Sampling'),// {ns: 'menutoolbar'}),
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
            "name": t('datasets_Sort'),// {ns: 'menutoolbar'}),
            "icon": "icon-sort_vertical",
            "children": [
                "./reorderDatasetVariables",
                "./sortDatasetsNew"
            ]
        },
        {
            "name": t('datasets_Subset'),// {ns: 'menutoolbar'}),
            "icon": "icon-funnel",
            "children": [
                "./subsetDataset"
               ]
        },  		
        {
            "name": t('datasets_Transpose'),// {ns: 'menutoolbar'}),
            "icon": "icon-transpose",
            "children": [
                "./transposeEntireDataset",
                "./transposeSelectVariables"
                
            ]
        }
    ]
})

module.exports = {
    nav: nav(),
    render: () => nav()
}

