export const requireRole=(allowedRole=[])=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({
                success:false,
                message:"Ko tim thay thong tin xac thuc"
            })
        }
        const uRole=req.user.role;
        if(!allowedRole.includes(uRole)){
            return res.status(403).json({
                success:false,
                message:"Ko co quyen thuc hien"
            })
        }
        next()
    }
}