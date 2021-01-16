import $ from 'jquery';

const batchAdd = {
  init: function () {
    $('.button-batch-addform').on('click', function () {
      $('.batch-addform').removeClass('hidden');
      $(this).remove();
    });
  }
};

export default batchAdd;
