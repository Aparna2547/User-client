import Api from "./api";


type User={
    firstName ?: string
    lastName ?: string
    email ?: string
    password ?: string
    confirmPassword ?: string
}

export const signUp = async(userDetails:User)=>{
    try {
        const res = await Api.post('/api/users/signup',userDetails)
        return res
    } catch (error) {
        console.log(error)
    }
}


export const signIn = async(userDetails:User)=>{
    try {
        const res = await Api.post('/api/users/signin',userDetails)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const verifyOtp = async(otp:string)=>{
    try {
        const res = await Api.post('/api/users/verifyOtp',{otp})
        return res
    } catch (error) {
        console.log(error)
    }
}