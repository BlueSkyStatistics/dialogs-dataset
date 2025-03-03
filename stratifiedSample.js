/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Stratified Split",
        navigation: "Stratified Split",
        traindataset: "Enter the name of the training dataset",
        testdataset: "Enter the name of the test dataset",
        split: "Enter the split percentage",
        seed: "Set seed",
        dependent: "Variable to construct stratified samples from",
        help: {
            title: "Stratified Split",
            r_help: "help(createDataPartition, package=\"caret\")",
            body: `
<b>Description</b></br>
A series of test/training partitions are created using createDataPartition while createResample creates one or more bootstrap samples. createFolds splits the data into k groups while createTimeSlices creates cross-validation split for series data. groupKFold splits the data based on a grouping factor.
<br/>
<b>Usage</b>
<br/>
<code> 
createDataPartition(y, times = 1, p = 0.5, list = TRUE, groups = min(5,length(y)))<br/>
createFolds(y, k = 10, list = TRUE, returnTrain = FALSE)<br/>
createTimeSlices(y, initialWindow, horizon = 1, fixedWindow = TRUE,skip = 0)<br/>
groupKFold(group, k = length(unique(group)))<br/>
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
y: a vector of outcomes. For createTimeSlices, these should be in chronological order.
</li>
<li>
times: the number of partitions to create
</li>
<li>
p: the percentage of data that goes to training
</li>
<li>
list: logical - should the results be in a list (TRUE) or a matrix with the number of rows equal to floor(p * length(y)) and times columns.
</li>
<li>
groups: for numeric y, the number of breaks in the quantiles (see below)
</li>
<li>
k: an integer for the number of folds.
</li>
<li>
returnTrain: a logical. When true, the values returned are the sample positions corresponding to the data used during training. This argument only works in conjunction with list = TRUE
</li>
<li>
initialWindow: The initial number of consecutive values in each training set sample
</li>
<li>
horizon: the number of consecutive values in test set sample
</li>
<li>
fixedWindow: logical, if FALSE, all training samples start at 1
</li>
<li>
skip: integer, how many (if any) resamples to skip to thin the total amount
</li>
<li>
group: a vector of groups whose length matches the number of rows in the overall data set.
</li>
</ul>
<b>Details</b></br>
For bootstrap samples, simple random sampling is used.
For other data splitting, the random sampling is done within the levels of y when y is a factor in an attempt to balance the class distributions within the splits.</br>
For numeric y, the sample is split into groups sections based on percentiles and sampling is done within these subgroups. For createDataPartition, the number of percentiles is set via the groups argument. For createFolds and createMultiFolds, the number of groups is set dynamically based on the sample size and k. For smaller samples sizes, these two functions may not do stratified splitting and, at most, will split the data into quartiles.</br>
Also, for createDataPartition, very small class sizes (<= 3) the classes may not show up in both the training and test data.</br>
For multiple k-fold cross-validation, completely independent folds are created. The names of the list objects will denote the fold membership using the pattern "Foldi.Repj" meaning the ith section (of k) of the jth cross-validation set (of times). Note that this function calls createFolds with list = TRUE and returnTrain = TRUE.</br>
Hyndman and Athanasopoulos (2013)) discuss rolling forecasting origin techniques that move the training and test sets in time. createTimeSlices can create the indices for this type of splitting.</br>
For Group k-fold cross-validation, the data are split such that no group is contained in both the modeling and holdout sets. One or more group could be left out, depending on the value of k.</br>
<b>Value</b><br/>
A list or matrix of row position integers corresponding to the training data. For createTimeSlices subsamples are named by the end index of each training subsample.</br>
<b>Package</b></br>
caret</br>
klaR</br>
<b>Help</b></br>
help(createDataPartition, package="caret")
        `}
    }
}












class stratifiedSample extends baseModal {
    constructor() {
        var config = {
            id: "stratifiedSample",
            label: localization.en.title,
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(caret)
require(klaR)
set.seed({{selected.seed | safe}})
trainIndex <- caret::createDataPartition({{dataset.name}}\${{selected.dependent | safe}}, p={{selected.split | safe}} / 100 , list=FALSE)
{{selected.traindataset | safe}} <- {{dataset.name}}[ trainIndex,]
{{selected.testdataset | safe}} <- {{dataset.name}}[-trainIndex,]
BSkyLoadRefresh("{{selected.traindataset | safe}}")
BSkyLoadRefresh("{{selected.testdataset | safe}}")
`
        }
        var objects = {
            traindataset: {
                el: new input(config, {
                    no: 'traindataset',
                    label: localization.en.traindataset,
                    placeholder: "",
                    extraction: "TextAsIs",
                    required: true,
                    type: "character",
                    value: "traindata",
                    overwrite: "dataset",
                })
            },
            testdataset: {
                el: new input(config, {
                    no: 'testdataset',
                    label: localization.en.testdataset,
                    placeholder: "",
                    extraction: "TextAsIs",
                    required: true,
                    type: "character",
                    value: "testdata",
                    overwrite: "dataset",
                })
            },
            /*   split: {
                  el: new input(config, {
                      no: 'split',
                      label: localization.en.split,
                      placeholder: "",
                      extraction: "TextAsIs",
                      required: true,
                      type: "numeric",
                      value:80,
                  })
              }, */
            split: {
                el: new inputSpinner(config, {
                    no: 'split',
                    label: localization.en.split,
                    min: 0,
                    max: 100,
                    step: 1,
                    value: 80,
                    required: true,
                    extraction: "NoPrefix|UseComma"
                })
            },
            /*  seed: {
                 el: new input(config, {
                     no: 'seed',
                     label: localization.en.seed,
                     placeholder: "",
                     extraction: "TextAsIs",
                     required: true,
                     type: "numeric",
                     value:123,
                 })
             }, */
            seed: {
                el: new inputSpinner(config, {
                    no: 'seed',
                    label: localization.en.seed,
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 12345,
                    extraction: "NoPrefix|UseComma"
                })
            },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            dependent: {
                el: new dstVariable(config, {
                    label: localization.en.dependent,
                    no: "dependent",
                    filter: "String|Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            head: [objects.traindataset.el.content, objects.testdataset.el.content, objects.split.el.content, objects.seed.el.content],
            left: [objects.content_var.el.content],
            right: [objects.dependent.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-stack",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new stratifiedSample().render()