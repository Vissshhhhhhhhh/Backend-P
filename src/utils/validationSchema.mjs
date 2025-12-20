export const createUserValidateionSchema ={
    name:{
        notEmpty: {
            errorMessage: "User Name must be not empty"
        },
        isLength:{
            options:{min:3,ax:15},
            errorMessage:"name length must be b/w 3 and 15 character"
        }
    },
    age:{
         notEmpty: {
            errorMessage: "Age must be not empty"
        }
    }
}