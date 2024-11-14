
var localization = {
  en: {
    toplabel: "By default all dataset columns except the selected repeated factor and value variables will be used to identify each observation. To overide, see below",
    id_cols:"Optional: By default all dataset columns except the selected repeated factor and value variables will be used to identify each observation. To overide, select and move variables", 
    title: "Reshape, long to wide",
    navigation: "Wider",
    labelTop: "When a single repeated factor and value variable is specified, new variable names are prefixed with the name of the repeated factor. In all other cases, they are prefixed by the name of the value variable",
    label0: "You can choose to save the results in a new dataset or overwrite the existing dataset",
    label1: "Options",
    New: "Save results to a new dataset",
    newdatasetname: "Enter a dataset name",
    Existing: "Overwrite existing dataset",
    subsetvars: "Enter variable name(s) of the repeated factor(s), for e.g. Time",
    dontReshape: "Enter variable name(s) for the repeated value(s) e.g. Counts",
    names_sort: "Order column names alphabetically",
    appearence_sort: "Order column names by appearance",
    names_sep: "Optional separator to use when joining specified variable names to form new variable names",
    label2: "Sort Options",
    help: {
      title: "Reshape (long to wide)",
      r_help: "help(pivot_wider, package=tidyr)",
      body: `
           <b>Description</b></br>
See video at <a href="https://youtu.be/ypLXqmFp3jY">Reshape long to wide</a></br>
Takes a wide dataset and converts it to a long dataset by converting (widening) columns. Pivot_wider "lengthens" data, increasing the number of rows and decreasing the number of columns. You use pivot_wider when you have variables/columns whose values need to be in rows. 
<br/>
NOTE: When one repeated factor is specified, new variable names are prefixed with the name of the repeated factor. When multiple repeated factors are specified, they are prefixed by the name of the value variable</br>
<b>Usage</b>
<br/>
<code> 
dataset %>% 
	pivot_wider(names_from =name, values_from=value, names_sort= TRUE)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
dataset: A dataframe/tibble
</li>
<li>
names_from: the name of the output column 
</li>
<li>
values_from: the column  to get the cell values from 
</li>
<li>
names_sort: Should the column names be sorted? If FALSE, the default, column names are ordered by first appearance.
</li>
<li>
names_sep: Optional separator to use when joining specified variable names to form new variable names
</li>
<li>
<b>Value</b><br/>
Returns the reshaped dataset
<br/>
<b>Package</b></br>
tidyr
<b>Help</b></br>
help(pivot_wider)
`}
  }
}








class reshapeLongToWide extends baseModal {
  constructor() {
    var config = {
      id: "reshapeLongToWide",
      label: localization.en.title,
      modalType: "two",
      splitProcessing:false,
      RCode: `
require (tidyr)
{{selected.newdatasetname | safe}}{{selected.rd | safe }} <- {{dataset.name}} %>% \n\tpivot_wider({{if (options.selected.id_cols !="")}}id_cols = c({{selected.id_cols | safe}}), {{/if}} names_from =c({{selected.subsetvars | safe}}), \n\t values_from=c({{selected.dontReshape | safe}}), {{if (options.selected.names_prefix !="")}}names_prefix ="{{selected.names_prefix | safe}}",{{/if}} {{if (options.selected.names_sep !="")}}names_sep ="{{selected.names_sep | safe}}",{{/if}} names_sort= {{selected.grp1 | safe}})
BSkyLoadRefresh("{{selected.newdatasetname | safe}}{{selected.rd | safe}}",load.dataframe=TRUE)
 `
    }
    var objects = {
      content_var: { el: new srcVariableList(config, {action: "move", scroll:true}) },
      toplabel: { el: new labelVar(config, { label: localization.en.toplabel, h: 6 }) },
      label1: { el: new labelVar(config, { label: localization.en.label1, h: 5 }) },
      New: { el: new radioButton(config, { label: localization.en.New, no: "rd", increment: "New", required: true, dependant_objects: ['newdatasetname'], value: "", state: "checked", extraction: "ValueAsIs", dependant_objects: ['newdatasetname'] }) },
      newdatasetname: {
        el: new input(config, {
          no: 'newdatasetname',
          label: localization.en.newdatasetname,
          placeholder: "",
          extraction: "TextAsIs",
          ml: 4,
          type: "character",
          overwrite: "dataset",
        })
      },
      Existing: { el: new radioButton(config, { label: localization.en.Existing, no: "rd", increment: "Existing", style: "mb-2", value: "TRUE", syntax: "{{dataset.name}}", state: "", extraction: "ValueAsIs" }) },
      id_cols: {
        el: new dstVariableList(config, {
          label: localization.en.id_cols,
          no: "id_cols",
          filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
          extraction: "NoPrefix|UseComma",
        }), r: ['{{ id_cols | safe}}']
      },
      subsetvars: {
        el: new dstVariableList(config, {
          label: localization.en.subsetvars,
          no: "subsetvars",
          required:true,
          filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
          extraction: "NoPrefix|UseComma",
        }), r: ['{{ subsetvars | safe}}']
      },
      dontReshape: {
        el: new dstVariableList(config, {
          label: localization.en.dontReshape,
          no: "dontReshape",
          required: true, 
          filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
          extraction: "NoPrefix|UseComma",
        }), r: ['{{dontReshape | safe}}']
      },
      variablesToKeep: {
        el: new dstVariableList(config, {
          label: localization.en.dontReshape,
          no: "dontReshape",
          filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
          extraction: "NoPrefix|UseComma",
        }), r: ['{{dontReshape | safe}}']
      },
      label2: { el: new labelVar(config, { label: localization.en.label2, h: 5 }) },
      names_sort: { el: new radioButton(config, { label: localization.en.names_sort, no: "grp1", increment: "names_sort", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
      appearence_sort: { el: new radioButton(config, { label: localization.en.appearence_sort, no: "grp1", increment: "appearence_sort", value: "FALSE", state: "", extraction: "ValueAsIs" }) },
      names_sep: {
        el: new input(config, {
          no: 'names_sep',
          label: localization.en.names_sep,
          placeholder: "",
          allow_spaces:true,
          extraction: "TextAsIs",
          
        })
      },
    }
    const content = {
      head: [objects.toplabel.el.content],
      left: [objects.content_var.el.content],
      right: [objects.label1.el.content, objects.New.el.content, objects.newdatasetname.el.content, objects.Existing.el.content, objects.subsetvars.el.content, objects.dontReshape.el.content, objects.id_cols.el.content,objects.label2.el.content, objects.names_sort.el.content, objects.appearence_sort.el.content, objects.names_sep.el.content],
      nav: {
        name: localization.en.navigation,
        icon: "icon-wider",
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
        rd: common.getCheckedRadio("reshapeLongToWide_rd"),
        grp1: common.getCheckedRadio("reshapeLongToWide_grp1"),
        id_cols: instance.dialog.prepareSelected({ id_cols: instance.objects.id_cols.el.getVal() }, instance.objects.id_cols.r),
        subsetvars: instance.dialog.prepareSelected({ subsetvars: instance.objects.subsetvars.el.getVal() }, instance.objects.subsetvars.r),
        dontReshape: instance.dialog.prepareSelected({ dontReshape: instance.objects.dontReshape.el.getVal() }, instance.objects.dontReshape.r),
        names_sep: instance.objects.names_sep.el.getVal(),
      }
    }
    //variables that are excluded from the reshape are prefaced by -
    if (code_vars.selected.rd == "TRUE") {
      code_vars.selected.rd = code_vars.dataset.name;
    }
    //We initialize this to empty, we only set this when there is a single variable that holds repeated value
    code_vars.selected.names_prefix =""
     //If there is only a single repeated factor variable, we set a name prefix because if the repeated factor contained numerics
      //variables with numbers were created and that is not supported in R. You cannot have a variable name in R that is a number
      //This situation only occurs when there is a single factor and VALUE. However even though the code to specify a name prefix 
      //works when there are multiple value variable, we are OK
     // if (!code_vars.selected.subsetvars[0].includes(",") && !code_vars.selected.dontReshape[0].includes(",")) 
     //Added 09/20/2021
     //After further testing, we have found that the situation where a variable name with a number is created only WHEN THERE IS A SINGLE VARIABLE
     //THAT CONTAINS THE REPEATED VALUE. tHE CODE CHANGES BELOW REFLECT THAT
     //When ever there is a single variable for a repeated value, the new variable name gets created with a numeric name with no separation character
     //even when a separation character is specified (This is a defect/inconsistency in pivot_wider)
     //In this sitiation we create a prefix with the repeated value variable name with the separation character appended, if no separation character is specified, then we use _ as a default
     //We don't expose the names_prefix character, we use it internally, there is no need to expose it to a customer
    
     // If there is a single variable containing repeated values
    if (!code_vars.selected.dontReshape[0].includes(",")) 
      {
        //If a separator is specified
        if (code_vars.selected.names_sep !="" )
        {
          
          code_vars.selected.names_prefix  =code_vars.selected.dontReshape +code_vars.selected.names_sep

        }
        //else we use _ as default separator
        else
        {
          code_vars.selected.names_prefix  =code_vars.selected.dontReshape +"_"
        }
      }
    let cmd = instance.dialog.renderR(code_vars)
    cmd = removenewline(cmd);
    res.push({ cmd: cmd, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
    return res;
  }
}
module.exports.item = new reshapeLongToWide().render()