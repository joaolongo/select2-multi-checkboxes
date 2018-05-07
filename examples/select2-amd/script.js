(function ($) {

  var isTriggered = false;
  var selectAll = false;

  $.fn.select2.amd.require(['select2/multi-checkboxes/dropdown', 'select2/multi-checkboxes/selection', 'select2/multi-checkboxes/results'], function(DropdownAdapter, SelectionAdapter, ResultsAdapter){
    $('.select2-multiple').select2({
      placeholder: 'Select items',
      closeOnSelect: false,
      templateSelection: function (data) {

        if(data.selected.length > 0 && data.selected[0].id == -1)
        {
          if(!isTriggered)
          {
            if(!selectAll && data.all[0].selected)
            {
              isTriggered = true;

              var all = $.map(data.all, function(x) { return x.value;});

              $('.select2-multiple').val(all).trigger('change');

              isTriggered = false;

              selectAll = true;
            }
          }
        }
        else if (selectAll && data.all[0].id != -1)
        {
          isTriggered = true;

          $('.select2-multiple').val(null).trigger('change');

          isTriggered = false;

          selectAll = false;
          
          data.selected.splice(0,1);
        }
         
        data.all.splice(0,1);

        return 'Selected ' + data.selected.length + ' out of ' + data.all.length;
      },
      dropdownAdapter: DropdownAdapter,
      selectionAdapter: SelectionAdapter,
      resultsAdapter: ResultsAdapter
    });
  });
})(jQuery);