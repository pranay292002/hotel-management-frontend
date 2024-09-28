export interface bookingType{
    check_in : string
    check_out : string
    createdAt : string
    documentId : string
    guest_name : string
    id : number
    locale : null | string
    payment_status : string
    phone_number : string
    publishedAt : string
    room_type : string
    updatedAt : string
}

export interface statType{
    
total_arrived : number
total_booked : number
total_check_in : number

}

export interface campaignType{
    month : string
    room_visited : number
    room_booked : number
    id ?: number
}



export interface taskType{
    task_status: string
    department: string
    staffName: string
    task: string
    task_id: string
    staff_id:number
    createdAt?:string | null| Date| undefined| number
    id:number


}

export interface userType{

   
blocked ?: boolean
confirmed ?: boolean
createdAt ?: string
documentId ?: string
email : string
id : number
locale ?: null | string
provider ?: string
publishedAt ?: string
updatedAt ?: string
username : string
userType: string
}


export interface userContextType{

    CurrentUser: userType| null| undefined
    update : Function 
        

}

export interface errorsType {
    username ?: string
    email ?: string
    password ?: string
    confirmPassword ?: string
}