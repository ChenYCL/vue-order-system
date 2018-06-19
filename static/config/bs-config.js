module.exports = function(bs) {

    return {
      server: {
        middleware: {
          // overrides the second middleware default with new settings
          1: require('connect-history-api-fallback')({
            index: '/order_pay.html',
            verbose: true
          })
        }
      }
    };
  
  };