
const advanceResults = (model, populate) => async(req, res, next) => {
    console.log(req.query);
    let reqQuery = {...req.query};
    // Field to exclude 
    const removeFields = ['select', 'sort', 'limit', 'page'];
    removeFields.forEach(param => delete reqQuery[param]);
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=> `$${match}`);
    //{{URL}}/api/v1/bootcamps?averageCost[gte]=9000 averageCost added in json and then api start working

    let query = model.find(JSON.parse(queryStr));
    if(req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
   console.log(query.select);

   if(req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

     // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();


  query = query.skip(startIndex).limit(limit);

  if(populate){
    query.populate(populate);
  }

    const results = await query;

    const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.advanceResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  }

  next();
};

module.exports = advanceResults;