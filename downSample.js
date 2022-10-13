var localization = {
    en: {
        title: "Down Sample",
        navigation: "Down Sample",
        description: `Down-Sampling Imbalanced Data. DownSample will randomly sample a data set so that all classes have the same frequency as the minority class`,
        downsample: "Enter the name of the dataset",
        seed: "Set seed",
        dependent: "Variable to down sample by",
        help: {
            title: "Down Sample",
            r_help: "help(createDataPartition, package=\"caret\")",
            body: `
<b>Description</b></br>
Down-Sampling Imbalanced Data. DownSample will randomly sample a data set so that all classes have the same frequency as the minority class
<br/>
<b>Usage</b>
<br/>
<code> 
downSample(x, y, list = FALSE, yname = "Class")
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: a matrix or data frame of predictor variables
</li>
<li>
y: a factor variable with the class memberships
</li>
<li>
list: should the function return list(x, y) or bind x and y together? If TRUE, the output will be coerced to a data frame.
</li>
<li>
yname: if list = FALSE, a label for the class column
</li>
</ul>
<b>Details</b></br>
Simple random sampling is used to down-sample for the majority class(es). Note that the minority class data are left intact and that the samples will be re-ordered in the down-sampled version.</br>
For up-sampling, all the original data are left intact and additional samples are added to the minority classes with replacement.</br>
<b>Value</b><br/>
Either a data frame or a list with elements x and y.</br>
<b>Examples</b></br>
## A ridiculous example...
data(oil)</br>
table(oilType)</br>
downSample(fattyAcids, oilType)</br>
<b>Package</b></br>
caret</br>
<b>Help</b></br>
help(downSample, package ='caret')
`}
    }
}
class downSample extends baseModal {
    constructor() {
        var config = {
            id: "downSample",
            label: localization.en.title,
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(caret)
require(klaR)
set.seed({{selected.seed | safe}})
{{selected.downsample | safe}} <-downSample( x={{dataset.name}}[-BSkygetIndexesOfCols(c("{{selected.dependent | safe}}"), c("{{dataset.name}}"))], y={{dataset.name}}\${{selected.dependent | safe}}, list =FALSE, yname =c("{{selected.dependent | safe}}"))
BSkyLoadRefresh("{{selected.downsample | safe}}")
`
        }
        var objects = {
            downsample: {
                el: new input(config, {
                    no: 'downsample',
                    label: localization.en.downsample,
                    placeholder: "",
                    extraction: "TextAsIs",
                    required: true,
                    type: "character",
                    value: "DownSample",
                    overwrite: "dataset",
                })
            },
            seed: {
                el: new inputSpinner(config, {
                    no: 'seed',
                    label: localization.en.seed,
                    min: 0,
                    max: 9999999,
                    step: 0,
                    required: true,
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
            head: [objects.downsample.el.content, objects.seed.el.content],
            left: [objects.content_var.el.content],
            right: [objects.dependent.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-arrow_down",
                modal: config.id,
                description: localization.en.description
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new downSample().render()