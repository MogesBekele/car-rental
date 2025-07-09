import userModel from "../models/userModel"

export const changeRoleToOwner = async (req, res)=>{
try {
  const {_id} = req.user
  await userModel.findByIdAndUpdate(_id, {role: 'owner'})
  res.json({success:true, message: 'now you can list cars'})
} catch (error) {
  console.log(error.message)
  res.json({success:true, message: error.message})
}
}