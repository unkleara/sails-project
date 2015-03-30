var methodMap = {
  POST: 'create',
  GET: 'read',
  PUT: 'update',
  DELETE: 'delete'
};


module.exports =  {


  getMethod: function(req) {
    return methodMap[req.method];
  }

};
