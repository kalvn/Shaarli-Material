import $ from 'jquery';

const http = {
  refreshToken: function (callback) {
    $.ajax({
      url: shaarli.basePath + '/admin/token',
      method: 'get',
      success: function (token) {
        $('#token').val(token);

        if (typeof callback === 'function') {
          callback(token);
        }
      },
      error: function () {
        console.error('Failed to refresh token.');
      }
    });
  }
};

export default http;
