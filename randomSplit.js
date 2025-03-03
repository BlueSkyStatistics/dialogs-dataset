/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Random Split",
        navigation: "Random Split",
        traindataset: "Enter the name of the training dataset",
        testdataset: "Enter the name of the test dataset",
        split: "Enter the split percentage",
        replace: "Should sampling be with replacements",
        seed: "Set seed",
        dependent: "Variable to construct stratified samples from",
        help: {
            title: "Random Split",
            r_help: "help(sample, package=\"base\")",
            body: `
<b>Description</b></br>
sample takes a sample of the specified size from the elements of x using either with or without replacement.
<br/>
<b>Usage</b>
<br/>
<code> 
sample(x, size, replace = FALSE, prob = NULL)
sample.int(n, size = n, replace = FALSE, prob = NULL)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: Either a vector of one or more elements from which to choose, or a positive integer. See ‘Details.’
</li>
<li>
n: a positive number, the number of items to choose from. See ‘Details.’
</li>
<li>
size: a non-negative integer giving the number of items to choose.
</li>
<li>
replace: Should sampling be with replacement?
</li>
<li>
prob: A vector of probability weights for obtaining the elements of the vector being sampled.
</li>
</ul>
<b>Details</b></br>
If x has length 1, is numeric (in the sense of is.numeric) and x >= 1, sampling via sample takes place from 1:x. Note that this convenience feature may lead to undesired behaviour when x is of varying length in calls such as sample(x). See the examples.<br/>
Otherwise x can be any R object for which length and subsetting by integers make sense: S3 or S4 methods for these operations will be dispatched as appropriate.<br/>
For sample the default for size is the number of items inferred from the first argument, so that sample(x) generates a random permutation of the elements of x (or 1:x).<br/>
It is allowed to ask for size = 0 samples with n = 0 or a length-zero x, but otherwise n > 0 or positive length(x) is required.<br/>
Non-integer positive numerical values of n or x will be truncated to the next smallest integer, which has to be no larger than .Machine$integer.max.<br/>
The optional prob argument can be used to give a vector of weights for obtaining the elements of the vector being sampled. They need not sum to one, but they should be non-negative and not all zero. If replace is true, Walker's alias method (Ripley, 1987) is used when there are more than 200 reasonably probable values: this gives results incompatible with those from R < 2.2.0.<br/>
If replace is false, these probabilities are applied sequentially, that is the probability of choosing the next item is proportional to the weights amongst the remaining items. The number of nonzero weights must be at least size in this case.<br/>
sample.int is a bare interface in which both n and size must be supplied as integers.<br/>
As from R 3.0.0, n can be larger than the largest integer of type integer, up to the largest representable integer in type double. Only uniform sampling is supported. Two random numbers are used to ensure uniform sampling of large integers.<br/>
<b>Package</b></br>
base
<b>Help</b></br>
help(sample, package="base")
`}
    }
}












class randomSplit extends baseModal {
    constructor() {
        var config = {
            id: "randomSplit",
            label: localization.en.title,
            modalType: "one",
            splitProcessing:false,
            RCode: `
require(caret)
require(klaR)
{{ if(options.selected.seed != "")}}## set the seed to make your partition reproductible\nset.seed({{selected.seed | safe}})\n{{/if}}
trainIndex  <- base::sample(x=seq_len(nrow({{dataset.name}})), replace ={{selected.replace | safe}}, size = base::floor(({{selected.split | safe}} / 100) * nrow({{dataset.name}})))
{{selected.traindataset | safe}} <- {{dataset.name}}[trainIndex , ]
{{selected.testdataset | safe}} <- {{dataset.name}}[-trainIndex , ]
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
            split: {
                el: new inputSpinner(config, {
                    no: 'split',
                    label: localization.en.split,
                    min: 0,
                    max: 100,
                    step: 1,
                    value: 80,
                    extraction: "NoPrefix|UseComma"
                })
            },
            replace: { el: new checkbox(config, { label: localization.en.replace, no: "replace", extraction: "Boolean" }) },
            seed: {
                el: new inputSpinner(config, {
                    no: 'seed',
                    label: localization.en.seed,
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 12345,
                    required: true,
                    extraction: "NoPrefix|UseComma"
                })
            },
        }
        const content = {
            items: [objects.traindataset.el.content, objects.testdataset.el.content, objects.split.el.content, objects.replace.el.content, objects.seed.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-dice",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new randomSplit().render()