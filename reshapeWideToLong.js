
var localization = {
  en: {
    title: "Reshape, wide to long",
    label2: "Choose the variables to reshape or alternately choose the variables not to reshape. In the latter case, all remaining variables will be reshaped into column(s)",
    navigation: "Longer",
    label0: "You can choose to save the results to a new dataset or overwrite the existing dataset",
    label1: "Options",
    advanced: "Advanced",
    New: "Save results to a new dataset",
    newdatasetname: "Enter a dataset name",
    Existing: "Overwrite existing dataset",
    label12: "Enter variable name(s) for new repeated factor variable(s)",
    repeatedMeasure: "NOTE: When specifying multiple variable names that store repeated factors, separate them by comma for e.g. Month, Day. You must also click advanced to specify \nhow the variable names get created.",
    repeatedValue: "Variable name for the repeated value e.g. Count",
    labelChoice: "Select one of the options below",
    subsetvars: "Option1: Select variable(s) to reshape into one or more variable(s)",
    names_sep: "Option2: Specify a character or regular expression to split column names to create values for variable names. Takes the same specification as separate(), and can either be a numeric vector (specifying positions to break on), or a single string (specifying a regular expression to split on)",
    names_pattern: "Option1: A regular expression containing matching groups (()). The matching part of the regular expression between the () will be used to create variable names.",
    dontReshape: "Option2: Select variable(s) not to reshape (all remaining variables will be reshaped into column(s))",
    removeNA: "Remove rows where repeated value is NA.",
    makeString: "Make the repeated factor a R string type instead of a factor",
    label3: "If there are multiple new variables created for repeated factors, the options below control how the column names get broken up. Select one of the 2 options below.",
    help: {
      title: "Reshape (wide to long)",
      r_help: "help(pivot_longer, package=tidyr)",
      body: `
<b>Description</b></br>
See video at <a href=" https://youtu.be/ypLXqmFp3jY">Reshape wide to long</a></br>
Takes a wide dataset and converts it to a long dataset by converting columns into key value pairs
Pivot_longer takes multiple columns and collapses into key-value pairs, duplicating all other columns as needed. You use pivot_longer() when you notice that you have columns that are not variables.</br>
Type in vignette("pivot") in the R editor to see the R help. If there are multiple columns to create, you need to specify arguments to specify now the column names are constructed.</br>
In this case, click advanced to enter a regular expression that specifies how variables should be created from column names.</br>
NOTE: When specifying multiple variables for the repeated factor(s) separate them by ,
<br/>
<b>Usage</b>
<br/>
<code> 
pivot_longer( cols=c(col1, col2...),names_to="key",values_to="value",values_drop_na = TRUE)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
cols: Columns to pivot into longer format.
</li>
<li>
values_to: A string specifying the name of the column to create from the data stored in cell values. If names_to is a character containing the special .value sentinel, this value will be ignored, and the name of the value column will be derived from part of the existing column names.If empty, all variables are selected, exclude a variable y with -y. When excluding variables all remaining variables are pivoted to long.
</li>
<li>
values_drop_na: If TRUE, will drop rows that contain only NAs in the value_to column. This effectively converts explicit missing values to implicit missing values, and should generally be used only when missing values in data were created by its structure.
</li>
<li>
names_sep: takes the same specification as separate(), and can either be a numeric vector (specifying positions to break on), or a single string (specifying a regular expression to split on).</br>
Lets say the columns are Height_1_1, Height_1_2, Weight_1_1, Weight_1_2, Sagur_1_1, Sagur_2_1 where the 1st number is the month and the 2nd the week, specifying _ as the separator will result in 3 variables being created, the first variable with values Height, Weight, Sagur, the second with values 1 and 2, and the 3rd with values 1 and 2.</br>
Type help(regex) in the R code editor for more details
</li>
<li>
names_pattern: takes the same specification as extract(), a regular expression containing matching groups (()).
takes the same specification as separate(), and can either be a numeric vector (specifying positions to break on), or a single string (specifying a regular expression to split on).</br>
Lets say the columns are Height_33.1_1, Height_44.1_2, Weight_66.1_1, Weight_55.1_2, where the 2 digits after the 1st underscore are to be ignored, the digit after the . is month and digit after the last _ is week.</br>
The regular expressions that extract the values of the new variables need to be in (). The regular expression will be (.*)_.*.(.*)_(.)</br> 
Note: . in a regular expression means any character</br> 
* means 0 or more, so .* means 0 or more characters</br> 
So the string    can be interpreted as looking for a pattern of</br> 
(.*) 0 or more characters followed by</br> 
 _ an underscore followed by</br> 
 .*\. one or more characters followed by the . (escaping the . with a \ indicates that its the character itself followed by</br> 
.* one or more characters followed by</br> 
_ underscore followed by</br> 
. a single character</br> 
All the patterns between the () form values of each of the 3 new factor variables</br> 
</li>
</ul>
<b>Value</b><br/>
Returns the reshaped dataset
<br/>
<b>Package</b></br>
tidyr</br>
<b>Help</b></br>
help(pivot_longer, package=tidyr)<br/>
vignette("pivot")
`}
  }
}










class reshapeWideToLong extends baseModal {
  constructor() {
    var config = {
      id: "reshapeWideToLong",
      label: localization.en.title,
      modalType: "two",
      splitProcessing: false,
      RCode: `
require (tidyr)
.GlobalEnv\${{selected.newdatasetname | safe}}{{selected.rd | safe}} <- .GlobalEnv\${{dataset.name}} %>% \n\tpivot_longer( cols=c({{selected.subsetvars | safe}}{{selected.dontReshape | safe}}), names_to={{selected.repeatedMeasure | safe}}, \n\nvalues_to="{{selected.repeatedValue | safe}}", {{ if (options.selected.names_sep !="") }}names_sep ="{{selected.names_sep | safe}}",{{/if}}{{ if (options.selected.names_pattern !="") }}names_pattern ="{{selected.names_pattern | safe}}",{{/if}}\nvalues_drop_na = {{selected.removeNA | safe}})
#.GlobalEnv\${{selected.newdatasetname | safe}}{{selected.rd | safe}}\${{selected.repeatedMeasure | safe}} <- factor(.GlobalEnv\${{selected.newdatasetname | safe}}{{selected.rd | safe}}\${{selected.repeatedMeasure | safe}} )
if (exists("{{selected.newdatasetname | safe}}{{selected.rd | safe}}"))
BSkyLoadRefresh("{{selected.newdatasetname | safe}}{{selected.rd | safe}}",load.dataframe=TRUE)
{
  #BSkyMakeMultiColumnFactor requires the dataset to be loaded by BSkyLoadRefresh
  BSky.Temp.Obj <- BSkyMakeMultiColumnFactor(setdiff( {{selected.repeatedMeasure | safe}}, '.value'), "{{selected.newdatasetname | safe}}{{selected.rd | safe}}")
  BSkyLoadRefresh("{{selected.newdatasetname | safe}}{{selected.rd | safe}}",load.dataframe=TRUE)
}
 `
    }
    var objects = {
      content_var: { el: new srcVariableList(config, { action: "move", scroll:true }) },
      label1: { el: new labelVar(config, { label: localization.en.label1, h: 6 }) },
      label2: { el: new labelVar(config, { label: localization.en.label2, h: 6 }) },
      New: { el: new radioButton(config, { label: localization.en.New, no: "rd", increment: "New", value: "", state: "checked", extraction: "ValueAsIs", required: true, dependant_objects: ['newdatasetname'] }) },
      newdatasetname: {
        el: new input(config, {
          no: 'newdatasetname',
          label: localization.en.newdatasetname,
          ml: 2,
          placeholder: "",
          extraction: "TextAsIs",
          overwrite: "dataset",
          type: "character"
        })
      },
      Existing: { el: new radioButton(config, { label: localization.en.Existing, no: "rd", increment: "Existing", value: "TRUE", style: "mb-2", state: "", extraction: "ValueAsIs" }) },
      label12: { el: new labelVar(config, { no: "label12", label: localization.en.repeatedMeasure, h: 6 }) },
      labelChoice: { el: new labelVar(config, { no: "labelChoice", label: localization.en.labelChoice, style: "mt-2,mb-2", h: 5 }) },
      repeatedMeasure: {
        el: new input(config, {
          no: 'repeatedMeasure',
          label: localization.en.label12,
          placeholder: "",
          extraction: "CreateArray",
          required: true,
          allow_spaces :true,
          type: "character"
        })
      },
      names_pattern: {
        el: new input(config, {
          no: 'names_pattern',
          label: localization.en.names_pattern,
          placeholder: "",
          allow_spaces :true,
          extraction: "TextAsIs",
          type: "character"
        })
      },
      names_sep: {
        el: new input(config, {
          no: 'names_sep',
          label: localization.en.names_sep,
          placeholder: "",
          allow_spaces :true,
          extraction: "TextAsIs",
          type: "character"
        })
      },
      repeatedValue: {
        el: new input(config, {
          no: 'repeatedValue',
          label: localization.en.repeatedValue,
          placeholder: "",
          extraction: "TextAsIs",
          type: "character"
        })
      },
      subsetvars: {
        el: new dstVariableList(config, {
          label: localization.en.subsetvars,
          no: "subsetvars",
          filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
          extraction: "NoPrefix|UseComma",
        }), r: ['{{ subsetvars | safe}}']
      },
      dontReshape: {
        el: new dstVariableList(config, {
          label: localization.en.dontReshape,
          no: "dontReshape",
          filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
          extraction: "NoPrefix|UseComma",
        }), r: ['{{dontReshape | safe}}']
      },
      removeNA: {
        el: new checkbox(config, {
          label: localization.en.removeNA,
          no: "removeNA",
          bs_type: "valuebox",
          extraction: "TextAsIs",
          true_value: "TRUE",
          false_value: "FALSE",
        })
      },
      label3: { el: new labelVar(config, { label: localization.en.label3, h: 6 }) },
    }
    var advanced = {
      el: new optionsVar(config, {
        no: "advanced",
        name: localization.en.advanced,
        content: [
          objects.label3.el,
          objects.names_pattern.el,
          objects.names_sep.el,
        ]
      })
    };
    const content = {
      head: [objects.label2.el.content],
      left: [objects.content_var.el.content],
      right: [objects.label1.el.content, objects.New.el.content, objects.newdatasetname.el.content, objects.Existing.el.content, objects.label12.el.content, objects.repeatedMeasure.el.content, objects.repeatedValue.el.content, objects.labelChoice.el.content, objects.subsetvars.el.content, objects.dontReshape.el.content, objects.removeNA.el.content],
      bottom: [advanced.el.content],
      nav: {
        name: localization.en.navigation,
        icon: "icon-longer",
        modal: config.id
      }
    }
    super(config, objects, content);
    this.help = localization.en.help;
  }
  prepareExecution(instance) {
    var res = [];
    var code_vars = {
      dataset: {
        name: getActiveDataset()
      },
      selected: {
        newdatasetname: instance.objects.newdatasetname.el.getVal(),
        rd: common.getCheckedRadio("reshapeWideToLong_rd"),
        repeatedMeasure: instance.objects.repeatedMeasure.el.getVal(),
        repeatedValue: instance.objects.repeatedValue.el.getVal(),
        subsetvars: instance.dialog.prepareSelected({ subsetvars: instance.objects.subsetvars.el.getVal() }, instance.objects.subsetvars.r),
        dontReshape: instance.dialog.prepareSelected({ dontReshape: instance.objects.dontReshape.el.getVal() }, instance.objects.dontReshape.r),
        removeNA: instance.objects.removeNA.el.getVal(),
        names_pattern: instance.objects.names_pattern.el.getVal(),
        names_sep: instance.objects.names_sep.el.getVal(),
      }
    }
    //variables that are excluded from the reshape are prefaced by -
    if (code_vars.selected.rd == "TRUE") {
      code_vars.selected.rd = code_vars.dataset.name;
    }
    if (code_vars.selected.dontReshape[0] != '') {
      let vars1 = code_vars.selected.dontReshape[0].split(",");
      let vars2 = vars1.map(vars1 => '-' + vars1);
      code_vars.selected.dontReshape = ',' + vars2.join(",");
    }
    if (code_vars.selected.repeatedMeasure.includes(",")) {
      let vars3 = code_vars.selected.repeatedMeasure.split(",");
      let vars4 = vars3.map(vars3 => '\"' + vars3.trim() + "\"");
      code_vars.selected.repeatedMeasure = "c(" + vars4.join(",") + ")";
    }
    else {
      code_vars.selected.repeatedMeasure = "\"" + code_vars.selected.repeatedMeasure + "\"";
    }
    let cmd = instance.dialog.renderR(code_vars)
    cmd = removenewline(cmd);
    res.push({ cmd: cmd, cgid: newCommandGroup() })
    return res;
  }
}
module.exports.item = new reshapeWideToLong().render()