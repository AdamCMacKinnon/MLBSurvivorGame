sequelize model:generate --name users --attributes email:string,username:string,password:string,isactive:boolean
sequelize model:generate --name picks --attributes id:uuid,username:string,picks:array