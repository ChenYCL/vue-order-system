module.exports = function(bs) {

    return {
      server: {
        middleware: {
          // overrides the second middleware default with new settings
          1: require('connect-history-api-fallback')({
            index: '/cart_nodata.html',
            verbose: true
          })
        }
      }
    };
  
  };