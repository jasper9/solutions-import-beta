define(["underscore","backbone","util/appDirCommon"],function(_,Backbone,cu){var ProgressBarView=Backbone.View.extend({el:"#progressGroup",initialize:function(){_.bindAll(this,"update","show","hide")},update:function(options){cu.log("ProgressBarView updating with value: "+options.value);switch(options.value){case"0%":this.$("#progressWrapper").addClass("active");break;case"100%":this.$("#progressWrapper").removeClass("active")}return this.$("#progressBadge").text(options.value),this.$("#progressBar").css("width",options.value),_.isNull(options.text)||this.$("#progressBar").text(options.text),this},show:function(){return this.$el.removeClass("hidden"),this},hide:function(){return this.$el.addClass("hidden"),this}});return ProgressBarView});