











class reshapeWideToLong extends baseModal {
    static dialogId = 'reshapeWideToLong'
    static t = baseModal.makeT(reshapeWideToLong.dialogId)

  constructor() {
    var config = {
            id: reshapeWideToLong.dialogId,
      label: reshapeWideToLong.t('title'),
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
      label1: { el: new labelVar(config, { label: reshapeWideToLong.t('label1'), h: 6 }) },
      label2: { el: new labelVar(config, { label: reshapeWideToLong.t('label2'), h: 6 }) },
      New: { el: new radioButton(config, { label: reshapeWideToLong.t('New'), no: "rd", increment: "New", value: "", state: "checked", extraction: "ValueAsIs", required: true, dependant_objects: ['newdatasetname'] }) },
      newdatasetname: {
        el: new input(config, {
          no: 'newdatasetname',
          label: reshapeWideToLong.t('newdatasetname'),
          ml: 2,
          placeholder: "",
          extraction: "TextAsIs",
          overwrite: "dataset",
          type: "character"
        })
      },
      Existing: { el: new radioButton(config, { label: reshapeWideToLong.t('Existing'), no: "rd", increment: "Existing", value: "TRUE", style: "mb-2", state: "", extraction: "ValueAsIs" }) },
      label12: { el: new labelVar(config, { no: "label12", label: reshapeWideToLong.t('repeatedMeasure'), h: 6 }) },
      labelChoice: { el: new labelVar(config, { no: "labelChoice", label: reshapeWideToLong.t('labelChoice'), style: "mt-2,mb-2", h: 5 }) },
      repeatedMeasure: {
        el: new input(config, {
          no: 'repeatedMeasure',
          label: reshapeWideToLong.t('label12'),
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
          label: reshapeWideToLong.t('names_pattern'),
          placeholder: "",
          allow_spaces :true,
          extraction: "TextAsIs",
          type: "character"
        })
      },
      names_sep: {
        el: new input(config, {
          no: 'names_sep',
          label: reshapeWideToLong.t('names_sep'),
          placeholder: "",
          allow_spaces :true,
          extraction: "TextAsIs",
          type: "character"
        })
      },
      repeatedValue: {
        el: new input(config, {
          no: 'repeatedValue',
          label: reshapeWideToLong.t('repeatedValue'),
          placeholder: "",
          extraction: "TextAsIs",
          type: "character"
        })
      },
      subsetvars: {
        el: new dstVariableList(config, {
          label: reshapeWideToLong.t('subsetvars'),
          no: "subsetvars",
          filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
          extraction: "NoPrefix|UseComma",
        }), r: ['{{ subsetvars | safe}}']
      },
      dontReshape: {
        el: new dstVariableList(config, {
          label: reshapeWideToLong.t('dontReshape'),
          no: "dontReshape",
          filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
          extraction: "NoPrefix|UseComma",
        }), r: ['{{dontReshape | safe}}']
      },
      removeNA: {
        el: new checkbox(config, {
          label: reshapeWideToLong.t('removeNA'),
          no: "removeNA",
          bs_type: "valuebox",
          extraction: "TextAsIs",
          true_value: "TRUE",
          false_value: "FALSE",
        })
      },
      label3: { el: new labelVar(config, { label: reshapeWideToLong.t('label3'), h: 6 }) },
    }
    var advanced = {
      el: new optionsVar(config, {
        no: "advanced",
        name: reshapeWideToLong.t('advanced'),
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
        name: reshapeWideToLong.t('navigation'),
        icon: "icon-longer",
        modal: config.id
      }
    }
    super(config, objects, content);
    
        this.help = {
            title: reshapeWideToLong.t('help.title'),
            r_help: "help(data,package='utils')",
            body: reshapeWideToLong.t('help.body')
        }
;
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
    res.push({ cmd: temp, cgid: newCommandGroup(`${instance.config.id}`, `${instance.config.label}`), oriR: instance.config.RCode, code_vars: code_vars })
    return res;
  }
}

module.exports = {
    render: () => new reshapeWideToLong().render()
}
