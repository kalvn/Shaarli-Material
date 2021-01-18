import $ from 'jquery';

const http = {
  // data must be a key-value object where keys correspond to edit form names.
  createLink: async function (data) {
    const params = [];

    Object.keys(data).forEach(key => {
      params.push([
        encodeURIComponent(key),
        encodeURIComponent(data[key])
      ].join('='));
    });

    const response = await $.ajax({
      url: `${shaarli.basePath}/admin/shaare`,
      method: 'post',
      data: params.join('&')
    });

    return response;
  },

  deleteLinkByUrl: async function (url) {
    const response = await $.ajax({
      url: url,
      method: 'get'
    });

    return response;
  },

  updateThumbnail: async function (id) {
    const response = await $.ajax({
      method: 'patch',
      url: `${shaarli.basePath}/admin/shaare/${id}/update-thumbnail`
    });

    return response;
  },

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
      error: function (err) {
        console.error('Failed to refresh token.', err);
      }
    });
  }
};

export default http;
