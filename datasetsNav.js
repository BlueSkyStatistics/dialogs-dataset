
const navObject = {
    name: "Datasets",
    tab: "Datasets",
    buttons: [
        aggregate.nav,
        expandDataByWeights.nav,
        {
            name: "Group By",
            icon: "icon-group",
            children: [
                setSplit.nav,
                removeSplit.nav
            ]
        },
        {
            name: "Merge",
            icon: "icon-merge_right",
            children: [
                mergeDatasets.nav,
                stackDatasets.nav,
               ]
        },
        {
            name: "ReShape",
            icon: "icon-reshape",
            children: [
                reshapeLongToWide.nav,
                reshapeWideToLong.nav,
            ]
        },
        {
            name: "Sampling",
            icon: "icon-sample",
            children: [
                sample.nav,
                randomSplit.nav,
                stratifiedSample.nav,
                upSample.nav,
                downSample.nav
            ]
        },
        {
            name: "Sort",
            icon: "icon-sort_vertical",
            children: [
                reorderDatasetVariables.nav,
                sortDatasetsNew.nav
            ]
        },
        subsetDataset.nav,
        {
            name: "Transpose",
            icon: "icon-transpose",
            children: [
                transposeSelectVariables.nav,
                transposeEntireDataset.nav,
            ]
        },
    ]
}
module.exports = {
    navObject: navObject,
    modals: [
        expandDataByWeights,
        sample,
        subsetDataset,
        subsetOutput,
        aggregate,
        sortDatasetsNew,
        reshapeLongToWide,
        reshapeWideToLong,
        setSplit,
        downSample,
        upSample,
        stratifiedSample,
        randomSplit,
        transposeEntireDataset,
        transposeSelectVariables,
        reorderDatasetVariables,
        removeSplit,
        stackDatasets,
        mergeDatasets
    ]
}