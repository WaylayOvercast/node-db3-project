const Scheme = require('./scheme-model');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
async function checkSchemeId (req, res, next) {
  const id = req.params.scheme_id;
  const valid = await Scheme.findById(id)
  try{
    if(valid){
      next()
    }else{
      next(res.status(404).json({message: `scheme with scheme_id ${id} not found`}))
    }

  }catch(err){
    next(res.status(500).json({message: `unknown server error ${err.message}`}))
  }

}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  try{
    const toCheck = req.body;
    if(!toCheck.name || toCheck.name.length < 1 || typeof toCheck.name !== 'string'){
      next(res.status(400).json({message: `invalid scheme_name`}))
    }else{
      next()
    }

  }catch(err){
    next(res.status(500).json({message: `unknown server error ${err.message}`}))
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/

const validateStep = (req, res, next) => {
  
  try{
    const toCheck = req.body
    if(!toCheck.instructions || toCheck.instructions.length < 1 || typeof toCheck.instructions !== 'string'){
      next(res.status(400).json({message: `invalid step`}))
      
    }else if (toCheck.step_number < 1){
      next(res.status(400).json({message: `invalid step`}))

    }
  }catch(err){
    next(res.status(500).json({message: `unknown server error ${err.message}`}))
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
