const { default: mongoose } = require("mongoose")

const connectionDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected successfully")
        
    } catch (error) {
        console.log("error connecting in database")
    }
}
module.exports={connectionDB}