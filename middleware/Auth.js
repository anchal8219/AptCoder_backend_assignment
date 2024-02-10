const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


exports.isCreator = async(req,res,next)=>{
    try{
        if(req.user.role !== 'creator'){
            return res.status(400).json({
                success: false,
                message: 'This route is only for creator!!'
            })
        }
        next();
    }catch(error){
        return res.status(500).send({error:error.message})
    }
}